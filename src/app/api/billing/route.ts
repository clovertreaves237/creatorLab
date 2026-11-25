import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { getAllowance } from "@/lib/payments/server";
import { isFapshiTestMode } from "@/lib/payments/fapshi";
import { planCatalog } from "@/lib/payments/logic";

export const dynamic = "force-dynamic";

/** GET /api/billing: the signed-in user's plan, free allowance, the two paid plans (server prices) and their payment history. */
export async function GET() {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;

  try {
    const allowance = await getAllowance(gate.account.userId, gate.account.role);
    const supabase = await createClient();
    const { data: payments } = await supabase
      .from("payments")
      .select("external_id, product, amount, currency, days, status, provider_medium, test_mode, created_at")
      .eq("user_id", gate.account.userId)
      .order("created_at", { ascending: false })
      .limit(20);

    return NextResponse.json({
      plan: allowance.plan,
      planUntil: allowance.planUntil,
      free: allowance.free,
      dailyLimit: allowance.dailyLimit,
      usedToday: allowance.usedToday,
      blocked: allowance.blocked,
      plans: planCatalog(allowance.settings),
      testMode: isFapshiTestMode(),
      payments: payments || [],
    });
  } catch (err: any) {
    console.error("[billing]", err?.message);
    return NextResponse.json({ error: "Could not load your plan." }, { status: 500 });
  }
}
