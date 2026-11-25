import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { PAYMENT_COLUMNS, reconcileWithFapshi } from "@/lib/payments/server";
import { isFapshiId, safeEqual } from "@/lib/payments/logic";

export const dynamic = "force-dynamic";

/**
 * POST /api/payments/webhook  (called by Fapshi, no user session)
 *
 * Fapshi sends the transaction once (no retries) when it becomes SUCCESSFUL, FAILED or EXPIRED.
 * Security:
 *   1. x-wh-secret must equal FAPSHI_WEBHOOK_SECRET (static shared secret per Fapshi docs; constant-time compare).
 *   2. The body is only a trigger: we read transId, find OUR payment, then ask Fapshi's
 *      GET /payment-status for the real status and check the amount before granting (idempotent).
 */
export async function POST(request: NextRequest) {
  const expected = (process.env.FAPSHI_WEBHOOK_SECRET || "").trim();
  if (expected) {
    const given = request.headers.get("x-wh-secret") || "";
    if (!safeEqual(given, expected)) {
      console.warn("[payments/webhook] rejected: missing or wrong x-wh-secret");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    console.warn("[payments/webhook] FAPSHI_WEBHOOK_SECRET is not set; relying on the status re-check only");
  }

  const body = await request.json().catch(() => null);
  const transId = body?.transId;
  if (!isFapshiId(transId)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const db = createServiceClient();
    const { data: payment } = await db.from("payments").select(PAYMENT_COLUMNS).eq("fapshi_trans_id", transId).maybeSingle();
    if (!payment) {
      // Not one of ours (or created elsewhere on the same Fapshi service): acknowledge and ignore.
      console.warn("[payments/webhook] unknown transaction, ignored");
      return NextResponse.json({ received: true });
    }
    const result = await reconcileWithFapshi(payment as any);
    return NextResponse.json({ received: true, status: result.status });
  } catch (err: any) {
    console.error("[payments/webhook] processing failed:", err?.message);
    // The user's return page re-checks the status, so the payment still completes.
    return NextResponse.json({ received: true, deferred: true });
  }
}
