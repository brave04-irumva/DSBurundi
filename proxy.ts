import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Initialize a lightweight server client to safely inspect the incoming request's session tokens
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 2. Unpack the cryptographic user auth session data from the cookie header
  const { data: { user } } = await supabase.auth.getUser();

  // 3. SECURITY GATE RULE: If an unauthenticated user attempts to look at any dashboard route, kick them back to the login page immediately
  if (!user && request.nextUrl.pathname.startsWith("/dashboard") && !request.nextUrl.pathname.startsWith("/dashboard/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    return NextResponse.redirect(url);
  }

  // 4. PREVENT DOUBLE SIGN-IN RULE: If a teacher is ALREADY logged in and tries to load the login page again, fast-track them to the workspace dashboard
  if (user && request.nextUrl.pathname.startsWith("/dashboard/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

// Configure Next.js to only run this middleware guard on internal management workspace paths
export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};