-- Prospect website scrape storage
-- Run this in the Supabase SQL Editor

create table if not exists prospect_scrapes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  source_url text not null,
  source_domain text not null,
  raw_html text,
  extracted_data jsonb not null,
  business_name text,
  business_type text,
  lead_id uuid references leads(id),
  status text default 'scraped'
);

-- Index for quick lookups
create index if not exists idx_prospect_scrapes_domain on prospect_scrapes(source_domain);
create index if not exists idx_prospect_scrapes_lead on prospect_scrapes(lead_id);
create index if not exists idx_prospect_scrapes_created on prospect_scrapes(created_at desc);
