import { crmAdmin } from '@/lib/crm'
import { normaliseUrl, checkSsl, checkHeaders, checkPsi } from './checks'
import type { AuditReport, CheckError, SslResult, HeadersResult, PsiResult } from './types'
import { PSI_ERROR_COPY, GENERIC_ERROR_COPY } from './copy'

export async function runAudit(
  auditRequestId: string,
  opts?: { force?: boolean },
): Promise<{
  ok: boolean
  report?: AuditReport
  error?: string
}> {
  const db = crmAdmin()

  // 1. Fetch the audit request
  const { data: row, error: queryError } = await db
    .from('audit_requests')
    .select('id, website_url, email, lead_id, status, report')
    .eq('id', auditRequestId)
    .single()

  if (queryError || !row) {
    return { ok: false, error: 'not_found' }
  }

  // 2. Idempotency: check status
  if (!opts?.force && row.status === 'running') {
    return { ok: false, error: 'already_running' }
  }

  if (!opts?.force && row.status === 'done' && row.report) {
    return { ok: true, report: row.report as AuditReport }
  }

  // 3. Set status to running (best effort)
  const { error: statusError } = await db
    .from('audit_requests')
    .update({ status: 'running' })
    .eq('id', auditRequestId)

  if (statusError) {
    console.error('[audit/run] status->running failed:', statusError.message)
  }

  // 4. Normalize URL
  const normalised = normaliseUrl(row.website_url)
  if ('blocked' in normalised) {
    const blockedReport: AuditReport = {
      version: 1,
      ranAt: new Date().toISOString(),
      url: row.website_url,
      checks: {
        ssl: {
          status: 'error',
          reason: 'blocked',
          detail: normalised.blocked,
          headline: PSI_ERROR_COPY.blocked.headline,
          body: PSI_ERROR_COPY.blocked.body,
        },
        headers: {
          status: 'error',
          reason: 'blocked',
          detail: normalised.blocked,
          headline: PSI_ERROR_COPY.blocked.headline,
          body: PSI_ERROR_COPY.blocked.body,
        },
        mobile: {
          status: 'error',
          reason: 'blocked',
          detail: normalised.blocked,
          headline: PSI_ERROR_COPY.blocked.headline,
          body: PSI_ERROR_COPY.blocked.body,
        },
        desktop: {
          status: 'error',
          reason: 'blocked',
          detail: normalised.blocked,
          headline: PSI_ERROR_COPY.blocked.headline,
          body: PSI_ERROR_COPY.blocked.body,
        },
      },
      summary: { completed: 0, failed: 4, overall: 'failed' },
    }

    // Write and return
    const { error: blockedWriteError } = await db
      .from('audit_requests')
      .update({ report: blockedReport, status: 'failed' })
      .eq('id', auditRequestId)

    if (blockedWriteError) {
      console.error('[audit/run] Failed to write blocked report:', blockedWriteError.message)
    }

    return { ok: true, report: blockedReport }
  }

  const url = normalised.url

  // 5. Run all checks in parallel
  const results = await Promise.allSettled([
    checkSsl(url),
    checkHeaders(url),
    checkPsi(url, 'mobile'),
    checkPsi(url, 'desktop'),
  ])

  // Convert rejections to CheckError
  const sslResult: typeof results[0] = results[0]
  const headersResult: typeof results[1] = results[1]
  const mobileResult: typeof results[2] = results[2]
  const desktopResult: typeof results[3] = results[3]

  const sslCheck: SslResult =
    sslResult.status === 'rejected'
      ? {
          status: 'error',
          reason: 'api_error',
          detail: sslResult.reason instanceof Error ? sslResult.reason.message : String(sslResult.reason),
          ...GENERIC_ERROR_COPY,
        }
      : sslResult.value

  const headersCheck: HeadersResult =
    headersResult.status === 'rejected'
      ? {
          status: 'error',
          reason: 'api_error',
          detail: headersResult.reason instanceof Error ? headersResult.reason.message : String(headersResult.reason),
          ...GENERIC_ERROR_COPY,
        }
      : headersResult.value

  const mobileCheck: PsiResult =
    mobileResult.status === 'rejected'
      ? {
          status: 'error',
          reason: 'api_error',
          detail: mobileResult.reason instanceof Error ? mobileResult.reason.message : String(mobileResult.reason),
          ...GENERIC_ERROR_COPY,
        }
      : mobileResult.value

  const desktopCheck: PsiResult =
    desktopResult.status === 'rejected'
      ? {
          status: 'error',
          reason: 'api_error',
          detail: desktopResult.reason instanceof Error ? desktopResult.reason.message : String(desktopResult.reason),
          ...GENERIC_ERROR_COPY,
        }
      : desktopResult.value

  // 6. Build report
  const failed = [sslCheck, headersCheck, mobileCheck, desktopCheck].filter(
    (c) => c.status === 'error',
  ).length

  const report: AuditReport = {
    version: 1,
    ranAt: new Date().toISOString(),
    url,
    checks: {
      ssl: sslCheck,
      headers: headersCheck,
      mobile: mobileCheck,
      desktop: desktopCheck,
    },
    summary: {
      completed: 4 - failed,
      failed,
      overall: failed === 0 ? 'done' : failed === 4 ? 'failed' : 'partial',
    },
  }

  // 7. Write report
  const overallStatus = report.summary.overall
  const { error: reportWriteError } = await db
    .from('audit_requests')
    .update({ report, status: overallStatus })
    .eq('id', auditRequestId)

  if (reportWriteError) {
    console.error('[audit/run] Failed to write report:', reportWriteError.message)
    return { ok: false, report, error: 'write_failed' }
  }

  // 8. Best-effort lead mirror
  if (row.lead_id) {
    try {
      const updates: Record<string, any> = {}

      if (sslCheck.status === 'ok') {
        updates.ssl_valid = (sslCheck as any).pass
      }

      if (mobileCheck.status === 'ok') {
        updates.pagespeed_mobile = (mobileCheck as any).score
      }

      if (desktopCheck.status === 'ok') {
        updates.pagespeed_desktop = (desktopCheck as any).score
      }

      if (Object.keys(updates).length > 0) {
        const { error: leadError } = await db
          .from('leads')
          .update(updates)
          .eq('id', row.lead_id)

        if (leadError) {
          console.error('[audit/run] Failed to update lead:', leadError.message)
        }
      }
    } catch (err) {
      console.error('[audit/run] Lead mirror failed:', err)
    }
  }

  return { ok: true, report }
}
