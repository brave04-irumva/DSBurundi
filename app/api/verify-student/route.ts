import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Extract the target search query token from the incoming URL string
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Missing identity code token." },
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

    // Query the database to match the unique institutional code parameter
    const { data: student, error: queryError } = await supabase
      .from("students")
      .select("student_id_code, first_name, last_name, class_grade")
      .eq("student_id_code", code)
      .eq("is_active", true)
      .single(); // Enforces returning exactly one matching data object row

    if (queryError || !student) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error:
            "Student tracking token not found in active campus directories.",
        },
        { status: 404 },
      );
    }

    // Compile dynamic lookup payload response
    return NextResponse.json(
      {
        success: true,
        verified: true,
        studentData: {
          fullName: `${student.first_name} ${student.last_name}`,
          grade: student.class_grade,
          idToken: student.student_id_code,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal registry connection telemetry failure.",
      },
      { status: 500 },
    );
  }
}
