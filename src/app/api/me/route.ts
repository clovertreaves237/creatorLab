import { NextResponse } from "next/server";
import { getCurrentAccount, hasRole, adminPortalPath } from "@/lib/auth/roles";

/**
 * GET /api/me: the signed-in user's role (from the database) and what they may open.
 * The secret admin portal path is only ever sent to admins (FR-6: no links for other users).
 */
export async function GET() {
  const account = await getCurrentAccount();
  if (!account) return NextResponse.json({ signedIn: false }, { status: 401 });
  const isAdmin = hasRole(account.role, "admin");
  return NextResponse.json({
    signedIn: true,
    userId: account.userId,
    role: account.role,
    displayName: account.displayName,
    username: account.username,
    onboardingCompleted: account.onboardingCompleted,
    isCurator: hasRole(account.role, "curator"),
    isAdmin,
    isSuperAdmin: account.role === "super_admin",
    adminPath: isAdmin ? adminPortalPath() || null : null,
  });
}
