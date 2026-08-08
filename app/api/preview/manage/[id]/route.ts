import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash, timingSafeEqual } from 'crypto'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// PATCH /api/preview/manage/[id]
//
// Revoke or restore a shared preview. A link sent to the wrong number, or to a
// prospect who has since gone cold, needs an off switch that does not involve
// deleting the record of what was sent.
// ---------------------------------------------------------------------------

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'

function isAdmin(): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false

  const expected = Buffer.from(createHash('sha256').update(password + SALT).digest('hex'))
  const raw = cookies().get(COOKIE_NAME)?.value
  if (!raw) return false
  const presented = Buffer.from(raw)
  if (presented.length !== expected.length) return false
  return timingSafeEqual(presented, expected)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ success: false, error: 'Not authorised' }, { status: 401 })
  }

  let revoked: boolean
  try {
    const body = await req.json()
    if (typeof body.revoked !== 'boolean') throw new Error('revoked must be a boolean')
    revoked = body.revoked
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  try {
    const { error } = await crmAdmin()
      .from('shared_previews')
      .update({ revoked })
      .eq('id', params.id)
    if (error) throw error
  } catch (err) {
    console.error('[preview/manage] update failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not update' }, { status: 502 })
  }

  return NextResponse.json({ success: true, revoked })
}
