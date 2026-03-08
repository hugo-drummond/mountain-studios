import type { FxRates, PageSelection } from '@/types'
import { supabaseAdmin } from '@/lib/supabase-admin'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QuoteOpts {
  pages: PageSelection[]
  currency_code: string
}

export interface QuoteBreakdown {
  base_gbp: number
  pages_gbp: number
  extra_sections_gbp: number
  custom_pages_gbp: number
  total_gbp: number
  deposit_gbp: number
}

export interface QuoteResult {
  total_gbp: number
  total_local: number
  rate: number
  breakdown: QuoteBreakdown & {
    deposit_local: number
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FRANKFURTER_BASE = 'https://api.frankfurter.app'
const SUPPORTED_CURRENCIES = ['ZAR', 'GBP', 'USD', 'EUR', 'AUD', 'NAD'] as const
const RATES_MAX_AGE_MS = 6 * 60 * 60 * 1000 // 6 hours

// ---------------------------------------------------------------------------
// fetchAndStoreFxRates
// ---------------------------------------------------------------------------

export async function fetchAndStoreFxRates(): Promise<FxRates> {
  const targets = SUPPORTED_CURRENCIES.filter((c) => c !== 'GBP').join(',')
  const url = `${FRANKFURTER_BASE}/latest?from=GBP&to=${targets}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`[fx] Frankfurter API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  // json.rates: { ZAR: number, USD: number, ... }
  const rates: Record<string, number> = { GBP: 1, ...json.rates }

  const { data, error } = await supabaseAdmin
    .from('fx_rates')
    .insert({ rates, fetched_at: new Date().toISOString() })
    .select()
    .single()

  if (error || !data) {
    throw new Error(`[fx] Failed to store fx_rates: ${error?.message}`)
  }

  return data as FxRates
}

// ---------------------------------------------------------------------------
// getLatestFxRates
// ---------------------------------------------------------------------------

export async function getLatestFxRates(): Promise<FxRates | null> {
  const { data, error } = await supabaseAdmin
    .from('fx_rates')
    .select('*')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    // No row exists — fetch fresh
    return fetchAndStoreFxRates()
  }

  const row = data as FxRates
  const fetchedAt = new Date(row.fetched_at).getTime()
  const age = Date.now() - fetchedAt

  if (age > RATES_MAX_AGE_MS) {
    return fetchAndStoreFxRates()
  }

  return row
}

// ---------------------------------------------------------------------------
// Conversion helpers
// ---------------------------------------------------------------------------

export function convertGBP(
  amountGBP: number,
  toCurrency: string,
  rates: FxRates,
): number {
  const currency = toCurrency.toUpperCase()
  if (currency === 'GBP') return Math.round(amountGBP * 100) / 100

  const rate = (rates.rates as Record<string, number>)[currency]
  if (rate === undefined) {
    throw new Error(`[fx] Unsupported currency: ${currency}`)
  }

  return Math.round(amountGBP * rate * 100) / 100
}

export function convertToGBP(
  amount: number,
  fromCurrency: string,
  rates: FxRates,
): number {
  const currency = fromCurrency.toUpperCase()
  if (currency === 'GBP') return Math.round(amount * 100) / 100

  const rate = (rates.rates as Record<string, number>)[currency]
  if (rate === undefined) {
    throw new Error(`[fx] Unsupported currency: ${currency}`)
  }

  return Math.round((amount / rate) * 100) / 100
}

// ---------------------------------------------------------------------------
// calculateQuote
// ---------------------------------------------------------------------------

export function calculateQuote(opts: QuoteOpts, rates: FxRates): QuoteResult {
  const {
    basePriceGBP,
    pricePerPageGBP,
    pricePerExtraSectionGBP,
    customPagePriceGBP,
    depositPercentage,
    baseSectionsIncluded,
  } = config.pricing

  const pageCount = opts.pages.length
  const extraPages = Math.max(0, pageCount - 1)

  let extraSectionsTotal = 0
  let customPagesTotal = 0

  for (const page of opts.pages) {
    // Extra sections beyond baseSectionsIncluded
    const sections = page.sections ?? 0
    const extraSections = Math.max(0, sections - baseSectionsIncluded)
    extraSectionsTotal += extraSections * pricePerExtraSectionGBP

    // Custom (bespoke) page surcharge
    if (page.is_custom) {
      customPagesTotal += customPagePriceGBP
    }
  }

  const pages_gbp = extraPages * pricePerPageGBP
  const total_gbp =
    basePriceGBP + pages_gbp + extraSectionsTotal + customPagesTotal
  const deposit_gbp = Math.round((total_gbp * depositPercentage) / 100 * 100) / 100

  const currency = opts.currency_code.toUpperCase()
  const rate = currency === 'GBP'
    ? 1
    : (rates.rates as Record<string, number>)[currency] ?? 1

  const total_local = convertGBP(total_gbp, currency, rates)
  const deposit_local = convertGBP(deposit_gbp, currency, rates)

  return {
    total_gbp,
    total_local,
    rate,
    breakdown: {
      base_gbp: basePriceGBP,
      pages_gbp,
      extra_sections_gbp: extraSectionsTotal,
      custom_pages_gbp: customPagesTotal,
      total_gbp,
      deposit_gbp,
      deposit_local,
    },
  }
}
