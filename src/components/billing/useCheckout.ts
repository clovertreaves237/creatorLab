"use client";

import { useState } from "react";

/** Starts a Fapshi checkout for the Pro pass and sends the browser to Fapshi's secure payment page. */
export function useCheckout() {
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    if (starting) return;
    setStarting(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "pro_pass" }), // the price is decided on the server
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || typeof json.url !== "string") throw new Error(json.error || "The payment page could not be opened.");
      window.location.assign(json.url);
      // keep the spinner while the browser leaves for Fapshi
    } catch (err: any) {
      setError(err?.message || "The payment page could not be opened.");
      setStarting(false);
    }
  };

  return { startCheckout, starting, error };
}

/** "Thu 26 Nov, 09:14" in the viewer's own time zone. */
export function formatUnlockTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

/** "13 h 42 min" / "8 min" / "less than a minute" until `iso`. */
export function formatCountdown(iso: string, now: number = Date.now()): string {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 60_000) return "less than a minute";
  const mins = Math.ceil(ms / 60_000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export function formatXaf(amount: number): string {
  return `${amount.toLocaleString("fr-CM").replace(/ | /g, " ")} XAF`;
}
