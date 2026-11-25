import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { DEFAULT_AFTER_LOGIN, safeRedirectPath } from "@/lib/auth/redirect";

/**
 * Root middleware:
 * 1. Refreshes auth session tokens
 * 2. Enforces FR-2 (unverified accounts cannot access protected features)
 * 3. Sends new users to onboarding until they have answered the setup questions and picked a niche
 * 4. Enforces FR-6 / FR-7: the admin portal lives on a secret path (ADMIN_PORTAL_PATH) and is served
 *    only to verified accounts whose DATABASE role is admin or super_admin. /admin and /curator are not
 *    reachable directly; curator tools live inside the user's dashboard.
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const notFound = () => NextResponse.rewrite(new URL("/__not_found__", request.url), { status: 404 });

  // The real admin/curator page folders are never reachable by their own URL.
  if (path === "/admin" || path.startsWith("/admin/") || path === "/curator" || path.startsWith("/curator/")) {
    return notFound();
  }

  // Role and onboarding status come from the database, never from user-editable metadata.
  const loadProfile = async () => {
    if (!user) return null;
    const full = await supabase
      .from("profiles")
      .select("role, onboarding_completed_at")
      .eq("id", user.id)
      .maybeSingle();
    if (!full.error) return { role: full.data?.role as string | undefined, onboarded: Boolean(full.data?.onboarding_completed_at), known: true };
    const basic = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    return { role: basic.data?.role as string | undefined, onboarded: true, known: false };
  };

  // Secret admin portal path -> serve the admin page, but only to verified admins. Everyone else: 404.
  const adminPath = "/" + (process.env.ADMIN_PORTAL_PATH || "").replace(/^\/+|\/+$/g, "");
  if (adminPath.length > 8 && (path === adminPath || path.startsWith(adminPath + "/"))) {
    // Logged-out visitors get the same 404 as any wrong URL, so the path cannot be discovered by probing.
    // Admins sign in first, then open the link.
    if (!user) return notFound();
    const profile = await loadProfile();
    const isAdmin = Boolean(user.email_confirmed_at) && (profile?.role === "admin" || profile?.role === "super_admin");
    if (!isAdmin) return notFound();
    const target = request.nextUrl.clone();
    target.pathname = "/admin" + path.slice(adminPath.length);
    const rewrite = NextResponse.rewrite(target, { request });
    supabaseResponse.cookies.getAll().forEach((c) => rewrite.cookies.set(c));
    return rewrite;
  }

  // Gate 1: Once a user has logged in or registered, they only see the landing page when they log out.
  // Authenticated users visiting "/" or auth pages are redirected to "/niches"
  if (path === "/" || path === "/signin" || path === "/signup") {
    if (user && user.email_confirmed_at) {
      const params = request.nextUrl.searchParams;
      const target = path === "/" ? DEFAULT_AFTER_LOGIN : safeRedirectPath(params.get("next") || params.get("redirect"));
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  // Protected application routes
  const isProtectedPath =
    path.startsWith("/niches") ||
    path.startsWith("/creators") ||
    path.startsWith("/search") ||
    path.startsWith("/script-generator") ||
    path.startsWith("/profile") ||
    path.startsWith("/account") ||
    path.startsWith("/billing") ||
    path.startsWith("/onboarding");

  // FR-2: Unverified accounts cannot proceed to protected features
  if (isProtectedPath) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      url.search = "";
      // Remember the full destination (path + query) so the user returns to exactly where they were going
      url.searchParams.set("redirect", path + request.nextUrl.search);
      return NextResponse.redirect(url);
    }

    if (!user.email_confirmed_at) {
      const url = request.nextUrl.clone();
      url.pathname = "/verify-email";
      return NextResponse.redirect(url);
    }

    // Personalisation: setup questions + at least one niche before using the app.
    const profile = await loadProfile();
    if (profile?.known && !profile.onboarded && !path.startsWith("/onboarding") && !path.startsWith("/account")) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
