"use client";

import { useEffect, useState } from "react";

/** HH:MM:SS until `to`, ticking every second. Fixed-width digits so nothing shifts while it counts. */
export function LiveCountdown({ to, onDone, className = "" }: { to: string; onDone?: () => void; className?: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - now);
  const done = left === 0;
  useEffect(() => {
    if (done) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  const h = Math.floor(left / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className={`tabular-nums ${className}`} aria-label={`${h} hours ${m} minutes left`}>
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
