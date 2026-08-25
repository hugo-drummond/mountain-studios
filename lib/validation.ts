/** Shared email + phone validation, used by both the client forms and the API routes. */

export function isValidEmail(value: string): boolean {
  const email = value.trim()
  if (!email || email.length > 254) return false
  if (/\s/.test(email)) return false
  if (email.includes('..')) return false
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(email)
}

/**
 * Accepts a SA local number (0XXXXXXXXX) or any international number written
 * with a country code (+CC followed by 7-15 digits). Returns the E.164 form so
 * everything downstream stores the same shape.
 */
export function normalizePhone(value: string): { ok: boolean; e164: string } {
  const raw = value.trim()
  if (!raw) return { ok: false, e164: '' }
  if (/[A-Za-z]/.test(raw)) return { ok: false, e164: '' }
  const plus = raw.startsWith('+') || raw.startsWith('00')
  const digits = raw.replace(/\D/g, '')
  if (!digits) return { ok: false, e164: '' }
  // SA local: 0 followed by 9 digits
  if (!plus && digits.length === 10 && digits.startsWith('0')) {
    return { ok: true, e164: '+27' + digits.slice(1) }
  }
  if (plus) {
    const intl = raw.startsWith('00') ? digits.slice(2) : digits
    if (intl.length >= 8 && intl.length <= 15) return { ok: true, e164: '+' + intl }
  }
  return { ok: false, e164: '' }
}

export const EMAIL_ERROR = 'Please enter a valid email address, like name@example.com.'
export const PHONE_ERROR = 'Please enter a valid phone number, like 082 123 4567 or +27 82 123 4567.'
