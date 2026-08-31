import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { extractPreviewBrief } from '@/lib/chatbot/preview-brief'
import { makeToken, PREVIEW_BUCKET } from '@/lib/shared-preview'
import { verifyRecaptcha, blockedAsBot } from '@/lib/recaptcha'
import { clientKey } from '@/lib/rate-limit'
import { categoryColors } from '@/constants/business-types'

// ---------------------------------------------------------------------------
// POST /api/preview/chat
//
// The chatbot endpoint for generating a preview directly from conversation.
// Extracts business details from the chat transcript, validates them,
// generates a preview, stores it, and returns a durable link.
//
// Unlike /api/preview/email, this endpoint is called by the chatbot widget
// itself (not the wizard), so the preview is not emailed to the visitor —
// it is returned as a link they can use to revisit it later.
// ---------------------------------------------------------------------------

export const runtime = 'nodejs'
export const maxDuration = 60

const TTL_DAYS = 90

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

function baseUrl(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured) return configured.replace(/\/$/, '')
  return new URL(req.url).origin
}

async function rateLimitCheck(req: NextRequest, route: string): Promise<{ ok: boolean; hits: number; limit: number }> {
  const key = clientKey(req)
  const windowSeconds = 600 // 10 minutes
  const limit = 5

  try {
    const { data, error } = await crmAdmin().rpc('bump_rate_limit', {
      p_key: key,
      p_route: route,
      p_window_seconds: windowSeconds,
    })

    if (error) throw error

    const hits = typeof data === 'number' ? data : 0
    return { ok: hits <= limit, hits, limit }
  } catch (err) {
    // Fail open: if the database is unreachable, allow the request through.
    // Our infrastructure failure should not turn away a real visitor.
    console.warn(
      '[preview/chat] rate limit RPC failed, failing open:',
      err instanceof Error ? err.message : err,
    )
    return { ok: true, hits: 0, limit }
  }
}

export async function POST(req: NextRequest) {
  try {
    const rateLimitResult = await rateLimitCheck(req, 'preview/chat')
    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Give it a minute and try again.' },
        { status: 429 },
      )
    }

    let messages: Message[] = []
    let leadId: string | null = null
    let recaptchaToken: string | undefined

    try {
      const body = await req.json()
      messages = Array.isArray(body.messages) ? body.messages : []
      leadId = typeof body.leadId === 'string' && body.leadId ? body.leadId : null
      recaptchaToken = typeof body.recaptchaToken === 'string' ? body.recaptchaToken : undefined
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
    }

    // Extract preview brief from the conversation
    const brief = await extractPreviewBrief(messages)
    if (!brief) {
      return NextResponse.json(
        { error: 'not enough detail yet' },
        { status: 400 },
      )
    }

    // Verify reCAPTCHA (missing token is not a bot signal, only a real negative verdict blocks)
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)
    if (blockedAsBot(recaptchaResult)) {
      return NextResponse.json(
        { error: 'Request blocked. Refresh the page and try again.' },
        { status: 403 },
      )
    }

    // Call the preview generator endpoint
    let html: string
    let templateName: string | undefined
    try {
      // The token is not forwarded. A reCAPTCHA v3 token can be verified once, and
      // this route already spent it above — /api/preview/generate would get
      // `timeout-or-duplicate`, read it as a real bot verdict and 403. Same bug that
      // silently killed the wizard preview email for two days in August.
      const generateRes = await fetch(new URL('/api/preview/generate', req.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Forward the real visitor's IP. Without it this server-to-server call
          // arrives with no x-forwarded-for, clientKey() falls back to 'unknown',
          // and every chat preview on the site shares ONE bucket of 8 per hour —
          // so the ninth visitor in an hour is told their preview could not be
          // built, with nothing wrong at their end.
          'x-forwarded-for': clientKey(req),
        },
        body: JSON.stringify({
          businessName: brief.businessName,
          businessType: brief.businessType,
          businessCategory: brief.businessCategory,
          primaryColor: categoryColors[brief.businessCategory].primary,
          secondaryColor: categoryColors[brief.businessCategory].secondary,
          pages: brief.pages,
        }),
      })

      if (!generateRes.ok) {
        console.error('[preview/chat] generate returned', generateRes.status)
        return NextResponse.json(
          { error: 'could not build the preview' },
          { status: 502 },
        )
      }

      const generateData = await generateRes.json()
      html = generateData?.data?.html
      templateName = generateData?.data?.templateName
      if (!html) {
        console.error('[preview/chat] generate returned no html')
        return NextResponse.json(
          { error: 'could not build the preview' },
          { status: 502 },
        )
      }
    } catch (err) {
      console.error('[preview/chat] generate fetch failed:', err instanceof Error ? err.message : err)
      return NextResponse.json(
        { error: 'could not build the preview' },
        { status: 502 },
      )
    }

    // Store the preview
    const token = makeToken()
    const path = `${token}.html`
    const expiresAt = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString()

    try {
      const upload = await crmAdmin()
        .storage.from(PREVIEW_BUCKET)
        .upload(path, new Blob([html], { type: 'text/html' }), { contentType: 'text/html', upsert: false })
      if (upload.error) throw upload.error

      const { error } = await crmAdmin().from('shared_previews').insert({
        token,
        business_name: brief.businessName,
        lead_id: leadId ?? null,
        html_path: path,
        created_by: 'chatbot',
        expires_at: expiresAt,
        template: templateName ?? null,
      })
      if (error) {
        // Don't leave an orphaned file behind if the row failed.
        await crmAdmin().storage.from(PREVIEW_BUCKET).remove([path])
        throw error
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : err
      console.error('[preview/chat] could not save preview:', errMsg)
      return NextResponse.json({ error: 'Could not save the preview' }, { status: 502 })
    }

    const url = `/p/${token}`
    return NextResponse.json({ token, url }, { status: 200 })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : err
    console.error('[preview/chat] unexpected error:', errMsg)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    )
  }
}
