import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * The signed-in creator's own script history. Nobody else (admins included) can read it:
 * every query is limited to auth.uid() by Row Level Security and by the user_id filter below.
 *
 * GET    ?niche=&q=     -> { scripts }
 * PATCH  { id, script } -> saves the creator's edited version
 * DELETE ?id=           -> removes one script from the history
 */
export async function GET(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const sp = new URL(request.url).searchParams;
  let query = db
    .from("generated_scripts")
    .select("id, niche_id, topic, script, hook, total_spoken_seconds, word_count, created_at, updated_at")
    .eq("user_id", gate.account.userId)
    .order("created_at", { ascending: false })
    .limit(1000);
  const niche = sp.get("niche");
  if (niche) query = query.eq("niche_id", niche);
  const q = (sp.get("q") || "").trim();
  if (q) query = query.ilike("topic", `%${q.replace(/[%_]/g, "")}%`);
  const { data, error } = await query;
  if (error) {
    console.error("[history] GET:", error.message);
    return NextResponse.json({ scripts: [], error: "Your history could not be loaded." }, { status: 200 });
  }
  return NextResponse.json({ scripts: data || [] });
}

export async function PATCH(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const body = await request.json().catch(() => ({}));
  const id = typeof body?.id === "string" ? body.id : "";
  const script = typeof body?.script === "string" ? body.script.trim() : "";
  if (!id || script.length < 20 || script.length > 20000) {
    return NextResponse.json({ error: "Nothing to save." }, { status: 400 });
  }
  const words = script.split(/\s+/).filter(Boolean).length;
  const { error } = await db
    .from("generated_scripts")
    .update({ script, word_count: words, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", gate.account.userId);
  if (error) {
    console.error("[history] PATCH:", error.message);
    return NextResponse.json({ error: "Your changes could not be saved." }, { status: 500 });
  }
  return NextResponse.json({ success: true, word_count: words });
}

export async function DELETE(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Script id is required." }, { status: 400 });
  const { error } = await db.from("generated_scripts").delete().eq("id", id).eq("user_id", gate.account.userId);
  if (error) {
    console.error("[history] DELETE:", error.message);
    return NextResponse.json({ error: "Could not delete this script." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
