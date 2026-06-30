import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contributionId, status, targetStudentCode } = body;

    if (!contributionId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required processing parameters." },
        { status: 400 },
      );
    }

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Force the update and cleanly return the updated record object array straight to the client
    const { data, error: updateError } = await supabase
      .from("contributions")
      .update({
        verification_status: status,
        student_id_code: targetStudentCode || null,
        reviewed_by: user?.id || null,
      })
      .eq("id", contributionId)
      .select();

    if (updateError) throw updateError;

    return NextResponse.json(
      {
        success: true,
        message: "Ledger status updated successfully.",
        updatedRecord: data && data.length > 0 ? data[0] : null,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to finalize database audit.",
      },
      { status: 500 },
    );
  }
}
