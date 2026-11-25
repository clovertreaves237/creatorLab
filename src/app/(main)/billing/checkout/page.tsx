"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Copy, Loader2, Lock } from "lucide-react";
import type { PlanInfo } from "@/lib/payments/logic";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { Logo } from "@/components/brand/Logo";
import { MtnMark, OrangeMark, PaymentMethods } from "@/components/billing/PaymentMarks";
import { TestModeBadge } from "@/components/billing/UpgradeModal";
import { formatXaf, useCheckout } from "@/components/billing/useCheckout";

/** Fapshi sandbox numbers (docs.fapshi.com → Environment). Shown only in test mode. */
const TEST_NUMBERS = {
  success: [
    { operator: "MTN", number: "670000000" },
    { operator: "Orange", number: "690000000" },
  ],
  failure: [
    { operator: "MTN", number: "670000001" },
    { operator: "Orange", number: "690000001" },
  ],
};

function CopyNumber({ operator, number, tone }: { operator: "MTN" | "Orange"; number: string; tone: "success" | "failure" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      const t = document.createElement("textarea");
      t.value = number;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className={`flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 py-2.5 ${tone === "failure" ? "opacity-80" : ""}`}>
      {operator === "MTN" ? <MtnMark className="h-7 w-auto shrink-0" /> : <OrangeMark className="h-7 w-7 shrink-0" />}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-pencil">{operator === "MTN" ? "MTN MoMo" : "Orange Money"}</p>
        <p className="text-xl font-extrabold tabular-nums tracking-wide text-ink">{number}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-ink px-3 py-2 text-sm font-bold transition-colors ${copied ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper-deep"}`}
        aria-label={`Copy ${number}`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function CheckoutContent() {
  const planId = useSearchParams().get("plan");
  const [data, setData] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { startCheckout, starting, error } = useCheckout();
  const [extendAnyway, setExtendAnyway] = useState(false);

  useEffect(() => {
    const load = () =>
      fetch("/api/billing", { cache: "no-store" })
        .then(async (r) => {
          const json = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(json.error || "Could not load the plans.");
          setData(json);
        })
        .catch((e) => setLoadError(e.message));
    load();
    // Back from Fapshi (bfcache) or back to the tab: re-check, so a finished payment is never offered again
    const onShow = (e: PageTransitionEvent) => e.persisted && load();
    const onVisible = () => document.visibilityState === "visible" && load();
    window.addEventListener("pageshow", onShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (loadError) return <p className="mx-auto max-w-lg px-4 py-24 text-center text-sm text-red-700">{loadError}</p>;
  if (!data) return <div className="py-24"><MobiusLoader size="md" label="Preparing your checkout" /></div>;

  const plan: PlanInfo | undefined = (data.plans as PlanInfo[]).find((p) => p.id === planId);
  if (!plan) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-sm text-pencil">Choose a plan first.</p>
        <Link href="/billing" className="sk-btn-ink mt-5">See the plans</Link>
      </div>
    );
  }
  const extending = data.plan === plan.id;
  const coveredByAgency = data.plan === "agency" && plan.id === "creator";
  const untilText = data.planUntil
    ? new Date(data.planUntil).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
    : "";

  // Already on this plan (or on Agency & Academy, which includes Creator): do not ask to pay again by default.
  if ((extending && !extendAnyway) || coveredByAgency) {
    const current = coveredByAgency ? "Agency & Academy" : plan.name;
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-14 sm:py-20">
        <div className="sk-card bg-white p-6 text-center sm:p-9">
          <Check className="mx-auto h-12 w-12 text-score" strokeWidth={2.5} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
            You&apos;re already on <span className="hl-mint">{current}</span>
          </h1>
          {untilText && <p className="mt-3 text-base text-pencil">Active until {untilText}.</p>}
          {coveredByAgency && <p className="mt-1 text-sm text-pencil">It includes everything in Creator.</p>}
          <Link href="/script-generator" className="sk-btn-ink mt-7 min-h-[52px] w-full justify-center text-base">
            Go to Creator Engine <ArrowRight className="h-4 w-4" />
          </Link>
          {extending && (
            <button type="button" onClick={() => setExtendAnyway(true)} className="sk-btn-ghost mt-3 min-h-[44px] w-full justify-center text-sm">
              Add {plan.days} more days to {plan.name}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/billing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pencil hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All plans
        </Link>
        {data.testMode && <TestModeBadge />}
      </div>

      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
        {extending ? "Extend" : "Subscribe to"} <span className="hl-yellow">{plan.name}</span>
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Order summary */}
        <section className="sk-card bg-white p-6 sm:p-8 lg:col-span-3 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wide text-pencil">Your order</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-5">
            <div>
              <p className="font-serif text-2xl italic text-ink">CreatorLab {plan.name}</p>
              <p className="text-sm text-pencil">{plan.days} days · pay once, no automatic renewal</p>
            </div>
            <p className="text-4xl font-extrabold tracking-tight text-ink">{formatXaf(plan.amount)}</p>
          </div>
          <ul className="mt-5 space-y-2.5 text-[15px] text-ink">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-lg">
            <span className="font-bold text-ink">Total to pay</span>
            <span className="text-2xl font-extrabold text-ink">{formatXaf(plan.amount)}</span>
          </div>
          {extending && data.planUntil && (
            <p className="mt-2 text-sm text-pencil">
              Your plan runs until {new Date(data.planUntil).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}; paying adds {plan.days} days.
            </p>
          )}
        </section>

        {/* Pay */}
        <section className="space-y-5 lg:col-span-2">
          {data.testMode && (
            <div className="rounded-2xl border-2 border-dashed border-ink bg-hl-yellow/40 p-5">
              <p className="text-base font-extrabold text-ink">Test payment: use these numbers</p>
              <p className="mt-1 text-sm text-ink/80">
                Copy a number, then paste it in the phone number field on the Fapshi page. No real money is taken.
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink">Payment succeeds</p>
              <div className="mt-2 space-y-2">
                {TEST_NUMBERS.success.map((n) => (
                  <CopyNumber key={n.number} operator={n.operator as "MTN" | "Orange"} number={n.number} tone="success" />
                ))}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-ink">Test a failed payment</summary>
                <div className="mt-2 space-y-2">
                  {TEST_NUMBERS.failure.map((n) => (
                    <CopyNumber key={n.number} operator={n.operator as "MTN" | "Orange"} number={n.number} tone="failure" />
                  ))}
                </div>
              </details>
            </div>
          )}

          <div className="sk-card bg-white p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-pencil">Pay with</p>
            <PaymentMethods />
            {error && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}
            <button
              type="button"
              onClick={() => startCheckout(plan.product)}
              disabled={starting}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-ink px-6 text-lg font-extrabold text-white transition-colors hover:bg-ink-soft disabled:opacity-70"
            >
              {starting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Opening secure payment…
                </>
              ) : (
                <>
                  Pay {formatXaf(plan.amount)} <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-pencil">
              <Lock className="h-3 w-3" /> Secure payment by Fapshi. You&apos;ll confirm on your phone.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 flex justify-center opacity-70">
        <Logo size="xs" />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-24"><MobiusLoader size="md" label="Preparing your checkout" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
