"use client";

import { useCallback, useEffect, useState } from "react";
import { ALLOWED_NICHES } from "@/lib/constants/niches";

type Niche = (typeof ALLOWED_NICHES)[number];

/**
 * The signed-in user's chosen niches (personalisation settings from onboarding / the Niches page).
 * Only LIVE niches are returned, in the standard order. Every page that offers a niche choice uses this,
 * so users only ever see their own niches until they add, change or remove one.
 */
export function useMyNiches() {
  const [ids, setIds] = useState<string[] | null>(null);

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/onboarding", { cache: "no-store" });
      const json = res.ok ? await res.json() : null;
      setIds(Array.isArray(json?.niches) ? json.niches : []);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const niches: Niche[] = ALLOWED_NICHES.filter((n) => n.status === "live" && (ids || []).includes(n.id));
  return {
    loading: ids === null,
    niches,
    ids: niches.map((n) => n.id),
    /** True when the id belongs to this user's live niches */
    has: (id: string | null | undefined) => Boolean(id && niches.some((n) => n.id === id)),
    reload,
  };
}
