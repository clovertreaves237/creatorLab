-- CreatorLab Database Schema
-- Aligned with CreatorLab SRS v1.0 (Section 6 Data Model & NFR-10 Row Level Security)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Managed alongside Supabase Auth users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  first_name text,
  last_name text,
  display_name text not null,
  role text not null check (role in ('visitor', 'user', 'curator', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deletion_requested_at timestamp with time zone -- FR-5: 90-day deletion schedule
);

-- 2. NICHES TABLE (Five niches: FR-8, NFR-18)
create table if not exists public.niches (
  id text primary key,
  name text not null,
  description text,
  is_live_demo boolean default false
);

-- 3. USER_NICHES (Saved preferences: FR-9 to FR-12)
create table if not exists public.user_niches (
  user_id uuid references public.profiles(id) on delete cascade not null,
  niche_id text references public.niches(id) on delete cascade not null,
  saved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, niche_id)
);

-- 4. CREATORS TABLE (FR-13 to FR-16, FR-44)
create table if not exists public.creators (
  id uuid default gen_random_uuid() primary key,
  niche_id text references public.niches(id) on delete cascade not null,
  platform text not null check (platform in ('youtube', 'tiktok')),
  display_name text not null,
  handle text not null,
  profile_url text not null,
  channel_id text,
  followers bigint,
  followers_checked_on timestamp with time zone,
  criteria_checked text[] default array[]::text[],
  curated_by text not null,
  curated_on date not null,
  active boolean default true not null
);

-- 5. VIDEOS TABLE (FR-17 to FR-20, FR-47)
create table if not exists public.videos (
  video_id text primary key,
  creator_id uuid references public.creators(id) on delete cascade not null,
  platform text not null check (platform in ('youtube', 'tiktok')),
  title text not null,
  description_summary text,
  description_full text,
  published_at timestamp with time zone not null,
  duration_seconds integer not null,
  chapters jsonb default '[]'::jsonb,
  thumbnail_url text not null,
  video_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. VIDEO_SNAPSHOTS TABLE (FR-15, FR-48: One row per refresh, never overwritten)
create table if not exists public.video_snapshots (
  id uuid default gen_random_uuid() primary key,
  video_id text references public.videos(video_id) on delete cascade not null,
  snapshot_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views bigint, -- null represents 'Hidden' (FR-20)
  likes bigint,
  comments bigint
);

-- 7. SCRIPT_REQUESTS TABLE (FR-35: user ID, niche, topic, time; NO notes stored per FR-33)
create table if not exists public.script_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  niche_id text references public.niches(id) on delete cascade not null,
  topic text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. AUDIT_LOG TABLE (FR-50, FR-51: Kept 1 year)
create table if not exists public.audit_log (
  id uuid default gen_random_uuid() primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (NFR-10)
alter table public.profiles enable row level security;
alter table public.niches enable row level security;
alter table public.user_niches enable row level security;
alter table public.creators enable row level security;
alter table public.videos enable row level security;
alter table public.video_snapshots enable row level security;
alter table public.script_requests enable row level security;
alter table public.audit_log enable row level security;

-- Public read policies for content
create policy "Public can read niches" on public.niches for select using (true);
create policy "Public can read active creators" on public.creators for select using (active = true);
create policy "Public can read videos" on public.videos for select using (true);
create policy "Public can read snapshots" on public.video_snapshots for select using (true);

-- User specific policies
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can read own niche preferences" on public.user_niches for select using (auth.uid() = user_id);
create policy "Users can manage own niche preferences" on public.user_niches for all using (auth.uid() = user_id);
create policy "Users can read own script requests" on public.script_requests for select using (auth.uid() = user_id);
create policy "Users can insert script requests" on public.script_requests for insert with check (auth.uid() = user_id);

-- TRIGGER FOR NEW USER CREATION (FR-1)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, display_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
