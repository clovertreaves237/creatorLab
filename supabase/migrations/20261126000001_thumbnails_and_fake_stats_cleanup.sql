-- =====================================================================================
-- CreatorLab migration 2: TikTok thumbnail uploads + removal of fake refresh stats.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Requires migration 20261125000001 (uses public.is_curator()). Safe to run more than once.
-- =====================================================================================

-- -------------------------------------------------------------------------------------
-- 1. THUMBNAIL STORAGE: public images, uploaded only by curators (JPG / PNG / WebP, max 2 MB)
-- -------------------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('thumbnails', 'thumbnails', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Curators upload thumbnails" on storage.objects;
create policy "Curators upload thumbnails" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'thumbnails' and public.is_curator());

drop policy if exists "Curators replace thumbnails" on storage.objects;
create policy "Curators replace thumbnails" on storage.objects
  for update to authenticated
  using (bucket_id = 'thumbnails' and public.is_curator());

drop policy if exists "Curators delete thumbnails" on storage.objects;
create policy "Curators delete thumbnails" on storage.objects
  for delete to authenticated
  using (bucket_id = 'thumbnails' and public.is_curator());

-- -------------------------------------------------------------------------------------
-- 2. REMOVE FAKE STATS written by the old simulated "YouTube refresh"
--    The old refresh logged every run with an exact timestamp and wrote random numbers at that
--    exact time. Real runs (new code) carry details.source = 'youtube_data_api' and are untouched,
--    as are all stats entered by curators.
-- -------------------------------------------------------------------------------------
with fake_runs as (
  select (a.details->>'timestamp')::timestamptz as run_at
  from public.audit_log a
  where a.action = 'manual_youtube_refresh'
    and a.details ? 'timestamp'
    and not (a.details ? 'source')
),
removed as (
  delete from public.video_snapshots s
  using fake_runs f
  where s.snapshot_at = f.run_at
  returning s.id
)
insert into public.audit_log (actor_id, action, target, details)
select null, 'fake_snapshots_removed', 'video_snapshots',
       jsonb_build_object('rows_removed', count(*), 'reason', 'Simulated YouTube refresh stats removed')
from removed
having count(*) > 0;

-- Mark the old runs in the audit log so admins can see they were simulated
update public.audit_log
set details = details || '{"simulated": true}'::jsonb
where action = 'manual_youtube_refresh'
  and not (details ? 'source')
  and not (details ? 'simulated');

-- -------------------------------------------------------------------------------------
-- 3. RESULT: what was cleaned up
-- -------------------------------------------------------------------------------------
select
  (select coalesce(sum((details->>'rows_removed')::int), 0) from public.audit_log where action = 'fake_snapshots_removed') as fake_snapshot_rows_removed,
  (select count(*) from public.audit_log where action = 'manual_youtube_refresh' and details ? 'simulated') as simulated_refresh_runs_found,
  (select count(*) from storage.buckets where id = 'thumbnails') as thumbnail_bucket_ready;
