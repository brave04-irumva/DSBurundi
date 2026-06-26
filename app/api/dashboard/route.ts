import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Force Next.js to treat this API as a live, request-driven runtime endpoint
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // FIX: Next.js 15/16 requires explicit 'await' execution loops to resolve the cookies Promise structure
    const cookieStore = await cookies();

    // Establish our isolated read client with asynchronous token routing parameters
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      },
    );

    // 1. Fetch live total support entries count
    const { count: supportCount, error: supportCountError } = await supabase
      .from("contributions")
      .select("*", { count: "exact", head: true });

    if (supportCountError) throw supportCountError;

    // 2. Fetch specific verified tuition clearances count
    const { count: tuitionCount, error: tuitionCountError } = await supabase
      .from("contributions")
      .select("*", { count: "exact", head: true })
      .not("payment_method", "eq", "N/A");

    if (tuitionCountError) throw tuitionCountError;

    // 3. Query the latest 10 submissions sorted by newest first
    const { data: recentRows, error: recentError } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (recentError) throw recentError;

    // 4. Map the database values cleanly for the frontend logs table
    const formattedSubmissions = (recentRows || []).map((row: any) => {
      let displayAmount = "N/A";
      if (row.amount_fbu > 0) {
        displayAmount = `${Number(row.amount_fbu).toLocaleString()} BIF`;
      } else {
        displayAmount = row.notes?.substring(0, 20) || "Declared Commitment";
      }

      return {
        id: row.id.substring(0, 8).toUpperCase(),
        name:
          row.notes?.split("-")[0]?.replace("CNI:", "")?.trim() ||
          "Anonymous Supporter",
        type: row.support_type.toUpperCase(),
        method: row.payment_method,
        amount: displayAmount,
        ref: row.transaction_reference || "Verified",
      };
    });

    const dashboardMetrics = {
      success: true,
      summary: {
        totalSupportEntries: supportCount || 0,
        verifiedTuitionClearances: tuitionCount || 0,
        pendingFileUploads: 0,
      },
      recentSubmissions: formattedSubmissions,
    };

    return NextResponse.json(dashboardMetrics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to parse database records stream.",
      },
      { status: 500 },
    );
  }
}
