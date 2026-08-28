import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { decorate, expiredPage, isBot, PREVIEW_BUCKET } from '@/lib/shared-preview'

// ---------------------------------------------------------------------------
// GET /p/[token]
//
// The client's view. No login: the token is the credential, so it is long and
// random, and the page is served noindex so a preview of someone's business
// never turns up in a search result.
//
// Served as a raw document rather than wrapped in the React app — the generator
// produces a complete HTML page, and rendering it inside another one would put
// two <html> elements on top of each other.
// ---------------------------------------------------------------------------

export const dynamic = 'force-dynamic'

function htmlResponse(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Every view must reach the server or the count silently stops moving.
      'Cache-Control': 'no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

interface PreviewRow {
  id: string
  business_name: string
  html_path: string
  expires_at: string
  revoked: boolean
  view_count: number
  first_viewed_at: string | null
  claimed_at: string | null
  created_by: string | null
}

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const token = params.token

  let preview: PreviewRow | null = null

  try {
    const { data, error } = await crmAdmin()
      .from('shared_previews')
      .select('id, business_name, html_path, expires_at, revoked, view_count, first_viewed_at, claimed_at, created_by')
      .eq('token', token)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    preview = (data as PreviewRow | null) ?? null
  } catch (err) {
    console.error('[p/token] lookup failed:', err instanceof Error ? err.message : err)
    return htmlResponse(expiredPage('this business'), 500)
  }

  if (!preview) {
    return htmlResponse(expiredPage('this business'), 404)
  }
  if (preview.revoked || new Date(preview.expires_at) < new Date()) {
    return htmlResponse(expiredPage(preview.business_name), 410)
  }

  let html: string
  try {
    const { data, error } = await crmAdmin().storage.from(PREVIEW_BUCKET).download(preview.html_path)
    if (error || !data) throw error ?? new Error('No file returned')
    html = await data.text()
  } catch (err) {
    console.error('[p/token] could not read stored preview:', err instanceof Error ? err.message : err)
    return htmlResponse(expiredPage(preview.business_name), 502)
  }

  // Link unfurlers are not readers. Counting them would tell a rep their client
  // opened the preview the moment they pasted it into WhatsApp.
  if (!isBot(req.headers.get('user-agent'))) {
    const now = new Date().toISOString()
    crmAdmin()
      .from('shared_previews')
      .update({
        view_count: preview.view_count + 1,
        last_viewed_at: now,
        first_viewed_at: preview.first_viewed_at ?? now,
      })
      .eq('id', preview.id)
      .then(undefined, err => console.error('[p/token] view count update failed:', err))
  }

  return htmlResponse(
    decorate(html, {
      token,
      businessName: preview.business_name,
      claimed: preview.claimed_at !== null,
      // Chatbot preview is discussed live in chat with bot's pricing rules;
      // hard R2000 offer card contradicts that conversation context.
      offer: preview.created_by !== 'chatbot',
    }),
  )
}
