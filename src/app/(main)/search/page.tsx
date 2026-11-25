"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ALLOWED_NICHES, getNicheById } from "@/lib/constants/niches";
import { SearchResultItem, SourceGroup, SourceType } from "@/lib/types/search";
import { Search, Calendar, ExternalLink, PenLine, Layers, Filter, ArrowRight, ShieldCheck, FileText, Radio, BookOpen, Film, Mail, Loader2, RefreshCw, Copy, Check } from "lucide-react";
import Link from "next/link";
import { MobiusLoader } from "@/components/ui/MobiusLoader";
import { track } from "@/lib/activity/track";
import { useMyNiches } from "@/lib/personalization/useMyNiches";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("topic") || searchParams.get("q") || "";
  const initialNiche = searchParams.get("niche") || "branding-marketing";
  const initialType = (searchParams.get("type") as SourceType | "all") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [selectedNiche, setSelectedNiche] = useState(initialNiche);
  const [selectedType, setSelectedType] = useState<"all" | SourceType>(initialType);
  const [viewMode, setViewMode] = useState<"grouped" | "flat">("grouped");

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [groups, setGroups] = useState<SourceGroup[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const activeNiche = getNicheById(selectedNiche) || ALLOWED_NICHES[0];

  // Personalisation: topic search only offers the user's own niches
  const myNiches = useMyNiches();
  useEffect(() => {
    if (myNiches.loading || myNiches.niches.length === 0) return;
    if (!myNiches.has(selectedNiche)) setSelectedNiche(myNiches.niches[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myNiches.loading, myNiches.ids.join(",")]);

  const fetchResults = useCallback(
    async (searchQuery: string, niche: string, type: "all" | SourceType) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("topic", searchQuery);
        if (niche) params.set("niche", niche);
        if (type !== "all") params.set("type", type);

        const res = await fetch(`/api/search?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setGroups(data.groups || []);
          setTotalResults(data.totalResults || 0);
          setNotes(Array.isArray(data.notes) ? data.notes : []);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchResults(query, selectedNiche, selectedType);
  }, [fetchResults, selectedNiche, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FR-26: record that a search happened, never the search text
    track("topic_search", { nicheId: selectedNiche, metadata: { source_type: selectedType } });
    fetchResults(query, selectedNiche, selectedType);
  };

  const getSourceIcon = (type: SourceType) => {
    switch (type) {
      case "news":
        return <Radio className="w-3.5 h-3.5 text-accent" />;
      case "blogs":
        return <BookOpen className="w-3.5 h-3.5 text-score" />;
      case "documentaries":
        return <Film className="w-3.5 h-3.5 text-amber-700" />;
      case "newsletters":
        return <Mail className="w-3.5 h-3.5 text-accent" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-pencil" />;
    }
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full text-left">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-ink">
        <div className="flex items-center gap-2 text-xs text-pencil mb-2">
          <Link href="/niches" className="hover:text-ink transition-colors">
            Niches
          </Link>
          <span>/</span>
          <Link
            href={`/creators?niche=${selectedNiche}`}
            className="hover:text-ink transition-colors"
          >
            {activeNiche.name} Creators
          </Link>
          <span>/</span>
          <span className="text-accent font-medium">Topic Search</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-3">
              <span>7-Day Topic Search</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30 font-bold">
                Last 7 Days{/* (FR-22) */}
              </span>
            </h1>
            <p className="text-xs text-pencil mt-1">
              Find fresh African & global creator topics from the last 7 days. Ephemeral & privacy-preserving.
            </p>
          </div>

          {/* Privacy Badge (FR-26 & FR-27) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-ink text-[11px] text-pencil self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-score shrink-0" />
            <span>Zero query storage &bull; Snippets only</span>{/* (FR-26 & FR-27) */}
          </div>
        </div>
      </div>

      {/* Search Input Bar (FR-21) */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-pencil pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter a topic (e.g. WhatsApp monetization, Gen Z storytelling, AI automation)...`}
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border-2 border-ink text-ink placeholder:text-pencil/60 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2.5 px-4 py-2 rounded-xl bg-ink hover:bg-ink-soft text-white font-semibold text-xs transition-all flex items-center gap-1.5"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Niche Selector & Source-Type Filters (FR-25) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        {/* Source-Type Filter Pills (FR-25) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border-2 border-ink overflow-x-auto max-w-full">
          <span className="text-[11px] font-semibold text-pencil px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>
          {(["all", "news", "blogs", "documentaries", "newsletters"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedType === type
                  ? "bg-ink text-white"
                  : "text-pencil hover:text-ink"
              }`}
            >
              {type === "documentaries" ? "videos & documentaries" : type}
            </button>
          ))}
        </div>

        {/* Niche Switcher & View Switcher */}
        <div className="flex items-center gap-3">
          {/* Niche selection */}
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border-2 border-ink text-xs font-medium text-ink focus:outline-none focus:border-accent"
          >
            {(myNiches.niches.length ? myNiches.niches : ALLOWED_NICHES.filter((n) => n.id === selectedNiche)).map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>

          {/* Grouped vs Flat View (FR-23) */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white border-2 border-ink text-xs">
            <button
              onClick={() => setViewMode("grouped")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === "grouped"
                  ? "bg-white text-ink"
                  : "text-pencil hover:text-ink"
              }`}
              title="Grouped by Source"
            >
              By Source
            </button>
            <button
              onClick={() => setViewMode("flat")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === "flat"
                  ? "bg-white text-ink"
                  : "text-pencil hover:text-ink"
              }`}
              title="Recent First"
            >
              Chronological
            </button>
          </div>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="mb-4 rounded-xl border border-line bg-paper-deep px-4 py-2.5 text-xs text-pencil">
          {notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-pencil mb-4">
        <span>
          Showing <strong className="text-ink">{totalResults}</strong> results from the last 7 days{/* (FR-22) */}
        </span>
        {loading && (
          <span className="flex items-center gap-1.5 text-accent">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Searching the last 7 days...</span>
          </span>
        )}
      </div>

      {/* ============================================================== */}
      {/* RESULTS DISPLAY                                                */}
      {/* ============================================================== */}
      {loading ? (
        <div className="p-16 text-center rounded-2xl bg-white border-2 border-ink flex flex-col items-center justify-center">
          <MobiusLoader
            variant="general"
            size="lg"
            label="Scanning 7-Day Topics"
            sublabel="Retrieving verified African & global creator media from the last 7 days..."
          />
        </div>
      ) : results.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border-2 border-ink">
          <Search className="w-10 h-10 text-pencil mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-ink">No topics found</h3>
          <p className="text-xs text-pencil mt-1 max-w-sm mx-auto">
            Try adjusting your query or switching source-type filter above to discover recent 7-day topics.
          </p>
        </div>
      ) : viewMode === "grouped" ? (
        /* FR-23: Grouped by source. Each group shows source name & results returned */
        <div className="space-y-8">
          {groups.map((group) => (
            <div
              key={group.sourceName}
              className="sk-card p-6 space-y-4"
            >
              {/* Source Group Header */}
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border-2 border-ink">
                    {getSourceIcon(group.sourceType)}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-ink tracking-tight">
                      {group.sourceName}
                    </h2>
                    <span className="text-[11px] text-pencil capitalize">
                      {group.sourceType} • {group.count} {group.count === 1 ? "result" : "results"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items within Source Group */}
              <div className="divide-y divide-line">
                {group.items.map((item) => (
                  <ResultCard key={item.id} item={item} nicheId={selectedNiche} inGroup />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Flat chronological view (most recent first) */
        <div className="space-y-3">
          {results.map((item) => (
            <ResultCard key={item.id} item={item} nicheId={selectedNiche} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Result Card Component complying with:
 * - FR-24: Show source name, publish date, title, short snippet, link opening source in new tab
 * - FR-27: Snippets only, never full article text
 * - Quick Action to launch 120s Script Generator (FR-28 to FR-37)
 */
function ResultCard({
  item,
  nicheId,
  inGroup = false,
}: {
  item: SearchResultItem;
  nicheId: string;
  inGroup?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(item.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`text-left flex flex-col justify-between gap-3 group ${
        inGroup ? "py-5 first:pt-1 last:pb-0" : "sk-card p-5"
      }`}
    >
      <div>
        {/* Source name, type, and publish date (FR-24) */}
        <div className="flex items-center justify-between text-[11px] text-pencil mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-accent">{item.sourceName}</span>
            <span>•</span>
            <span className="capitalize">{item.sourceType}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-pencil">
              <Calendar className="w-3 h-3" />
              <span>{item.relativeTime}</span>
            </span>
          </div>
          <span className="text-[10px] text-score/80 tabular-nums">Last 7d</span>
        </div>

        {/* Title with link opening source in a new tab (FR-24) */}
        <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent transition-colors">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <span>{item.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-pencil group-hover:text-accent shrink-0" />
          </a>
        </h3>

        {/* Short snippet only (FR-27 & FR-24) */}
        <p className="text-xs text-pencil mt-1.5 leading-relaxed line-clamp-2">
          {item.snippet}
        </p>
      </div>

      {/* Footer Actions: Launch 120s Script Generation & Copy Snippet */}
      <div className="pt-2 border-t border-line flex items-center justify-between gap-2 flex-wrap">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-pencil hover:text-ink inline-flex items-center gap-1"
        >
          <span>Open original source</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySnippet}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-white border-2 border-ink text-xs text-pencil hover:text-ink transition-colors"
            title="Copy snippet to clipboard so you can paste into the context window"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-score" />
                <span className="text-score text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px]">Copy Snippet</span>
              </>
            )}
          </button>

          <Link
            href={`/script-generator?topic=${encodeURIComponent(item.title)}&context=${encodeURIComponent(item.snippet)}&niche=${nicheId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-ink text-ink hover:text-white border-2 border-ink text-xs font-semibold transition-all shadow-sm"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Use in Creator Engine</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 max-w-5xl mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
          <p className="text-xs text-pencil">Loading 7-day topic search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
