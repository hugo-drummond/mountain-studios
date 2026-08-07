import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendBriefInvitation } from '@/lib/email'
import { requireAdmin } from '@/lib/auth'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// POST /api/admin/leads/[id]/send-brief
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

    // Pricing is per job now, not computed from a page list. The admin agrees a
    // rand amount with the client and passes it here; the deposit is the only
    // thing still derived, via config.pricing.depositPercentage.
    const body = await req.json().catch(() => ({}))
    const amountZar = Number(body?.amount_zar)

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

    if (lead.status !== 'meeting_one_done') {
      return NextResponse.json(
        {
          success: false,
          error: `Lead status must be 'meeting_one_done' to send brief. Current status: '${lead.status}'`,
        },
        { status: 400 },
      )
    }

    // ── 2. Check if brief already exists ──────────────────────────────────────
    const { data: existingBrief } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    let brief = existingBrief

    if (!brief) {
      // ── 3. Create brief ─────────────────────────────────────────────────────
      // The amount is required here because it is the only place a brief's price
      // is ever set, and /api/payments/create-checkout refuses to run without
      // final_price_local and deposit_amount.
      if (!Number.isFinite(amountZar) || amountZar <= 0) {
        return NextResponse.json(
          {
            success: false,
            error:
              'amount_zar is required and must be a positive number — the agreed project price in rands',
          },
          { status: 400 },
        )
      }

      // Reps negotiate their own prices, so the floor is enforced here rather
      // than trusted from the client — this is the only writer of a brief's price.
      const floorPriceZAR: number = config.pricing.floorPriceZAR
      if (amountZar < floorPriceZAR) {
        return NextResponse.json(
          {
            success: false,
            error: `Price is below the R${floorPriceZAR} floor. Entered R${amountZar}.`,
          },
          { status: 400 },
        )
      }

      const depositPercentage: number = config.pricing.depositPercentage

      const finalPriceLocal = Math.round(amountZar * 100) / 100
      const depositAmount = Math.round((finalPriceLocal * depositPercentage) / 100 * 100) / 100

      const { data: newBrief, error: briefInsertError } = await supabaseAdmin
        .from('briefs')
        .insert({
          lead_id: id,
          status: 'draft',
          business_name: lead.business_name ?? null,
          business_type: lead.business_type ?? null,
          style: lead.style ?? null,
          primary_colour: lead.primary_colour ?? null,
          secondary_colour: lead.secondary_colour ?? null,
          region: lead.region ?? null,
          currency_code: 'ZAR',
          pages: lead.pages_selected ?? null,
          final_price_local: finalPriceLocal,
          deposit_amount: depositAmount,
          deposit_paid: false,
          meeting_booked: false,
          prefill_source: { from: 'lead', lead_id: id },
          sent_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (briefInsertError || !newBrief) {
        console.error('[send-brief] brief insert error:', briefInsertError)
        return NextResponse.json(
          { success: false, error: 'Failed to create brief' },
          { status: 500 },
        )
      }

      brief = newBrief
    } else {
      // Resend: update sent_at
      await supabaseAdmin
        .from('briefs')
        .update({ sent_at: new Date().toISOString() })
        .eq('id', brief.id)
    }

    // ── 4. Update lead status → 'brief_sent' ──────────────────────────────────
    const { data: updatedLead, error: leadUpdateError } = await supabaseAdmin
      .from('leads')
      .update({ status: 'brief_sent' })
      .eq('id', id)
      .select()
      .single()

    if (leadUpdateError) {
      console.error('[send-brief] lead status update error:', leadUpdateError)
    }

    // ── 5. Send brief invitation email ────────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
    const briefUrl = `${appUrl}/brief/${brief.id}`

    await sendBriefInvitation(lead.email, {
      brief_url: briefUrl,
      client_name: lead.full_name ?? lead.business_name,
    })

    // ── 6. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'brief_submitted',
      title: `Brief sent to ${lead.business_name}`,
      body: `Brief form link sent to ${lead.email}`,
      lead_id: id,
      metadata: { brief_id: brief.id, brief_url: briefUrl },
    })

    // ── 7. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: {
        brief_id: brief.id,
        brief_url: briefUrl,
        lead: updatedLead ?? lead,
      },
    })
  } catch (err) {
    console.error('[send-brief] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
