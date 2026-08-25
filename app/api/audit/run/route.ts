import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/audit/run'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

interface Payload {
  auditRequestId?: string
  force?: boolean
}

function isUuidLike(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    str,
  )
}

export async function POST(req: NextRequest) {
  // This route re-runs an audit and re-sends its email. Until now it was open:
  // anyone holding a row's uuid could trigger both, repeatedly, at our cost.
  // It has no public caller — the popup, the chatbot and the sweep all reach
  // the work through lib/audit/start.ts, which passes this secret.
  //
  // Refuses to run when the secret is unset rather than running unauthenticated,
  // matching /api/audit/sweep.
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.error('[audit/run] CRON_SECRET not set')
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 500 })
  }
  if (req.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Rate limit
  const rateLimitResult = await rateLimit(req, 'audit/run')
  if (!rateLimitResult.ok) {
    return tooManyRequests()
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 },
    )
  }

  const auditRequestId = body.auditRequestId?.trim()
  if (!auditRequestId || !isUuidLike(auditRequestId)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid auditRequestId' },
      { status: 400 },
    )
  }

  const result = await runAudit(auditRequestId, { force: body.force === true })

  if (!result.ok) {
    if (result.error === 'not_found') {
      return NextResponse.json(
        { ok: false, error: 'Audit request not found' },
        { status: 404 },
      )
    }
    if (result.error === 'already_running') {
      return NextResponse.json(
        { ok: false, error: 'Audit already running' },
        { status: 409 },
      )
    }
    return NextResponse.json(
      { ok: false, error: 'Audit failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    status: result.report?.summary.overall,
    report: result.report,
  })
}
