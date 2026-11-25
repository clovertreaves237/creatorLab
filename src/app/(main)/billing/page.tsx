"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import type { PlanInfo } from "@/lib/payments/logic";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { PaymentMethods } from "@/components/billing/PaymentMarks";
import { PlanCards } from "@/components/billing/PlanCards";
import { TestModeBadge } from "@/components/billing/UpgradeModal";
import { formatUnlockTime, formatXaf } from "@/components/billing/useCheckout";

const STATUS_LABEL: Record<string, string> = { successful: "Paid", pending: "Pending", failed: "Failed", expired: "Expired" };
const MEDIUM_LABEL: Record<string, string> = { "mobile money": "MTN MoMo", "orange money": "Orange Money", fapshi: "Fapshi" };
const PRODUCT_LABEL: Record<string, string> = { creator_month: "Creator", agency_month: "Agency & Academy", pro_pass: "Pro" };
const PLAN_LABEL: Record<string, string> = { creator: "Creator", agency: "Agency & Academy" };

export default function BillingPage() {
  const [data, setData] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const paid = data.plan === "creator" || data.plan === "agency";
  const isStaff = data.plan === "staff";
  const nextAt = data.blocked?.nextAt as string | null;
  const plans: PlanInfo[] = data.plans || [];
  const offer = data.plan === "agency" ? plans.filter((p) => p.id === "agency") : plans;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="sk-pill">Plan &amp; billing</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            {paid ? (
              <>
                You&apos;re on <span className="hl-mint">{PLAN_LABEL[data.plan]}</span>
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

      {/* Right now */}
      <section className="sk-card bg-white p-6">
        {paid ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-pencil">Active until</p>
              <p className="font-serif text-2xl italic text-ink">
                {new Date(data.planUntil).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <p className="text-sm text-pencil">
              {data.usedToday} of {data.dailyLimit > 0 ? data.dailyLimit : "unlimited"} scripts used today
            </p>
          </div>
        ) : isStaff ? (
          <p className="text-sm text-pencil">Curators and admins write scripts without the free limit.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-3xl font-extrabold text-ink">
              {data.free.remaining}
              <span className="text-base font-semibold text-pencil"> / {data.free.limit} free script{data.free.limit === 1 ? "" : "s"} every 24 hours</span>
            </p>
            {nextAt && (
              <p className="flex items-center gap-2 text-sm text-ink">
                <Clock className="h-4 w-4 shrink-0" />
                Next free script: {formatUnlockTime(nextAt)}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Plans */}
      {!isStaff && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {data.plan === "agency" ? "Extend your plan" : paid ? "Change or extend your plan" : "Choose a plan"}
          </h2>
          <p className="mt-1 text-sm text-pencil">Pay once with MTN Mobile Money or Orange Money. No automatic renewal.</p>
          <div className="mt-8">
            <PlanCards plans={offer} currentPlan={data.plan} />
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <PaymentMethods compact className="w-full max-w-xs" />
            <p className="flex items-center gap-1.5 text-xs text-pencil">
              <Lock className="h-3 w-3" /> Secure payment by Fapshi
            </p>
          </div>
        </section>
      )}

      {/* History */}
      <section className="mt-12">
        <h2 className="mb-3 text-lg font-bold text-ink">Payments</h2>
        {data.payments.length === 0 ? (
          <p className="sk-card-flat px-4 py-6 text-center text-sm text-pencil">No payments yet.</p>
        ) : (
          <ul className="sk-card-flat divide-y divide-line">
            {data.payments.map((p: any) => (
              <li key={p.external_id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">
                    {PRODUCT_LABEL[p.product] || "Plan"} · {p.days} days
                    {p.test_mode ? <span className="ml-2 text-[10px] font-bold uppercase text-pencil">test</span> : null}
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
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${p.status === "successful" ? "bg-ink text-white" : "border border-line text-pencil"}`}>
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
