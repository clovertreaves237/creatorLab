-- =====================================================================================
-- CreatorLab migration 5: Fapshi payments and the Pro subscription (30-day pass).
--
-- Free accounts: 1 script per rolling 24 hours (app_settings.free_scripts_per_day).
-- Pro: pays once through Fapshi (MTN Mobile Money / Orange Money) and keeps generating for
-- app_settings.pro_days days, up to app_settings.daily_script_limit scripts a day.
--
-- Security model
--   * payments / subscriptions: users can READ their own rows only. No browser writes at all.
--   * Every write is done by the server with the service-role key, after the payment was confirmed
--     with Fapshi's GET /payment-status (the webhook body is never trusted).
--   * grant_pro_for_payment() grants a payment at most once (row lock + granted_at) and can only be
--     called by the service role.
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once. Nothing is dropped or deleted.
-- =====================================================================================

-- -------------------------------------------------------------------------------------
-- 1. PAYMENTS
-- -------------------------------------------------------------------------------------
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product text not null default 'pro_pass' check (product in ('pro_pass')),
  amount integer not null check (amount >= 100),
  currency text not null default 'XAF' check (currency = 'XAF'),
  days integer not null check (days between 1 and 366),
  status text not null default 'pending' check (status in ('pending', 'successful', 'failed', 'expired')),
  external_id text not null unique,        -- our own reference (UUID), sent to Fapshi and used in ?ref=
  fapshi_trans_id text unique,             -- Fapshi transId
  provider_status text,                    -- last raw Fapshi status (CREATED, PENDING, SUCCESSFUL, ...)
  provider_medium text,                    -- "mobile money" | "orange money" | "fapshi"
  test_mode boolean not null default true,
  last_checked_at timestamptz,             -- throttles status checks (Fapshi allows 6/min per transaction)
  granted_at timestamptz,                  -- set once, when Pro was granted for this payment
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists payments_user_created on public.payments (user_id, created_at desc);
create index if not exists payments_pending on public.payments (status) where status = 'pending';

alter table public.payments enable row level security;
drop policy if exists "Users read own payments" on public.payments;
create policy "Users read own payments" on public.payments for select using (auth.uid() = user_id);
drop policy if exists "Admins read payments" on public.payments;
create policy "Admins read payments" on public.payments for select using (public.is_admin());

revoke all on public.payments from anon, authenticated;
grant select on public.payments to authenticated;
grant all on public.payments to service_role;

-- -------------------------------------------------------------------------------------
-- 2. SUBSCRIPTIONS (separate from profiles: users may update their own profile row)
-- -------------------------------------------------------------------------------------
create table if not exists public.subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  pro_until timestamptz not null,
  last_payment_id uuid references public.payments(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
drop policy if exists "Users read own subscription" on public.subscriptions;
create policy "Users read own subscription" on public.subscriptions for select using (auth.uid() = user_id);
drop policy if exists "Admins read subscriptions" on public.subscriptions;
create policy "Admins read subscriptions" on public.subscriptions for select using (public.is_admin());

revoke all on public.subscriptions from anon, authenticated;
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;

-- -------------------------------------------------------------------------------------
-- 3. IDEMPOTENT GRANT
--    Called by the server only after Fapshi's /payment-status said SUCCESSFUL.
--    Returns: granted | already_granted | not_found | trans_mismatch | amount_mismatch
-- -------------------------------------------------------------------------------------
create or replace function public.grant_pro_for_payment(
  p_payment_id uuid,
  p_trans_id text,
  p_amount integer,
  p_provider_status text,
  p_medium text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  p public.payments%rowtype;
begin
  -- Lock the payment row: two webhook/status calls at the same time cannot both grant.
  select * into p from public.payments where id = p_payment_id for update;
  if not found then
    return 'not_found';
  end if;
  if p.granted_at is not null then
    return 'already_granted';
  end if;
  if p.fapshi_trans_id is distinct from p_trans_id then
    return 'trans_mismatch';
  end if;
  if p_amount is distinct from p.amount then
    update public.payments
       set status = 'failed', provider_status = 'AMOUNT_MISMATCH', updated_at = now()
     where id = p.id;
    return 'amount_mismatch';
  end if;

  -- Extend from the later of "now" and the current end date, so renewing early never loses days.
  insert into public.subscriptions (user_id, pro_until, last_payment_id, updated_at)
  values (p.user_id, now() + make_interval(days => p.days), p.id, now())
  on conflict (user_id) do update
    set pro_until = greatest(public.subscriptions.pro_until, now()) + make_interval(days => p.days),
        last_payment_id = excluded.last_payment_id,
        updated_at = now();

  update public.payments
     set status = 'successful',
         provider_status = p_provider_status,
         provider_medium = p_medium,
         granted_at = now(),
         updated_at = now()
   where id = p.id;

  return 'granted';
end;
$$;

revoke all on function public.grant_pro_for_payment(uuid, text, integer, text, text) from public, anon, authenticated;
grant execute on function public.grant_pro_for_payment(uuid, text, integer, text, text) to service_role;

-- -------------------------------------------------------------------------------------
-- 4. SETTINGS (admins can change them in the admin portal -> Settings)
-- -------------------------------------------------------------------------------------
insert into public.app_settings (key, value) values
  ('free_scripts_per_day', '1'::jsonb),
  ('pro_price_xaf', '1000'::jsonb),
  ('pro_days', '30'::jsonb)
on conflict (key) do nothing;

-- -------------------------------------------------------------------------------------
-- CHECK: every value should be true.
-- -------------------------------------------------------------------------------------
select
  exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'payments') as payments_table,
  exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'subscriptions') as subscriptions_table,
  not has_table_privilege('authenticated', 'public.payments', 'insert') as users_cannot_write_payments,
  not has_table_privilege('authenticated', 'public.subscriptions', 'update') as users_cannot_write_subscriptions,
  not has_function_privilege('authenticated', 'public.grant_pro_for_payment(uuid, text, integer, text, text)', 'execute') as users_cannot_grant,
  (select count(*) from public.app_settings where key in ('free_scripts_per_day', 'pro_price_xaf', 'pro_days')) = 3 as billing_settings_ready;
