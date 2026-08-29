import { createHash } from 'crypto'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// Server-side funnel tracking helpers.
//
// This file is server-only and contains all database writes and operations
// that must never be exposed to the client. Imported only by the ingest route.
// ---------------------------------------------------------------------------

/**
 * Derive device type from user agent string.
 */
export function deviceFromUserAgent(ua: string | null): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  if (!ua) return 'unknown'

  const lower = ua.toLowerCase()

  // Mobile phones (but not tablets)
  if (/(mobile|iphone|android(?!.*tablet)|windows phone)/i.test(ua)) {
    return 'mobile'
  }

  // Tablets
  if (/(ipad|android|tablet|kindle|playbook)/i.test(ua)) {
    return 'tablet'
  }

  // Desktop
  if (/(windows|macintosh|linux)/i.test(ua)) {
    return 'desktop'
  }

  return 'unknown'
}

/**
 * Hash IP and user agent for POPIA compliance.
 * Salted from SITE_EVENT_SALT env var so the hash space cannot be lined up
 * against other hashes (like referral visit hashes).
 */
export function eventHash(ip: string, ua: string): string {
  const salt = process.env.SITE_EVENT_SALT || 'default-salt'
  return createHash('sha256').update(`${salt}:${ip}:${ua}`).digest('hex').slice(0, 32)
}

/**
 * Batch insert events into the database.
 * Never throws; errors are logged and swallowed.
 */
export async function recordEvents(
  rows: Array<{
    visitor_id: string
    session_id: string
    lead_id?: string | null
    event: string
    path?: string
    device_type: 'mobile' | 'tablet' | 'desktop' | 'unknown'
    occurred_at: Date
    step?: number | null
    value_num?: number | null
    label?: string | null
    props?: Record<string, unknown>
    ip_ua_hash?: string
    source?: 'site' | 'preview' | 'server'
  }>,
): Promise<void> {
  if (rows.length === 0) return

  try {
    const { error } = await crmAdmin().from('site_events').insert(rows)

    if (error) throw error
  } catch (err) {
    console.error('[site-events] recordEvents failed:', err instanceof Error ? err.message : err)
  }
}

/**
 * Stamp a visitor ID onto a lead. First touch wins: the update is conditional
 * on the column still being null, so if somehow a lead already has a visitor_id,
 * it stays.
 *
 * Also updates site_visitors.lead_id if a matching visitor row exists.
 *
 * Never throws. A visitor stamp that fails must not take down the form that
 * created the lead.
 */
export async function attachVisitorToLead(
  leadId: string | null | undefined,
  visitorId: string | null | undefined,
): Promise<void> {
  if (!leadId || !visitorId) return

  try {
    // Update the lead
    const { error: leadError } = await crmAdmin()
      .from('leads')
      .update({ visitor_id: visitorId })
      .eq('id', leadId)
      .is('visitor_id', null)

    if (leadError) throw leadError

    // Try to update the visitor row if it exists
    try {
      await crmAdmin()
        .from('site_visitors')
        .update({ lead_id: leadId, first_lead_at: new Date().toISOString() })
        .eq('visitor_id', visitorId)
        .is('lead_id', null)
    } catch {
      // Visitor row might not exist yet (event arrived before the visitor beacon),
      // which is fine. Just log it if we want to investigate, but don't throw.
    }
  } catch (err) {
    console.error('[site-events] attachVisitorToLead failed:', err instanceof Error ? err.message : err)
  }
}

/**
 * Backfill lead_id onto existing events from this visitor.
 * Bounded by visitor_id and 90 days, so it can never become a full-table update.
 *
 * This is what turns a pile of anonymous page views into "this lead looked at
 * four pages, spent 90 seconds on pricing, and gave us an email".
 *
 * Never throws. A failed stitch must not fail the request that created the lead.
 */
export async function stitchEventsToLead(
  visitorId: string,
  leadId: string,
): Promise<void> {
  try {
    const { error } = await crmAdmin()
      .from('site_events')
      .update({ lead_id: leadId })
      .eq('visitor_id', visitorId)
      .is('lead_id', null)
      .gt('occurred_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())

    if (error) throw error
  } catch (err) {
    console.error('[site-events] stitchEventsToLead failed:', err instanceof Error ? err.message : err)
  }
}
