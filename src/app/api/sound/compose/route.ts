import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { getNicheById, isLiveNiche } from "@/lib/constants/niches";
import { composeSoundPlan, SoundComposeError } from "@/lib/sound/compose";

/**
 * POST /api/sound/compose
 * Only called when the user presses "Yes, make a sound" under a finished script.
 * Returns a composition plan (JSON); the browser renders it to audio with Tone.js. No audio is stored.
 */

// Simple per-user limit to protect the Gemini quota (per server instance)
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const recent = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const userId = gate.account.userId;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const nicheId = typeof body?.niche_id === "string" ? body.niche_id : "";
  const script = typeof body?.script === "string" ? body.script.trim() : "";
  const duration = Math.round(Number(body?.duration));
  const variation = Number.isFinite(Number(body?.variation)) ? Math.abs(Math.round(Number(body.variation))) % 1000 : 0;
  const preference = typeof body?.preference === "string" ? body.preference.trim().slice(0, 400) : "";
  const avoidRecipeId = typeof body?.avoid_recipe_id === "string" && /^[A-Z]{2}-\d{4}$/.test(body.avoid_recipe_id) ? body.avoid_recipe_id : undefined;

  const niche = getNicheById(nicheId);
  if (!niche || !isLiveNiche(nicheId)) {
    return NextResponse.json({ error: "Pick one of your live niches first." }, { status: 400 });
  }
  if (script.length < 40) {
    return NextResponse.json({ error: "Write a script first, then ask for a sound." }, { status: 400 });
  }
  if (!Number.isFinite(duration) || duration < 10 || duration > 180) {
    return NextResponse.json({ error: "The sound length must be between 10 and 180 seconds." }, { status: 400 });
  }

  const now = Date.now();
  const times = (recent.get(userId) || []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) {
    return NextResponse.json({ error: "You have made a lot of sounds this hour. Try again a little later." }, { status: 429 });
  }
  times.push(now);
  recent.set(userId, times);

  try {
    const { plan } = await composeSoundPlan({ nicheId, nicheName: niche.name, script, duration, variation, avoidRecipeId, preference });
    return NextResponse.json({ plan });
  } catch (e: any) {
    const status = e instanceof SoundComposeError ? e.status : 500;
    if (!(e instanceof SoundComposeError)) console.error("[sound] unexpected error:", e);
    return NextResponse.json({ error: e instanceof SoundComposeError ? e.message : "Something went wrong making the sound." }, { status });
  }
}
