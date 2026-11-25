-- =====================================================================================
-- CreatorLab migration 3: give signed-in users access to the new tables.
--
-- Why: this Supabase project does not automatically grant access to new tables. Migration 1 created
-- generated_scripts, activity_events, notifications, role_invitations and app_settings but never
-- granted them to the "authenticated" role, so the app could not read or write them:
--   * invitations did not appear in the invitee's notifications (no Accept button),
--   * activity and saved scripts were not stored,
--   * admin checks on invitations failed.
-- Row Level Security still decides WHICH rows each person can see or change.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once.
-- =====================================================================================

grant usage on schema public to authenticated;

-- Saved scripts: own rows (RLS); admins read all
grant select, insert, delete on public.generated_scripts to authenticated;

-- Activity tracking: users add and read their own; admins read all
grant select, insert on public.activity_events to authenticated;

-- Notifications: read, delete own, and only mark them read (column-level update)
grant select, delete on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;

-- Invitations: read only (created/answered through the database functions)
grant select on public.role_invitations to authenticated;

-- App settings: everyone signed in reads; admins write (RLS)
grant select, insert, update on public.app_settings to authenticated;

-- Existing tables used by the new features (in case they were never granted)
grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.user_niches to authenticated;
grant select, insert on public.script_requests to authenticated;
grant select, insert on public.audit_log to authenticated;
grant select, insert, update, delete on public.creators to authenticated;
grant select, insert, update, delete on public.videos to authenticated;
grant select, insert on public.video_snapshots to authenticated;
grant select on public.niches to authenticated, anon;
grant select on public.creators, public.videos, public.video_snapshots to anon;

-- Identity / sequence columns
grant usage, select on all sequences in schema public to authenticated;

-- Future tables created in public get the same baseline for signed-in users (RLS still applies)
alter default privileges in schema public grant select on tables to authenticated;

-- -------------------------------------------------------------------------------------
-- CHECK (one result table): invitations, plus whether the app can now read the new tables.
-- "app_can_read_new_tables" should be 5 on every row.
-- -------------------------------------------------------------------------------------
select p.email,
       p.role as current_role,
       ri.role as invited_as,
       ri.status,
       ri.created_at,
       (select count(*) from (values ('generated_scripts'), ('activity_events'), ('notifications'), ('role_invitations'), ('app_settings')) t(n)
         where has_table_privilege('authenticated', 'public.' || t.n, 'select')) as app_can_read_new_tables
from public.role_invitations ri
join public.profiles p on p.id = ri.user_id
order by ri.created_at desc;
