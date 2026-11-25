import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Roles come ONLY from public.profiles.role (set by the database's role functions).
 * Never trust user_metadata.role: users can edit their own metadata from the browser.
 */
export type AppRole = "visitor" | "user" | "curator" | "admin" | "super_admin";

const RANK: Record<AppRole, number> = { visitor: 0, user: 1, curator: 2, admin: 3, super_admin: 4 };

export function hasRole(role: string | null | undefined, minimum: AppRole): boolean {
  const r = (role as AppRole) in RANK ? (role as AppRole) : "user";
  return RANK[r] >= RANK[minimum];
}

export interface CurrentAccount {
  userId: string;
  email: string;
  emailVerified: boolean;
  role: AppRole;
  displayName: string;
  username: string | null;
  onboardingCompleted: boolean;
}

/** Reads the signed-in user and their profile row. Returns null when signed out. */
export async function getCurrentAccount(): Promise<CurrentAccount | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  let profile: any = null;
  let onboardingKnown = true;
  const full = await supabase
    .from("profiles")
    .select("role, display_name, username, onboarding_completed_at")
    .eq("id", user.id)
    .maybeSingle();
  if (!full.error) {
    profile = full.data;
  } else {
    // Migration not applied yet: fall back to the columns that always exist.
    onboardingKnown = false;
    const basic = await supabase.from("profiles").select("role, display_name").eq("id", user.id).maybeSingle();
    profile = basic.data;
  }

  const emailVerified = Boolean(user.email_confirmed_at);
  // Staff powers require a verified email (mirrors public.app_role() in the database).
  const storedRole = ((profile?.role as AppRole) || "user") as AppRole;
  const role: AppRole = emailVerified ? storedRole : "user";

  return {
    userId: user.id,
    email: user.email || "",
    emailVerified,
    role,
    displayName: profile?.display_name || user.email?.split("@")[0] || "Creator",
    username: profile?.username ?? null,
    onboardingCompleted: !onboardingKnown || !profile || Boolean(profile.onboarding_completed_at),
  };
}

/**
 * Use at the top of an API route:
 *   const gate = await requireRole("admin"); if ("response" in gate) return gate.response;
 */
export async function requireRole(
  minimum: AppRole
): Promise<{ account: CurrentAccount } | { response: NextResponse }> {
  const account = await getCurrentAccount();
  if (!account) {
    return { response: NextResponse.json({ error: "Please sign in." }, { status: 401 }) };
  }
  if (!hasRole(account.role, minimum)) {
    return { response: NextResponse.json({ error: "You do not have access to this." }, { status: 403 }) };
  }
  return { account };
}

/** Secret URL path of the admin portal (set ADMIN_PORTAL_PATH in .env.local). */
export function adminPortalPath(): string {
  const raw = process.env.ADMIN_PORTAL_PATH || "";
  const clean = raw.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}
