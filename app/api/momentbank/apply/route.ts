import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// ---------------------------------------------------------------------------
// POST /api/momentbank/apply — Public signup (no auth required)
// Inserts into clips.creator_leads and enqueues acq_qualify job
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { creator_name, channel_url, platform, email, niche } = body

    // Validate required fields
    const missing: string[] = []
    if (!creator_name) missing.push('creator_name')
    if (!channel_url) missing.push('channel_url')
    if (!email) missing.push('email')

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 },
      )
    }

    // Insert into clips.creator_leads
    const { data: lead, error: insertError } = await supabaseAdmin
      .schema('clips')
      .from('creator_leads')
      .upsert(
        {
          creator_handle: creator_name,
          platform: platform || 'youtube',
          channel_url,
          email,
          niche: niche || null,
          discovery_source: 'landing_page',
          signal_type: 'inbound',
          lead_status: 'discovered',
        },
        { onConflict: 'creator_handle,platform' },
      )
      .select('lead_id')
      .single()

    if (insertError) {
      console.error('[momentbank/apply] insert error:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to submit application' },
        { status: 500 },
      )
    }

    // Enqueue acq_qualify job via RPC
    if (lead?.lead_id) {
      const { error: rpcError } = await supabaseAdmin
        .schema('clips')
        .rpc('enqueue_job', {
          p_job_type: 'acq_qualify',
          p_priority: 30,
          p_idempotency_key: `acq_qualify:${lead.lead_id}`,
          p_payload: { lead_id: lead.lead_id },
        })

      if (rpcError) {
        console.error('[momentbank/apply] enqueue error:', rpcError)
        // Non-fatal — lead is still saved
      }
    }

    return NextResponse.json({
      success: true,
      data: { lead_id: lead?.lead_id },
    })
  } catch (err) {
    console.error('[momentbank/apply] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
