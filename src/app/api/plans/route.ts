import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { loadBillingSettings } from "@/lib/payments/server";
import { parseBillingSettings, planCatalog } from "@/lib/payments/logic";

export const dynamic = "force-dynamic";

/** GET /api/plans (public): the free allowance and the two paid plans for the pricing section. Prices come from settings. */
export async function GET() {
  let settings = parseBillingSettings([]);
  try {
    settings = await loadBillingSettings(createServiceClient());
  } catch {
    // service key not configured yet: show the default prices
  }
  return NextResponse.json(
    { freeScriptsPerDay: settings.freeScriptsPerDay, freeSoundsPerHour: settings.freeSoundsPerHour, plans: planCatalog(settings) },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } }
  );
}
