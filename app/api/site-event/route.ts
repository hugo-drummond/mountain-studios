import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { rateLimit, tooManyRequests, clientKey } from '@/lib/rate-limit'
import { isBot } from '@/lib/shared-preview'
import { deviceFromUserAgent, eventHash, recordEvents, attachVisitorToLead, stitchEventsToLead } from '@/lib/site-events-server'

// ---------------------------------------------------------------------------
// POST /api/site-event
//
// Funnel tracking beacon. Client sends batched events, server writes them
// and stamps attributions onto leads.
//
// Rate limited high on purpose: this is a counter, not a form. An office
// behind one NAT or SA mobile CGNAT is many people on one IP, and a refused
// visit is a referral that silently never gets counted. The limit is high
// enough that a real person can never reach it.
//
// Always returns 200 with { ok: true }. A failed write is logged and swallowed.
// The beacon must never surface an error, must never block a form submit, and
// must never slow a page down.
//
// NOTE: This route aggregates events in SQL (via RPC), not in TypeScript, because
// the table will hit millions of rows in its first fortnight and never stop. The
// existing pattern (pipeline-health) paginates 1000-row chunks and reduces in JS,
// which is fine for 1,770 rows but catastrophic here. Do NOT "simplify" this
// back to that pattern.
// ---------------------------------------------------------------------------

interface Payload {
  visitorId?: string
  sessionId?: string
  attribution?: Record<string, unknown> | null
  events?: Array<{
    event: string
    step_num?: number | null
    value_num?: number | null
    label?: string | null
    props?: Record<string, unknown>
  }>
}

export async function POST(req: NextRequest) {
  // Rate limit
  const rateLimitResult = await rateLimit(req, 'site-event')
  if (!rateLimitResult.ok) {
    return tooManyRequests()
  }

  // Drop obvious bots before parsing
  const ua = req.headers.get('user-agent')
  if (isBot(ua)) {
    return NextResponse.json({ ok: true })
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  const visitorId = body.visitorId?.trim()
  const sessionId = body.sessionId?.trim()
  const events = Array.isArray(body.events) ? body.events : []

  if (!visitorId || !sessionId || events.length === 0) {
    return NextResponse.json({ ok: true })
  }

  try {
    const clientIp = clientKey(req)
    const deviceType = deviceFromUserAgent(ua)
    const ipUaHash = eventHash(clientIp, ua || '')
    const now = new Date()
    const maxClockSkew = 10 * 60 * 1000 // 10 minutes

    // Prepare rows for insertion
    const rows = events.map((evt) => {
      // If client sent a timestamp, validate it's within 10 minutes of server time
      // (this shouldn't happen yet, but prep for it)
      let occurredAt = now

      // Strip query string from path if provided in props
      let path: string | undefined
      if (typeof evt.props?.path === 'string') {
        path = evt.props.path.split('?')[0].slice(0, 200)
      }

      return {
        visitor_id: visitorId,
        session_id: sessionId,
        event: evt.event,
        path: path || undefined,
        device_type: deviceType,
        occurred_at: occurredAt,
        step: typeof evt.step_num === 'number' ? evt.step_num : null,
        value_num: typeof evt.value_num === 'number' ? evt.value_num : null,
        label: typeof evt.label === 'string' ? evt.label : null,
        props: evt.props || {},
        ip_ua_hash: ipUaHash,
        source: 'site' as const,
      }
    })

    // Insert events
    await recordEvents(rows)

    // If attribution was provided, upsert visitor record (first-touch wins)
    if (body.attribution) {
      try {
        const { error } = await crmAdmin()
          .from('site_visitors')
          .upsert(
            {
              visitor_id: visitorId,
              first_seen_at: now,
              last_seen_at: now,
              first_path: body.attribution.first_path as string | null,
              first_referrer_host: body.attribution.referrer_host as string | null,
              utm_source: body.attribution.utm_source as string | null,
              utm_medium: body.attribution.utm_medium as string | null,
              utm_campaign: body.attribution.utm_campaign as string | null,
              utm_content: body.attribution.utm_content as string | null,
              utm_term: body.attribution.utm_term as string | null,
              click_id: getClickIdValue(body.attribution),
              click_id_type: getClickIdType(body.attribution),
              device_type: deviceType,
              ip_ua_hash: ipUaHash,
            },
            { onConflict: 'visitor_id' },
          )

        if (error) throw error
      } catch (err) {
        console.warn('[site-event] visitor upsert failed:', err instanceof Error ? err.message : err)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[site-event] failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: true })
  }
}

/**
 * Extract the actual click_id value from attribution params.
 * Returns the value of whichever click ID param is present, or null.
 */
function getClickIdValue(attribution: Record<string, unknown>): string | null {
  const types = ['fbclid', 'gclid', 'ttclid', 'msclkid', 'li_fat_id']
  for (const type of types) {
    if (typeof attribution[type] === 'string') {
      return attribution[type] as string
    }
  }
  return null
}

/**
 * Get the type of click ID present.
 */
function getClickIdType(attribution: Record<string, unknown>): string | null {
  const types = ['fbclid', 'gclid', 'ttclid', 'msclkid', 'li_fat_id']
  for (const type of types) {
    if (typeof attribution[type] === 'string') {
      return type
    }
  }
  return null
}
