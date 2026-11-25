import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { isThemeId } from "@/lib/theme/themes";

/** GET / POST { theme }: the signed-in user's site theme, so it follows them to other devices. */
export async function GET() {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const db = await createClient();
  const { data, error } = await db.from("profiles").select("ui_theme").eq("id", gate.account.userId).maybeSingle();
  if (error) return NextResponse.json({ theme: null });
  return NextResponse.json({ theme: (data as any)?.ui_theme ?? null });
}

export async function POST(request: NextRequest) {
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  const body = await request.json().catch(() => ({}));
  if (!isThemeId(body?.theme)) return NextResponse.json({ error: "Unknown theme." }, { status: 400 });
  const db = await createClient();
  const { error } = await db.from("profiles").update({ ui_theme: body.theme }).eq("id", gate.account.userId);
  if (error) {
    console.error("[preferences] theme:", error.message);
    return NextResponse.json({ error: "Saved on this device only." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
