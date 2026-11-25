/**
 * Client-side stale-while-revalidate cache for the outlier feed, keyed by niche + platform.
 * Lives for the browser tab (module memory): going back to a niche shows its cards instantly,
 * while a fresh copy is fetched in the background. Pure module, unit-testable.
 */
export interface FeedPage<T> {
  items: T[];
  total: number;
  nextCursor: string | null;
  unlocked: boolean;
  plan: string;
}

const cache = new Map<string, FeedPage<unknown> & { at: number }>();
const MAX_ENTRIES = 40;

export const feedKey = (niche: string, platform: string) => `${niche}:${platform}`;

export function readFeed<T>(key: string): (FeedPage<T> & { at: number }) | null {
  return (cache.get(key) as (FeedPage<T> & { at: number }) | undefined) ?? null;
}

export function writeFeed<T>(key: string, page: FeedPage<T>, now: number = Date.now()) {
  cache.delete(key);
  cache.set(key, { ...page, at: now });
  while (cache.size > MAX_ENTRIES) cache.delete(cache.keys().next().value as string);
}

/** Appends the next page (skipping anything already present by rank) and keeps the newest cursor/total. */
export function appendPage<T extends { rank: number }>(current: FeedPage<T>, next: FeedPage<T>): FeedPage<T> {
  const seen = new Set(current.items.map((i) => i.rank));
  return { ...next, items: [...current.items, ...next.items.filter((i) => !seen.has(i.rank))] };
}

/** Drops every cached feed (e.g. after the plan changes, so locked/unlocked cards are re-fetched). */
export function clearFeeds() {
  cache.clear();
}
