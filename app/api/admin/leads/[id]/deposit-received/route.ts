import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendDepositConfirmation } from '@/lib/email'
import { requireAdmin } from '@/lib/auth'

// ---------------------------------------------------------------------------
// POST /api/admin/leads/[id]/deposit-received
// ---------------------------------------------------------------------------

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── Admin auth ────────────────────────────────────────────────────────────
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  try {
    const { id } = params
    const body = await req.json().catch(() => ({}))
    const { reference } = body as { reference?: string }

    // ── 1. Fetch lead ─────────────────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── Fetch most recent brief ───────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (briefError || !brief) {
      return NextResponse.json(
        { success: false, error: 'No brief found for this lead' },
        { status: 404 },
      )
    }

    // ── 2. Guard: already recorded ────────────────────────────────────────────
    if (brief.deposit_paid) {
      return NextResponse.json(
        { success: false, error: 'Deposit already recorded' },
        { status: 400 },
      )
    }

    // ── 3. Update brief ───────────────────────────────────────────────────────
    const { data: updatedBrief, error: briefUpdateError } = await supabaseAdmin
      .from('briefs')
      .update({
        deposit_paid: true,
        rate_locked: true,
        deposit_reference: reference ?? 'manual',
        deposit_paid_at: new Date().toISOString(),
      })
      .eq('id', brief.id)
      .select()
      .single()

    if (briefUpdateError) {
      console.error('[deposit-received] brief update error:', briefUpdateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update brief' },
        { status: 500 },
      )
    }

    // ── 4. Update lead status → 'deposit_paid' ────────────────────────────────
    const { data: updatedLead, error: leadUpdateError } = await supabaseAdmin
      .from('leads')
      .update({ status: 'deposit_paid' })
      .eq('id', id)
      .select()
      .single()

    if (leadUpdateError) {
      console.error('[deposit-received] lead status update error:', leadUpdateError)
    }

    // ── 5. Send deposit confirmation email ────────────────────────────────────
    const depositAmount: number = brief.deposit_amount ?? 0
    const currencyCode: string = lead.currency_code ?? 'GBP'

    await sendDepositConfirmation(lead.email, {
      client_name: lead.full_name ?? lead.business_name,
      amount: depositAmount.toFixed(2),
      currency: currencyCode,
      reference: reference ?? 'manual',
    })

    // ── 6. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'deposit_received',
      title: `Deposit received: ${lead.business_name}`,
      body: `${currencyCode} ${depositAmount.toFixed(2)} deposit confirmed for ${lead.email}`,
      lead_id: id,
      metadata: {
        deposit_amount: depositAmount,
        currency_code: currencyCode,
        reference: reference ?? 'manual',
        brief_id: brief.id,
      },
    })

    // ── 7. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: {
        lead: updatedLead ?? lead,
        brief: updatedBrief ?? brief,
      },
    })
  } catch (err) {
    console.error('[deposit-received] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
