-- =====================================================================================
-- CreatorLab migration 7 (run AFTER migrations 5 and 6).
--
-- 1. Outliers are paid content: videos and their stats can no longer be read directly from the browser.
--    The app reads them on the server (/api/outliers) and sends free users only the #1 card per view.
--    Curators and admins keep full access (existing "Curators manage ..." policies).
-- 2. Atomic script limit: reserve_script_slot() checks the count and records the request in one locked step,
--    so two tabs or devices cannot both pass the limit. release_script_slot() refunds a failed generation.
-- 3. payments.checkout_url: reuse a recent pending payment for the same plan instead of creating duplicates.
--
-- Free is the default plan by design: a user is free unless subscriptions.pro_until / agency_until is in the
-- future (checked on the server on every request), so no plan column or backfill is needed. Expired plans fall
-- back to free automatically.
--
-- BEFORE APPLYING: confirm the live site reads outliers with the service key. Signed in, open
--   https://creator-lab-beta.vercel.app/api/outliers?niche=tech-news
-- and check (browser dev tools -> Network -> Response headers) that X-Outliers-Source is "service".
-- If it says "session", SUPABASE_SERVICE_ROLE_KEY is missing or wrong in Vercel: fix that first, otherwise
-- this migration would hide the creators from normal users.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once. No data is deleted.
-- =====================================================================================

-- 1. OUTLIER DATA: no direct reads from the browser for normal users
drop policy if exists "Public can read videos" on public.videos;
drop policy if exists "Public can read snapshots" on public.video_snapshots;
drop policy if exists "Curators read snapshots" on public.video_snapshots;
create policy "Curators read snapshots" on public.video_snapshots for select using (public.is_curator());
revoke select on public.videos, public.video_snapshots from anon;

-- Creator names stay readable for signed-in users (favourites), not for anonymous visitors
drop policy if exists "Public can read active creators" on public.creators;
drop policy if exists "Signed-in users read active creators" on public.creators;
create policy "Signed-in users read active creators" on public.creators for select to authenticated using (active = true);
revoke select on public.creators from anon;

-- 2. ATOMIC SCRIPT LIMIT
-- p_limit = how many requests are allowed since p_since (0 = no limit). The server decides both from the plan.
create or replace function public.reserve_script_slot(p_niche text, p_topic text, p_limit integer, p_since timestamptz)
returns table (allowed boolean, used integer, request_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  n integer;
  rid uuid;
begin
  if uid is null then
    raise exception 'Please sign in.';
  end if;
  -- one generation decision at a time per user
  perform pg_advisory_xact_lock(hashtextextended('script_slot:' || uid::text, 0));
  select count(*) into n from public.script_requests where user_id = uid and created_at > p_since;
  if p_limit > 0 and n >= p_limit then
    return query select false, n, null::uuid;
    return;
  end if;
  insert into public.script_requests (user_id, niche_id, topic)
  values (uid, p_niche, left(coalesce(p_topic, ''), 300))
  returning id into rid;
  return query select true, n + 1, rid;
end;
$$;

-- Gives the slot back when generation failed (own request, only within 15 minutes)
create or replace function public.release_script_slot(p_request_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.script_requests
   where id = p_request_id and user_id = auth.uid() and created_at > now() - interval '15 minutes';
$$;

revoke all on function public.reserve_script_slot(text, text, integer, timestamptz) from public, anon;
revoke all on function public.release_script_slot(uuid) from public, anon;
grant execute on function public.reserve_script_slot(text, text, integer, timestamptz) to authenticated;
grant execute on function public.release_script_slot(uuid) to authenticated;
create index if not exists script_requests_user_created on public.script_requests (user_id, created_at desc);

-- 3. REUSE PENDING CHECKOUTS
alter table public.payments add column if not exists checkout_url text;

-- CHECK: every value should be true.
select
  not exists (select 1 from pg_policies where tablename = 'videos' and policyname = 'Public can read videos') as videos_locked,
  not exists (select 1 from pg_policies where tablename = 'video_snapshots' and policyname = 'Public can read snapshots') as snapshots_locked,
  exists (select 1 from pg_proc where proname = 'reserve_script_slot') as atomic_limit_ready,
  exists (select 1 from information_schema.columns where table_name = 'payments' and column_name = 'checkout_url') as checkout_reuse_ready;
