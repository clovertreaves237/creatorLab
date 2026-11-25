/**
 * CreatorLab Data Model Types mapped from SRS Section 6
 */

export type UserRole = "visitor" | "user" | "curator" | "admin";

export interface UserProfile {
  id: string; // References auth.users.id
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  display_name: string;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  deletion_requested_at?: string | null; // FR-5: 90-day deletion
}

export interface Niche {
  id: string;
  name: string;
}

export interface UserNiche {
  user_id: string;
  niche_id: string;
  saved_at: string;
}

export type PlatformType = "youtube" | "tiktok";

export interface Creator {
  id: string;
  niche_id: string;
  platform: PlatformType;
  display_name: string;
  handle: string;
  profile_url: string;
  channel_id?: string | null;
  followers: number | null;
  followers_checked_on: string | null;
  criteria_checked: string[];
  curated_by: string;
  curated_on: string;
  active: boolean;
}

export interface Video {
  video_id: string;
  creator_id: string;
  platform: PlatformType;
  title: string;
  description_summary: string | null;
  description_full?: string | null;
  published_at: string;
  duration_seconds: number;
  chapters?: Array<{ title: string; timestamp: number }> | null;
  thumbnail_url: string;
  video_url: string;
}

export interface VideoSnapshot {
  id: string;
  video_id: string;
  snapshot_at: string;
  views: number | null; // null represents 'Hidden' (FR-20)
  likes: number | null;
  comments: number | null;
}

export interface ScriptRequest {
  id: string;
  user_id: string;
  niche_id: string;
  topic: string;
  created_at: string;
  // Notes are deliberately omitted (FR-33 / NFR-11)
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  target: string;
  created_at: string;
}
