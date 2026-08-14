-- ---------------------------------------------------------------------------
-- chat_questions — the chatbot's memory of what people actually ask.
--
-- Two jobs:
--   1. A record of every question put to the bot, ranked by how often it comes
--      up. That list is the most honest answer available to "what is missing
--      from the site?".
--   2. A cache. Once an answer here is approved, the matching question is
--      served from this table and DeepSeek is never called for it — the same
--      wording every time, instantly, for free.
--
-- Matching is fuzzy, so "how long does it take" also catches "how long will it
-- take?" and "what's the turnaround". It is done in the application (see
-- lib/chatbot/questions.ts) rather than with pg_trgm: the approved set is
-- small enough to hold in memory, and doing it in TypeScript means no
-- extension, no GIN index and no threshold tuned against an operator we cannot
-- see the workings of.
--
-- Nothing is served to a visitor until `approved` is set by hand on
-- /admin/chat-questions. An unapproved row is a log entry, not an answer.
-- ---------------------------------------------------------------------------

create table if not exists mountainstudios.chat_questions (
  id             uuid primary key default gen_random_uuid(),

  -- Exactly what the visitor typed, kept for reading back.
  question       text        not null,

  -- Lowercased, punctuation stripped, whitespace collapsed. This is what the
  -- matcher compares against; `question` is for human eyes.
  question_norm  text        not null,

  -- The canned reply. Seeded with whatever DeepSeek said so there is something
  -- to edit rather than a blank box, but never used until approved.
  answer         text,

  -- The gate. False for everything the bot logs on its own.
  approved       boolean     not null default false,

  asked_count    integer     not null default 1,
  last_asked_at  timestamptz not null default now(),
  created_at     timestamptz not null default now()
);

-- The approved set is read on every cache miss; the admin list is ordered by
-- how often a question comes up.
create index if not exists chat_questions_approved_count
  on mountainstudios.chat_questions (approved, asked_count desc);

-- One row per distinct normalised question: repeats bump asked_count instead of
-- adding another row. Without this the top-questions list would be one line per
-- visitor rather than a ranking. The upsert in questions.ts depends on it.
create unique index if not exists chat_questions_norm_unique
  on mountainstudios.chat_questions (question_norm);

-- The table is only ever reached through the service key, from /api/chat and
-- the admin page. RLS on with no policies means nothing else can read it, which
-- matters because the questions people type can contain their own details.
-- service_role bypasses RLS, so it still gets through; nobody else does.
alter table mountainstudios.chat_questions enable row level security;

-- New tables in this schema do NOT inherit service_role privileges — the first
-- rep application submit failed on exactly this, and contact_messages hit it
-- again on 10 August. Without these grants every insert from /api/chat is a 403
-- and questions are silently never logged. delete is included because the admin
-- page removes junk rows.
grant select, insert, update, delete on mountainstudios.chat_questions to service_role;
