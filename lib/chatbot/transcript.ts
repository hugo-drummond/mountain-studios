import { crmAdmin } from '@/lib/crm'

export interface TranscriptRow {
  session_id: string
  visitor_id: string | null
  lead_id: string | null
  turn: number
  role: 'user' | 'assistant'
  content: string
  ip_ua_hash: string | null
}

/**
 * Append a turn of the conversation. Best effort, never throws: a failed write
 * must never break the reply the visitor is waiting for.
 */
export async function saveChatTranscript(rows: TranscriptRow[]): Promise<void> {
  if (rows.length === 0) return
  try {
    const { error } = await crmAdmin().from('chat_transcripts').insert(rows)
    if (error) throw error
  } catch (err) {
    console.error('[chat] transcript save failed:', err instanceof Error ? err.message : err)
  }
}
