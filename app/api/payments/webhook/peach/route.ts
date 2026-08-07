import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendDepositConfirmation } from '@/lib/email'
import { verifyWebhookSignature, parseWebhookPayload } from '@/lib/payments'

// ---------------------------------------------------------------------------
// POST /api/payments/webhook/peach
// Peach Payments webhook — always return 200 to Peach, even on failure.
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse form-encoded body ────────────────────────────────────────────
    const text = await req.text()
    const formData = new URLSearchParams(text)
    const body: Record<string, string> = {}
    formData.forEach((value, key) => {
      body[key] = value
    })

    // ── 2. Verify HMAC signature if present ───────────────────────────────────
    const signature =
      req.headers.get('x-authentication-tag') ??
      req.headers.get('x-initialization-vector') ??
      null

    if (signature) {
      const isValid = verifyWebhookSignature(text, signature)
      if (!isValid) {
        console.warn('[payments/webhook/peach] Invalid HMAC signature')
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 400 },
        )
      }
    }

    // ── 3 & 4. Parse payload ──────────────────────────────────────────────────
    const payload = parseWebhookPayload(body)
    const { success, merchantTransactionId, paymentId, amount, currency } = payload

    if (!merchantTransactionId) {
      console.warn('[payments/webhook/peach] No merchantTransactionId in payload')
      return NextResponse.json({ received: true }, { status: 200 })
    }

    // ── 5. Determine payment type from merchantTransactionId prefix ───────────
    // Format: '{payment_type}_{lead_id}_{brief_id}_{timestamp}'
    const parts = merchantTransactionId.split('_')
    const paymentType = parts[0] // 'deposit' | 'final'
    const leadId = parts[1]

    if (!leadId) {
      console.warn('[payments/webhook/peach] Could not extract lead_id from merchantTransactionId:', merchantTransactionId)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    // ── Payment failed ────────────────────────────────────────────────────────
    if (!success) {
      console.log(`[payments/webhook/peach] Payment failed for lead ${leadId}, code: ${payload.result_code}`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const now = new Date().toISOString()

    // ── Deposit confirmed ─────────────────────────────────────────────────────
    if (paymentType === 'deposit') {
      // Find the most recent submitted brief for this lead
      const { data: brief, error: briefError } = await supabaseAdmin
        .from('briefs')
        .select('*')
        .eq('lead_id', leadId)
        .in('status', ['submitted', 'reviewed', 'deposit_pending'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (briefError || !brief) {
        console.error('[payments/webhook/peach] Brief not found for lead:', leadId)
        return NextResponse.json({ received: true }, { status: 200 })
      }

      await supabaseAdmin
        .from('briefs')
        .update({
          deposit_paid: true,
          rate_locked: true,
          deposit_reference: paymentId,
          deposit_paid_at: now,
          updated_at: now,
        })
        .eq('id', brief.id)

      await supabaseAdmin
        .from('leads')
        .update({ status: 'deposit_paid', updated_at: now })
        .eq('id', leadId)

      // Send deposit confirmation email
      const { data: lead } = await supabaseAdmin
        .from('leads')
        .select('email, full_name, business_name, currency_code')
        .eq('id', leadId)
        .single()

      if (lead) {
        await sendDepositConfirmation(lead.email, {
          client_name: lead.full_name ?? lead.business_name,
          amount,
          currency: currency || lead.currency_code || 'ZAR',
          reference: paymentId,
        })
      }

      await createNotification({
        type: 'deposit_received',
        title: `Deposit received: ${lead?.business_name ?? leadId}`,
        body: `Deposit of ${currency} ${amount} received`,
        lead_id: leadId,
        metadata: {
          amount,
          currency,
          payment_id: paymentId,
          brief_id: brief.id,
        },
      })

      return NextResponse.json({ received: true }, { status: 200 })
    }

    // ── Final payment confirmed ───────────────────────────────────────────────
    if (paymentType === 'final') {
      await supabaseAdmin
        .from('leads')
        .update({
          final_payment_paid: true,
          final_payment_ref: paymentId,
          status: 'final_payment_received',
          updated_at: now,
        })
        .eq('id', leadId)

      const { data: lead } = await supabaseAdmin
        .from('leads')
        .select('business_name')
        .eq('id', leadId)
        .single()

      await createNotification({
        type: 'final_payment_received',
        title: `Final payment received: ${lead?.business_name ?? leadId}`,
        body: `Final payment of ${currency} ${amount} received`,
        lead_id: leadId,
        metadata: {
          amount,
          currency,
          payment_id: paymentId,
        },
      })

      return NextResponse.json({ received: true }, { status: 200 })
    }

    console.warn('[payments/webhook/peach] Unknown payment type:', paymentType)
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    // Always return 200 to Peach
    console.error('[payments/webhook/peach] unexpected error:', err)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
