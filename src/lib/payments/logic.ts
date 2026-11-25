/**
 * Pure payment/billing logic (no imports, no I/O) so it can be unit tested with plain Node.
 * The server modules (fapshi.ts, server.ts) wire these to Fapshi and Supabase.
 */

export type PaymentStatus = "pending" | "successful" | "failed" | "expired";
export type FapshiStatus = "CREATED" | "PENDING" | "SUCCESSFUL" | "FAILED" | "EXPIRED";

export const DAY_MS = 24 * 60 * 60 * 1000;

/* ------------------------------------------------------------------------------------ */
/* Plans and the server-side price list (app_settings, admin-editable)                  */
/* ------------------------------------------------------------------------------------ */

export type PaidPlan = "creator" | "agency";
export type PlanId = "free" | PaidPlan;

/** What is sold. The amount always comes from settings on the server, never from the browser. */
export const PRODUCTS = { creator_month: "creator", agency_month: "agency" } as const;
export type ProductId = keyof typeof PRODUCTS;

export interface BillingSettings {
  freeScriptsPerDay: number; // free accounts, rolling 24 hours
  planDays: number; // how long one payment keeps a plan active
  creatorPriceXaf: number;
  agencyPriceXaf: number;
  dailyScriptLimit: number; // Creator plan (and staff) per calendar day (0 = no cap)
  agencyDailyScripts: number; // Agency & Academy plan per calendar day (0 = no cap)
  freeSoundsPerHour: number;
  creatorSoundsPerHour: number;
  agencySoundsPerHour: number;
}

export const DEFAULT_BILLING: BillingSettings = {
  freeScriptsPerDay: 1,
  planDays: 30,
  creatorPriceXaf: 5000,
  agencyPriceXaf: 50000,
  dailyScriptLimit: 20,
  agencyDailyScripts: 150,
  freeSoundsPerHour: 20,
  creatorSoundsPerHour: 20,
  agencySoundsPerHour: 60,
};

function intInRange(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isInteger(n) && n >= min && n <= max ? n : null;
}

/** Builds the price list from app_settings rows. Anything missing or invalid falls back to the defaults. */
export function parseBillingSettings(rows: { key: string; value: unknown }[] | null | undefined): BillingSettings {
  const map = new Map((rows || []).map((r) => [r.key, r.value]));
  const d = DEFAULT_BILLING;
  const s: BillingSettings = {
    freeScriptsPerDay: intInRange(map.get("free_scripts_per_day"), 0, 100) ?? d.freeScriptsPerDay,
    planDays: intInRange(map.get("pro_days"), 1, 366) ?? d.planDays,
    creatorPriceXaf: intInRange(map.get("plan_creator_price_xaf"), 100, 5_000_000) ?? d.creatorPriceXaf,
    agencyPriceXaf: intInRange(map.get("plan_agency_price_xaf"), 100, 5_000_000) ?? d.agencyPriceXaf,
    dailyScriptLimit: intInRange(map.get("daily_script_limit"), 0, 1000) ?? d.dailyScriptLimit,
    agencyDailyScripts: intInRange(map.get("plan_agency_daily_scripts"), 0, 5000) ?? d.agencyDailyScripts,
    freeSoundsPerHour: d.freeSoundsPerHour,
    creatorSoundsPerHour: d.creatorSoundsPerHour,
    agencySoundsPerHour: d.agencySoundsPerHour,
  };
  // The bigger plan must always give more: never fewer scripts than Creator.
  if (s.dailyScriptLimit > 0 && (s.agencyDailyScripts === 0 ? false : s.agencyDailyScripts <= s.dailyScriptLimit)) {
    s.agencyDailyScripts = s.dailyScriptLimit * 5;
  }
  if (s.dailyScriptLimit === 0) s.agencyDailyScripts = 0; // both unlimited
  return s;
}

export interface PlanInfo {
  id: PaidPlan;
  product: ProductId;
  name: string;
  audience: string;
  amount: number;
  currency: "XAF";
  days: number;
  scriptsPerDay: number; // 0 = no cap
  soundsPerHour: number;
  features: string[];
}

const scriptsLine = (n: number) => (n > 0 ? `Up to ${n} scripts a day` : "Unlimited scripts");

/** The two paid plans, built from the server-side settings. */
export function planCatalog(s: BillingSettings): PlanInfo[] {
  return [
    {
      id: "creator",
      product: "creator_month",
      name: "Creator",
      audience: "For individual creators who post often",
      amount: s.creatorPriceXaf,
      currency: "XAF",
      days: s.planDays,
      scriptsPerDay: s.dailyScriptLimit,
      soundsPerHour: s.creatorSoundsPerHour,
      features: [
        scriptsLine(s.dailyScriptLimit),
        `Up to ${s.creatorSoundsPerHour} background sounds an hour`,
        "All live niches and curated creators",
        "7-day topic search and “Why this worked”",
        "Permanent, private script history",
      ],
    },
    {
      id: "agency",
      product: "agency_month",
      name: "Agency & Academy",
      audience: "For agencies, academies and schools producing for many accounts",
      amount: s.agencyPriceXaf,
      currency: "XAF",
      days: s.planDays,
      scriptsPerDay: s.agencyDailyScripts,
      soundsPerHour: s.agencySoundsPerHour,
      features: [
        s.agencyDailyScripts > 0 && s.dailyScriptLimit > 0
          ? `Up to ${s.agencyDailyScripts} scripts a day (${Math.round(s.agencyDailyScripts / s.dailyScriptLimit)}x Creator)`
          : scriptsLine(s.agencyDailyScripts),
        `Up to ${s.agencySoundsPerHour} background sounds an hour`,
        "Everything in Creator",
        "All live niches and curated creators",
        "Permanent, private script history",
      ],
    },
  ];
}

/** Price lookup for checkout. Unknown products are refused. */
export function priceFor(product: unknown, settings: BillingSettings): { product: ProductId; plan: PaidPlan; amount: number; days: number } | null {
  // Own keys only: "toString" / "__proto__" must not count as products.
  if (typeof product !== "string" || !Object.prototype.hasOwnProperty.call(PRODUCTS, product)) return null;
  const plan = planCatalog(settings).find((p) => p.product === product);
  if (!plan) return null;
  return { product: plan.product, plan: plan.id, amount: plan.amount, days: plan.days };
}

/** Which paid plan is active, from the subscription end dates. Agency wins while both are active. */
export function activePlan(sub: { pro_until?: string | null; agency_until?: string | null } | null | undefined, now: Date = new Date()): {
  plan: PlanId;
  until: string | null;
} {
  const t = now.getTime();
  if (sub?.agency_until && new Date(sub.agency_until).getTime() > t) return { plan: "agency", until: String(sub.agency_until) };
  if (sub?.pro_until && new Date(sub.pro_until).getTime() > t) return { plan: "creator", until: String(sub.pro_until) };
  return { plan: "free", until: null };
}

/* ------------------------------------------------------------------------------------ */
/* Free allowance: N scripts per rolling 24 hours                                       */
/* ------------------------------------------------------------------------------------ */

export interface FreeAllowance {
  limit: number;
  used: number;
  remaining: number;
  /** When the next free script unlocks (ISO), or null while one is available. */
  nextAt: string | null;
}

/** `timestamps` = created_at of the user's recent script requests. The next slot frees up 24h after the oldest one in the window. */
export function freeAllowance(timestamps: string[], limit: number, now: Date = new Date()): FreeAllowance {
  const since = now.getTime() - DAY_MS;
  const inWindow = timestamps
    .map((t) => new Date(t).getTime())
    .filter((t) => Number.isFinite(t) && t > since)
    .sort((a, b) => a - b);
  const used = inWindow.length;
  if (limit <= 0) return { limit, used, remaining: 0, nextAt: used > 0 ? new Date(inWindow[0] + DAY_MS).toISOString() : null };
  if (used < limit) return { limit, used, remaining: limit - used, nextAt: null };
  const freesSlot = inWindow[used - limit];
  return { limit, used, remaining: 0, nextAt: new Date(freesSlot + DAY_MS).toISOString() };
}

/* ------------------------------------------------------------------------------------ */
/* Reconciling a payment with Fapshi (used by the webhook AND the status route)          */
/* ------------------------------------------------------------------------------------ */

export interface PaymentRecord {
  id: string;
  amount: number;
  status: PaymentStatus;
  fapshi_trans_id: string | null;
  granted_at: string | null;
}

export interface FapshiTransactionLite {
  transId: string;
  status: FapshiStatus | string;
  amount: number;
  medium?: string | null;
}

export interface ReconcileDeps {
  /** Authoritative status from Fapshi GET /payment-status/{transId}. */
  fetchStatus(transId: string): Promise<FapshiTransactionLite>;
  /** Calls the database function grant_pro_for_payment (idempotent). */
  grant(paymentId: string, transId: string, amount: number, providerStatus: string, medium: string | null): Promise<string>;
  /** Updates status columns on the payment row. */
  update(paymentId: string, fields: { status?: PaymentStatus; provider_status?: string; provider_medium?: string | null }): Promise<void>;
}

export interface ReconcileResult {
  status: PaymentStatus;
  outcome:
    | "already_granted"
    | "granted"
    | "no_transaction"
    | "still_pending"
    | "failed"
    | "expired"
    | "amount_mismatch"
    | "trans_mismatch"
    | "not_found"
    | "final";
}

/**
 * Never trusts the caller (webhook body / browser): asks Fapshi for the real status,
 * checks the amount against our own record, and only then grants Pro (once).
 */
export async function reconcilePayment(payment: PaymentRecord, deps: ReconcileDeps): Promise<ReconcileResult> {
  if (payment.granted_at || payment.status === "successful") return { status: "successful", outcome: "already_granted" };
  if (!payment.fapshi_trans_id) return { status: payment.status, outcome: "no_transaction" };
  if (payment.status === "failed") return { status: "failed", outcome: "final" };

  const tx = await deps.fetchStatus(payment.fapshi_trans_id);
  const medium = tx.medium ?? null;

  if (tx.transId && tx.transId !== payment.fapshi_trans_id) {
    return { status: payment.status, outcome: "trans_mismatch" };
  }

  switch (tx.status) {
    case "SUCCESSFUL": {
      if (tx.amount !== payment.amount) {
        await deps.update(payment.id, { status: "failed", provider_status: "AMOUNT_MISMATCH", provider_medium: medium });
        return { status: "failed", outcome: "amount_mismatch" };
      }
      const r = await deps.grant(payment.id, payment.fapshi_trans_id, tx.amount, "SUCCESSFUL", medium);
      if (r === "granted" || r === "already_granted") return { status: "successful", outcome: r };
      if (r === "amount_mismatch") return { status: "failed", outcome: "amount_mismatch" };
      return { status: payment.status, outcome: r === "trans_mismatch" ? "trans_mismatch" : "not_found" };
    }
    case "FAILED":
      await deps.update(payment.id, { status: "failed", provider_status: "FAILED", provider_medium: medium });
      return { status: "failed", outcome: "failed" };
    case "EXPIRED":
      await deps.update(payment.id, { status: "expired", provider_status: "EXPIRED", provider_medium: medium });
      return { status: "expired", outcome: "expired" };
    default:
      await deps.update(payment.id, { provider_status: String(tx.status || "PENDING").slice(0, 40), provider_medium: medium });
      return { status: "pending", outcome: "still_pending" };
  }
}

/* ------------------------------------------------------------------------------------ */
/* Small helpers                                                                        */
/* ------------------------------------------------------------------------------------ */

/** Fapshi ids (transId, userId, externalId): 1-100 chars of a-z A-Z 0-9 - _ */
export function isFapshiId(v: unknown): v is string {
  return typeof v === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(v);
}

export function isUuid(v: unknown): v is string {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

/** Constant-time string comparison (for the webhook's x-wh-secret header). */
export function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

/** Test mode = sandbox base URL or a FAK_TEST_ key. */
export function detectTestMode(apiKey: string | undefined, baseUrl: string | undefined): boolean {
  return (apiKey || "").startsWith("FAK_TEST_") || /sandbox\.fapshi\.com/i.test(baseUrl || "");
}
