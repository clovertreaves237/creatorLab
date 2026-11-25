import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireRole } from "@/lib/auth/roles";
import { createServiceClient } from "@/lib/supabase/service";
import { FapshiError, initiatePay, isFapshiTestMode } from "@/lib/payments/fapshi";
import { loadBillingSettings } from "@/lib/payments/server";
import { priceFor } from "@/lib/payments/logic";

export const dynamic = "force-dynamic";

/** Public base URL for Fapshi's redirect back to CreatorLab. */
function appBaseUrl(request: NextRequest): string {
  const configured = (process.env.NEXT_PUBLIC_APP_URL || "").trim().replace(/\/+$/, "");
  if (/^https?:\/\//.test(configured)) return configured;
  return request.nextUrl.origin;
}

/**
 * POST /api/payments/checkout { product: "pro_pass" }
 * Creates a pending payment (server-side price), asks Fapshi for a hosted payment link and returns it.
 */
export async function POST(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const { account } = gate;
  if (!account.emailVerified) {
    return NextResponse.json({ error: "Please confirm your email address before subscribing." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));

  let db;
  try {
    db = createServiceClient();
  } catch (err: any) {
    console.error("[payments/checkout]", err?.message);
    return NextResponse.json({ error: "Payments are not available right now. Please try again later." }, { status: 503 });
  }

  const settings = await loadBillingSettings(db);
  const price = priceFor(body?.product, settings);
  if (!price) return NextResponse.json({ error: "Unknown plan." }, { status: 400 });

  // Stop accidental double clicks from opening many payments.
  const { count: recentPending } = await db
    .from("payments")
    .select("id", { count: "exact", head: true })
    .eq("user_id", account.userId)
    .eq("status", "pending")
    .gte("created_at", new Date(Date.now() - 60 * 1000).toISOString());
  if ((recentPending ?? 0) >= 3) {
    return NextResponse.json({ error: "Please wait a minute before starting another payment." }, { status: 429 });
  }

  const externalId = randomUUID();
  const testMode = isFapshiTestMode();
  const { data: payment, error: insertError } = await db
    .from("payments")
    .insert({
      user_id: account.userId,
      product: price.product,
      amount: price.amount,
      currency: "XAF",
      days: price.days,
      status: "pending",
      external_id: externalId,
      test_mode: testMode,
    })
    .select("id")
    .single();
  if (insertError || !payment) {
    console.error("[payments/checkout] insert failed:", insertError?.message);
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
  }

  try {
    const { link, transId } = await initiatePay({
      amount: price.amount,
      userId: account.userId,
      externalId,
      email: account.email || null,
      redirectUrl: `${appBaseUrl(request)}/billing/return?ref=${externalId}`,
      message: `CreatorLab Pro for ${price.days} days`,
    });

    const { error: saveError } = await db
      .from("payments")
      .update({ fapshi_trans_id: transId, provider_status: "CREATED", updated_at: new Date().toISOString() })
      .eq("id", payment.id);
    if (saveError) {
      console.error("[payments/checkout] could not save transId:", saveError.message);
      return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ url: link, ref: externalId, testMode });
  } catch (err: any) {
    await db
      .from("payments")
      .update({ status: "failed", provider_status: "INITIATE_FAILED", updated_at: new Date().toISOString() })
      .eq("id", payment.id);
    const message = err instanceof FapshiError ? err.message : "Could not reach the payment service.";
    console.error("[payments/checkout] initiate-pay failed:", message);
    return NextResponse.json({ error: "The payment page could not be opened. Please try again in a moment." }, { status: 502 });
  }
}
