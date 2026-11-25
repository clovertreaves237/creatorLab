-- =====================================================================================
-- CreatorLab migration 4: everything the portals need from the database.
--
-- WHY: the server log shows "permission denied" for generated_scripts, activity_events and notifications.
-- Migration 3 (20261126000002_grant_table_access.sql) was never applied, so:
--   * no script was ever saved   -> admin dashboard showed 0 scripts
--   * no activity was recorded   -> admin / user activity never updated
--   * the notification bell could not load, invitations could not be answered
-- This file includes migration 3 (safe if it already ran) and adds what the new features need:
--   * profile picture, cover picture and bio on profiles + the "profile-media" storage bucket
--   * curators can remove videos and restore creators
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once.
-- =====================================================================================

-- -------------------------------------------------------------------------------------
-- 1. ACCESS FOR SIGNED-IN USERS (Row Level Security still decides which rows)
-- -------------------------------------------------------------------------------------
grant usage on schema public to authenticated, anon;

grant select, insert, delete on public.generated_scripts to authenticated;
grant select, insert on public.activity_events to authenticated;
grant select, delete on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select on public.role_invitations to authenticated;
grant select, insert, update on public.app_settings to authenticated;

grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.user_niches to authenticated;
grant select, insert on public.script_requests to authenticated;
grant select, insert on public.audit_log to authenticated;
grant select, insert, update, delete on public.creators to authenticated;
grant select, insert, update, delete on public.videos to authenticated;
grant select, insert on public.video_snapshots to authenticated;
grant select on public.niches to authenticated, anon;
grant select on public.creators, public.videos, public.video_snapshots to anon;

grant usage, select on all sequences in schema public to authenticated;
alter default privileges in schema public grant select on tables to authenticated;

-- -------------------------------------------------------------------------------------
-- 2. PROFILE PICTURE, COVER PICTURE AND BIO
-- -------------------------------------------------------------------------------------
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists cover_url text;
alter table public.profiles add column if not exists bio text;
-- Site theme chosen in the navbar settings (sketchbook | clay | signal)
alter table public.profiles add column if not exists ui_theme text;
do $$ begin
  alter table public.profiles add constraint profiles_ui_theme check (ui_theme is null or ui_theme in ('sketchbook', 'clay', 'signal'));
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.profiles add constraint profiles_bio_length check (bio is null or char_length(bio) <= 280);
exception when duplicate_object then null; end $$;

-- Public bucket; each person can only write inside their own folder: profile-media/<their user id>/...
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-media', 'profile-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users upload own profile media" on storage.objects;
create policy "Users upload own profile media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users replace own profile media" on storage.objects;
create policy "Users replace own profile media" on storage.objects
  for update to authenticated
  using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users delete own profile media" on storage.objects;
create policy "Users delete own profile media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = auth.uid()::text);

-- -------------------------------------------------------------------------------------
-- 3. FAVOURITE CREATORS (were kept only in the browser; now saved on the account)
-- -------------------------------------------------------------------------------------
create table if not exists public.favorite_creators (
  user_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.creators(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, creator_id)
);
alter table public.favorite_creators enable row level security;
drop policy if exists "Users read own favourites" on public.favorite_creators;
create policy "Users read own favourites" on public.favorite_creators for select using (auth.uid() = user_id);
drop policy if exists "Users add own favourites" on public.favorite_creators;
create policy "Users add own favourites" on public.favorite_creators for insert with check (auth.uid() = user_id);
drop policy if exists "Users remove own favourites" on public.favorite_creators;
create policy "Users remove own favourites" on public.favorite_creators for delete using (auth.uid() = user_id);
drop policy if exists "Admins read favourites" on public.favorite_creators;
create policy "Admins read favourites" on public.favorite_creators for select using (public.is_admin());
grant select, insert, delete on public.favorite_creators to authenticated;

-- -------------------------------------------------------------------------------------
-- 4. PRIVATE, PERMANENT SCRIPT HISTORY
--    Every script a creator writes stays in their history. Only the creator can read, edit or delete it.
--    Admins no longer read scripts (they see counts from script_requests).
-- -------------------------------------------------------------------------------------
alter table public.generated_scripts add column if not exists updated_at timestamptz;
drop policy if exists "Admins read scripts" on public.generated_scripts;
drop policy if exists "Users update own scripts" on public.generated_scripts;
create policy "Users update own scripts" on public.generated_scripts for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant update (script, word_count, updated_at) on public.generated_scripts to authenticated;

-- -------------------------------------------------------------------------------------
-- 5. UPLOADS REGISTER: every file uploaded in CreatorLab (the file itself is in Supabase Storage)
-- -------------------------------------------------------------------------------------
create table if not exists public.media_uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  bucket text not null check (bucket in ('thumbnails', 'profile-media')),
  path text not null,
  public_url text not null,
  kind text not null check (kind in ('tiktok_thumbnail', 'avatar', 'cover')),
  mime_type text,
  size_bytes integer,
  related_id text,          -- e.g. the TikTok video id for a thumbnail
  created_at timestamptz not null default now(),
  unique (bucket, path)
);
create index if not exists media_uploads_user_created on public.media_uploads (user_id, created_at desc);
alter table public.media_uploads enable row level security;
drop policy if exists "Users record own uploads" on public.media_uploads;
create policy "Users record own uploads" on public.media_uploads for insert with check (auth.uid() = user_id);
drop policy if exists "Users read own uploads" on public.media_uploads;
create policy "Users read own uploads" on public.media_uploads for select using (auth.uid() = user_id);
drop policy if exists "Admins read uploads" on public.media_uploads;
create policy "Admins read uploads" on public.media_uploads for select using (public.is_admin());
grant select, insert on public.media_uploads to authenticated;

-- -------------------------------------------------------------------------------------
-- 6. FASTER ADMIN DASHBOARD (scripts over time, live activity)
-- -------------------------------------------------------------------------------------
create index if not exists script_requests_created on public.script_requests (created_at desc);
create index if not exists activity_events_created on public.activity_events (created_at desc);
create index if not exists videos_creator on public.videos (creator_id);
create index if not exists video_snapshots_video on public.video_snapshots (video_id, snapshot_at desc);

-- -------------------------------------------------------------------------------------
-- CHECK: every value should be true.
-- -------------------------------------------------------------------------------------
select
  has_table_privilege('authenticated', 'public.generated_scripts', 'insert') as scripts_can_be_saved,
  has_table_privilege('authenticated', 'public.activity_events', 'insert') as activity_can_be_recorded,
  has_table_privilege('authenticated', 'public.notifications', 'select') as notifications_can_load,
  has_table_privilege('authenticated', 'public.videos', 'delete') as curators_can_remove_videos,
  exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'cover_url') as profile_pictures_ready,
  exists (select 1 from storage.buckets where id = 'profile-media') as picture_storage_ready,
  has_table_privilege('authenticated', 'public.favorite_creators', 'insert') as favourites_ready,
  has_table_privilege('authenticated', 'public.media_uploads', 'insert') as uploads_register_ready,
  not exists (select 1 from pg_policies where tablename = 'generated_scripts' and policyname = 'Admins read scripts') as scripts_private_to_owner;
