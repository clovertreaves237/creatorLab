/**
 * CSRF defence in depth (OWASP A01.8): a browser request that changes data must come from our own site.
 * Session cookies are already SameSite=Lax; this also refuses API writes whose Origin is another site.
 * Requests without an Origin header (server-to-server, curl) are left to the normal auth checks.
 * Pure function so it can be unit tested.
 */
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
/** Called by other servers, protected by their own secret instead of a browser origin. */
const SERVER_TO_SERVER = ["/api/payments/webhook"];

export function isCrossSiteWrite(method: string, pathname: string, origin: string | null, host: string | null): boolean {
  if (SAFE_METHODS.has(method.toUpperCase())) return false;
  if (!pathname.startsWith("/api/")) return false;
  if (SERVER_TO_SERVER.some((p) => pathname === p || pathname.startsWith(p + "/"))) return false;
  if (!origin) return false;
  if (origin === "null") return true; // sandboxed / opaque origins never write
  try {
    return new URL(origin).host.toLowerCase() !== String(host || "").split(",")[0].trim().toLowerCase();
  } catch {
    return true;
  }
}
