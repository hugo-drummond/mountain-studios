import { createClient } from '@supabase/supabase-js'

// The CRM at crm.mountainstudios.co.za, which is the Frankies Supabase project,
// schema `mountainstudios`.
//
// This is now the only database client in the repo. There used to be a second,
// lib/supabase-admin.ts, pointing at an older agency-backend database whose
// credentials were never set in production — so every route behind it returned
// 500 for months without anyone noticing. It and the routes that used it were
// deleted on 1 Sep 2026. The workflow they implemented is written up in Notion
// under "Archive — Legacy lead-to-delivery pipeline". If leads, briefs,
// bookings or payments are ever rebuilt, build them on this client rather than
// standing up a second one; two clients over two databases was the whole fault.
const CRM_SCHEMA = 'mountainstudios'

function build() {
  const url = process.env.CRM_SUPABASE_URL
  const serviceKey = process.env.CRM_SUPABASE_SERVICE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing CRM_SUPABASE_URL or CRM_SUPABASE_SERVICE_KEY environment variable.')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    db: { schema: CRM_SCHEMA },
    global: {
      // Next's App Router caches fetch() by default, and supabase-js talks over
      // fetch. Without this, a row read once is served from cache forever: a
      // revoked preview kept opening, and the admin tables would have frozen at
      // whatever they showed first. Database reads are never cacheable here.
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}

let _crmClient: ReturnType<typeof build> | null = null

export function crmAdmin() {
  if (!_crmClient) _crmClient = build()
  return _crmClient
}
