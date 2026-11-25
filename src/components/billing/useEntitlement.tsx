"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UpgradeModal, type UpgradeInfo } from "./UpgradeModal";

/**
 * The signed-in user's plan (from /api/billing, never cached) + the upgrade popup.
 * Re-checks whenever the page comes back into view: browser Back/Forward (bfcache "pageshow" with
 * persisted = true), or the tab becoming visible again, so a page never shows a stale paywall after paying.
 */
export function useEntitlement(onChange?: () => void) {
  const router = useRouter();
  const [billing, setBilling] = useState<any>(null);
  const [upgradeInfo, setUpgradeInfo] = useState<UpgradeInfo | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/billing", { cache: "no-store" });
      const json = res.ok ? await res.json() : null;
      if (json) setBilling(json);
      return json;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    reload();
    let lastPlan: string | null = null;
    const refresh = async () => {
      const b = await reload();
      if (b && lastPlan !== null && b.plan !== lastPlan) {
        router.refresh();
        onChangeRef.current?.();
      }
      if (b) lastPlan = b.plan;
    };
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) refresh();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("pageshow", onShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [reload, router]);

  const openUpgrade = useCallback(
    async (code: UpgradeInfo["code"], nextAt: string | null = null) => {
      const b = billing || (await reload());
      setUpgradeInfo({
        code,
        nextAt,
        plans: b?.plans || [],
        currentPlan: b?.plan ?? "free",
        testMode: b?.testMode ?? true,
        freePerDay: b?.free?.limit,
      });
    },
    [billing, reload]
  );

  const upgradeModal = <UpgradeModal info={upgradeInfo} onClose={() => setUpgradeInfo(null)} />;
  return { billing, reload, openUpgrade, upgradeModal };
}
