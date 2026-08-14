-- Free audit requests, referral partners, and the rate-limit counter.
--
-- Run in the Supabase dashboard SQL editor for project pqudglvwdfsnmckqswnk
-- (the CRM database — schema `mountainstudios`). There is no database password
-- or connection string in either repo, so this is applied by hand.
--
-- Safe to run more than once: every statement is `if not exists` or
-- `create or replace`, and nothing here drops or rewrites existing data.

-- ===========================================================================
-- 1. Free audit requests
-- ===========================================================================
--
-- The "Get a free website audit" box on the homepage. Until now its submit
-- handler was `preventDefault(); setAuditDone(true)` — it showed "your audit is
-- on the way" and threw the URL away. Third instance of that same fault, after
-- Get Started (8 Aug) and the contact form (10 Aug).
--
-- Its own table rather than a column on `leads`, because the audit report that
-- is coming needs somewhere to live: a URL, a generated report, and when it was
-- sent are facts about the audit, not about the person. `lead_id` links back to
-- the pipeline row so a rep working the lead can find the audit and vice versa.
--
-- /api/audit/submit also writes a `leads` row with source='website'. A business
-- pasting its own website and asking for a review is the warmest inbound this
-- site produces, and a row only in this table is a row no rep ever sees. Both
-- writes are caught separately — the audit row surviving on its own is worth
-- far more than a clean error — so lead_id is nullable on purpose.

create table if not exists mountainstudios.audit_requests (
  id              uuid primary key default gen_random_uuid(),
  website_url     text not null,
  email           text not null,
  lead_id         uuid,                            -- best-effort link, see above
  status          text not null default 'new',     -- new | report_sent | done
  report          jsonb,                           -- filled by the report builder, later
  report_sent_at  timestamptz,
  source          text not null default 'website',
  recaptcha_note  text,                            -- advisory verdict, null when it passed
  created_at      timestamptz not null default now()
);

create index if not exists audit_requests_created_idx
  on mountainstudios.audit_requests (created_at desc);

create index if not exists audit_requests_status_idx
  on mountainstudios.audit_requests (status, created_at desc);

-- ===========================================================================
-- 2. Referral partners
-- ===========================================================================
--
-- The "Know a business that needs a website? We'll pay you R1000" form on the
-- homepage. Same fault as the audit box — it saved nothing.
--
-- Deliberately NOT a lead. The three fields on that form are the *referrer's*
-- own name, email and mobile. This person is not buying anything; putting them
-- on the pipeline board would have a rep phoning to sell a website to someone
-- who is trying to hand them a customer.
--
-- `ref_code` is generated in the route, not here — keeping it in application
-- code means the format can change without a migration.
--
-- One person, one row: the unique index on lower(email) means someone who
-- submits the form twice gets their original code back rather than a second
-- one. The route selects on email first and treats a 23505 from a simultaneous
-- second submit as "already exists, re-read it", because a unique index is the
-- only thing that actually holds under a race.
--
-- What this table does NOT do yet: notice when a referral link is opened, tie
-- that visit to a lead, or work out who is owed R1000. That is attribution and
-- it is its own job — on the to-do. Until it is built the codes are issued and
-- matched by hand, so no column here pretends otherwise.

create table if not exists mountainstudios.referral_partners (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  email           text not null,
  phone           text,
  ref_code        text not null unique,
  status          text not null default 'active',  -- active | paused
  link_sent_at    timestamptz,                     -- null means the email did not go out
  recaptcha_note  text,
  created_at      timestamptz not null default now()
);

create unique index if not exists referral_partners_email_idx
  on mountainstudios.referral_partners (lower(email));

create index if not exists referral_partners_created_idx
  on mountainstudios.referral_partners (created_at desc);

-- ===========================================================================
-- 3. Rate limit counters
-- ===========================================================================
--
-- Replaces the in-memory Map in /api/chat, which counted per serverless
-- instance: every cold start began at zero, so the limit it appeared to
-- enforce was mostly theatre.
--
-- Fixed windows, not a sliding log. One row per (visitor, route, window)
-- carrying a single integer, rather than a row per request. A sliding window is
-- more precise at the boundary and costs a row for every call plus a scan on
-- every check; at this traffic that precision buys nothing.
--
-- Not shown in the CRM. This is plumbing.

create table if not exists mountainstudios.rate_limits (
  key           text        not null,   -- the visitor, usually an IP
  route         text        not null,
  window_start  timestamptz not null,
  hits          integer     not null default 0,
  primary key (key, route, window_start)
);

create index if not exists rate_limits_window_idx
  on mountainstudios.rate_limits (window_start);

-- Counts one request and returns the running total for the current window.
--
-- The increment has to happen inside the database. Read-then-write from Node
-- loses count under exactly the traffic a rate limiter exists for: two requests
-- read 4, both write 5, and a limit of 5 lets six through. `on conflict do
-- update` is a single atomic statement, so it cannot.
--
-- Returns the count rather than an allow/deny. The limits themselves stay in
-- application code where they can be tuned on a deploy instead of a migration.
--
-- `security definer` with `set search_path = ''` matches every other function
-- in this schema: an empty search_path means each table has to be named with
-- its schema, so the body cannot be redirected by a caller's search_path.
create or replace function mountainstudios.bump_rate_limit(
  p_key            text,
  p_route          text,
  p_window_seconds integer
) returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window_start timestamptz;
  v_hits         integer;
begin
  if p_window_seconds is null or p_window_seconds < 1 then
    raise exception 'p_window_seconds must be at least 1';
  end if;

  -- Floor now() to the start of its window, so every request in the same
  -- period lands on the same row.
  v_window_start := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );

  insert into mountainstudios.rate_limits as rl (key, route, window_start, hits)
  values (p_key, p_route, v_window_start, 1)
  on conflict (key, route, window_start)
    do update set hits = rl.hits + 1
  returning rl.hits into v_hits;

  -- Old windows are dead weight — nothing reads a window that has passed.
  -- Cleared on roughly one call in a hundred rather than on a schedule, so
  -- the table stays small without pg_cron or a job that can silently stop.
  if random() < 0.01 then
    delete from mountainstudios.rate_limits
    where window_start < now() - interval '1 day';
  end if;

  return v_hits;
end;
$$;

-- ===========================================================================
-- 4. Grants — read this before adding another table to this schema
-- ===========================================================================
--
-- This schema has no default privileges for new tables, so a fresh table is
-- unreachable even by service_role until it is granted explicitly. The error is
-- `permission denied for table`, which reads exactly like an RLS refusal and is
-- not one: Postgres checks table privileges before it ever reaches a policy.
-- This has now bitten four times — notifications (8 Aug), contact_messages
-- (10 Aug), mail_threads (11 Aug), and contact_messages again when a delete
-- button was wanted (12 Aug).
--
-- RLS on with no policies, same as contact_messages and rep_applications: the
-- marketing site writes with the service key, the CRM reads with the service
-- client behind requireAdmin(), and the anon key reaches nothing at all.
alter table mountainstudios.audit_requests    enable row level security;
alter table mountainstudios.referral_partners enable row level security;
alter table mountainstudios.rate_limits       enable row level security;

-- DELETE is granted here, unlike contact_messages. That table withheld it so
-- "a bug cannot start", which was sound right up until a delete button was
-- actually wanted and the route had to return a 501 naming the missing grant.
-- These two will want the same admin-gated delete, so the grant goes in now.
-- service_role only — deletes stay reachable solely through an admin-gated
-- route, never from a browser.
grant select, insert, update, delete on mountainstudios.audit_requests    to service_role;
grant select, insert, update, delete on mountainstudios.referral_partners to service_role;
grant select, insert, update, delete on mountainstudios.rate_limits       to service_role;

-- Nothing but the marketing site's service key ever counts a request.
revoke all on function mountainstudios.bump_rate_limit(text, text, integer) from public;
grant execute on function mountainstudios.bump_rate_limit(text, text, integer) to service_role;
