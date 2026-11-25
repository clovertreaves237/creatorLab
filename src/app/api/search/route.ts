import { NextRequest, NextResponse } from "next/server";
import { searchTopics } from "@/lib/search/engine";
import { SourceType } from "@/lib/types/search";
import { requireRole } from "@/lib/auth/roles";
import { takeToken } from "@/lib/http/rate-limit";

/**
 * Section 3.4 Topic Search (FR-21 to FR-27)
 *
 * FR-21: The user shall enter a topic on the search page, reachable from a creator's page or from the niche page.
 * FR-22: The system shall return up to 10 results from the last 7 days, most recent first.
 * FR-23: Results shall be grouped by source. Each group shall show the source name and the results that source returns.
 * FR-24: Each result shall show source name, publish date, title, and a short snippet, with a link that opens the original source in a new tab.
 * FR-25: The system shall offer source-type filters (news, blogs, documentaries, newsletters) to narrow results.
 * FR-26: The system shall not store search queries or results. (Ephemeral execution)
 * FR-27: The system shall not display full article text. Snippets only.
 */
export async function GET(request: NextRequest) {
  // Signed-in users only: each search spends the YouTube and Gemini quotas (OWASP A01/A06).
  const gate = await requireRole("user");
  if ("response" in gate) return gate.response;
  if (!takeToken(`search:${gate.account.userId}`, 40, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "You have searched a lot this hour. Please try again a little later." }, { status: 429 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("q") || searchParams.get("topic") || "").slice(0, 200);
    const nicheId = (searchParams.get("niche") || "").slice(0, 64) || undefined;
    const rawType = searchParams.get("type") || "all";
    const filterType = (["all", "news", "blogs", "documentaries", "newsletters"].includes(rawType) ? rawType : "all") as SourceType | "all";
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    // FR-26: Pure in-memory ephemeral execution. NO DB WRITE.
    const { results, groups, totalResults, notes } = await searchTopics({
      query,
      nicheId,
      sourceType: filterType,
      apiKey: apiKey || undefined,
    });

    return NextResponse.json({
      query,
      nicheId,
      filterType,
      totalResults,
      groups,
      results,
      notes,
    });
  } catch (error: any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
