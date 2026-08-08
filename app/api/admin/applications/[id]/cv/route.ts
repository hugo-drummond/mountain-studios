import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// GET /api/admin/applications/[id]/cv
//
// Redirects to a short-lived signed URL for the applicant's CV. The bucket is
// private and stays that way — signing on demand behind the admin cookie means
// no permanent link to someone's personal document ever exists.
// ---------------------------------------------------------------------------

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'
const CV_BUCKET = 'rep-cvs'
// Long enough to open and read, short enough that a copied URL is useless by
// the time it lands anywhere else.
const TTL_SECONDS = 300

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

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }

  try {
    const { data, error } = await crmAdmin()
      .from('rep_applications')
      .select('cv_path')
      .eq('id', params.id)
      .single()

    if (error) throw error
    const path = data?.cv_path as string | null
    if (!path) return NextResponse.json({ error: 'No CV on this application' }, { status: 404 })

    const signed = await crmAdmin().storage.from(CV_BUCKET).createSignedUrl(path, TTL_SECONDS)
    if (signed.error || !signed.data?.signedUrl) throw signed.error ?? new Error('No signed URL returned')

    return NextResponse.redirect(signed.data.signedUrl)
  } catch (err) {
    console.error('[admin/applications] CV link failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Could not open the CV' }, { status: 502 })
  }
}
