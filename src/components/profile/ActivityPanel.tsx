"use client";

import { useEffect, useState } from "react";
import { getNicheById } from "@/lib/constants/niches";
import { describeEvent } from "@/lib/activity/track";
import { timeAgo } from "@/components/notifications/NotificationList";

interface ActivityEvent {
  id: number;
  event_type: string;
  niche_id: string | null;
  target: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

/** The user's own activity: 30-day summary + timeline (FR: everything the user does is tracked to their profile). */
export function ActivityPanel() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [migrated, setMigrated] = useState(true);
  const [more, setMore] = useState(true);

  const load = async (before?: string) => {
    const res = await fetch(`/api/activity?limit=40${before ? `&before=${encodeURIComponent(before)}` : ""}`, { cache: "no-store" });
    if (!res.ok) return;
    const json = await res.json();
    setMigrated(json.migrated !== false);
    if (json.summary) setSummary(json.summary);
    setEvents((prev) => (before ? [...prev, ...(json.events || [])] : json.events || []));
    setMore((json.events || []).length === 40);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-10 text-center text-pencil">Loading your activity…</p>;
  if (!migrated) {
    return (
      <p className="sk-card-flat p-6 text-pencil">
        Activity tracking switches on as soon as the database update has been applied.
      </p>
    );
  }

  const last30 = summary?.last30 || {};
  const stats = [
    { label: "Scripts written", value: summary?.scriptsTotal ?? 0 },
    { label: "Active days (30 d)", value: summary?.activeDays30 ?? 0 },
    { label: "Searches (30 d)", value: last30.topic_search ?? 0 },
    { label: "Videos watched (30 d)", value: (last30.video_played ?? 0) + (last30.why_this_worked_opened ?? 0) },
  ];

  // Group timeline by day
  const groups: Record<string, ActivityEvent[]> = {};
  for (const e of events) {
    const day = new Date(e.created_at).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
    (groups[day] ||= []).push(e);
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="sk-card p-5">
            <p className="text-3xl font-extrabold text-ink tabular-nums">{s.value}</p>
            <p className="mt-1 text-sm text-pencil">{s.label}</p>
          </div>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="sk-card-flat p-6 text-pencil">
          Nothing yet. Browse a niche, watch a creator&apos;s video or write a script, and it will show up here.
        </p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups).map(([day, list]) => (
            <section key={day}>
              <h3 className="mb-2 text-sm font-bold text-ink">{day}</h3>
              <ul className="sk-card-flat divide-y divide-line">
                {list.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-4 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{describeEvent(e.event_type)}</p>
                      <p className="truncate text-sm text-pencil">
                        {[e.target, e.niche_id ? getNicheById(e.niche_id)?.name : null].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-pencil-light">{timeAgo(e.created_at)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {more && (
            <button type="button" className="sk-btn" onClick={() => load(events[events.length - 1]?.created_at)}>
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
