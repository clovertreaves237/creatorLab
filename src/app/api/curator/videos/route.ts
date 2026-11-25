import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { parseYouTubeId, fetchYouTubeVideos, youtubeKey } from "@/lib/youtube";

/**
 * FR-45: Curators shall be able to enter video data: title, description, publish date, URL, views, likes, comments, and check date.
 * FR-48: Each refresh shall insert a new snapshot row per video. Existing snapshot rows shall not be overwritten.
 * FR-50: Audit log recording who, what, and when.
 */
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
      video_id,
      creator_id,
      platform,
      title,
      description,
      publish_date,
      video_url,
      views,
      likes,
      comments,
      check_date,
    } = body;

    if (!video_id || !creator_id || !title || !video_url) {
      return NextResponse.json(
        { error: "Video ID, creator ID, title, and URL are required." },
        { status: 400 }
      );
    }

    const isTikTok = platform === "tiktok";

    // The video must be on the same platform as its creator
    const { data: owner } = await db.from("creators").select("platform, display_name").eq("id", creator_id).maybeSingle();
    if (!owner) return NextResponse.json({ error: "That creator was not found." }, { status: 400 });
    if (owner.platform !== (isTikTok ? "tiktok" : "youtube")) {
      return NextResponse.json(
        { error: `${owner.display_name} is a ${owner.platform === "tiktok" ? "TikTok" : "YouTube"} creator, but this is a ${isTikTok ? "TikTok" : "YouTube"} video.` },
        { status: 400 }
      );
    }
    let finalVideoId = String(video_id).trim();
    let durationSecs = Number(body.duration_seconds) || 0;
    let thumbnail = typeof body.thumbnail_url === "string" ? body.thumbnail_url.trim() : "";

    if (thumbnail && !/^https:\/\//.test(thumbnail)) {
      return NextResponse.json({ error: "The thumbnail must be an https:// image address." }, { status: 400 });
    }

    if (!isTikTok) {
      // The id must be the real YouTube id so the video plays inside CreatorLab
      const ytId = parseYouTubeId(String(video_url)) || parseYouTubeId(finalVideoId);
      if (!ytId) return NextResponse.json({ error: "That YouTube link is not valid." }, { status: 400 });
      finalVideoId = ytId;
      if (!thumbnail) thumbnail = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
      if (!durationSecs && youtubeKey()) {
        const [info] = await fetchYouTubeVideos([ytId]).catch(() => []);
        if (info?.durationSeconds) durationSecs = info.durationSeconds;
      }
    } else if (!thumbnail) {
      return NextResponse.json({ error: "Upload a thumbnail for this TikTok video." }, { status: 400 });
    }

    if (!durationSecs || durationSecs < 1) {
      return NextResponse.json({ error: "Enter the video length in seconds." }, { status: 400 });
    }

    const videoPayload = {
      video_id: finalVideoId,
      creator_id,
      platform: isTikTok ? "tiktok" : "youtube",
      title: String(title).trim(),
      description_summary: description ? String(description).slice(0, 250) : null,
      description_full: description ? String(description) : null,
      published_at: publish_date ? new Date(publish_date).toISOString() : new Date().toISOString(),
      duration_seconds: Math.round(durationSecs),
      thumbnail_url: thumbnail,
      video_url: String(video_url).trim(),
    };

    // Upsert video record
    const { data: videoData, error: videoError } = await db
      .from("videos")
      .upsert(videoPayload)
      .select()
      .single();

    if (videoError) throw videoError;

    // FR-48: Insert a NEW snapshot row (existing snapshot rows are never overwritten)
    const snapshotPayload = {
      video_id: videoPayload.video_id,
      snapshot_at: check_date ? new Date(check_date).toISOString() : new Date().toISOString(),
      views: views !== "" && views !== null && views !== undefined ? Number(views) : null,
      likes: likes !== "" && likes !== null && likes !== undefined ? Number(likes) : null,
      comments: comments !== "" && comments !== null && comments !== undefined ? Number(comments) : null,
    };

    const { data: snapData, error: snapError } = await db
      .from("video_snapshots")
      .insert(snapshotPayload)
      .select()
      .single();

    if (snapError) throw snapError;

    // FR-50: Audit log
    try {
      await db.from("audit_log").insert({
        actor_id: user?.id || null,
        action: "enter_video_data",
        target: videoPayload.video_id,
        details: {
          title: videoPayload.title,
          creator_id,
          views: snapshotPayload.views,
          likes: snapshotPayload.likes,
          comments: snapshotPayload.comments,
        },
      });
    } catch (auditErr) {
      console.warn("Audit log insert failed:", auditErr);
    }

    return NextResponse.json({
      success: true,
      video: videoData,
      snapshot: snapData,
    });
  } catch (err: any) {
    console.error("Curator videos API error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to enter video data." },
      { status: 500 }
    );
  }
}

/** DELETE /api/curator/videos?id=<video_id> : removes a video and its stats from CreatorLab. Audited. */
export async function DELETE(request: NextRequest) {
  try {
    const gate = await requireRole("curator");
    if ("response" in gate) return gate.response;
    const db = await createClient();
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Video id is required." }, { status: 400 });

    const { data: video } = await db.from("videos").select("video_id, title, creator_id, platform").eq("video_id", id).maybeSingle();
    if (!video) return NextResponse.json({ error: "This video is not in CreatorLab." }, { status: 404 });

    const { error } = await db.from("videos").delete().eq("video_id", id);
    if (error) throw error;

    await db.from("audit_log").insert({
      actor_id: gate.account.userId,
      action: "remove_video",
      target: id,
      details: { title: video.title, creator_id: video.creator_id, platform: video.platform },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Curator videos DELETE error:", err);
    return NextResponse.json({ error: err?.message || "Failed to remove video." }, { status: 500 });
  }
}
