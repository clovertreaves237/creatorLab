"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { PlanInfo } from "@/lib/payments/logic";
import { formatXaf } from "./useCheckout";

/**
 * The two paid plans side by side. Creator = outlined card, Agency & Academy = solid ink card (the bigger plan).
 * Either calls onChoose (popup) or links to the checkout page (landing, billing).
 */
export function PlanCards({
  plans,
  currentPlan,
  onChoose,
  compact = false,
  ctaPrefix = "Choose",
  gridClassName,
}: {
  plans: PlanInfo[];
  currentPlan?: string | null;
  onChoose?: (plan: PlanInfo) => void;
  compact?: boolean;
  ctaPrefix?: string;
  /** Override the wrapper (e.g. "contents" to place the cards in a parent grid). */
  gridClassName?: string;
}) {
  return (
    <div className={gridClassName ?? `grid gap-5 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2 md:gap-6"}`}>
      {plans.map((p) => {
        const big = p.id === "agency";
        const active = currentPlan === p.id;
        const cta = active ? `Extend ${p.name}` : `${ctaPrefix} ${p.name}`;
        const btnClass = big
          ? "mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-base font-bold text-ink transition-colors hover:bg-hl-yellow"
          : "sk-btn-ink mt-6 w-full justify-center py-3.5 text-base";
        return (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-2xl border-2 border-ink ${big ? "bg-ink text-white" : "bg-white text-ink"} ${compact ? "p-5" : "p-6 sm:p-8"}`}
          >
            {big && (
              <span className="absolute -top-3.5 right-5 rounded-full border-2 border-ink bg-hl-yellow px-3 py-0.5 text-[11px] font-black uppercase tracking-wide text-ink">
                Most scripts
              </span>
            )}
            {active && (
              <span className={`absolute -top-3.5 left-5 rounded-full border-2 border-ink px-3 py-0.5 text-[11px] font-black uppercase tracking-wide ${big ? "bg-white text-ink" : "bg-ink text-white"}`}>
                Your plan
              </span>
            )}
            <p className={`font-serif italic ${compact ? "text-xl" : "text-2xl"}`}>{p.name}</p>
            <p className={`mt-1 text-sm sm:min-h-[2.5rem] ${big ? "text-white/70" : "text-pencil"}`}>{p.audience}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
              <span className={`font-extrabold tracking-tight ${compact ? "text-3xl" : "text-4xl"}`}>{formatXaf(p.amount)}</span>
              <span className={`text-sm ${big ? "text-white/70" : "text-pencil"}`}>/ {p.days} days</span>
            </p>
            <ul className={`mt-5 flex-1 space-y-2.5 ${compact ? "text-sm" : "text-[15px]"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${big ? "text-hl-yellow" : "text-score"}`} strokeWidth={3} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {onChoose ? (
              <button type="button" onClick={() => onChoose(p)} className={btnClass}>
                {cta} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link href={`/billing/checkout?plan=${p.id}`} className={btnClass}>
                {cta} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
