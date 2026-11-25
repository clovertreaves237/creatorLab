/**
 * The public address of CreatorLab. Pure functions (no imports) so they can be unit tested.
 *
 * Why this exists: NEXT_PUBLIC_APP_URL was once copied from .env.local into Vercel as a localhost address,
 * which sent paying users back to "http://localhost:3002" after Fapshi. A localhost value is never used
 * when running on Vercel.
 */

export const PRODUCTION_URL = "https://creator-lab-beta.vercel.app";

type Env = Record<string, string | undefined>;

const LOCAL_HOST = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?$/i;

function cleanUrl(raw: string | undefined): string {
  const v = (raw || "").trim().replace(/\/+$/, "");
  return /^https?:\/\/[^\s/?#]+$/i.test(v) ? v : "";
}

export function isLocalUrl(url: string): boolean {
  try {
    return LOCAL_HOST.test(new URL(url).host);
  } catch {
    return false;
  }
}

/**
 * Base URL for links that are not tied to a request (emails, metadata).
 * Order: NEXT_PUBLIC_APP_URL (unless it is localhost on Vercel) -> Vercel production domain -> this deployment -> fallback.
 */
export function siteUrl(env: Env = process.env): string {
  const onVercel = Boolean(env.VERCEL);
  const configured = cleanUrl(env.NEXT_PUBLIC_APP_URL);
  if (configured && !(onVercel && isLocalUrl(configured))) return configured;
  if (onVercel) {
    const prod = (env.VERCEL_PROJECT_PRODUCTION_URL || "").trim();
    if (prod && !LOCAL_HOST.test(prod)) return `https://${prod.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
    const deploy = (env.VERCEL_URL || "").trim();
    if (deploy) return `https://${deploy.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
    return PRODUCTION_URL;
  }
  return configured || "http://localhost:3000";
}

/**
 * The address the user is actually on, from the request (x-forwarded-host on Vercel).
 * Used for "come back here after paying", so the user always returns to the same site and session.
 */
export function requestBaseUrl(headers: { get(name: string): string | null }, fallbackOrigin: string, env: Env = process.env): string {
  const host = (headers.get("x-forwarded-host") || headers.get("host") || "").split(",")[0].trim();
  const validHost = /^[a-z0-9.-]+(:\d+)?$/i.test(host) || LOCAL_HOST.test(host);
  if (host && validHost) {
    const local = LOCAL_HOST.test(host);
    if (!(env.VERCEL && local)) {
      const proto = (headers.get("x-forwarded-proto") || "").split(",")[0].trim().toLowerCase();
      const scheme = proto === "http" || proto === "https" ? proto : local ? "http" : "https";
      return `${scheme}://${host}`;
    }
  }
  const origin = cleanUrl(fallbackOrigin);
  if (origin && !(env.VERCEL && isLocalUrl(origin))) return origin;
  return siteUrl(env);
}
