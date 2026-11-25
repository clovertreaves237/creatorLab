/** Where signed-in users land by default: the Niches page (the middleware sends new users to onboarding first). */
export const DEFAULT_AFTER_LOGIN = "/niches";

/**
 * Validates a ?next= / ?redirect= destination. Only paths inside CreatorLab are allowed:
 * must start with a single "/" (rejects "//host", "https://…", "javascript:…" and backslash tricks),
 * and never the sign-in / sign-up pages themselves (would loop).
 */
export function safeRedirectPath(value: string | null | undefined, fallback: string = DEFAULT_AFTER_LOGIN): string {
  if (typeof value !== "string") return fallback;
  const v = value.trim();
  if (!v.startsWith("/") || v.startsWith("//") || v.includes("\\") || /[\u0000-\u001f]/.test(v)) return fallback;
  if (/^\/(signin|signup)(\/|\?|#|$)/.test(v)) return fallback;
  return v;
}
