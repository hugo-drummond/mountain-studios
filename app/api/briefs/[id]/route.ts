import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getLatestFxRates } from '@/lib/fx'

// ---------------------------------------------------------------------------
// GET /api/briefs/[id]
// Public — brief_id IS the access token.
// ---------------------------------------------------------------------------

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

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

    // ── 2. Fetch partial lead data ────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('id, business_name, email, full_name, region, currency_code')
      .eq('id', brief.lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── 3. Get current FX rate for the brief's currency ───────────────────────
    const fxRates = await getLatestFxRates()
    const currency = (brief.currency_code ?? lead.currency_code ?? 'GBP').toUpperCase()
    const currentRate =
      currency === 'GBP'
        ? 1
        : fxRates
          ? ((fxRates.rates as Record<string, number>)[currency] ?? null)
          : null

    return NextResponse.json({
      success: true,
      data: {
        brief,
        lead: {
          id: lead.id,
          business_name: lead.business_name,
          email: lead.email,
          full_name: lead.full_name,
          region: lead.region,
          currency_code: lead.currency_code,
        },
        current_rate: currentRate,
        is_rate_locked: brief.rate_locked,
      },
    })
  } catch (err) {
    console.error('[briefs/[id]] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
