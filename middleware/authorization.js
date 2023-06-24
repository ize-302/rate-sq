import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Conditions to determine if to allow user access to various pages
  const protectedRoutes = [];
  const unprotectedRoutes = ["/login", "/register"];
  const redirectUrl = req.nextUrl.clone();

  if (unprotectedRoutes.includes(req.nextUrl.pathname) && session?.user.id) {
    redirectUrl.pathname = "/applications";
    return NextResponse.redirect(redirectUrl);
  } else if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  } else if (
    protectedRoutes.includes(req.nextUrl.pathname) &&
    session?.user.id
  ) {
    // check if user's profile data is complete
    const email = session?.user?.email;
    const response = await supabase
      .from("profiles")
      .select()
      .eq("email", email)
      .single();
    if (!response.data) {
      if (req.nextUrl.pathname !== "/onboarding") {
        redirectUrl.pathname = "/onboarding";
        return NextResponse.redirect(redirectUrl);
      }
    } else {
      if (req.nextUrl.pathname === "/onboarding") {
        redirectUrl.pathname = "/applications";
        return NextResponse.redirect(redirectUrl);
      }
    }
  } else {
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|public|favicon.ico).*)", "/"],
};