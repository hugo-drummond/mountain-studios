import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendBriefInvitation } from '@/lib/email'
import { getLatestFxRates } from '@/lib/fx'
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
      const fxRates = await getLatestFxRates()
      if (!fxRates) {
        return NextResponse.json(
          { success: false, error: 'Failed to retrieve FX rates' },
          { status: 500 },
        )
      }

      const basePriceGBP: number = config.pricing.basePriceGBP
      const depositPercentage: number = config.pricing.depositPercentage

      const currencyCode: string = lead.currency_code ?? 'GBP'
      const exchangeRate: number =
        currencyCode === 'GBP'
          ? 1
          : ((fxRates.rates as Record<string, number>)[currencyCode.toUpperCase()] ?? 1)

      const finalPriceLocal = Math.round(basePriceGBP * exchangeRate * 100) / 100
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
          currency_code: currencyCode,
          pages: lead.pages_selected ?? null,
          base_price_gbp: basePriceGBP,
          exchange_rate: exchangeRate,
          final_price_local: finalPriceLocal,
          deposit_amount: depositAmount,
          rate_locked: false,
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
