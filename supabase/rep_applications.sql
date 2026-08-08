-- Applications from /careers/sales-rep.
--
-- Run in the Supabase dashboard SQL editor for project pqudglvwdfsnmckqswnk
-- (the CRM database — schema `mountainstudios`). The MCP access token is
-- expired, so this is applied by hand.

create table if not exists mountainstudios.rep_applications (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null,
  phone       text not null,
  province    text not null,
  city        text not null,
  why_sales   text not null,
  persuasion  text not null,
  work_rights boolean not null,
  has_laptop  boolean not null,
  cv_path     text,
  status      text not null default 'new',      -- new | shortlisted | rejected | hired
  source      text not null default 'website',  -- website | linkedin
  created_at  timestamptz not null default now()
);

create index if not exists rep_applications_status_idx
  on mountainstudios.rep_applications (status, created_at desc);

-- Service-role only. /api/careers/apply uses CRM_SUPABASE_SERVICE_KEY, which
-- bypasses RLS; with RLS on and no policies, the anon key can reach nothing.
alter table mountainstudios.rep_applications enable row level security;

-- The private bucket for CVs. Create it in Storage → New bucket, named
-- `rep-cvs`, with "Public bucket" OFF. No policies: the route uploads and
-- signs links with the service key.
