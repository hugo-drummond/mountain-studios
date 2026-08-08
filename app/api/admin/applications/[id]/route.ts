import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// PATCH /api/admin/applications/[id]
//
// The shortlist / reject / hire buttons on the review table. Status is the only
// thing a person changes by hand — the model's score is never editable, so the
// two never end up contradicting each other in the same row.
// ---------------------------------------------------------------------------

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'
const ALLOWED_STATUS = ['new', 'shortlisted', 'rejected', 'hired']

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ success: false, error: 'Not authorised' }, { status: 401 })
  }

  let status: string
  try {
    const body = await req.json()
    status = String(body.status ?? '')
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  if (!ALLOWED_STATUS.includes(status)) {
    return NextResponse.json({ success: false, error: 'Unknown status' }, { status: 400 })
  }

  try {
    const { error } = await crmAdmin()
      .from('rep_applications')
      .update({ status })
      .eq('id', params.id)

    if (error) throw error
  } catch (err) {
    console.error('[admin/applications] status update failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not update' }, { status: 502 })
  }

  return NextResponse.json({ success: true, status })
}
