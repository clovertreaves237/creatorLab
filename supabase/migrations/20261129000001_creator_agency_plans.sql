-- =====================================================================================
-- CreatorLab migration 6: two paid plans (run AFTER 20261128000001_payments_subscriptions.sql).
--
--   Creator            creator_month   default 5,000 XAF / 30 days   up to daily_script_limit scripts a day
--   Agency & Academy   agency_month    default 50,000 XAF / 30 days  up to plan_agency_daily_scripts a day
--
-- subscriptions.pro_until    = Creator plan end date
-- subscriptions.agency_until = Agency & Academy plan end date (wins while both are active)
--
-- HOW TO APPLY: Supabase Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run more than once. Nothing is dropped or deleted (only a check constraint is widened).
-- =====================================================================================

-- 1. Products that can be paid for
alter table public.payments drop constraint if exists payments_product_check;
alter table public.payments add constraint payments_product_check
  check (product in ('pro_pass', 'creator_month', 'agency_month'));

-- 2. Agency & Academy end date (Creator keeps using pro_until)
alter table public.subscriptions add column if not exists agency_until timestamptz;
alter table public.subscriptions alter column pro_until drop not null;

-- 3. Grant the plan that was paid for, at most once per payment (service role only)
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
  is_agency boolean;
begin
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

  is_agency := (p.product = 'agency_month');

  -- Extend from the later of "now" and the current end date, so renewing early never loses days.
  insert into public.subscriptions (user_id, pro_until, agency_until, last_payment_id, updated_at)
  values (
    p.user_id,
    case when is_agency then null else now() + make_interval(days => p.days) end,
    case when is_agency then now() + make_interval(days => p.days) else null end,
    p.id,
    now()
  )
  on conflict (user_id) do update
    set pro_until = case when is_agency then public.subscriptions.pro_until
                         else greatest(coalesce(public.subscriptions.pro_until, now()), now()) + make_interval(days => p.days) end,
        agency_until = case when is_agency
                         then greatest(coalesce(public.subscriptions.agency_until, now()), now()) + make_interval(days => p.days)
                         else public.subscriptions.agency_until end,
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

-- 4. Prices and limits (admins can change them in the admin portal -> Settings)
insert into public.app_settings (key, value) values
  ('plan_creator_price_xaf', '5000'::jsonb),
  ('plan_agency_price_xaf', '50000'::jsonb),
  ('plan_agency_daily_scripts', '150'::jsonb),
  ('free_scripts_per_day', '1'::jsonb),
  ('pro_days', '30'::jsonb)
on conflict (key) do nothing;

-- CHECK: every value should be true.
select
  exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'subscriptions' and column_name = 'agency_until') as agency_column_ready,
  (select count(*) from public.app_settings where key in ('plan_creator_price_xaf', 'plan_agency_price_xaf', 'plan_agency_daily_scripts')) = 3 as plan_prices_ready,
  not has_function_privilege('authenticated', 'public.grant_pro_for_payment(uuid, text, integer, text, text)', 'execute') as users_cannot_grant;
