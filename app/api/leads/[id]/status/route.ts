import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/auth'
import type { LeadStatus } from '@/types'

// ---------------------------------------------------------------------------
// Valid statuses
// ---------------------------------------------------------------------------

const VALID_STATUSES: LeadStatus[] = [
  'new',
  'quoted',
  'booked',
  'meeting_one_done',
  'brief_sent',
  'brief_received',
  'deposit_pending',
  'deposit_paid',
  'meeting_two_booked',
  'meeting_two_done',
  'awaiting_final_payment',
  'nurture',
  'final_payment_received',
  'building',
  'review',
  'complete',
  'lost',
]

// ---------------------------------------------------------------------------
// PATCH /api/leads/[id]/status
// ---------------------------------------------------------------------------

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── Admin auth ────────────────────────────────────────────────────────────
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  try {
    const { id } = params
    const body = await req.json()
    const { status, notes } = body as { status: LeadStatus; notes?: string }

    // ── Validate status ───────────────────────────────────────────────────────
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400 },
      )
    }

    // ── Fetch existing lead ───────────────────────────────────────────────────
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── Build update payload ──────────────────────────────────────────────────
    const updatePayload: Record<string, unknown> = { status }

    if (notes) {
      const currentNotes = existing.notes ?? ''
      const timestamp = new Date().toISOString()
      updatePayload.notes = currentNotes
        ? `${currentNotes}\n\n[${timestamp}] ${notes}`
        : `[${timestamp}] ${notes}`
    }

    // ── Update lead ───────────────────────────────────────────────────────────
    const { data: lead, error: updateError } = await supabaseAdmin
      .from('leads')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !lead) {
      console.error('[leads/[id]/status] update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update lead status' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, data: lead })
  } catch (err) {
    console.error('[leads/[id]/status] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
