import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash, timingSafeEqual } from 'crypto'
import { crmAdmin } from '@/lib/crm'
import { makeToken, PREVIEW_BUCKET } from '@/lib/shared-preview'

// ---------------------------------------------------------------------------
// POST /api/preview/share
//
// Turns a generated preview into a link a rep can send. Stores the finished
// HTML as-is: what the rep saw when they pitched is what the client sees a week
// later, and no template change can rewrite the page underneath them.
//
// Two ways in — the admin cookie, or a shared key for the CRM once it calls
// this. Not open: saving costs storage, and an open endpoint is a place to park
// arbitrary HTML on our domain.
// ---------------------------------------------------------------------------

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'
const MAX_HTML_BYTES = 10 * 1024 * 1024
const DEFAULT_TTL_DAYS = 30

function constantTimeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

function isAuthorised(req: NextRequest): boolean {
  const shareKey = process.env.PREVIEW_SHARE_KEY
  const presented = req.headers.get('x-share-key')
  if (shareKey && presented && constantTimeEqual(presented, shareKey)) return true

  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const expected = createHash('sha256').update(password + SALT).digest('hex')
  const cookie = cookies().get(COOKIE_NAME)?.value
  return !!cookie && constantTimeEqual(cookie, expected)
}

function baseUrl(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured) return configured.replace(/\/$/, '')
  return new URL(req.url).origin
}

export async function POST(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ success: false, error: 'Not authorised' }, { status: 401 })
  }

  let html: string
  let businessName: string
  let leadId: string | null
  let createdBy: string | null
  let templateName: string | null
  let ttlDays: number
  try {
    const body = await req.json()
    html = typeof body.html === 'string' ? body.html : ''
    businessName = typeof body.businessName === 'string' ? body.businessName.trim() : ''
    leadId = typeof body.leadId === 'string' && body.leadId ? body.leadId : null
    createdBy = typeof body.createdBy === 'string' && body.createdBy ? body.createdBy.slice(0, 120) : null
    templateName = typeof body.templateName === 'string' && body.templateName ? body.templateName : null
    ttlDays = Number.isFinite(body.ttlDays) ? Math.min(365, Math.max(1, Math.round(body.ttlDays))) : DEFAULT_TTL_DAYS
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!html || !businessName) {
    return NextResponse.json({ success: false, error: 'html and businessName are required' }, { status: 400 })
  }
  if (Buffer.byteLength(html, 'utf8') > MAX_HTML_BYTES) {
    return NextResponse.json({ success: false, error: 'Preview is too large to share' }, { status: 413 })
  }

  const token = makeToken()
  const path = `${token}.html`
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000).toISOString()

  try {
    const upload = await crmAdmin()
      .storage.from(PREVIEW_BUCKET)
      .upload(path, new Blob([html], { type: 'text/html' }), { contentType: 'text/html', upsert: false })
    if (upload.error) throw upload.error

    const { error } = await crmAdmin().from('shared_previews').insert({
      token,
      business_name: businessName,
      lead_id: leadId,
      html_path: path,
      created_by: createdBy,
      expires_at: expiresAt,
      template: templateName,
    })
    if (error) {
      // Don't leave an orphaned file behind if the row failed.
      await crmAdmin().storage.from(PREVIEW_BUCKET).remove([path])
      throw error
    }
  } catch (err) {
    console.error('[preview/share] could not save preview:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not save the preview' }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    token,
    url: `${baseUrl(req)}/p/${token}`,
    expiresAt,
  })
}
