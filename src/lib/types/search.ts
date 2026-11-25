export type SourceType = "news" | "blogs" | "documentaries" | "newsletters";

export interface SearchResultItem {
  id: string;
  title: string;
  sourceName: string;
  sourceType: SourceType;
  publishDate: string; // ISO string within last 7 days
  relativeTime: string; // e.g. "2 days ago"
  snippet: string; // Short snippet only (FR-27)
  url: string; // Original link (FR-24)
}

export interface SourceGroup {
  sourceName: string;
  sourceType: SourceType;
  count: number;
  items: SearchResultItem[];
}

export interface SearchApiResponse {
  query: string;
  nicheId?: string;
  filterType: "all" | SourceType;
  totalResults: number; // max 10 (FR-22)
  groups: SourceGroup[];
  results: SearchResultItem[]; // Flat list ordered most recent first (FR-22)
}
