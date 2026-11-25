import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

/**
 * FR-44: Curators shall be able to add and edit creators in their niche,
 * record the criteria checked, and set the curated-by and curated-on fields.
 * FR-50: The system shall keep an audit log of every curator and admin change.
 */
export async function GET(request: NextRequest) {
  try {
    const gate = await requireRole("curator");
    if ("response" in gate) return gate.response;
    const db = await createClient(); // signed-in curator session: database rules check the role
    const { searchParams } = new URL(request.url);
    const nicheId = searchParams.get("niche") || "branding-marketing";

    const { data: creators, error } = await db
      .from("creators")
      .select("*")
      .eq("niche_id", nicheId)
      .order("curated_on", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ creators });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const gate = await requireRole("curator");
    if ("response" in gate) return gate.response;
    const supabase = await createClient();
    const db = await createClient(); // signed-in curator session: database rules check the role
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const {
      id,
      niche_id,
      platform,
      display_name,
      handle,
      profile_url,
      followers,
      criteria_checked,
      curated_by,
      curated_on,
    } = body;

    if (!niche_id || !display_name || !handle || !platform) {
      return NextResponse.json(
        { error: "Niche, platform, display name, and handle are required." },
        { status: 400 }
      );
    }

    const creatorPayload = {
      niche_id,
      platform: platform === "tiktok" ? "tiktok" : "youtube",
      display_name: display_name.trim(),
      handle: handle.trim(),
      profile_url: profile_url?.trim() || `https://${platform}.com/@${handle}`,
      followers: followers ? Number(followers) : 0,
      followers_checked_on: new Date().toISOString(),
      criteria_checked: Array.isArray(criteria_checked) ? criteria_checked : [],
      curated_by: curated_by?.trim() || user?.email || "Curator",
      curated_on: curated_on || new Date().toISOString().split("T")[0],
      active: true,
      // YouTube channel id (from the source-list template), used by the refresh to find new uploads
      ...(typeof body.channel_id === "string" && /^UC[A-Za-z0-9_-]{22}$/.test(body.channel_id) ? { channel_id: body.channel_id } : {}),
    };

    let resultData;
    let actionType = "add_creator";

    if (id) {
      // Edit existing creator
      actionType = "edit_creator";
      const { data, error } = await db
        .from("creators")
        .update(creatorPayload)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      resultData = data;
    } else {
      // Add new creator
      const { data, error } = await db
        .from("creators")
        .insert(creatorPayload)
        .select()
        .single();

      if (error) throw error;
      resultData = data;
    }

    // FR-50: Keep an audit log of every curator change (who, what, when; kept for 1 year)
    try {
      await db.from("audit_log").insert({
        actor_id: user?.id || null,
        action: actionType,
        target: resultData?.id || display_name,
        details: {
          display_name,
          platform,
          niche_id,
          curated_by: creatorPayload.curated_by,
          criteria_count: creatorPayload.criteria_checked.length,
        },
      });
    } catch (auditErr) {
      console.warn("Audit log insert failed:", auditErr);
    }

    return NextResponse.json({ success: true, creator: resultData });
  } catch (err: any) {
    console.error("Curator creators API error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to save creator data." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/curator/creators?id=<uuid>
 * Removes a creator from the lists (soft delete: active = false, so it can be restored and the
 * history stays intact). Logged to the audit log for curator activity reports (FR-50).
 */
export async function DELETE(request: NextRequest) {
  try {
    const gate = await requireRole("curator");
    if ("response" in gate) return gate.response;
    const db = await createClient();
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Creator id is required." }, { status: 400 });

    const { data, error } = await db
      .from("creators")
      .update({ active: false })
      .eq("id", id)
      .select("id, display_name, platform, niche_id")
      .single();
    if (error) throw error;

    await db.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "remove_creator",
      target: id,
      details: { display_name: data?.display_name, platform: data?.platform, niche_id: data?.niche_id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Curator creators DELETE error:", err);
    return NextResponse.json({ error: err?.message || "Failed to remove creator." }, { status: 500 });
  }
}

/** PATCH /api/curator/creators?id=... : restores a removed creator (active = true). Audited. */
export async function PATCH(request: NextRequest) {
  try {
    const gate = await requireRole("curator");
    if ("response" in gate) return gate.response;
    const db = await createClient();
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Creator id is required." }, { status: 400 });

    const { data, error } = await db
      .from("creators")
      .update({ active: true })
      .eq("id", id)
      .select("id, display_name, platform, niche_id")
      .single();
    if (error) throw error;

    await db.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "restore_creator",
      target: id,
      details: { display_name: data?.display_name, platform: data?.platform, niche_id: data?.niche_id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Curator creators PATCH error:", err);
    return NextResponse.json({ error: err?.message || "Failed to restore creator." }, { status: 500 });
  }
}
