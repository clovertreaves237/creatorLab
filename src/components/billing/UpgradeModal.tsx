"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Clock, Check, Loader2, Lock, ArrowRight } from "lucide-react";
import { PaymentMethods } from "./PaymentMarks";
import { formatCountdown, formatUnlockTime, formatXaf, useCheckout } from "./useCheckout";

export interface UpgradeInfo {
  /** UPGRADE = opened by the user (still has free scripts); the other two = blocked by the server. */
  code: "UPGRADE" | "FREE_LIMIT_REACHED" | "DAILY_LIMIT_REACHED";
  nextAt: string | null;
  price: { amount: number; days: number };
  dailyLimit: number;
  testMode: boolean;
  /** Free scripts per 24 hours (admin setting). */
  freePerDay?: number;
}

/** Test-mode note: payments go to the Fapshi sandbox, no real money moves. */
export function TestModeBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-hl-yellow px-2.5 py-0.5 text-[11px] font-bold text-ink ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
      Test mode · no real money
    </span>
  );
}

/** Shown when a free account has used its script for the day (or a Pro account hit the daily cap). */
export function UpgradeModal({ info, onClose }: { info: UpgradeInfo | null; onClose: () => void }) {
  const { startCheckout, starting, error } = useCheckout();
  const [now, setNow] = useState(() => Date.now());
  const subscribeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!info) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !starting && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus(); // focus the dialog (screen readers announce it) without a ring on the button
    return () => {
      clearInterval(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [info, onClose, starting]);

  if (!info || typeof document === "undefined") return null;
  const isFree = info.code !== "DAILY_LIMIT_REACHED"; // free account: show the plan
  const voluntary = info.code === "UPGRADE";
  const days = info.price.days;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 sm:items-center sm:p-4"
      onClick={() => !starting && onClose()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full min-w-0 overflow-y-auto overscroll-contain outline-none rounded-t-3xl border-2 border-b-0 border-ink bg-white px-5 pb-6 pt-3 sm:max-w-md sm:rounded-3xl sm:border-b-2 sm:p-7"
      >
        {/* grab handle (mobile sheet) */}
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line sm:hidden" aria-hidden />

        <button
          type="button"
          onClick={onClose}
          disabled={starting}
          className="absolute right-3 top-3 rounded-xl p-2 text-pencil transition-colors hover:bg-paper-deep hover:text-ink disabled:opacity-40"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-8">
          <span className="sk-pill text-[11px]">{voluntary ? "CreatorLab Pro" : isFree ? "Free plan" : "Daily limit"}</span>
          <h2 id="upgrade-title" className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-3xl">
            {voluntary ? (
              <>
                Keep writing with <span className="hl-yellow">Pro</span>
              </>
            ) : isFree ? (
              <>
                You&apos;ve used today&apos;s <span className="hl-yellow">free script</span>
              </>
            ) : (
              <>
                You&apos;ve hit today&apos;s <span className="hl-yellow">limit</span>
              </>
            )}
          </h2>
        </div>

        {info.nextAt && !voluntary && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-ink bg-paper px-4 py-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">
                {isFree ? "Next free script" : "Limit resets"}: {formatUnlockTime(info.nextAt)}
              </p>
              <p className="text-xs text-pencil">in {formatCountdown(info.nextAt, now)}</p>
            </div>
          </div>
        )}

        {isFree ? (
          <>
            <p className="mt-5 text-sm text-pencil">
              {voluntary
                ? `Free accounts get ${info.freePerDay === undefined || info.freePerDay === 1 ? "one script" : `${info.freePerDay} scripts`} a day. Subscribe to keep writing whenever you need to.`
                : "Don’t want to wait? Subscribe and keep writing scripts right now."}
            </p>

            <div className="mt-3 rounded-2xl border-2 border-ink p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-serif text-xl italic text-ink">CreatorLab Pro</p>
                <p className="text-ink">
                  <span className="text-2xl font-extrabold tracking-tight">{formatXaf(info.price.amount)}</span>
                  <span className="text-sm text-pencil"> / {days} days</span>
                </p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                  <span>
                    Keep generating scripts{info.dailyLimit > 0 ? `, up to ${info.dailyLimit} a day` : ""}
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                  <span>Active for {days} days from your payment</span>
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                  <span>Pay once. No automatic renewal</span>
                </li>
              </ul>
            </div>

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-pencil">Pay with</p>
            <PaymentMethods />

            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {error}
              </p>
            )}

            <button ref={subscribeRef} type="button" onClick={startCheckout} disabled={starting} className="sk-btn-ink mt-5 w-full justify-center py-3.5 text-base">
              {starting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Opening secure payment…
                </>
              ) : (
                <>
                  Subscribe · {formatXaf(info.price.amount)} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <button type="button" onClick={onClose} disabled={starting} className="sk-btn-ghost mt-2 w-full justify-center py-2.5 text-sm">
              Maybe later
            </button>

            <div className="mt-4 flex flex-col items-center gap-2 text-center">
              <p className="flex items-center gap-1.5 text-[11px] text-pencil">
                <Lock className="h-3 w-3" /> Secure payment by Fapshi. You&apos;ll confirm on your phone.
              </p>
              {info.testMode && (
                <>
                  <TestModeBadge />
                  <p className="text-[11px] leading-relaxed text-pencil">
                    On the Fapshi test page use <span className="font-bold text-ink">670000000</span> (MTN) or{" "}
                    <span className="font-bold text-ink">690000000</span> (Orange) for a successful payment.
                  </p>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="mt-5 text-sm text-pencil">
              Pro includes up to {info.dailyLimit} scripts a day to keep the service fast for everyone. Your scripts and history are safe.
            </p>
            <button ref={subscribeRef} type="button" onClick={onClose} className="sk-btn-ink mt-5 w-full justify-center py-3">
              Got it
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
