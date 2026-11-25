-- =====================================================================================
-- CreatorLab migration 8: index for the outlier feed (no data changes).
--
-- The Creators page loads "active creators in a niche, newest first" on every visit:
--   creators where niche_id = ? and active = true order by curated_on desc
-- Videos per creator (videos_creator) and latest snapshots (video_snapshots_video) are already indexed.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this file -> Run. Safe to run again.
-- (Independent of migration 7.)
-- =====================================================================================

create index if not exists creators_niche_active_curated
  on public.creators (niche_id, active, curated_on desc);

-- CHECK: should be true
select exists (select 1 from pg_indexes where indexname = 'creators_niche_active_curated') as feed_index_ready;
