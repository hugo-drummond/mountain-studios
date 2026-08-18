import { crmAdmin } from '@/lib/crm'
import { normaliseUrl, checkSsl, checkHeaders, checkPsi } from './checks'
import type { AuditReport, CheckError, SslResult, HeadersResult, PsiResult, AccessibilityResult } from './types'
import { PSI_ERROR_COPY, A11Y_ERROR_COPY, GENERIC_ERROR_COPY } from './copy'
import { renderAuditEmail, renderAuditCoverEmail } from './email'
import { sendMail, sendMailWithAttachment } from '@/lib/ses'
import { renderReportPdf } from '@/lib/audit-report/render'

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
    .select('id, website_url, email, lead_id, status, report, report_sent_at')
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
        accessibility: {
          status: 'error',
          reason: 'blocked',
          detail: normalised.blocked,
          headline: A11Y_ERROR_COPY.blocked.headline,
          body: A11Y_ERROR_COPY.blocked.body,
        },
      },
      summary: { completed: 0, failed: 5, overall: 'failed' },
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

  const mobileCheckResult = mobileResult.status === 'rejected'
    ? {
        psi: {
          status: 'error' as const,
          reason: 'api_error' as const,
          detail: mobileResult.reason instanceof Error ? mobileResult.reason.message : String(mobileResult.reason),
          ...GENERIC_ERROR_COPY,
        },
        accessibility: {
          status: 'error' as const,
          reason: 'api_error' as const,
          detail: mobileResult.reason instanceof Error ? mobileResult.reason.message : String(mobileResult.reason),
          ...GENERIC_ERROR_COPY,
        },
      }
    : mobileResult.value

  const desktopCheckResult = desktopResult.status === 'rejected'
    ? {
        psi: {
          status: 'error' as const,
          reason: 'api_error' as const,
          detail: desktopResult.reason instanceof Error ? desktopResult.reason.message : String(desktopResult.reason),
          ...GENERIC_ERROR_COPY,
        },
        accessibility: null,
      }
    : desktopResult.value

  const mobileCheck: PsiResult = mobileCheckResult.psi
  const a11yCheck: AccessibilityResult = mobileCheckResult.accessibility || {
    status: 'error',
    reason: 'api_error',
    detail: 'No accessibility result',
    ...GENERIC_ERROR_COPY,
  }
  const desktopCheck: PsiResult = desktopCheckResult.psi

  // 6. Build report
  const failed = [sslCheck, headersCheck, mobileCheck, desktopCheck, a11yCheck].filter(
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
      accessibility: a11yCheck,
    },
    summary: {
      completed: 5 - failed,
      failed,
      overall: failed === 0 ? 'done' : failed === 5 ? 'failed' : 'partial',
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

  // 7b. Send email with PDF attachment (best effort)
  try {
    const shouldSendEmail =
      (report.summary.overall === 'done' || report.summary.overall === 'partial') &&
      (opts?.force || row.report_sent_at === null) &&
      !!row.email?.trim()

    if (shouldSendEmail) {
      const { subject, html } = renderAuditEmail(report)

      // The cover names the site that was audited, taken from the URL itself.
      //
      // It used to prefer the linked lead's business_name, but leads are
      // matched on email: someone auditing a second site got a report titled
      // with the first one's name. The lead describes a person, the report
      // describes a website, and only one of those is on the cover.
      let businessName: string
      try {
        const parsed = new URL(row.website_url)
        businessName = parsed.hostname?.replace(/^www\./, '') || row.website_url
      } catch {
        businessName = row.website_url
      }

      let pdfBuffer: Buffer | null = null
      let sendSuccess = false
      let messageId: string | undefined

      // Try to render and upload PDF
      try {
        pdfBuffer = await renderReportPdf(report, { businessName })

        // Create bucket if it doesn't exist (best effort)
        try {
          await crmAdmin().storage.createBucket('audit-reports', { public: false })
        } catch (bucketErr: any) {
          // Ignore "already exists" error
          if (bucketErr?.message?.includes('already exists')) {
            // Expected, bucket exists
          } else if (bucketErr?.status === 409) {
            // Also expected for 409 conflicts
          } else {
            throw bucketErr
          }
        }

        // Upload PDF to storage
        await crmAdmin().storage
          .from('audit-reports')
          .upload(`${auditRequestId}.pdf`, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
          })

        // Send email with attachment. The covering note carries the PDF — the
        // long written version below is only for when the render failed and
        // the email has to stand alone.
        const hostname = new URL(row.website_url).hostname?.replace(/^www\./, '') || 'website'
        // The audit row carries no person's name; the linked lead sometimes
        // does. Never let this lookup stop the report going out.
        let firstName: string | undefined
        if (row.lead_id) {
          try {
            const { data: lead } = await crmAdmin()
              .from('leads')
              .select('director_name')
              .eq('id', row.lead_id)
              .single()
            const full = typeof lead?.director_name === 'string' ? lead.director_name.trim() : ''
            if (full) firstName = full.split(/\s+/)[0]
          } catch {
            firstName = undefined
          }
        }

        const cover = renderAuditCoverEmail(report, businessName, firstName)

        // Tried twice before giving up on the attachment.
        //
        // The first istore report went out without its PDF, and every step of
        // this path passed when replayed by hand afterwards — the render, the
        // upload, the cover, the send. It was a transient failure, and one
        // attempt was enough to turn a 700KB branded report into a plain email
        // for good. The PDF is the deliverable; it is worth a second go.
        let lastSendError: unknown
        for (let attempt = 0; attempt < 2 && !sendSuccess; attempt++) {
          if (attempt > 0) await new Promise((r) => setTimeout(r, 1500))
          try {
            messageId = await sendMailWithAttachment({
              to: row.email,
              subject: cover.subject,
              html: cover.html,
              attachment: {
                filename: `website-audit-${hostname}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf',
              },
            })
            sendSuccess = true
          } catch (sendErr) {
            lastSendError = sendErr
            console.error(
              `[audit/run] attachment send attempt ${attempt + 1} failed:`,
              sendErr instanceof Error ? sendErr.message : sendErr,
            )
          }
        }

        if (!sendSuccess) throw lastSendError
      } catch (err) {
        // PDF render, upload or send failed — still send the written report.
        //
        // This fallback used to be completely silent: the visitor got an email
        // with no PDF, the row still said the report was sent, and the reason
        // existed only in a server log nobody reads. Someone had to notice the
        // missing attachment by eye and say so. The reason is now written onto
        // the report so it is visible in the database afterwards.
        const reason = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
        console.error('[audit/run] PDF path failed, sending written report instead:', reason)

        try {
          await db
            .from('audit_requests')
            .update({
              report: {
                ...(report as Record<string, unknown>),
                delivery: { pdfAttached: false, failedAt: new Date().toISOString(), reason },
              },
            })
            .eq('id', auditRequestId)
        } catch {
          // Recording why is worth a try, never worth losing the email over.
        }

        try {
          messageId = await sendMail({ to: row.email, subject, html })
          sendSuccess = true
        } catch (emailErr) {
          console.error('[audit/run] Fallback email send also failed:', emailErr instanceof Error ? emailErr.message : emailErr)
          sendSuccess = false
        }
      }

      // Only stamp report_sent_at if email actually went out
      if (sendSuccess) {
        const { error: updateError } = await db
          .from('audit_requests')
          .update({ report_sent_at: new Date().toISOString() })
          .eq('id', auditRequestId)

        if (updateError) {
          console.error('[audit/run] Failed to update report_sent_at:', updateError.message)
        }
      }
    }
  } catch (err) {
    console.error('[audit/run] Email send failed:', err instanceof Error ? err.message : err)
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
