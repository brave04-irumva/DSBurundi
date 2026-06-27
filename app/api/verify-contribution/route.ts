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
        { success: false, error: "Missing required processing tokens." },
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

    // Grab authenticated session context metrics to see which admin staff member is signing off
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Execute atomic log update statement downstream
    const { error: updateError } = await supabase
      .from("contributions")
      .update({
        verification_status: status,
        student_id_code: targetStudentCode || null,
        reviewed_by: user?.id || null,
      })
      .eq("id", contributionId);

    if (updateError) throw updateError;

    return NextResponse.json(
      {
        success: true,
        message: "Transaction audited and balance rules synchronized.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to finalize verification parameters.",
      },
      { status: 500 },
    );
  }
}
