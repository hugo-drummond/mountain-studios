import { NextRequest, NextResponse } from 'next/server'
import { getLatestFxRates } from '@/lib/fx'

// ---------------------------------------------------------------------------
// GET /api/fx/latest
// ---------------------------------------------------------------------------

const SUPPORTED_CURRENCIES = ['ZAR', 'GBP', 'USD', 'EUR', 'AUD', 'NAD']

export async function GET(_req: NextRequest) {
  try {
    const rates = await getLatestFxRates()

    if (!rates) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve FX rates' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        rates,
        supported_currencies: SUPPORTED_CURRENCIES,
      },
    })
  } catch (err) {
    console.error('[fx/latest] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
