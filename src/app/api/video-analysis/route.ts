import { NextRequest, NextResponse } from "next/server";
import { analyzeVideoPerformance } from "@/lib/analysis/engine";
import { VideoAnalysisInput } from "@/lib/types/analysis";
import { requireRole } from "@/lib/auth/roles";
import { takeToken } from "@/lib/http/rate-limit";

/**
 * Section 3.6 Video Analysis (FR-38 to FR-43)
 *
 * FR-38: A 'Why this worked' button shall appear on each video card.
 * FR-39: Analysis shall run only when the user clicks the button. It shall not run automatically.
 * FR-40: The analysis input shall be the stored title, a summarized description, the chapter list if present, the duration, and the public stats. For YouTube, the description shall be summarized before it is sent.
 * FR-41: The analysis output shall contain a summary, likely reasons the video performed well (each labeled 'likely'), three suggestions, and a one-line verdict.
 * FR-42: The system shall display the note: 'Interpretation based on public data, not verified by watching the video.'
 * FR-43: The system shall not send any other creator's video file, audio, or transcript to Gemini.
 */
export async function POST(request: NextRequest) {
  // Signed-in users only: each analysis spends the Gemini quota (OWASP A01/A06).
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  if (!takeToken(`analysis:${gate.account.userId}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "You have run a lot of analyses this hour. Please try again a little later." }, { status: 429 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const videoId = typeof body?.videoId === "string" ? body.videoId.slice(0, 64) : "";
    const platform = body?.platform;
    const title = typeof body?.title === "string" ? body.title.slice(0, 300) : "";
    const description = typeof body?.description === "string" ? body.description.slice(0, 3000) : "";
    const duration_seconds = Number.isFinite(Number(body?.duration_seconds)) ? Number(body.duration_seconds) : 0;
    const chapters = Array.isArray(body?.chapters) ? body.chapters.slice(0, 40) : [];
    const stats = body?.stats && typeof body.stats === "object" ? body.stats : {};

    if (!videoId || !title) {
      return NextResponse.json(
        { error: "Video ID and title are required for performance analysis." },
        { status: 400 }
      );
    }

    const input: VideoAnalysisInput = {
      videoId,
      platform: platform === "tiktok" ? "tiktok" : "youtube",
      title: String(title).trim(),
      description: typeof description === "string" ? description : "",
      duration_seconds: Number(duration_seconds) || 60,
      chapters: Array.isArray(chapters) ? chapters : null,
      stats: {
        views: stats?.views ?? null,
        likes: stats?.likes ?? null,
        comments: stats?.comments ?? null,
      },
    };

    // Run analysis on-demand (FR-39, FR-40, FR-43)
    const result = await analyzeVideoPerformance(input);

    return NextResponse.json({
      success: true,
      analysis: result,
    });
  } catch (error: any) {
    console.error("Video analysis route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze video performance." },
      { status: 500 }
    );
  }
}
