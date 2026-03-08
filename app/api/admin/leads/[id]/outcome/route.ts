import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendFinalPaymentRequest, sendNurtureWelcome } from '@/lib/email'
import { requireAdmin } from '@/lib/auth'

// ---------------------------------------------------------------------------
// POST /api/admin/leads/[id]/outcome
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
    const body = await req.json()
    const { outcome, notes } = body as {
      outcome: 'proceed' | 'nurture'
      notes?: string
    }

    // ── Validate outcome ──────────────────────────────────────────────────────
    if (!outcome || !['proceed', 'nurture'].includes(outcome)) {
      return NextResponse.json(
        { success: false, error: "outcome must be 'proceed' or 'nurture'" },
        { status: 400 },
      )
    }

    // ── Fetch lead ────────────────────────────────────────────────────────────
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

    // ── Guard: status must be 'meeting_two_done' ──────────────────────────────
    if (lead.status !== 'meeting_two_done') {
      return NextResponse.json(
        {
          success: false,
          error: `Lead status must be 'meeting_two_done'. Current status: '${lead.status}'`,
        },
        { status: 400 },
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

    // ═════════════════════════════════════════════════════════════════════════
    // OUTCOME: proceed
    // ═════════════════════════════════════════════════════════════════════════
    if (outcome === 'proceed') {
      // ── 1. Fetch most recent brief ──────────────────────────────────────────
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

      // ── 2. Calculate balance due ────────────────────────────────────────────
      const finalPriceLocal: number = brief.final_price_local ?? 0
      const depositAmount: number = brief.deposit_amount ?? 0
      const balanceDue = Math.round((finalPriceLocal - depositAmount) * 100) / 100

      // ── 3. Create Peach Payments final payment checkout ─────────────────────
      const merchantTransactionId = `final-${lead.id}-${Date.now()}`
      const notificationUrl = `${appUrl}/api/payments/webhook/peach`
      const returnUrl = `${appUrl}/payment-complete`

      let paymentUrl = ''
      try {
        const peachRes = await fetch('https://testsecure.peachpayments.com/v2/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PEACH_PAYMENTS_API_KEY ?? ''}`,
          },
          body: JSON.stringify({
            authentication: {
              entityId: process.env.PEACH_ENTITY_ID,
            },
            amount: balanceDue.toFixed(2),
            currency: lead.currency_code ?? 'ZAR',
            merchantTransactionId,
            notificationUrl,
            shopperResultUrl: returnUrl,
            paymentType: 'DB',
            descriptor: `Final payment — ${lead.business_name}`,
          }),
        })

        if (peachRes.ok) {
          const peachJson = await peachRes.json()
          paymentUrl = peachJson.redirectUrl ?? peachJson.url ?? ''
        } else {
          console.warn('[outcome/proceed] Peach Payments checkout creation failed:', peachRes.status)
          // Fall back gracefully — continue without blocking
          paymentUrl = `${appUrl}/payment-complete?ref=${merchantTransactionId}`
        }
      } catch (peachErr) {
        console.error('[outcome/proceed] Peach Payments error:', peachErr)
        paymentUrl = `${appUrl}/payment-complete?ref=${merchantTransactionId}`
      }

      // ── 4. Send final payment request email ─────────────────────────────────
      await sendFinalPaymentRequest(lead.email, {
        client_name: lead.full_name ?? lead.business_name,
        business_name: lead.business_name,
        total_amount: finalPriceLocal.toFixed(2),
        deposit_paid: depositAmount.toFixed(2),
        balance_due: balanceDue.toFixed(2),
        currency: lead.currency_code ?? '',
        payment_url: paymentUrl,
        deadline: '',
        project_summary: '',
      })

      // ── 5. Update lead ────────────────────────────────────────────────────────
      const { data: updatedLead } = await supabaseAdmin
        .from('leads')
        .update({
          status: 'awaiting_final_payment',
          final_payment_sent_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      // ── 6. Update brief ───────────────────────────────────────────────────────
      await supabaseAdmin
        .from('briefs')
        .update({ decision_status: 'proceed' })
        .eq('id', brief.id)

      // ── 7. Create notification ────────────────────────────────────────────────
      await createNotification({
        type: 'final_payment_requested',
        title: `Final payment requested: ${lead.business_name}`,
        body: `Balance of ${lead.currency_code} ${balanceDue} requested from ${lead.email}`,
        lead_id: id,
        metadata: { payment_url: paymentUrl, balance_due: balanceDue },
      })

      return NextResponse.json({
        success: true,
        data: {
          lead: updatedLead ?? lead,
          payment_url: paymentUrl,
        },
      })
    }

    // ═════════════════════════════════════════════════════════════════════════
    // OUTCOME: nurture
    // ═════════════════════════════════════════════════════════════════════════

    // ── 1. Insert into nurture_list ───────────────────────────────────────────
    const { error: nurtureInsertError } = await supabaseAdmin
      .from('nurture_list')
      .insert({
        lead_id: id,
        email: lead.email,
        full_name: lead.full_name ?? null,
        business_name: lead.business_name ?? null,
        business_type: lead.business_type ?? null,
        region: lead.region ?? null,
        source: 'post_meeting_two',
        subscribed: true,
      })

    if (nurtureInsertError) {
      console.error('[outcome/nurture] nurture_list insert error:', nurtureInsertError)
    }

    // ── 2. Send nurture welcome email ─────────────────────────────────────────
    const unsubscribeUrl = `${appUrl}/api/nurture/unsubscribe?lead_id=${id}&token=${Buffer.from(id).toString('base64')}`

    await sendNurtureWelcome(lead.email, {
      client_name: lead.full_name ?? lead.business_name,
      unsubscribe_url: unsubscribeUrl,
    })

    // ── 3. Update lead ────────────────────────────────────────────────────────
    const { data: updatedLead } = await supabaseAdmin
      .from('leads')
      .update({
        status: 'nurture',
        on_nurture_list: true,
        nurture_added_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    // ── 4. Update brief if exists ─────────────────────────────────────────────
    const { data: existingBrief } = await supabaseAdmin
      .from('briefs')
      .select('id')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existingBrief) {
      await supabaseAdmin
        .from('briefs')
        .update({
          decision_status: 'not_ready',
          decision_notes: notes ?? null,
        })
        .eq('id', existingBrief.id)
    }

    // ── 5. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'lead_nurtured',
      title: `${lead.business_name} moved to nurture`,
      body: `${lead.email} added to nurture list`,
      lead_id: id,
      metadata: { unsubscribe_url: unsubscribeUrl },
    })

    return NextResponse.json({
      success: true,
      data: {
        lead: updatedLead ?? lead,
      },
    })
  } catch (err) {
    console.error('[outcome] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
