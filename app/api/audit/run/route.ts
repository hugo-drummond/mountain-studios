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
