import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { crmAdmin } from '@/lib/crm'
import { screenApplication } from '@/lib/screen-application'

// ---------------------------------------------------------------------------
// POST /api/careers/screen
//
// The safety net. /api/careers/apply kicks off screening without awaiting it,
// which means a DeepSeek outage — or a serverless function frozen the moment
// it responded — can leave an application with screened_at null forever.
//
// This picks those up. The review table calls it on load, so simply opening
// /admin/applications repairs anything that slipped through. No cron.
//
// Admin only: it spends money per call.
// ---------------------------------------------------------------------------

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'
// One page of the review table's worth. Keeps a single request well inside the
// serverless timeout even when a backlog has built up; call it again for more.
const BATCH_LIMIT = 25

function isAdmin(): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false

  const expected = createHash('sha256').update(password + SALT).digest('hex')
  const value = cookies().get(COOKIE_NAME)?.value
  if (!value || value.length !== expected.length) return false

  let diff = 0
  for (let i = 0; i < value.length; i++) {
    diff |= value.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

export async function POST() {
  if (!isAdmin()) {
    return NextResponse.json({ success: false, error: 'Not authorised' }, { status: 401 })
  }

  let ids: string[]
  try {
    const { data, error } = await crmAdmin()
      .from('rep_applications')
      .select('id')
      .is('screened_at', null)
      .order('created_at', { ascending: true })
      .limit(BATCH_LIMIT)

    if (error) throw error
    ids = (data ?? []).map(r => r.id as string)
  } catch (err) {
    console.error('[careers/screen] could not list unscored applications:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not read applications' }, { status: 502 })
  }

  // Sequential on purpose. These are background repairs, not a user waiting —
  // and firing 25 concurrent calls at DeepSeek is how you get rate limited.
  let screened = 0
  for (const id of ids) {
    const result = await screenApplication(id)
    if (result) screened++
  }

  return NextResponse.json({
    success: true,
    found: ids.length,
    screened,
    remaining: ids.length === BATCH_LIMIT ? 'more may be pending' : 'none',
  })
}
