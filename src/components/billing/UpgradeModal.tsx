"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Clock, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import type { PlanInfo } from "@/lib/payments/logic";
import { PaymentMethods } from "./PaymentMarks";
import { PlanCards } from "./PlanCards";
import { formatCountdown, formatUnlockTime, formatXaf } from "./useCheckout";

export interface UpgradeInfo {
  /** UPGRADE = opened by the user; the other two = blocked by the server. */
  code: "UPGRADE" | "FREE_LIMIT_REACHED" | "DAILY_LIMIT_REACHED";
  nextAt: string | null;
  plans: PlanInfo[];
  currentPlan: string | null;
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

/** Limit reached -> big Subscribe -> the two plans -> checkout page. */
export function UpgradeModal({ info, onClose }: { info: UpgradeInfo | null; onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<"limit" | "plans">("limit");
  const [now, setNow] = useState(() => Date.now());
  const dialogRef = useRef<HTMLDivElement>(null);

  // Agency users already have the biggest plan: nothing to upsell when they hit their cap.
  const offer = (info?.plans || []).filter((p) => !(info?.currentPlan === "agency" && p.id === "creator"));
  const canUpgrade = info ? !(info.code === "DAILY_LIMIT_REACHED" && info.currentPlan === "agency") && offer.length > 0 : false;
  const cheapest = offer.length ? offer.reduce((a, b) => (a.amount <= b.amount ? a : b)) : null;

  useEffect(() => {
    if (!info) return;
    setStep(info.code === "UPGRADE" ? "plans" : "limit");
    const t = setInterval(() => setNow(Date.now()), 30_000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      clearInterval(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [info, onClose]);

  if (!info || typeof document === "undefined") return null;
  const isFree = !info.currentPlan || info.currentPlan === "free";
  const wide = step === "plans";

  const choose = (p: PlanInfo) => {
    onClose();
    router.push(`/billing/checkout?plan=${p.id}`);
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 sm:items-center sm:p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[94vh] w-full min-w-0 overflow-y-auto overscroll-contain rounded-t-3xl border-2 border-b-0 border-ink bg-white px-5 pb-6 pt-3 outline-none sm:rounded-3xl sm:border-b-2 sm:p-8 ${wide ? "sm:max-w-3xl" : "sm:max-w-lg"}`}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line sm:hidden" aria-hidden />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-xl p-2 text-pencil transition-colors hover:bg-paper-deep hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "limit" ? (
          <>
            <span className="sk-pill text-[11px]">{isFree ? "Free plan" : "Daily limit"}</span>
            <h2 id="upgrade-title" className="mt-4 pr-6 text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[40px]">
              {isFree ? (
                <>
                  You&apos;ve used today&apos;s <span className="hl-yellow">free script</span>
                </>
              ) : (
                <>
                  You&apos;ve hit today&apos;s <span className="hl-yellow">limit</span>
                </>
              )}
            </h2>

            {info.nextAt && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border-2 border-ink bg-paper px-4 py-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <div className="min-w-0">
                  <p className="text-base font-bold text-ink">
                    {isFree ? "Next free script" : "Limit resets"}: {formatUnlockTime(info.nextAt)}
                  </p>
                  <p className="text-sm text-pencil">in {formatCountdown(info.nextAt, now)}</p>
                </div>
              </div>
            )}

            {canUpgrade ? (
              <>
                <p className="mt-6 text-lg font-semibold leading-snug text-ink">
                  {isFree ? "Subscribe to keep generating scripts right now." : "Need more scripts? Move up to Agency & Academy."}
                </p>
                <button
                  type="button"
                  onClick={() => setStep("plans")}
                  className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-ink px-6 py-5 text-xl font-extrabold text-white transition-colors hover:bg-ink-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
                >
                  {isFree ? "Subscribe for more scripts" : "See Agency & Academy"} <ArrowRight className="h-6 w-6" />
                </button>
                {cheapest && (
                  <p className="mt-3 text-center text-sm text-pencil">
                    From <span className="font-bold text-ink">{formatXaf(cheapest.amount)}</span> for {cheapest.days} days · MTN MoMo or Orange Money
                  </p>
                )}
                <button type="button" onClick={onClose} className="sk-btn-ghost mt-2 w-full justify-center py-2.5 text-sm">
                  Maybe later
                </button>
              </>
            ) : (
              <>
                <p className="mt-6 text-base text-pencil">Your plan&apos;s daily limit keeps the service fast for everyone. Your scripts and history are safe.</p>
                <button type="button" onClick={onClose} className="sk-btn-ink mt-5 w-full justify-center py-3.5 text-base">
                  Got it
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 pr-8">
              {info.code !== "UPGRADE" && (
                <button type="button" onClick={() => setStep("limit")} className="rounded-lg p-1.5 text-pencil hover:bg-paper-deep hover:text-ink" aria-label="Back">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <span className="sk-pill text-[11px]">Subscribe</span>
            </div>
            <h2 id="upgrade-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Choose your <span className="hl-yellow">plan</span>
            </h2>
            <p className="mt-2 text-sm text-pencil">
              {info.freePerDay === undefined || info.freePerDay === 1 ? "Free accounts get one script a day." : `Free accounts get ${info.freePerDay} scripts a day.`}{" "}
              Pay once, no automatic renewal.
            </p>
            <div className="mt-7 sm:mt-8">
              <PlanCards plans={offer} currentPlan={info.currentPlan} onChoose={choose} compact />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3">
              <PaymentMethods compact className="w-full max-w-xs" />
              <p className="flex items-center gap-1.5 text-center text-xs text-pencil">
                <Lock className="h-3 w-3" /> Secure payment by Fapshi. You&apos;ll confirm on your phone.
              </p>
              {info.testMode && <TestModeBadge />}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
