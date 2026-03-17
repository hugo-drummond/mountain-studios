import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getLatestFxRates, calculateQuote } from '@/lib/fx'
import type { Brief, PageSelection } from '@/types'

// ---------------------------------------------------------------------------
// Whitelist of fields the client is allowed to autosave
// ---------------------------------------------------------------------------

const ALLOWED_FIELDS = [
  'business_name',
  'business_type',
  'style',
  'primary_colour',
  'secondary_colour',
  'pages',
  'social_handles',
  'reference_sites',
  'additional_notes',
  'tagline',
  'tone',
  'target_audience',
  'cta_goals',
  'services',
  'page_sections_data',
  'contact_email',
  'contact_phone',
  'contact_address',
  'business_hours',
  'reference_site_notes',
  'content_visual_ratio',
  'region',
  'decision_status',
] as const

type AllowedField = (typeof ALLOWED_FIELDS)[number]

// ---------------------------------------------------------------------------
// POST /api/briefs/[id]/autosave
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

    const pagesChanged =
      body.pages !== undefined &&
      JSON.stringify(body.pages) !== JSON.stringify(brief.pages)

    // Guard: if already submitted or rate_locked and page structure has changed
    if (brief.status === 'submitted' || brief.status === 'reviewed') {
      return NextResponse.json(
        { success: false, error: 'Brief has already been submitted' },
        { status: 400 },
      )
    }

    if (brief.rate_locked && pagesChanged) {
      return NextResponse.json(
        { success: false, error: 'Rate is locked — page structure cannot be changed' },
        { status: 400 },
      )
    }

    // ── 2. Build allowed-fields update payload ────────────────────────────────
    const update: Partial<Record<AllowedField, unknown>> & {
      last_autosaved_at: string
      updated_at: string
      base_price_gbp?: number
      exchange_rate?: number
      final_price_local?: number
      deposit_amount?: number
    } = {
      last_autosaved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        update[field] = body[field]
      }
    }

    // ── 3. Recalculate price if pages changed and not rate_locked ─────────────
    if (pagesChanged && !brief.rate_locked) {
      const newPages: PageSelection[] = body.pages

      // Get lead to determine currency
      const { data: lead } = await supabaseAdmin
        .from('leads')
        .select('currency_code')
        .eq('id', brief.lead_id)
        .single()

      const currency_code =
        brief.currency_code ?? lead?.currency_code ?? 'GBP'

      const fxRates = await getLatestFxRates()
      if (!fxRates) {
        return NextResponse.json(
          { success: false, error: 'Failed to retrieve FX rates' },
          { status: 500 },
        )
      }

      const quote = calculateQuote({ pages: newPages, currency_code }, fxRates)

      update.base_price_gbp = quote.total_gbp
      update.exchange_rate = quote.rate
      update.final_price_local = quote.total_local
      update.deposit_amount = quote.breakdown.deposit_local
    }

    // ── 4. Update brief ───────────────────────────────────────────────────────
    const { data: updatedBrief, error: updateError } = await supabaseAdmin
      .from('briefs')
      .update(update)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedBrief) {
      console.error('[briefs/autosave] update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to autosave brief' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: { brief: updatedBrief as Brief },
    })
  } catch (err) {
    console.error('[briefs/autosave] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
