/**
 * Pure payment/billing logic (no imports, no I/O) so it can be unit tested with plain Node.
 * The server modules (fapshi.ts, server.ts) wire these to Fapshi and Supabase.
 */

export type PaymentStatus = "pending" | "successful" | "failed" | "expired";
export type FapshiStatus = "CREATED" | "PENDING" | "SUCCESSFUL" | "FAILED" | "EXPIRED";

export const PRO_PRODUCT = "pro_pass" as const;
export const DAY_MS = 24 * 60 * 60 * 1000;

/* ------------------------------------------------------------------------------------ */
/* Settings (server-side price list, from app_settings)                                 */
/* ------------------------------------------------------------------------------------ */

export interface BillingSettings {
  freeScriptsPerDay: number; // free accounts, rolling 24 hours
  proPriceXaf: number; // what Fapshi charges for the Pro pass
  proDays: number; // how long one payment keeps Pro active
  dailyScriptLimit: number; // cap for Pro users per calendar day (0 = no cap)
}

export const DEFAULT_BILLING: BillingSettings = { freeScriptsPerDay: 1, proPriceXaf: 1000, proDays: 30, dailyScriptLimit: 20 };

function intInRange(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isInteger(n) && n >= min && n <= max ? n : null;
}

/** Builds the price list from app_settings rows. Anything missing or invalid falls back to the defaults. */
export function parseBillingSettings(rows: { key: string; value: unknown }[] | null | undefined): BillingSettings {
  const map = new Map((rows || []).map((r) => [r.key, r.value]));
  return {
    freeScriptsPerDay: intInRange(map.get("free_scripts_per_day"), 0, 100) ?? DEFAULT_BILLING.freeScriptsPerDay,
    proPriceXaf: intInRange(map.get("pro_price_xaf"), 100, 1_000_000) ?? DEFAULT_BILLING.proPriceXaf,
    proDays: intInRange(map.get("pro_days"), 1, 366) ?? DEFAULT_BILLING.proDays,
    dailyScriptLimit: intInRange(map.get("daily_script_limit"), 0, 1000) ?? DEFAULT_BILLING.dailyScriptLimit,
  };
}

/** The only thing users can buy. The amount always comes from here (server), never from the browser. */
export function priceFor(product: unknown, settings: BillingSettings): { product: typeof PRO_PRODUCT; amount: number; days: number } | null {
  if (product !== PRO_PRODUCT) return null;
  return { product: PRO_PRODUCT, amount: settings.proPriceXaf, days: settings.proDays };
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
