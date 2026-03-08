import type { NotificationType, Notification } from '@/types'
import { supabaseAdmin } from '@/lib/supabase-admin'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CreateNotificationOpts {
  type: NotificationType
  title: string
  body: string
  lead_id?: string
  metadata?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function forwardToWebhook(notification: Notification): Promise<number | null> {
  const url = process.env.NOTIFICATION_WEBHOOK_URL
  if (!url) return null

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: notification.type,
        title: notification.title,
        body: notification.body,
        metadata: notification.metadata ?? null,
        timestamp: new Date().toISOString(),
        lead_id: notification.lead_id ?? null,
      }),
    })
    return res.status
  } catch (err) {
    console.error('[notifications] webhook POST failed:', err)
    return null
  }
}

// ---------------------------------------------------------------------------
// createNotification
// ---------------------------------------------------------------------------

export async function createNotification(
  opts: CreateNotificationOpts,
): Promise<Notification> {
  const { data, error } = await supabaseAdmin
    .from('notifications')
    .insert({
      type: opts.type,
      title: opts.title,
      body: opts.body,
      lead_id: opts.lead_id ?? null,
      metadata: opts.metadata ?? null,
      read: false,
    })
    .select()
    .single()

  if (error || !data) {
    console.error('[notifications] insert failed:', error)
    // Return a minimal object so callers never receive null
    return {
      id: '',
      type: opts.type,
      title: opts.title,
      body: opts.body,
      lead_id: opts.lead_id ?? null,
      metadata: opts.metadata ?? null,
      read: false,
      created_at: new Date().toISOString(),
    } as Notification
  }

  const notification = data as Notification

  // Fire-and-forget webhook
  ;(async () => {
    const statusCode = await forwardToWebhook(notification)
    if (statusCode !== null) {
      const { error: updateError } = await supabaseAdmin
        .from('notifications')
        .update({ webhook_response_code: statusCode })
        .eq('id', notification.id)
      if (updateError) {
        console.error('[notifications] webhook_response_code update failed:', updateError)
      }
    }
  })().catch((err) => console.error('[notifications] fire-and-forget error:', err))

  return notification
}

// ---------------------------------------------------------------------------
// Read / mark helpers
// ---------------------------------------------------------------------------

export async function markNotificationRead(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('notifications')
    .update({ read: true })
    .eq('id', id)

  if (error) {
    console.error('[notifications] markNotificationRead failed:', error)
  }
}

export async function markAllRead(): Promise<void> {
  const { error } = await supabaseAdmin
    .from('notifications')
    .update({ read: true })
    .eq('read', false)

  if (error) {
    console.error('[notifications] markAllRead failed:', error)
  }
}

export async function getUnreadCount(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('read', false)

  if (error) {
    console.error('[notifications] getUnreadCount failed:', error)
    return 0
  }

  return count ?? 0
}
