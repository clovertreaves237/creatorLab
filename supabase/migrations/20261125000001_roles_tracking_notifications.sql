-- =====================================================================================
-- CreatorLab migration: secure roles, super admin, curator invitations, activity
-- tracking, saved scripts, notifications, onboarding/personalisation, app settings.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once.
-- =====================================================================================

-- -------------------------------------------------------------------------------------
-- 0. SUPER ADMIN EMAILS (only readable by the database itself)
-- -------------------------------------------------------------------------------------
create table if not exists public.super_admin_emails (
  email text primary key
);
alter table public.super_admin_emails enable row level security; -- no policies: invisible to the API
insert into public.super_admin_emails (email) values ('nestybrown7@gmail.com') on conflict do nothing;

-- -------------------------------------------------------------------------------------
-- 1. PROFILES: roles + onboarding / personalisation fields
-- -------------------------------------------------------------------------------------
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('visitor', 'user', 'curator', 'admin', 'super_admin'));

alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists user_type text;          -- creator, business_owner, ...
alter table public.profiles add column if not exists experience_level text;   -- beginner, intermediate, advanced
alter table public.profiles add column if not exists platforms text[] default array[]::text[];
alter table public.profiles add column if not exists goals text[] default array[]::text[];
alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists content_language text;
alter table public.profiles add column if not exists onboarding_completed_at timestamptz;
alter table public.profiles add column if not exists last_active_at timestamptz;

alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format
  check (username is null or username ~ '^[a-z0-9_.]{3,30}$');
create unique index if not exists profiles_username_unique on public.profiles (lower(username));

-- -------------------------------------------------------------------------------------
-- 2. ROLE HELPERS (security definer = they can read roles without RLS recursion)
--    Admin/curator powers also require a VERIFIED email, so nobody can claim the
--    super admin address by signing up with it before the owner does.
-- -------------------------------------------------------------------------------------
create or replace function public.app_role()
returns text language sql stable security definer set search_path = public as $$
  select p.role
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.id = auth.uid() and u.email_confirmed_at is not null
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.app_role() = 'super_admin', false)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.app_role() in ('admin', 'super_admin'), false)
$$;

create or replace function public.is_curator()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.app_role() in ('curator', 'admin', 'super_admin'), false)
$$;

-- -------------------------------------------------------------------------------------
-- 3. NOTIFICATIONS (created only by database functions/triggers)
-- -------------------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_created on public.notifications (user_id, created_at desc);
alter table public.notifications enable row level security;

drop policy if exists "Users read own notifications" on public.notifications;
create policy "Users read own notifications" on public.notifications for select using (auth.uid() = user_id);
drop policy if exists "Users mark own notifications" on public.notifications;
create policy "Users mark own notifications" on public.notifications for update using (auth.uid() = user_id);
drop policy if exists "Users delete own notifications" on public.notifications;
create policy "Users delete own notifications" on public.notifications for delete using (auth.uid() = user_id);
-- users may only change read_at
revoke insert, update on public.notifications from anon, authenticated;
grant update (read_at) on public.notifications to authenticated;

create or replace function public.notify_user(
  p_user uuid, p_type text, p_title text, p_body text default null, p_link text default null, p_data jsonb default '{}'::jsonb
) returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications (user_id, type, title, body, link, data)
  values (p_user, p_type, p_title, p_body, p_link, coalesce(p_data, '{}'::jsonb));
end $$;
revoke execute on function public.notify_user(uuid, text, text, text, text, jsonb) from public, anon, authenticated;

-- -------------------------------------------------------------------------------------
-- 4. NEW USER TRIGGER: role is NEVER taken from sign-up data
-- -------------------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, last_name, display_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    case when exists (select 1 from public.super_admin_emails s where lower(s.email) = lower(new.email))
         then 'super_admin' else 'user' end
  )
  on conflict (id) do nothing;

  perform public.notify_user(new.id, 'welcome', 'Welcome to CreatorLab',
    'Finish setting up your profile and pick your niches to see the creators chosen for you.', '/onboarding');
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- existing account(s) with a super admin email
update public.profiles set role = 'super_admin'
where lower(email) in (select lower(email) from public.super_admin_emails);

-- -------------------------------------------------------------------------------------
-- 5. PROTECT THE ROLE COLUMN: only the role functions below may change it
-- -------------------------------------------------------------------------------------
create or replace function public.protect_profile_role()
returns trigger language plpgsql as $$
begin
  if new.role is distinct from old.role
     and coalesce(current_setting('app.allow_role_change', true), '') <> 'on' then
    raise exception 'Roles can only be changed by an admin through CreatorLab.';
  end if;
  if new.id is distinct from old.id or new.email is distinct from old.email
     and coalesce(current_setting('app.allow_role_change', true), '') <> 'on' then
    raise exception 'This field cannot be changed.';
  end if;
  return new;
end $$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
  for each row execute procedure public.protect_profile_role();

-- -------------------------------------------------------------------------------------
-- 6. ROLE INVITATIONS (admin invites -> user accepts)
-- -------------------------------------------------------------------------------------
create table if not exists public.role_invitations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('curator', 'admin')),
  invited_by uuid references public.profiles(id) on delete set null,
  note text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'revoked')),
  created_at timestamptz not null default now(),
  responded_at timestamptz
);
create unique index if not exists role_invitations_one_pending
  on public.role_invitations (user_id, role) where status = 'pending';
alter table public.role_invitations enable row level security;
drop policy if exists "Invitee reads own invitations" on public.role_invitations;
create policy "Invitee reads own invitations" on public.role_invitations for select using (auth.uid() = user_id);
drop policy if exists "Admins read invitations" on public.role_invitations;
create policy "Admins read invitations" on public.role_invitations for select using (public.is_admin());
revoke insert, update, delete on public.role_invitations from anon, authenticated;

create or replace function public.admin_invite_role(p_user uuid, p_role text, p_note text default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_target_role text; v_inviter text;
begin
  if not public.is_admin() then raise exception 'Only admins can invite.'; end if;
  if p_role not in ('curator', 'admin') then raise exception 'Unknown role.'; end if;
  if p_role = 'admin' and not public.is_super_admin() then raise exception 'Only the super admin can invite admins.'; end if;
  if p_user = auth.uid() then raise exception 'You cannot invite yourself.'; end if;

  select role into v_target_role from public.profiles where id = p_user;
  if v_target_role is null then raise exception 'User not found.'; end if;
  if v_target_role = 'super_admin' then raise exception 'This account is already the super admin.'; end if;
  if v_target_role = p_role or (p_role = 'curator' and v_target_role = 'admin') then
    raise exception 'This user already has that role or a higher one.';
  end if;

  insert into public.role_invitations (user_id, role, invited_by, note)
  values (p_user, p_role, auth.uid(), p_note) returning id into v_id;

  select display_name into v_inviter from public.profiles where id = auth.uid();
  perform public.notify_user(p_user, 'role_invite',
    case when p_role = 'curator' then 'CreatorLab invites you to become a curator'
         else 'CreatorLab invites you to become an admin' end,
    coalesce(p_note, 'Accept to unlock the ' || p_role || ' tools in your dashboard.'),
    '/profile?tab=notifications', jsonb_build_object('invitation_id', v_id, 'role', p_role));

  insert into public.audit_log (actor_id, action, target, details)
  values (auth.uid(), 'role_invite_sent', p_user::text, jsonb_build_object('role', p_role, 'invitation_id', v_id));
  return v_id;
end $$;

create or replace function public.respond_role_invitation(p_invitation uuid, p_accept boolean)
returns text language plpgsql security definer set search_path = public as $$
declare v_inv public.role_invitations; v_name text;
begin
  select * into v_inv from public.role_invitations where id = p_invitation for update;
  if v_inv.id is null or v_inv.user_id <> auth.uid() then raise exception 'Invitation not found.'; end if;
  if v_inv.status <> 'pending' then raise exception 'This invitation is no longer open.'; end if;
  if not exists (select 1 from auth.users where id = auth.uid() and email_confirmed_at is not null) then
    raise exception 'Verify your email before accepting.';
  end if;

  update public.role_invitations
  set status = case when p_accept then 'accepted' else 'declined' end, responded_at = now()
  where id = p_invitation;

  select display_name into v_name from public.profiles where id = auth.uid();
  if p_accept then
    perform set_config('app.allow_role_change', 'on', true);
    update public.profiles set role = v_inv.role, updated_at = now() where id = auth.uid();
    perform set_config('app.allow_role_change', 'off', true);
    perform public.notify_user(auth.uid(), 'role_granted', 'You are now a ' || v_inv.role,
      'Your ' || v_inv.role || ' tools are in your dashboard.', '/profile?tab=' || v_inv.role);
  end if;
  if v_inv.invited_by is not null then
    perform public.notify_user(v_inv.invited_by, 'role_invite_response',
      coalesce(v_name, 'A user') || case when p_accept then ' accepted' else ' declined' end
        || ' your ' || v_inv.role || ' invitation', null, null,
      jsonb_build_object('user_id', auth.uid(), 'role', v_inv.role));
  end if;
  insert into public.audit_log (actor_id, action, target, details)
  values (auth.uid(), case when p_accept then 'role_invite_accepted' else 'role_invite_declined' end,
          auth.uid()::text, jsonb_build_object('role', v_inv.role, 'invitation_id', p_invitation));
  return case when p_accept then v_inv.role else 'declined' end;
end $$;

create or replace function public.admin_revoke_invitation(p_invitation uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Only admins can revoke invitations.'; end if;
  update public.role_invitations set status = 'revoked', responded_at = now()
  where id = p_invitation and status = 'pending';
  insert into public.audit_log (actor_id, action, target, details)
  values (auth.uid(), 'role_invite_revoked', p_invitation::text, '{}'::jsonb);
end $$;

-- Remove a role (back to a normal user). Promotions only happen through accepted invitations.
create or replace function public.admin_remove_role(p_user uuid, p_reason text default null)
returns void language plpgsql security definer set search_path = public as $$
declare v_role text;
begin
  if not public.is_admin() then raise exception 'Only admins can change roles.'; end if;
  if p_user = auth.uid() then raise exception 'You cannot change your own role.'; end if;
  select role into v_role from public.profiles where id = p_user;
  if v_role is null then raise exception 'User not found.'; end if;
  if v_role = 'super_admin' then raise exception 'The super admin cannot be demoted here.'; end if;
  if v_role = 'admin' and not public.is_super_admin() then raise exception 'Only the super admin can remove an admin.'; end if;
  if v_role = 'user' then return; end if;

  perform set_config('app.allow_role_change', 'on', true);
  update public.profiles set role = 'user', updated_at = now() where id = p_user;
  perform set_config('app.allow_role_change', 'off', true);

  perform public.notify_user(p_user, 'role_removed', 'Your ' || v_role || ' access was removed',
    coalesce(p_reason, 'Contact the CreatorLab team if you think this is a mistake.'), null);
  insert into public.audit_log (actor_id, action, target, details)
  values (auth.uid(), 'role_removed', p_user::text, jsonb_build_object('previous_role', v_role, 'reason', p_reason));
end $$;

-- Send a notification to a group of users.
create or replace function public.admin_broadcast(p_title text, p_body text, p_link text default null, p_audience text default 'all')
returns integer language plpgsql security definer set search_path = public as $$
declare v_count integer;
begin
  if not public.is_admin() then raise exception 'Only admins can send announcements.'; end if;
  insert into public.notifications (user_id, type, title, body, link)
  select p.id, 'announcement', p_title, p_body, p_link
  from public.profiles p
  where case
    when p_audience = 'all' then true
    when p_audience = 'curators' then p.role = 'curator'
    when p_audience = 'admins' then p.role in ('admin', 'super_admin')
    else exists (select 1 from public.user_niches un where un.user_id = p.id and un.niche_id = p_audience)
  end;
  get diagnostics v_count = row_count;
  insert into public.audit_log (actor_id, action, target, details)
  values (auth.uid(), 'announcement_sent', p_audience, jsonb_build_object('title', p_title, 'recipients', v_count));
  return v_count;
end $$;

revoke execute on function public.admin_invite_role(uuid, text, text) from public, anon;
revoke execute on function public.respond_role_invitation(uuid, boolean) from public, anon;
revoke execute on function public.admin_revoke_invitation(uuid) from public, anon;
revoke execute on function public.admin_remove_role(uuid, text) from public, anon;
revoke execute on function public.admin_broadcast(text, text, text, text) from public, anon;
grant execute on function public.admin_invite_role(uuid, text, text) to authenticated;
grant execute on function public.respond_role_invitation(uuid, boolean) to authenticated;
grant execute on function public.admin_revoke_invitation(uuid) to authenticated;
grant execute on function public.admin_remove_role(uuid, text) to authenticated;
grant execute on function public.admin_broadcast(text, text, text, text) to authenticated;

-- -------------------------------------------------------------------------------------
-- 7. GENERATED SCRIPTS (user history; notes are never stored, FR-33)
-- -------------------------------------------------------------------------------------
create table if not exists public.generated_scripts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  niche_id text references public.niches(id) on delete set null,
  topic text not null,
  script text not null,
  hook text,
  total_spoken_seconds integer,
  word_count integer,
  created_at timestamptz not null default now()
);
create index if not exists generated_scripts_user_created on public.generated_scripts (user_id, created_at desc);
create index if not exists generated_scripts_niche_created on public.generated_scripts (niche_id, created_at desc);
alter table public.generated_scripts enable row level security;
drop policy if exists "Users read own scripts" on public.generated_scripts;
create policy "Users read own scripts" on public.generated_scripts for select using (auth.uid() = user_id);
drop policy if exists "Users save own scripts" on public.generated_scripts;
create policy "Users save own scripts" on public.generated_scripts for insert with check (auth.uid() = user_id);
drop policy if exists "Users delete own scripts" on public.generated_scripts;
create policy "Users delete own scripts" on public.generated_scripts for delete using (auth.uid() = user_id);
drop policy if exists "Admins read scripts" on public.generated_scripts;
create policy "Admins read scripts" on public.generated_scripts for select using (public.is_admin());

-- -------------------------------------------------------------------------------------
-- 8. ACTIVITY EVENTS (what each user does, shown on their profile)
-- -------------------------------------------------------------------------------------
create table if not exists public.activity_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (char_length(event_type) <= 64),
  niche_id text,
  target text check (target is null or char_length(target) <= 300),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists activity_events_user_created on public.activity_events (user_id, created_at desc);
create index if not exists activity_events_type_created on public.activity_events (event_type, created_at desc);
alter table public.activity_events enable row level security;
drop policy if exists "Users log own activity" on public.activity_events;
create policy "Users log own activity" on public.activity_events for insert with check (auth.uid() = user_id);
drop policy if exists "Users read own activity" on public.activity_events;
create policy "Users read own activity" on public.activity_events for select using (auth.uid() = user_id);
drop policy if exists "Admins read activity" on public.activity_events;
create policy "Admins read activity" on public.activity_events for select using (public.is_admin());

-- -------------------------------------------------------------------------------------
-- 9. APP SETTINGS (admin-managed, e.g. NFR-20 daily script limit)
-- -------------------------------------------------------------------------------------
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);
alter table public.app_settings enable row level security;
drop policy if exists "Signed-in users read settings" on public.app_settings;
create policy "Signed-in users read settings" on public.app_settings for select using (auth.uid() is not null);
drop policy if exists "Admins write settings" on public.app_settings;
create policy "Admins write settings" on public.app_settings for all using (public.is_admin()) with check (public.is_admin());
insert into public.app_settings (key, value) values
  ('daily_script_limit', '20'::jsonb)
on conflict (key) do nothing;

-- -------------------------------------------------------------------------------------
-- 10. FIX OPEN WRITE POLICIES (previously anyone, even logged-out visitors, could edit)
-- -------------------------------------------------------------------------------------
drop policy if exists "Allow insert on creators" on public.creators;
drop policy if exists "Allow update on creators" on public.creators;
drop policy if exists "Allow delete on creators" on public.creators;
drop policy if exists "Allow insert on videos" on public.videos;
drop policy if exists "Allow update on videos" on public.videos;
drop policy if exists "Allow delete on videos" on public.videos;
drop policy if exists "Allow insert on video_snapshots" on public.video_snapshots;
drop policy if exists "Allow insert on audit_log" on public.audit_log;

drop policy if exists "Curators manage creators" on public.creators;
create policy "Curators manage creators" on public.creators for all using (public.is_curator()) with check (public.is_curator());
drop policy if exists "Curators manage videos" on public.videos;
create policy "Curators manage videos" on public.videos for all using (public.is_curator()) with check (public.is_curator());
drop policy if exists "Curators add snapshots" on public.video_snapshots;
create policy "Curators add snapshots" on public.video_snapshots for insert with check (public.is_curator());
drop policy if exists "Staff write audit log" on public.audit_log;
create policy "Staff write audit log" on public.audit_log for insert with check (public.is_curator() and actor_id = auth.uid());
drop policy if exists "Admins read audit log" on public.audit_log;
create policy "Admins read audit log" on public.audit_log for select using (public.is_admin());

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles" on public.profiles for select using (public.is_admin());
drop policy if exists "Admins read script requests" on public.script_requests;
create policy "Admins read script requests" on public.script_requests for select using (public.is_admin());
drop policy if exists "Admins read niche preferences" on public.user_niches;
create policy "Admins read niche preferences" on public.user_niches for select using (public.is_admin());

-- Logged-out visitors can only read; they can never write.
revoke insert, update, delete on all tables in schema public from anon;
alter default privileges in schema public revoke insert, update, delete on tables from anon;

-- -------------------------------------------------------------------------------------
-- 11. AUTOMATIC NOTIFICATIONS
-- -------------------------------------------------------------------------------------
-- New creator in a niche -> users who follow that niche (at most once per niche per day)
create or replace function public.notify_new_creator()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_niche text;
begin
  select name into v_niche from public.niches where id = new.niche_id;
  insert into public.notifications (user_id, type, title, body, link, data)
  select un.user_id, 'new_creators', 'New creators in ' || coalesce(v_niche, new.niche_id),
         'Curators just added new creators to study.', '/creators?niche=' || new.niche_id,
         jsonb_build_object('niche_id', new.niche_id)
  from public.user_niches un
  where un.niche_id = new.niche_id
    and not exists (
      select 1 from public.notifications n
      where n.user_id = un.user_id and n.type = 'new_creators'
        and n.data->>'niche_id' = new.niche_id and n.created_at > now() - interval '1 day');
  return new;
end $$;
drop trigger if exists on_creator_added on public.creators;
create trigger on_creator_added after insert on public.creators
  for each row when (new.active) execute procedure public.notify_new_creator();

-- Account deletion requested -> confirm to the user and tell admins (FR-5)
create or replace function public.notify_deletion_request()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.deletion_requested_at is not null and old.deletion_requested_at is null then
    perform public.notify_user(new.id, 'account_deletion', 'Account deletion scheduled',
      'Your data will be removed within 90 days. Contact us if this was a mistake.', '/account');
    insert into public.notifications (user_id, type, title, body, link, data)
    select p.id, 'admin_deletion_request', new.display_name || ' requested account deletion',
           new.email, null, jsonb_build_object('user_id', new.id)
    from public.profiles p where p.role in ('admin', 'super_admin');
  end if;
  return new;
end $$;
drop trigger if exists on_deletion_requested on public.profiles;
create trigger on_deletion_requested after update of deletion_requested_at on public.profiles
  for each row execute procedure public.notify_deletion_request();

-- -------------------------------------------------------------------------------------
-- 12. REVIEW: who currently has staff roles (check this list after running)
-- -------------------------------------------------------------------------------------
select email, display_name, role, created_at
from public.profiles
where role <> 'user'
order by role, created_at;
