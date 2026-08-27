import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { runAudit } from '@/lib/audit/run'

export const runtime = 'nodejs'
// Hobby caps every serverless function at 60s and silently ignores anything
// higher, so this is the real ceiling, not a choice. It used to read 300,
// which read like headroom that does not exist. runAudit() logs
// [audit/timing] on every run — check the margin there before adding work.
export const maxDuration = 60

export async function GET(req: NextRequest) {
  // Authenticate via CRON_SECRET header (Vercel Cron sends this)
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('[audit/sweep] CRON_SECRET not set')
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 500 }
    )
  }

  const authHeader = req.headers.get('Authorization')
  const expectedAuth = `Bearer ${cronSecret}`

  if (authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const db = crmAdmin()

  // Find audit_requests rows needing rescue:
  // - report_sent_at is null
  // - created within the last 7 days
  // - status is 'new', 'running', 'done', or 'partial'
  // - 'running' rows picked up only if created_at > 10 minutes ago

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()

  const { data: rows, error: queryError } = await db
    .from('audit_requests')
    .select('id, status, created_at')
    .is('report_sent_at', null)
    .gt('created_at', sevenDaysAgo)
    .in('status', ['new', 'running', 'done', 'partial'])
    .order('created_at', { ascending: true })
    .limit(10)

  if (queryError) {
    console.error('[audit/sweep] Query failed:', queryError.message)
    return NextResponse.json(
      { error: 'Query failed', details: queryError.message },
      { status: 500 }
    )
  }

  // Filter 'running' rows to only those older than 10 minutes (to avoid double-sends)
  const eligibleRows = (rows || []).filter(row => {
    if (row.status !== 'running') return true
    const createdAt = new Date(row.created_at).getTime()
    const now = Date.now()
    return now - createdAt > 10 * 60 * 1000 // More than 10 minutes ago
  })

  let succeeded = 0
  let failed = 0

  // Process each row sequentially (not in parallel) to respect PSI rate limits
  for (const row of eligibleRows) {
    try {
      const result = await runAudit(row.id, { force: true })
      if (result.ok) {
        succeeded++
      } else {
        failed++
        console.error(`[audit/sweep] Audit ${row.id} failed:`, result.error)
      }
    } catch (err) {
      failed++
      console.error(`[audit/sweep] Audit ${row.id} threw:`, err instanceof Error ? err.message : err)
    }
  }

  return NextResponse.json({
    found: eligibleRows.length,
    succeeded,
    failed,
  })
}
