import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
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

    // 1. Fetch live contribution registry logs directly out of the PostgreSQL cloud ledger
    const { data: contributions, error: fetchError } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    // 2. Compute true real-time metric aggregates based on database records
    const totalSupport = contributions?.length || 0;
    const verifiedClearances =
      contributions?.filter((c) => c.verification_status === "VERIFIED")
        .length || 0;

    return NextResponse.json(
      {
        success: true,
        summary: {
          totalSupportEntries: totalSupport,
          verifiedTuitionClearances: verifiedClearances,
          pendingFileUploads: 0, // Storage indicators scale independently
        },
        // Pass raw database entries down cleanly with genuine row UUID mappings intact
        recentSubmissions: contributions || [],
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to compile live dashboard metrics framework.",
      },
      { status: 500 },
    );
  }
}
