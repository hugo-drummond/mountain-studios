import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import {
  createDepositCheckout,
  createFinalPaymentCheckout,
} from '@/lib/payments'

// ---------------------------------------------------------------------------
// POST /api/payments/create-checkout
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { brief_id, payment_type } = body

    if (!brief_id) {
      return NextResponse.json(
        { success: false, error: 'brief_id is required' },
        { status: 400 },
      )
    }

    if (payment_type !== 'deposit' && payment_type !== 'final') {
      return NextResponse.json(
        { success: false, error: 'payment_type must be "deposit" or "final"' },
        { status: 400 },
      )
    }

    // ── 1. Fetch brief ───────────────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('id', brief_id)
      .single()

    if (briefError || !brief) {
      return NextResponse.json(
        { success: false, error: 'Brief not found' },
        { status: 404 },
      )
    }

    // ── 2. Fetch lead ─────────────────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', brief.lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── 3. Validate: brief must be submitted ──────────────────────────────────
    if (brief.status !== 'submitted' && brief.status !== 'reviewed') {
      return NextResponse.json(
        { success: false, error: 'Brief must be submitted before payment' },
        { status: 400 },
      )
    }

    // ── 4 & 5. Determine amount based on payment_type ─────────────────────────
    let amount: number

    if (payment_type === 'deposit') {
      if (brief.deposit_paid) {
        return NextResponse.json(
          { success: false, error: 'Deposit has already been paid' },
          { status: 400 },
        )
      }
      if (!brief.deposit_amount) {
        return NextResponse.json(
          { success: false, error: 'Deposit amount not set on brief' },
          { status: 400 },
        )
      }
      amount = brief.deposit_amount
    } else {
      // final
      if (!brief.deposit_paid) {
        return NextResponse.json(
          { success: false, error: 'Deposit must be paid before final payment' },
          { status: 400 },
        )
      }
      if (!brief.final_price_local || !brief.deposit_amount) {
        return NextResponse.json(
          { success: false, error: 'Final price or deposit amount not set on brief' },
          { status: 400 },
        )
      }
      amount = brief.final_price_local - brief.deposit_amount
    }

    // ── 6 & 7. Create checkout ────────────────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
    const currency = lead.currency_code ?? 'GBP'
    const customerName = lead.full_name ?? lead.business_name ?? ''

    const checkoutOpts = {
      brief_id,
      lead_id: lead.id,
      amount_local: amount,
      currency,
      description:
        payment_type === 'deposit'
          ? `Deposit — ${lead.business_name}`
          : `Final payment — ${lead.business_name}`,
      customer_email: lead.email,
      customer_name: customerName,
      payment_type: payment_type as 'deposit' | 'final',
      return_url: `${appUrl}/payment-complete?brief_id=${brief_id}`,
      notification_url: `${appUrl}/api/payments/webhook/peach`,
    }

    const checkout =
      payment_type === 'deposit'
        ? await createDepositCheckout(checkoutOpts)
        : await createFinalPaymentCheckout(checkoutOpts)

    // ── 8. Update brief/lead status ───────────────────────────────────────────
    const now = new Date().toISOString()

    if (payment_type === 'deposit') {
      await supabaseAdmin
        .from('briefs')
        .update({ status: 'deposit_pending', updated_at: now })
        .eq('id', brief_id)

      await supabaseAdmin
        .from('leads')
        .update({ status: 'deposit_pending', updated_at: now })
        .eq('id', lead.id)
    }

    // ── 9. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: {
        checkout_id: (checkout as unknown as Record<string, unknown>).checkout_id,
        payment_url: (checkout as unknown as Record<string, unknown>).payment_url,
        amount,
        currency,
      },
    })
  } catch (err) {
    console.error('[payments/create-checkout] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
