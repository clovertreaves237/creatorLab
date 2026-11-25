/**
 * Secret admin portal path (env ADMIN_PORTAL_PATH), read at request time. Pure functions, no imports.
 * The path only hides the portal; the real protection is the admin role check on every request/API call.
 */

const MIN_LENGTH = 8;

/**
 * Normalizes the configured value: trims whitespace (including stray newlines from pasting),
 * strips leading/trailing slashes. Returns "" (portal disabled) when unset, too short, or unsafe.
 */
export function normalizeAdminPath(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "";
  const clean = raw.trim().replace(/^\/+|\/+$/g, "").trim();
  if (clean.length < MIN_LENGTH) return "";
  if (/[\s?#\\]/.test(clean) || clean.includes("..")) return "";
  return clean;
}

/** "/<path>" for links (admins only), or "" when the portal is disabled. */
export function adminPathHref(raw: string | null | undefined): string {
  const p = normalizeAdminPath(raw);
  return p ? `/${p}` : "";
}

export type AdminPortalDecision = { kind: "not-admin-path" } | { kind: "not-found" } | { kind: "rewrite"; to: string };

/**
 * The whole access decision for a request:
 *  - not the admin path            -> not-admin-path (normal routing continues)
 *  - admin path, not a verified admin (signed out, unconfirmed email, role user/curator) -> not-found (plain 404)
 *  - admin path, verified admin    -> rewrite to the internal /admin route
 */
export function adminPortalDecision(input: {
  pathname: string;
  rawPath: string | null | undefined;
  signedIn: boolean;
  emailConfirmed: boolean;
  role: string | null | undefined;
}): AdminPortalDecision {
  const sub = matchAdminPath(input.pathname, input.rawPath);
  if (sub === null) return { kind: "not-admin-path" };
  const isAdmin = input.signedIn && input.emailConfirmed && (input.role === "admin" || input.role === "super_admin");
  return isAdmin ? { kind: "rewrite", to: `/admin${sub}` } : { kind: "not-found" };
}

/**
 * Does this request path open the admin portal? Case-sensitive; a trailing slash on the URL is ignored;
 * the URL is decoded first. Returns the sub-path to serve under /admin ("" for the portal home), or null.
 */
export function matchAdminPath(pathname: string, raw: string | null | undefined): string | null {
  const secret = normalizeAdminPath(raw);
  if (!secret) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const path = decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
  const base = `/${secret}`;
  if (path === base) return "";
  if (path.startsWith(`${base}/`)) return path.slice(base.length);
  return null;
}
