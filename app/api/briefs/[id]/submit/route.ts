import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendBriefReceipt } from '@/lib/email'
import { getLatestFxRates, calculateQuote } from '@/lib/fx'
import type { Brief, PageSelection } from '@/types'

// ---------------------------------------------------------------------------
// POST /api/briefs/[id]/submit
// ---------------------------------------------------------------------------

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const body = await req.json()

    // ── 1. Fetch brief ───────────────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('id', id)
      .single()

    if (briefError || !brief) {
      return NextResponse.json(
        { success: false, error: 'Brief not found' },
        { status: 404 },
      )
    }

    if (brief.status === 'submitted' || brief.status === 'reviewed') {
      return NextResponse.json(
        { success: false, error: 'Brief has already been submitted' },
        { status: 400 },
      )
    }

    // ── 2. Validate required fields ───────────────────────────────────────────
    const business_name = body.business_name ?? brief.business_name
    const business_type = body.business_type ?? brief.business_type
    const pages: PageSelection[] = body.pages ?? brief.pages

    const missing: string[] = []
    if (!business_name) missing.push('business_name')
    if (!business_type) missing.push('business_type')
    if (!pages || !Array.isArray(pages) || pages.length === 0) missing.push('pages')

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    // ── 3. Fetch lead ─────────────────────────────────────────────────────────
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

    // ── 4. Build update payload ───────────────────────────────────────────────
    const now = new Date().toISOString()

    const updatePayload: Record<string, unknown> = {
      business_name,
      business_type,
      pages,
      style: body.style ?? brief.style ?? null,
      primary_colour: body.primary_colour ?? brief.primary_colour ?? null,
      secondary_colour: body.secondary_colour ?? brief.secondary_colour ?? null,
      social_handles: body.social_handles ?? brief.social_handles ?? null,
      reference_sites: body.reference_sites ?? brief.reference_sites ?? null,
      additional_notes: body.additional_notes ?? brief.additional_notes ?? null,
      status: 'submitted',
      submitted_at: now,
      updated_at: now,
    }

    // Handle logo
    if (body.logo_url) {
      updatePayload.logo_url = body.logo_url
    }

    // ── 5. If not rate_locked: calculate final price and lock it now ───────────
    const currency_code = brief.currency_code ?? lead.currency_code ?? 'GBP'

    if (!brief.rate_locked) {
      const fxRates = await getLatestFxRates()
      if (!fxRates) {
        return NextResponse.json(
          { success: false, error: 'Failed to retrieve FX rates' },
          { status: 500 },
        )
      }

      const quote = calculateQuote({ pages, currency_code }, fxRates)

      updatePayload.rate_locked = true
      updatePayload.exchange_rate = quote.rate
      updatePayload.base_price_gbp = quote.total_gbp
      updatePayload.final_price_local = quote.total_local
      updatePayload.deposit_amount = quote.breakdown.deposit_local
    }

    // ── 6. Update brief ───────────────────────────────────────────────────────
    const { data: updatedBrief, error: updateError } = await supabaseAdmin
      .from('briefs')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedBrief) {
      console.error('[briefs/submit] update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to submit brief' },
        { status: 500 },
      )
    }

    // ── 7. Update lead status → 'brief_received' ──────────────────────────────
    await supabaseAdmin
      .from('leads')
      .update({ status: 'brief_received', updated_at: now })
      .eq('id', brief.lead_id)

    // ── 8. Send brief_receipt email ───────────────────────────────────────────
    const pagesSummary = pages.map((p: PageSelection) => p.name).join(', ')
    await sendBriefReceipt(lead.email, {
      client_name: lead.full_name ?? lead.business_name,
      business_name: business_name as string,
      pages_summary: pagesSummary,
      next_steps: 'We will review your brief and be in touch shortly.',
    })

    // ── 9. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'brief_submitted',
      title: `Brief submitted: ${business_name}`,
      body: `Brief received from ${lead.email}`,
      lead_id: brief.lead_id,
      metadata: {
        brief_id: id,
        pages_count: pages.length,
      },
    })

    // ── 10. Return ─────────────────────────────────────────────────────────────
    const finalBrief = updatedBrief as Brief
    return NextResponse.json({
      success: true,
      data: {
        brief: finalBrief,
        payment_info: {
          deposit_amount: finalBrief.deposit_amount,
          currency_code,
          checkout_url: '/api/payments/create-checkout',
        },
      },
    })
  } catch (err) {
    console.error('[briefs/submit] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
