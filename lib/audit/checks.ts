import type {
  SslResult,
  HeadersResult,
  PsiResult,
  SecurityHeader,
  CheckError,
} from './types'
import {
  SSL_COPY,
  HEADER_LABELS,
  HEADERS_COPY,
  MOBILE_COPY,
  DESKTOP_COPY,
  PSI_ERROR_COPY,
  scoreBucket,
} from './copy'
import { SECURITY_HEADERS } from './types'

const USER_AGENT = 'MountainStudiosAudit/1.0 (+https://mountainstudios.co.za)'
let psiKeyWarned = false

export function normaliseUrl(
  input: string,
): { url: string } | { blocked: string } {
  let url = input.trim()

  // Prepend https:// if no scheme
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }

  // Parse and validate
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return { blocked: 'Invalid URL format' }
  }

  // Only allow http/https
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { blocked: 'Only HTTP and HTTPS are supported' }
  }

  const hostname = parsed.hostname || ''

  // Reject localhost and .local/.internal
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    return { blocked: 'Local addresses cannot be checked' }
  }

  // Reject SSRF targets: IP literals and common private ranges
  if (
    hostname === '0.0.0.0' ||
    hostname === '::1' ||
    hostname.startsWith('127.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('169.254.') ||
    (hostname.startsWith('172.') && isInRange172(hostname))
  ) {
    return { blocked: 'Private IP addresses cannot be checked' }
  }

  // Must have at least one dot (reject bare hostnames)
  if (!hostname.includes('.')) {
    return { blocked: 'Hostname must include a domain' }
  }

  return { url }
}

function isInRange172(hostname: string): boolean {
  const parts = hostname.split('.')
  if (parts.length < 2) return false
  const secondOctet = parseInt(parts[1], 10)
  return secondOctet >= 16 && secondOctet <= 31
}

export async function checkSsl(url: string): Promise<SslResult> {
  const timeout = 12000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    // Try HEAD first
    let response: Response | null = null
    try {
      response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-store',
        redirect: 'follow',
        headers: { 'User-Agent': USER_AGENT },
        signal: controller.signal,
      })
    } catch (err) {
      // If HEAD fails, retry with GET
      response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: { 'User-Agent': USER_AGENT },
        signal: controller.signal,
      })
    }

    // Success — SSL is valid
    return {
      status: 'ok',
      pass: true,
      code: null,
      ...SSL_COPY.pass,
    }
  } catch (err) {
    const errAny = err as any
    const causeCode = errAny?.cause?.code as string | undefined

    // Check cause code for SSL/cert errors
    if (
      causeCode &&
      /CERT|TLS|SSL|DEPTH_ZERO|SELF_SIGNED|ALTNAME/i.test(causeCode)
    ) {
      return {
        status: 'ok',
        pass: false,
        code: causeCode,
        ...SSL_COPY.invalid,
      }
    }

    // Connection refused or DNS errors
    if (
      causeCode &&
      /ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ECONNRESET/i.test(causeCode)
    ) {
      return {
        status: 'ok',
        pass: false,
        code: causeCode,
        ...SSL_COPY.no_https,
      }
    }

    // Abort or timeout
    if (
      err instanceof Error &&
      (err.name === 'AbortError' || err.name === 'TimeoutError')
    ) {
      const detail = err.message || 'Request timed out'
      return {
        status: 'error',
        reason: 'timeout',
        detail,
        ...SSL_COPY.error,
      }
    }

    // Everything else
    const detail =
      err instanceof Error ? err.message : String(err)
    return {
      status: 'error',
      reason: 'unreachable',
      detail,
      ...SSL_COPY.error,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function checkHeaders(url: string): Promise<HeadersResult> {
  const timeout = 12000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow',
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    })

    // Read headers case-insensitively
    const headersMap = new Map<string, string>()
    response.headers.forEach((value, key) => {
      headersMap.set(key.toLowerCase(), value)
    })

    const present: SecurityHeader[] = []
    const missing: SecurityHeader[] = []

    for (const header of SECURITY_HEADERS) {
      if (headersMap.has(header)) {
        present.push(header)
      } else {
        missing.push(header)
      }
    }

    // Determine bucket
    let bucket: 'green' | 'amber' | 'red'
    if (present.length >= 4) {
      bucket = 'green'
    } else if (present.length >= 2) {
      bucket = 'amber'
    } else {
      bucket = 'red'
    }

    const missingDetail = missing.map((h) => HEADER_LABELS[h])

    return {
      status: 'ok',
      present,
      missing,
      bucket,
      headline: HEADERS_COPY[bucket].headline,
      body: HEADERS_COPY[bucket].body,
      missingDetail,
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    const reason =
      err instanceof Error &&
      (err.name === 'AbortError' || err.name === 'TimeoutError')
        ? ('timeout' as const)
        : ('unreachable' as const)

    return {
      status: 'error',
      reason,
      detail,
      ...HEADERS_COPY.error,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function checkPsi(
  url: string,
  strategy: 'mobile' | 'desktop',
): Promise<PsiResult> {
  const timeout = 45000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  // Warn once if key is missing
  if (!process.env.GOOGLE_PSI_API_KEY && !psiKeyWarned) {
    console.warn(
      '[audit] GOOGLE_PSI_API_KEY not set — PSI running unauthenticated, expect rate limits',
    )
    psiKeyWarned = true
  }

  try {
    const params = new URLSearchParams({
      url,
      strategy,
      category: 'performance',
    })

    if (process.env.GOOGLE_PSI_API_KEY) {
      params.append('key', process.env.GOOGLE_PSI_API_KEY)
    }

    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`

    const response = await fetch(endpoint, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    })

    // Handle error responses
    if (!response.ok) {
      if (response.status === 429) {
        return buildPsiError('rate_limit', `HTTP ${response.status}`)
      }

      // Check if it's an unreachable error
      if (response.status >= 400 && response.status < 500) {
        try {
          const json = await response.json() as any
          const message = json?.error?.message || ''
          if (
            /could not|load|fetch|unreachable/i.test(message)
          ) {
            return buildPsiError('unreachable', message)
          }
        } catch {
          // Fall through
        }
      }

      return buildPsiError('api_error', `HTTP ${response.status} ${response.statusText}`)
    }

    const json = await response.json() as any

    // Extract score
    const score = Math.round(
      (json.lighthouseResult?.categories?.performance?.score ?? 0) * 100,
    )

    // Check if score extraction succeeded
    if (!json.lighthouseResult?.categories?.performance) {
      return buildPsiError('api_error', 'Score data missing from response')
    }

    // Extract screenshot for mobile only
    let screenshot: string | null = null
    if (strategy === 'mobile') {
      screenshot =
        json.lighthouseResult?.audits?.['final-screenshot']?.details?.data ??
        null

      // Cap screenshot size
      if (screenshot && screenshot.length > 400_000) {
        screenshot = null
      }
    }

    const bucket = scoreBucket(score)
    const copyMap = strategy === 'mobile' ? MOBILE_COPY : DESKTOP_COPY

    return {
      status: 'ok',
      score,
      bucket,
      screenshot,
      headline: copyMap[bucket].headline,
      body: copyMap[bucket].body,
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    if (
      err instanceof Error &&
      (err.name === 'AbortError' || err.name === 'TimeoutError')
    ) {
      return buildPsiError('timeout', detail)
    }
    return buildPsiError('api_error', detail)
  } finally {
    clearTimeout(timeoutId)
  }
}

function buildPsiError(
  reason: Exclude<CheckError['reason'], 'blocked'>,
  detail: string,
): PsiResult {
  return {
    status: 'error',
    reason,
    detail,
    ...PSI_ERROR_COPY[reason],
  }
}
