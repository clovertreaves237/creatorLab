-- ====================================================================
-- CreatorLab Fix: Row-Level Security (RLS) for Curator & Admin Tables
-- 
-- Why this error occurs:
-- In Supabase, the tables (creators, videos, video_snapshots, audit_log)
-- had RLS enabled, but were missing INSERT / UPDATE policies for creators.
--
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/<your-project-ref>/sql/new
-- ====================================================================

-- 1. Policies for creators table
create policy "Allow insert on creators" on public.creators for insert with check (true);
create policy "Allow update on creators" on public.creators for update using (true);
create policy "Allow delete on creators" on public.creators for delete using (true);

-- 2. Policies for videos table
create policy "Allow insert on videos" on public.videos for insert with check (true);
create policy "Allow update on videos" on public.videos for update using (true);
create policy "Allow delete on videos" on public.videos for delete using (true);

-- 3. Policies for video_snapshots table
create policy "Allow insert on video_snapshots" on public.video_snapshots for insert with check (true);

-- 4. Policies for audit_log table
create policy "Allow insert on audit_log" on public.audit_log for insert with check (true);

-- Alternatively, to completely disable RLS for these curator-managed tables:
-- alter table public.creators disable row level security;
-- alter table public.videos disable row level security;
-- alter table public.video_snapshots disable row level security;
-- alter table public.audit_log disable row level security;
