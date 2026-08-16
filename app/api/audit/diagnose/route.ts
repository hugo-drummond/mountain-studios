import { NextRequest, NextResponse } from 'next/server'
import { renderReportPdf } from '@/lib/audit-report/render'
import type { AuditReport } from '@/lib/audit/types'

// ---------------------------------------------------------------------------
// GET /api/audit/diagnose
//
// Renders the report PDF from a fixed fake audit and returns either the file
// or the exact error. It exists so the Chrome-on-serverless path can be
// exercised without running a real audit — a real run costs a PSI call, writes
// CRM rows and emails the prospect, which makes it a terrible way to debug a
// renderer.
//
// Gated on CRON_SECRET so it is not a public "burn CPU" button.
// ---------------------------------------------------------------------------

export const runtime = 'nodejs'
export const maxDuration = 300

const FAKE_REPORT: AuditReport = {
  version: 1,
  ranAt: new Date().toISOString(),
  url: 'https://example.co.za',
  checks: {
    ssl: { status: 'ok', pass: true, code: null, headline: 'Encryption is properly set up', body: 'Diagnostic render.' },
    headers: {
      status: 'ok',
      present: ['x-frame-options', 'referrer-policy'],
      missing: ['strict-transport-security', 'x-content-type-options', 'content-security-policy'],
      bucket: 'amber',
      headline: 'Some browser protections missing',
      body: 'Diagnostic render.',
      missingDetail: [],
    },
    mobile: { status: 'ok', score: 64, bucket: 'amber', screenshot: null, headline: 'Mobile speed needs work', body: 'Diagnostic render.' },
    desktop: { status: 'ok', score: 91, bucket: 'green', screenshot: null, headline: 'Desktop speed is strong', body: 'Diagnostic render.' },
    accessibility: { status: 'ok', score: 78, bucket: 'amber', failures: ['Diagnostic finding'], headline: 'Accessibility needs work', body: 'Diagnostic render.' },
  },
  summary: { completed: 5, failed: 0, overall: 'done' },
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'CRON_SECRET not configured' }, { status: 500 })
  }
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const pdf = await renderReportPdf(FAKE_REPORT, { businessName: 'Diagnostic Render' })
    return new NextResponse(pdf as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="diagnostic.pdf"',
        'X-Pdf-Bytes': String(pdf.length),
      },
    })
  } catch (err) {
    // The whole point is to see the real failure, so return it verbatim.
    return NextResponse.json(
      {
        ok: false,
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack?.split('\n').slice(0, 12) : undefined,
      },
      { status: 500 },
    )
  }
}
