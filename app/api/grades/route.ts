import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// 📥 GET ROUTE: Pulls down matching student roster and corresponding report card metrics
export async function GET(request: Request) {
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

    // Join the report_cards table cleanly over the student registry table rows
    const { data: records, error: queryError } = await supabase
      .from("students")
      .select(
        `
        id,
        student_id_code,
        first_name,
        last_name,
        class_grade,
        report_cards (
          id,
          academic_term,
          marks_data,
          teacher_comments
        )
      `,
      )
      .eq("is_active", true);

    if (queryError) throw queryError;

    const formattedData = (records || []).map((student: any) => {
      const reportCard = student.report_cards?.[0] || null;
      return {
        studentUuid: student.id,
        studentCode: student.student_id_code,
        fullName: `${student.first_name} ${student.last_name}`,
        gradeLevel: student.class_grade,
        reportCardId: reportCard?.id || null,
        term: reportCard?.academic_term || "Term 1 2026",
        marks: reportCard?.marks_data || {},
        comments: reportCard?.teacher_comments || "",
      };
    });

    return NextResponse.json(
      { success: true, roster: formattedData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process marks ledger.",
      },
      { status: 500 },
    );
  }
}

// 📤 POST ROUTE: Safely updates or creates rows within the report_cards table database matrix
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentUuid, gradeLevel, term, marks, comments } = body;

    if (!studentUuid) {
      return NextResponse.json(
        { success: false, error: "Missing candidate parameters." },
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

    // Upsert payload blocks straight down into PostgreSQL using an elegant constraint override handshake
    const { error: upsertError } = await supabase.from("report_cards").upsert(
      {
        student_id: studentUuid,
        academic_term: term || "Term 1 2026",
        grade_level: gradeLevel,
        marks_data: marks,
        teacher_comments: comments || "",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "student_id" },
    );

    if (upsertError) throw upsertError;

    return NextResponse.json(
      {
        success: true,
        message: "Ledger compilation matrix applied successfully.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update record stream.",
      },
      { status: 500 },
    );
  }
}
