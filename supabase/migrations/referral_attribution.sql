-- ---------------------------------------------------------------------------
-- Referral attribution.
--
-- `referral_partners` already issues a code and emails a link. Until now that
-- was the end of it: nothing recorded that a link was opened, nothing tied the
-- visitor to a lead, and nobody could say who was owed R1000 without matching
-- it up by hand. This adds the three pieces that close that loop.
--
--   1. referral_visits   — a link was opened
--   2. leads.referred_by_code — that visitor became a lead
--   3. referral_payouts  — that lead closed, so R1000 is owed
--
-- Run against project pqudglvwdfsnmckqswnk, schema `mountainstudios`.
-- Safe to run more than once: every statement is `if not exists` or `or
-- replace`.
-- ---------------------------------------------------------------------------

-- ===========================================================================
-- 1. Visits
-- ===========================================================================
--
-- No IP address and no user agent are stored, only a salted hash of them. The
-- hash exists to answer "is this the same person again today", which is all a
-- visit count needs; keeping the raw values would be collecting personal
-- information to no purpose. POPIA aside, it is data we would then have to
-- defend.

create table if not exists mountainstudios.referral_visits (
  id            uuid primary key default gen_random_uuid(),
  ref_code      text not null references mountainstudios.referral_partners(ref_code) on delete cascade,
  landing_path  text,
  referrer_host text,
  visitor_hash  text,
  -- Written by the route, not `current_date`, so the day is the visitor's own
  -- (SAST) rather than the database's UTC.
  visit_day     date not null default (now() at time zone 'Africa/Johannesburg')::date,
  created_at    timestamptz not null default now()
);

create index if not exists referral_visits_code_idx
  on mountainstudios.referral_visits (ref_code, created_at desc);

-- One visit per person per code per day. Without this a partner refreshing
-- their own link fifty times looks like fifty people, which would make the
-- number worse than useless — it would be misleading.
create unique index if not exists referral_visits_dedupe_idx
  on mountainstudios.referral_visits (ref_code, visitor_hash, visit_day)
  where visitor_hash is not null;

-- ===========================================================================
-- 2. The lead a referral produced
-- ===========================================================================
--
-- On the lead itself rather than a join table: a rep looking at a lead needs to
-- see it came from a partner, and every existing query against `leads` keeps
-- working untouched.
--
-- First touch wins, enforced in the application (lib/referral.ts) — the column
-- is only ever written when it is null. Someone who arrives on Alice's link,
-- leaves, comes back on Bob's and then enquires is Alice's referral. That is
-- the version a partner can be told in one sentence.

alter table mountainstudios.leads
  add column if not exists referred_by_code text,
  add column if not exists referred_at      timestamptz;

do $$
begin
  -- SET NULL, not CASCADE: removing a partner must never delete the businesses
  -- they sent us.
  if not exists (
    select 1 from pg_constraint where conname = 'leads_referred_by_code_fkey'
  ) then
    alter table mountainstudios.leads
      add constraint leads_referred_by_code_fkey
      foreign key (referred_by_code)
      references mountainstudios.referral_partners(ref_code)
      on delete set null;
  end if;
end $$;

create index if not exists leads_referred_by_idx
  on mountainstudios.leads (referred_by_code)
  where referred_by_code is not null;

-- ===========================================================================
-- 3. What is owed
-- ===========================================================================
--
-- One row per closed referred lead. Unique on lead_id, so the same close can
-- never be counted twice however many times the status is toggled.

create table if not exists mountainstudios.referral_payouts (
  id         uuid primary key default gen_random_uuid(),
  partner_id uuid not null references mountainstudios.referral_partners(id) on delete cascade,
  lead_id    uuid not null unique references mountainstudios.leads(id) on delete cascade,
  amount     numeric(10,2) not null default 1000,
  status     text not null default 'unpaid' check (status in ('unpaid','paid')),
  paid_at    timestamptz,
  note       text,
  created_at timestamptz not null default now()
);

create index if not exists referral_payouts_partner_idx
  on mountainstudios.referral_payouts (partner_id, status);

-- A trigger, not application code, for the same reason the lead→client close
-- hook is one: `crm_status` is written from five places and three of them are
-- browser-direct calls that never reach a server route. Anything that lives in
-- application code would miss most real closes.
create or replace function mountainstudios.referral_payout_on_close()
returns trigger
language plpgsql
security definer
set search_path = mountainstudios, public
as $$
declare
  partner uuid;
begin
  if new.crm_status = 'closed'
     and coalesce(old.crm_status, '') <> 'closed'
     and new.referred_by_code is not null then

    select id into partner
    from mountainstudios.referral_partners
    where ref_code = new.referred_by_code;

    if partner is not null then
      insert into mountainstudios.referral_payouts (partner_id, lead_id)
      values (partner, new.id)
      on conflict (lead_id) do nothing;
    end if;
  end if;

  return new;
end
$$;

drop trigger if exists leads_referral_payout on mountainstudios.leads;
create trigger leads_referral_payout
  after update of crm_status on mountainstudios.leads
  for each row
  execute function mountainstudios.referral_payout_on_close();

-- ===========================================================================
-- 4. What the CRM reads
-- ===========================================================================
--
-- The counts are computed here rather than in the admin route: PostgREST caps
-- a plain select at 1000 rows and there are already 1,770 leads, so counting
-- them in TypeScript would silently come out ~43% short.

create or replace view mountainstudios.referral_summary as
select
  p.id,
  p.full_name,
  p.email,
  p.phone,
  p.ref_code,
  p.status,
  p.link_sent_at,
  p.created_at,
  (select count(*) from mountainstudios.referral_visits v
     where v.ref_code = p.ref_code)                                as visits,
  (select count(*) from mountainstudios.leads l
     where l.referred_by_code = p.ref_code)                        as leads,
  (select count(*) from mountainstudios.leads l
     where l.referred_by_code = p.ref_code
       and l.crm_status = 'closed')                                as closed,
  coalesce((select sum(x.amount) from mountainstudios.referral_payouts x
     where x.partner_id = p.id and x.status = 'unpaid'), 0)        as owed,
  coalesce((select sum(x.amount) from mountainstudios.referral_payouts x
     where x.partner_id = p.id and x.status = 'paid'), 0)          as paid,
  (select max(v.created_at) from mountainstudios.referral_visits v
     where v.ref_code = p.ref_code)                                as last_visit_at
from mountainstudios.referral_partners p;

-- ===========================================================================
-- 5. Grants
-- ===========================================================================
--
-- New objects in this schema do NOT inherit service_role privileges. Every
-- table added here has hit that at least once: without these, each insert is a
-- 403 that reads like an auth bug.

alter table mountainstudios.referral_visits  enable row level security;
alter table mountainstudios.referral_payouts enable row level security;

grant select, insert, update, delete on mountainstudios.referral_visits  to service_role;
grant select, insert, update, delete on mountainstudios.referral_payouts to service_role;
grant select                          on mountainstudios.referral_summary to service_role;
