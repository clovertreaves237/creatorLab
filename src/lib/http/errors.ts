/**
 * Safe error responses (OWASP A02.1 / A10): log the real error on the server, send the user a fixed message.
 * Never put database or provider error text in a response.
 */
export function publicMessage(err: unknown, fallback: string, tag = "api"): string {
  const detail = err && typeof err === "object" && "message" in err ? String((err as any).message) : String(err);
  console.error(`[${tag}]`, detail.replace(/[\r\n]+/g, " ").slice(0, 500));
  return fallback;
}
