import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * Favourite creators, stored per account (table favorite_creators).
 * GET                         -> { favorites: [{ id, display_name, handle, profile_url, platform, niche_id }] }
 * POST { creator_id }         -> toggles; { favorited: boolean }
 * POST { import_handles: [] } -> one-time move of favourites that were kept in the browser
 * DELETE ?creator_id=...      -> removes
 */
const SELECT = "creator_id, created_at, creators(id, display_name, handle, profile_url, platform, niche_id, active)";

export async function GET() {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const { data, error } = await db.from("favorite_creators").select(SELECT).eq("user_id", gate.account.userId).order("created_at", { ascending: false });
  if (error) {
    console.error("[favorites] GET:", error.message);
    return NextResponse.json({ favorites: [], error: "Favourites are not available yet." }, { status: 200 });
  }
  const favorites = (data || []).map((r: any) => r.creators).filter((c: any) => c && c.active);
  return NextResponse.json({ favorites });
}

export async function POST(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const userId = gate.account.userId;
  const body = await request.json().catch(() => ({}));

  if (Array.isArray(body?.import_handles)) {
    const handles = body.import_handles.filter((h: unknown) => typeof h === "string").slice(0, 200).map((h: string) => h.trim());
    if (handles.length === 0) return NextResponse.json({ imported: 0 });
    const { data: creators } = await db.from("creators").select("id, handle").eq("active", true).in("handle", handles);
    const rows = (creators || []).map((c: any) => ({ user_id: userId, creator_id: c.id }));
    if (rows.length) await db.from("favorite_creators").upsert(rows, { onConflict: "user_id,creator_id", ignoreDuplicates: true });
    return NextResponse.json({ imported: rows.length });
  }

  const creatorId = typeof body?.creator_id === "string" ? body.creator_id : "";
  if (!creatorId) return NextResponse.json({ error: "creator_id is required." }, { status: 400 });

  const { data: existing } = await db.from("favorite_creators").select("creator_id").eq("user_id", userId).eq("creator_id", creatorId).maybeSingle();
  if (existing) {
    const { error } = await db.from("favorite_creators").delete().eq("user_id", userId).eq("creator_id", creatorId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ favorited: false });
  }
  const { error } = await db.from("favorite_creators").insert({ user_id: userId, creator_id: creatorId });
  if (error) {
    console.error("[favorites] POST:", error.message);
    return NextResponse.json({ error: "Could not save this favourite." }, { status: 500 });
  }
  return NextResponse.json({ favorited: true });
}

export async function DELETE(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const creatorId = new URL(request.url).searchParams.get("creator_id");
  if (!creatorId) return NextResponse.json({ error: "creator_id is required." }, { status: 400 });
  const { error } = await db.from("favorite_creators").delete().eq("user_id", gate.account.userId).eq("creator_id", creatorId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
