"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Loader2, Lock } from "lucide-react";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { PaymentMethods } from "@/components/billing/PaymentMarks";
import { TestModeBadge } from "@/components/billing/UpgradeModal";
import { formatUnlockTime, formatXaf, useCheckout } from "@/components/billing/useCheckout";

const STATUS_LABEL: Record<string, string> = { successful: "Paid", pending: "Pending", failed: "Failed", expired: "Expired" };
const MEDIUM_LABEL: Record<string, string> = { "mobile money": "MTN MoMo", "orange money": "Orange Money", fapshi: "Fapshi" };

export default function BillingPage() {
  const [data, setData] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { startCheckout, starting, error } = useCheckout();

  useEffect(() => {
    fetch("/api/billing", { cache: "no-store" })
      .then(async (r) => {
        const json = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(json.error || "Could not load your plan.");
        setData(json);
      })
      .catch((e) => setLoadError(e.message));
  }, []);

  if (loadError) return <p className="mx-auto max-w-lg px-4 py-24 text-center text-sm text-red-700">{loadError}</p>;
  if (!data) return <div className="py-24"><MobiusLoader size="md" label="Loading your plan" /></div>;

  const isPro = data.plan === "pro";
  const isStaff = data.plan === "staff";
  const nextAt = data.blocked?.nextAt as string | null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="sk-pill">Plan &amp; billing</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            {isPro ? (
              <>
                You&apos;re on <span className="hl-mint">Pro</span>
              </>
            ) : isStaff ? (
              <>
                Team <span className="hl-sky">account</span>
              </>
            ) : (
              <>
                Free <span className="hl-yellow">plan</span>
              </>
            )}
          </h1>
        </div>
        {data.testMode && <TestModeBadge />}
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {/* Current plan */}
        <section className="sk-card bg-white p-6 md:col-span-2">
          <h2 className="text-xs font-bold uppercase tracking-wide text-pencil">Right now</h2>
          {isPro ? (
            <>
              <p className="mt-3 text-lg font-bold text-ink">Pro until</p>
              <p className="font-serif text-2xl italic text-ink">
                {new Date(data.proUntil).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="mt-3 text-sm text-pencil">
                {data.usedToday} of {data.dailyLimit > 0 ? data.dailyLimit : "unlimited"} scripts used today.
              </p>
            </>
          ) : isStaff ? (
            <p className="mt-3 text-sm text-pencil">Curators and admins write scripts without a free limit.</p>
          ) : (
            <>
              <p className="mt-3 text-3xl font-extrabold text-ink">
                {data.free.remaining}
                <span className="text-base font-semibold text-pencil"> / {data.free.limit} free script{data.free.limit === 1 ? "" : "s"}</span>
              </p>
              <p className="mt-1 text-sm text-pencil">every 24 hours</p>
              {nextAt && (
                <p className="mt-4 flex items-start gap-2 text-sm text-ink">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  Next free script: {formatUnlockTime(nextAt)}
                </p>
              )}
            </>
          )}
        </section>

        {/* Pro offer / extend */}
        {!isStaff && (
          <section className="sk-card bg-white p-6 md:col-span-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-serif text-2xl italic text-ink">CreatorLab Pro</p>
              <p className="text-ink">
                <span className="text-2xl font-extrabold tracking-tight">{formatXaf(data.price.amount)}</span>
                <span className="text-sm text-pencil"> / {data.price.days} days</span>
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                Keep generating scripts{data.dailyLimit > 0 ? `, up to ${data.dailyLimit} a day` : ""}
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                {isPro ? `Paying again adds ${data.price.days} days to your end date` : `Active for ${data.price.days} days from your payment`}
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-score" strokeWidth={3} />
                Pay once. No automatic renewal
              </li>
            </ul>

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-pencil">Pay with</p>
            <PaymentMethods />

            {error && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}

            <button type="button" onClick={startCheckout} disabled={starting} className="sk-btn-ink mt-5 w-full justify-center py-3.5 text-base">
              {starting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Opening secure payment…
                </>
              ) : (
                <>
                  {isPro ? "Extend Pro" : "Subscribe"} · {formatXaf(data.price.amount)} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-pencil">
              <Lock className="h-3 w-3" /> Secure payment by Fapshi. You&apos;ll confirm on your phone.
            </p>
            {data.testMode && (
              <p className="mt-2 text-center text-[11px] leading-relaxed text-pencil">
                Test numbers: <span className="font-bold text-ink">670000000</span> (MTN) or <span className="font-bold text-ink">690000000</span> (Orange)
                succeed; 670000001 / 690000001 fail.
              </p>
            )}
          </section>
        )}
      </div>

      {/* History */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-bold text-ink">Payments</h2>
        {data.payments.length === 0 ? (
          <p className="sk-card-flat px-4 py-6 text-center text-sm text-pencil">No payments yet.</p>
        ) : (
          <ul className="sk-card-flat divide-y divide-line">
            {data.payments.map((p: any) => (
              <li key={p.external_id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">
                    Pro · {p.days} days{p.test_mode ? <span className="ml-2 text-[10px] font-bold uppercase text-pencil">test</span> : null}
                  </p>
                  <p className="text-xs text-pencil">
                    {new Date(p.created_at).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    {p.provider_medium ? ` · ${MEDIUM_LABEL[p.provider_medium] || p.provider_medium}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold tabular-nums text-ink">{formatXaf(p.amount)}</span>
                  {p.status === "pending" ? (
                    <Link href={`/billing/return?ref=${p.external_id}`} className="rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold text-ink hover:bg-paper-deep">
                      Pending · check
                    </Link>
                  ) : (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        p.status === "successful" ? "bg-ink text-white" : "border border-line text-pencil"
                      }`}
                    >
                      {STATUS_LABEL[p.status] || p.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
