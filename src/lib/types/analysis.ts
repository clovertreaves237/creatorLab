export interface VideoAnalysisInput {
  videoId: string;
  platform: "youtube" | "tiktok";
  title: string;
  description: string;
  duration_seconds: number;
  chapters?: Array<{ title: string; timestamp: string }> | null;
  stats: {
    views: number | null;
    likes: number | null;
    comments: number | null;
  };
}

export interface VideoAnalysisResult {
  videoId: string;
  title: string;
  summary: string;
  likelyReasons: string[]; // each labeled 'likely' (FR-41)
  suggestions: [string, string, string]; // exactly three suggestions (FR-41)
  verdict: string; // one-line verdict (FR-41)
  disclaimer: string; // FR-42: "Interpretation based on public data, not verified by watching the video."
}
