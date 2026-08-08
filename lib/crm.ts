import { createClient } from '@supabase/supabase-js'

// The CRM at crm.mountainstudios.co.za, which is the Frankies Supabase project,
// schema `mountainstudios`.
//
// Deliberately NOT lib/supabase-admin.ts. That client is the legacy
// agency-backend database behind app/admin and app/api/leads/create, and it has
// no environment variables set in production at all. Repointing it here would
// silently aim every one of those routes at a database that has none of their
// tables. Separate names, separate client, no collision.
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
  })
}

let _crmClient: ReturnType<typeof build> | null = null

export function crmAdmin() {
  if (!_crmClient) _crmClient = build()
  return _crmClient
}
