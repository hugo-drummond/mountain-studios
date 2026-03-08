import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getLatestFxRates, calculateQuote } from '@/lib/fx'
import type { PageSelection } from '@/types'

// ---------------------------------------------------------------------------
// GET /api/fx/for-brief/[brief_id]
// ---------------------------------------------------------------------------

export async function GET(
  _req: NextRequest,
  { params }: { params: { brief_id: string } },
) {
  try {
    const { brief_id } = params

    // ── Fetch brief ───────────────────────────────────────────────────────────
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

    const currency_code = brief.currency_code ?? 'GBP'

    // ── Rate is locked — return stored values ─────────────────────────────────
    if (brief.rate_locked) {
      return NextResponse.json({
        success: true,
        data: {
          rate_locked: true,
          exchange_rate: brief.exchange_rate,
          currency_code,
          deposit_amount: brief.deposit_amount,
          final_price_local: brief.final_price_local,
          base_price_gbp: brief.base_price_gbp,
        },
      })
    }

    // ── Rate not locked — return current rate + recalculated values ───────────
    const fxRates = await getLatestFxRates()
    if (!fxRates) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve FX rates' },
        { status: 500 },
      )
    }

    // Recalculate if pages exist, otherwise return stored values with current rate
    let base_price_gbp = brief.base_price_gbp
    let final_price_local = brief.final_price_local
    let deposit_amount = brief.deposit_amount
    let exchange_rate: number

    if (brief.pages && Array.isArray(brief.pages) && brief.pages.length > 0) {
      const quote = calculateQuote(
        { pages: brief.pages as PageSelection[], currency_code },
        fxRates,
      )
      base_price_gbp = quote.total_gbp
      final_price_local = quote.total_local
      deposit_amount = quote.breakdown.deposit_local
      exchange_rate = quote.rate
    } else {
      exchange_rate =
        currency_code === 'GBP'
          ? 1
          : ((fxRates.rates as Record<string, number>)[currency_code.toUpperCase()] ?? 1)
    }

    return NextResponse.json({
      success: true,
      data: {
        rate_locked: false,
        exchange_rate,
        currency_code,
        deposit_amount,
        final_price_local,
        base_price_gbp,
      },
    })
  } catch (err) {
    console.error('[fx/for-brief] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
