import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

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
      .select('id, business_name, business_type, email, full_name, phone, region, currency_code, style, primary_colour, secondary_colour, content_visual_ratio, pages_selected')
      .eq('id', brief.lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        brief,
        lead: {
          id: lead.id,
          business_name: lead.business_name,
          business_type: lead.business_type,
          email: lead.email,
          full_name: lead.full_name,
          phone: lead.phone,
          region: lead.region,
          currency_code: lead.currency_code,
          style: lead.style,
          primary_colour: lead.primary_colour,
          secondary_colour: lead.secondary_colour,
          content_visual_ratio: lead.content_visual_ratio,
          pages_selected: lead.pages_selected,
        },
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
