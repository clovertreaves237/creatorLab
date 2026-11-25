import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/roles";
import { parseYouTubeId, fetchYouTubeVideos, fetchYouTubeOEmbed, youtubeKey } from "@/lib/youtube";

/**
 * GET /api/curator/youtube?url=<any YouTube link>
 * Pulls the original video's title, description, thumbnail, length, publish date and current stats
 * so the curator does not type them by hand.
 */
export async function GET(request: NextRequest) {
  const gate = await requireRole("curator");
  if ("response" in gate) return gate.response;

  const url = new URL(request.url).searchParams.get("url") || "";
  const videoId = parseYouTubeId(url);
  if (!videoId) {
    return NextResponse.json({ error: "That is not a YouTube video link." }, { status: 400 });
  }

  try {
    if (youtubeKey()) {
      const [video] = await fetchYouTubeVideos([videoId]);
      if (!video) return NextResponse.json({ error: "Video not found. It may be private or deleted." }, { status: 404 });
      return NextResponse.json({ video, complete: true });
    }
    const basic = await fetchYouTubeOEmbed(videoId);
    if (!basic) return NextResponse.json({ error: "Video not found. It may be private or deleted." }, { status: 404 });
    return NextResponse.json({
      video: basic,
      complete: false,
      warning: "Title and thumbnail only. Add YOUTUBE_API_KEY to also pull the length, publish date and stats.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Could not reach YouTube." }, { status: 502 });
  }
}
