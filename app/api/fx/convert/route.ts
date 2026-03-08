import { NextRequest, NextResponse } from 'next/server'
import { getLatestFxRates, convertGBP, convertToGBP } from '@/lib/fx'

// ---------------------------------------------------------------------------
// GET /api/fx/convert?amount=499&from=GBP&to=ZAR
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const amountStr = searchParams.get('amount')
    const from = searchParams.get('from')?.toUpperCase()
    const to = searchParams.get('to')?.toUpperCase()

    // ── 1. Validate params ────────────────────────────────────────────────────
    if (!amountStr || !from || !to) {
      return NextResponse.json(
        { success: false, error: 'amount, from, and to query params are required' },
        { status: 400 },
      )
    }

    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount < 0) {
      return NextResponse.json(
        { success: false, error: 'amount must be a positive number' },
        { status: 400 },
      )
    }

    // ── 2. Get latest rates ───────────────────────────────────────────────────
    const rates = await getLatestFxRates()
    if (!rates) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve FX rates' },
        { status: 500 },
      )
    }

    // ── 3. Convert ────────────────────────────────────────────────────────────
    let converted: number
    let rate: number

    if (from === 'GBP') {
      converted = convertGBP(amount, to, rates)
      rate =
        to === 'GBP'
          ? 1
          : ((rates.rates as Record<string, number>)[to] ?? 1)
    } else if (to === 'GBP') {
      converted = convertToGBP(amount, from, rates)
      rate =
        from === 'GBP'
          ? 1
          : 1 / ((rates.rates as Record<string, number>)[from] ?? 1)
    } else {
      // Cross-rate: convert from → GBP → to
      const amountGBP = convertToGBP(amount, from, rates)
      converted = convertGBP(amountGBP, to, rates)
      const fromRate = (rates.rates as Record<string, number>)[from] ?? 1
      const toRate = (rates.rates as Record<string, number>)[to] ?? 1
      rate = Math.round((toRate / fromRate) * 1000000) / 1000000
    }

    return NextResponse.json({
      success: true,
      data: {
        from,
        to,
        amount,
        converted,
        rate,
      },
    })
  } catch (err) {
    console.error('[fx/convert] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
