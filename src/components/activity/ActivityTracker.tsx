"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/activity/track";

const APP_PATHS = ["/niches", "/creators", "/search", "/script-generator", "/profile", "/account"];

/** Records a page view for signed-in app pages (not the landing or auth pages). */
export function ActivityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const last = useRef<{ key: string; at: number } | null>(null);

  useEffect(() => {
    if (!pathname || !APP_PATHS.some((p) => pathname.startsWith(p))) return;
    const niche = searchParams?.get("niche") || null;
    const key = `${pathname}|${niche ?? ""}`;
    const now = Date.now();
    if (last.current && last.current.key === key && now - last.current.at < 30000) return;
    last.current = { key, at: now };
    track("page_view", { target: pathname, nicheId: niche });
  }, [pathname, searchParams]);

  return null;
}
