/**
 * Small sliding-window rate limiter (per server instance, best effort). Used to protect paid APIs
 * (Gemini, YouTube) from being drained by one account. Pure: no imports, unit-testable.
 */
const buckets = new Map<string, number[]>();

/** Returns true when the action is allowed (and records it), false when the limit is reached. */
export function takeToken(key: string, limit: number, windowMs: number, now: number = Date.now()): boolean {
  const recent = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 10_000) {
    // keep memory bounded
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}
