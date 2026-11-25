import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { hasRole } from "@/lib/auth/roles";
import { getPaymentStatus } from "./fapshi";
import {
  DAY_MS,
  activePlan,
  freeAllowance,
  parseBillingSettings,
  reconcilePayment,
  type BillingSettings,
  type FreeAllowance,
  type PlanId,
  type PaymentRecord,
  type ReconcileResult,
} from "./logic";

const SETTING_KEYS = ["free_scripts_per_day", "pro_days", "daily_script_limit", "plan_creator_price_xaf", "plan_agency_price_xaf", "plan_agency_daily_scripts"];

/** Server-side price list and limits (admin-editable in app_settings). */
export async function loadBillingSettings(db?: SupabaseClient): Promise<BillingSettings> {
  try {
    const client = db || (await createClient());
    const { data } = await client.from("app_settings").select("key, value").in("key", SETTING_KEYS);
    return parseBillingSettings(data as any);
  } catch {
    return parseBillingSettings([]);
  }
}

export interface Allowance {
  plan: PlanId | "staff";
  /** End of the active paid plan (ISO), or null. */
  planUntil: string | null;
  free: FreeAllowance;
  dailyLimit: number; // paid plan / staff cap per calendar day (0 = none)
  usedToday: number;
  /** Set when the user cannot generate right now. */
  blocked: null | { code: "FREE_LIMIT_REACHED" | "DAILY_LIMIT_REACHED"; message: string; nextAt: string | null };
  settings: BillingSettings;
}

/**
 * What this user may generate right now.
 *   free  -> free_scripts_per_day per rolling 24h (counted from script_requests, which users cannot delete)
 *   creator -> subscriptions.pro_until in the future, capped by daily_script_limit per day
 *   agency  -> subscriptions.agency_until in the future, capped by plan_agency_daily_scripts per day
 *   staff   -> curators and admins (admins have no cap)
 */
export async function getAllowance(userId: string, role: string | null | undefined): Promise<Allowance> {
  const supabase = await createClient();
  const settings = await loadBillingSettings(supabase);
  const now = new Date();

  const [{ data: sub }, { data: recent }] = await Promise.all([
    readSubscription(supabase, userId),
    supabase
      .from("script_requests")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", new Date(now.getTime() - DAY_MS).toISOString())
      .order("created_at", { ascending: true })
      .limit(1000),
  ]);

  const stamps = ((recent as any[]) || []).map((r) => String(r.created_at));
  const free = freeAllowance(stamps, settings.freeScriptsPerDay, now);
  const paid = activePlan(sub, now);
  const plan: Allowance["plan"] = hasRole(role, "curator") ? "staff" : paid.plan;
  const dailyLimit = plan === "agency" ? settings.agencyDailyScripts : settings.dailyScriptLimit;

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const usedToday = stamps.filter((t) => new Date(t).getTime() >= startOfToday.getTime()).length;

  let blocked: Allowance["blocked"] = null;
  if (plan === "free" && free.remaining <= 0) {
    blocked = {
      code: "FREE_LIMIT_REACHED",
      message: "You've used your free script for today.",
      nextAt: free.nextAt,
    };
  } else if (plan !== "free" && !hasRole(role, "admin") && dailyLimit > 0 && usedToday >= dailyLimit) {
    const tomorrow = new Date(startOfToday.getTime() + DAY_MS).toISOString();
    blocked = {
      code: "DAILY_LIMIT_REACHED",
      message: `You have written all ${dailyLimit} scripts for today. Your limit resets at midnight.`,
      nextAt: tomorrow,
    };
  }

  return { plan, planUntil: paid.until, free, dailyLimit, usedToday, blocked, settings };
}

/** The user's subscription row (works before and after migration 6 adds agency_until). */
export async function readSubscription(db: SupabaseClient, userId: string): Promise<{ data: { pro_until: string | null; agency_until: string | null } | null }> {
  const full = await db.from("subscriptions").select("pro_until, agency_until").eq("user_id", userId).maybeSingle();
  if (!full.error) return { data: (full.data as any) ?? null };
  const basic = await db.from("subscriptions").select("pro_until").eq("user_id", userId).maybeSingle();
  return { data: basic.data ? { pro_until: (basic.data as any).pro_until ?? null, agency_until: null } : null };
}

/** Light plan lookup (no usage counting), e.g. for per-plan rate limits. */
export async function getPlan(userId: string, role: string | null | undefined): Promise<{ plan: PlanId | "staff"; settings: BillingSettings }> {
  const supabase = await createClient();
  const [settings, { data: sub }] = await Promise.all([loadBillingSettings(supabase), readSubscription(supabase, userId)]);
  const plan = hasRole(role, "curator") ? "staff" : activePlan(sub).plan;
  return { plan, settings };
}

/** Payment columns the reconciliation needs. */
export const PAYMENT_COLUMNS =
  "id, user_id, product, amount, currency, days, status, external_id, fapshi_trans_id, provider_status, provider_medium, test_mode, last_checked_at, granted_at, created_at, updated_at";

/** Asks Fapshi for the real status of a payment and records it (granting Pro once if it succeeded). */
export async function reconcileWithFapshi(payment: PaymentRecord): Promise<ReconcileResult> {
  const db = createServiceClient();
  await db.from("payments").update({ last_checked_at: new Date().toISOString() }).eq("id", payment.id);
  return reconcilePayment(payment, {
    fetchStatus: (transId) => getPaymentStatus(transId),
    grant: async (paymentId, transId, amount, providerStatus, medium) => {
      const { data, error } = await db.rpc("grant_pro_for_payment", {
        p_payment_id: paymentId,
        p_trans_id: transId,
        p_amount: amount,
        p_provider_status: providerStatus,
        p_medium: medium,
      });
      if (error) throw new Error(`Could not record the payment: ${error.message}`);
      return String(data);
    },
    update: async (paymentId, fields) => {
      const { error } = await db
        .from("payments")
        .update({ ...fields, updated_at: new Date().toISOString() })
        .eq("id", paymentId)
        .is("granted_at", null); // never touch a granted payment
      if (error) throw new Error(`Could not update the payment: ${error.message}`);
    },
  });
}
