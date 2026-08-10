-- Messages from the "Get in touch" form on the homepage.
--
-- Run in the Supabase dashboard SQL editor for project pqudglvwdfsnmckqswnk
-- (the CRM database — schema `mountainstudios`). The MCP access token is
-- expired, so this is applied by hand.
--
-- Kept apart from `leads` on purpose. An enquiry arrives with a name, an email
-- and a paragraph — no business name, no category, and no area. `leads` rows
-- are assigned to reps by territory, which keys on search_area, so a pile of
-- rows that can never match a territory would sit in the pipeline unassignable.
-- These are read in the CRM at /messages and only become a lead once someone
-- has spoken to the person.

create table if not exists mountainstudios.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text not null,
  phone      text,                              -- optional on the form
  message    text not null,
  status     text not null default 'new',       -- new | replied | archived
  source     text not null default 'website',
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx
  on mountainstudios.contact_messages (status, created_at desc);

-- Service-role only, same as rep_applications. /api/contact/submit writes with
-- CRM_SUPABASE_SERVICE_KEY and the CRM reads with the service client behind
-- requireAdmin(); with RLS on and no policies, the anon key reaches nothing.
alter table mountainstudios.contact_messages enable row level security;

-- This schema has no default privileges for new tables, so a fresh table is
-- unreachable even by service_role until it is granted explicitly — the error
-- is `permission denied for table`, which reads like RLS but is not.
-- No delete: nothing in either app removes a message, and withholding the
-- grant means a bug cannot start.
grant select, insert, update on mountainstudios.contact_messages to service_role;
