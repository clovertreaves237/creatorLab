import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createServiceClient } from "@/lib/supabase/service";
import { PAYMENT_COLUMNS, reconcileWithFapshi } from "@/lib/payments/server";
import { isUuid } from "@/lib/payments/logic";

export const dynamic = "force-dynamic";

/** Fapshi allows 6 status requests per minute per transaction; never ask more often than this. */
const MIN_CHECK_INTERVAL_MS = 10_000;

/**
 * GET /api/payments/status?ref=<external_id>
 * The signed-in user's own payment. While pending, re-checks with Fapshi (throttled) and finalizes it,
 * so payments complete even when the webhook cannot reach the server (e.g. on localhost).
 */
export async function GET(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;

  const ref = request.nextUrl.searchParams.get("ref");
  if (!isUuid(ref)) return NextResponse.json({ error: "Invalid payment reference." }, { status: 400 });

  let db;
  try {
    db = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Payments are not available right now." }, { status: 503 });
  }

  const { data: payment } = await db
    .from("payments")
    .select(PAYMENT_COLUMNS)
    .eq("external_id", ref)
    .eq("user_id", gate.account.userId) // only the owner can see it
    .maybeSingle();
  if (!payment) return NextResponse.json({ error: "Payment not found." }, { status: 404 });

  let status = payment.status as string;
  const lastChecked = payment.last_checked_at ? new Date(payment.last_checked_at).getTime() : 0;
  if (status === "pending" && payment.fapshi_trans_id && Date.now() - lastChecked >= MIN_CHECK_INTERVAL_MS) {
    try {
      const result = await reconcileWithFapshi(payment as any);
      status = result.status;
    } catch (err: any) {
      console.error("[payments/status] check failed:", err?.message);
    }
  }

  const { data: sub } = await db.from("subscriptions").select("pro_until").eq("user_id", gate.account.userId).maybeSingle();

  return NextResponse.json({
    status,
    amount: payment.amount,
    currency: payment.currency,
    days: payment.days,
    testMode: payment.test_mode,
    medium: payment.provider_medium,
    proUntil: status === "successful" ? sub?.pro_until ?? null : null,
    createdAt: payment.created_at,
  });
}
