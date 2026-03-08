import crypto from 'crypto'
import type { PeachCheckout } from '@/types'

// ---------------------------------------------------------------------------
// Config helpers
// ---------------------------------------------------------------------------

function getBaseUrl(): string {
  const env = process.env.PEACH_PAYMENTS_ENV ?? 'test'
  return env === 'live'
    ? 'https://secure.peachpayments.com'
    : 'https://testsandbox.peachpayments.com'
}

function getEntityId(): string {
  const id = process.env.PEACH_PAYMENTS_ENTITY_ID
  if (!id) throw new Error('[payments] PEACH_PAYMENTS_ENTITY_ID is not set')
  return id
}

function getSecret(): string {
  const secret = process.env.PEACH_PAYMENTS_SECRET
  if (!secret) throw new Error('[payments] PEACH_PAYMENTS_SECRET is not set')
  return secret
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CheckoutOpts {
  brief_id?: string
  lead_id: string
  amount_local: number
  currency: string
  description: string
  customer_email: string
  customer_name: string
  payment_type: 'deposit' | 'final'
  return_url: string
  notification_url: string
}

// ---------------------------------------------------------------------------
// Internal checkout creator
// ---------------------------------------------------------------------------

async function createCheckout(opts: CheckoutOpts): Promise<PeachCheckout> {
  const baseUrl = getBaseUrl()
  const entityId = getEntityId()

  const merchantTransactionId = [
    opts.payment_type,
    opts.lead_id,
    opts.brief_id ?? 'no-brief',
    Date.now(),
  ].join('_')

  const nameParts = opts.customer_name.trim().split(/\s+/)
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') || firstName

  const formBody = new URLSearchParams({
    entityId,
    amount: opts.amount_local.toFixed(2),
    currency: opts.currency.toUpperCase(),
    paymentType: 'DB',
    merchantTransactionId,
    descriptor: opts.description.slice(0, 127),
    'customer.email': opts.customer_email,
    'customer.givenName': firstName,
    'customer.surname': lastName,
    'billing.street1': 'N/A',
    'billing.city': 'N/A',
    'billing.state': 'N/A',
    'billing.postcode': '0000',
    'billing.country': 'ZA',
    shopperResultUrl: opts.return_url,
    notificationUrl: opts.notification_url,
    'customParameters[lead_id]': opts.lead_id,
    'customParameters[payment_type]': opts.payment_type,
    ...(opts.brief_id ? { 'customParameters[brief_id]': opts.brief_id } : {}),
  })

  const res = await fetch(`${baseUrl}/v1/checkouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[payments] Peach Payments API error ${res.status}: ${text}`)
  }

  const json = await res.json()

  if (!json.id) {
    throw new Error(`[payments] No checkoutId in Peach response: ${JSON.stringify(json)}`)
  }

  const checkoutId: string = json.id
  const payment_url = `${baseUrl}/v1/checkouts/${checkoutId}/payment`

  return {
    checkout_id: checkoutId,
    payment_url,
    merchant_transaction_id: merchantTransactionId,
    amount: opts.amount_local,
    currency: opts.currency.toUpperCase(),
    payment_type: opts.payment_type,
    lead_id: opts.lead_id,
    brief_id: opts.brief_id ?? null,
    raw: json,
  } as unknown as PeachCheckout
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function createDepositCheckout(
  opts: CheckoutOpts,
): Promise<PeachCheckout> {
  return createCheckout({ ...opts, payment_type: 'deposit' })
}

export async function createFinalPaymentCheckout(
  opts: CheckoutOpts,
): Promise<PeachCheckout> {
  return createCheckout({ ...opts, payment_type: 'final' })
}

// ---------------------------------------------------------------------------
// Webhook verification
// ---------------------------------------------------------------------------

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  try {
    const secret = getSecret()
    const expected = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signature, 'hex'),
    )
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Webhook payload parser
// ---------------------------------------------------------------------------

const SUCCESS_CODES = new Set(['000.000.000', '000.100.110'])

export function parseWebhookPayload(body: Record<string, string>): {
  success: boolean
  merchantTransactionId: string
  paymentId: string
  amount: string
  currency: string
  result_code: string
} {
  const result_code = body['result.code'] ?? ''
  return {
    success: SUCCESS_CODES.has(result_code),
    merchantTransactionId: body['merchantTransactionId'] ?? '',
    paymentId: body['id'] ?? '',
    amount: body['amount'] ?? '',
    currency: body['currency'] ?? '',
    result_code,
  }
}
