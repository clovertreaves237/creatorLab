/**
 * Client-side activity tracking. Events are shown back to the user on their profile.
 * Never pass research notes or search text here (FR-33, FR-26).
 */
export const TRACKED_EVENTS = [
  "page_view",
  "niche_saved",
  "niche_removed",
  "niche_switched",
  "creator_viewed",
  "creator_favorited",
  "video_played",
  "why_this_worked_opened",
  "topic_search",
  "script_copied",
  "script_downloaded",
  "script_edited",
  "script_stopped",
  "sound_generated",
  "sound_downloaded",
  "sound_declined",
  "profile_updated",
  "onboarding_completed",
  "notification_opened",
  "role_invite_answered",
] as const;

export type TrackedEvent = (typeof TRACKED_EVENTS)[number];

export interface TrackOptions {
  nicheId?: string | null;
  target?: string | null;
  metadata?: Record<string, unknown>;
}

/** Fire-and-forget: never blocks the UI and never throws. */
export function track(eventType: TrackedEvent, options: TrackOptions = {}) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify({
    event_type: eventType,
    niche_id: options.nicheId ?? null,
    target: options.target ?? null,
    metadata: options.metadata ?? {},
  });
  try {
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

/** Human-readable label for the profile timeline. */
export function describeEvent(eventType: string): string {
  const labels: Record<string, string> = {
    page_view: "Opened a page",
    niche_saved: "Saved a niche",
    niche_removed: "Removed a niche",
    niche_switched: "Switched niche",
    creator_viewed: "Viewed a creator",
    creator_favorited: "Favourited a creator",
    video_played: "Watched a video",
    why_this_worked_opened: "Opened “Why this worked”",
    topic_search: "Searched for topics",
    script_generated: "Wrote a script",
    script_copied: "Copied a script",
    script_downloaded: "Downloaded a script",
    script_edited: "Edited a script",
    script_stopped: "Stopped a script",
    sound_generated: "Made a background sound",
    sound_downloaded: "Downloaded a background sound",
    sound_declined: "Skipped the background sound",
    profile_updated: "Updated profile",
    onboarding_completed: "Finished account setup",
    notification_opened: "Opened a notification",
    role_invite_answered: "Answered a role invitation",
  };
  return labels[eventType] || eventType.replace(/_/g, " ");
}
