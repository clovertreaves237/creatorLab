import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { isLiveNiche } from "@/lib/constants/niches";
import { ONBOARDING_OPTIONS } from "@/lib/constants/onboarding";

/**
 * GET  /api/onboarding   current answers (to pre-fill the form)
 * POST /api/onboarding   save answers + niches; marks onboarding complete
 *
 * Personalisation: a user picks one or more LIVE niches (coming-soon niches cannot be chosen yet).
 * Everything they see afterwards follows these niches until they add, change or remove one.
 */
export async function GET() {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const supabase = await createClient();
  const [profile, niches] = await Promise.all([
    supabase.from("profiles")
      .select("username, first_name, last_name, display_name, user_type, experience_level, platforms, goals, country, city, content_language, onboarding_completed_at")
      .eq("id", gate.account.userId).maybeSingle(),
    supabase.from("user_niches").select("niche_id").eq("user_id", gate.account.userId),
  ]);
  return NextResponse.json({
    profile: profile.data || null,
    niches: (niches.data || []).map((n) => n.niche_id),
    migrated: !profile.error,
  });
}

const pick = (value: unknown, allowed: readonly string[]) =>
  typeof value === "string" && allowed.includes(value) ? value : null;
const pickMany = (value: unknown, allowed: readonly string[]) =>
  Array.isArray(value) ? Array.from(new Set(value.filter((v) => typeof v === "string" && allowed.includes(v)))) : [];
const cleanText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) || null : null;

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("user");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const body = await request.json().catch(() => ({}));

    const username = String(body.username || "").trim().toLowerCase();
    if (!/^[a-z0-9_.]{3,30}$/.test(username)) {
      return NextResponse.json(
        { error: "Usernames are 3 to 30 characters: lowercase letters, numbers, _ and . only.", field: "username" },
        { status: 400 }
      );
    }

    const niches = Array.isArray(body.niches)
      ? (Array.from(new Set(body.niches.filter((n: unknown) => typeof n === "string" && isLiveNiche(n)))) as string[])
      : [];
    if (niches.length === 0) {
      return NextResponse.json({ error: "Pick at least one of the live niches.", field: "niches" }, { status: 400 });
    }

    const userType = pick(body.user_type, ONBOARDING_OPTIONS.userType.map((o) => o.value));
    const experience = pick(body.experience_level, ONBOARDING_OPTIONS.experience.map((o) => o.value));
    if (!userType || !experience) {
      return NextResponse.json({ error: "Please answer who you are and your experience level.", field: "user_type" }, { status: 400 });
    }

    const update = {
      username,
      user_type: userType,
      experience_level: experience,
      platforms: pickMany(body.platforms, ONBOARDING_OPTIONS.platforms.map((o) => o.value)),
      goals: pickMany(body.goals, ONBOARDING_OPTIONS.goals.map((o) => o.value)),
      country: cleanText(body.country, 60),
      city: cleanText(body.city, 60),
      content_language: pick(body.content_language, ONBOARDING_OPTIONS.language.map((o) => o.value)),
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase.from("profiles").update(update).eq("id", gate.account.userId);
    if (profileError) {
      if (profileError.code === "23505") {
        return NextResponse.json({ error: "That username is taken. Try another one.", field: "username" }, { status: 409 });
      }
      throw profileError;
    }

    // Replace saved niches with the chosen ones (FR-9, FR-12)
    const { data: existing } = await supabase.from("user_niches").select("niche_id").eq("user_id", gate.account.userId);
    const current = (existing || []).map((n) => n.niche_id);
    const toRemove = current.filter((id) => !niches.includes(id));
    const toAdd = niches.filter((id) => !current.includes(id));
    if (toRemove.length) {
      await supabase.from("user_niches").delete().eq("user_id", gate.account.userId).in("niche_id", toRemove);
    }
    if (toAdd.length) {
      const { error } = await supabase.from("user_niches").insert(toAdd.map((niche_id) => ({ user_id: gate.account.userId, niche_id })));
      if (error) throw error;
    }

    await supabase.from("activity_events").insert({
      user_id: gate.account.userId,
      event_type: "onboarding_completed",
      metadata: { niches, user_type: userType },
    });

    return NextResponse.json({ success: true, niches });
  } catch (err: any) {
    console.error("Onboarding save error:", err);
    return NextResponse.json({ error: err?.message || "Could not save your answers." }, { status: 500 });
  }
}
