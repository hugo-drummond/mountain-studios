import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Brief } from '@/types'

// ---------------------------------------------------------------------------
// Whitelist of fields the client is allowed to autosave
// ---------------------------------------------------------------------------

const ALLOWED_FIELDS = [
  'business_name',
  'business_type',
  'style',
  'primary_colour',
  'secondary_colour',
  'pages',
  'social_handles',
  'reference_sites',
  'additional_notes',
  'tagline',
  'tone',
  'target_audience',
  'cta_goals',
  'services',
  'page_sections_data',
  'contact_email',
  'contact_phone',
  'contact_address',
  'business_hours',
  'reference_site_notes',
  'content_visual_ratio',
  'region',
  'decision_status',
] as const

type AllowedField = (typeof ALLOWED_FIELDS)[number]

// ---------------------------------------------------------------------------
// POST /api/briefs/[id]/autosave
// ---------------------------------------------------------------------------

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const body = await req.json()

    // ── 1. Fetch brief ───────────────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('id', id)
      .single()

    if (briefError || !brief) {
      return NextResponse.json(
        { success: false, error: 'Brief not found' },
        { status: 404 },
      )
    }

    // Guard: no edits once the brief is in. The old rate_locked guard on page
    // changes is gone with the quote engine — pages no longer set the price, so
    // there is nothing for a locked rate to protect.
    if (brief.status === 'submitted' || brief.status === 'reviewed') {
      return NextResponse.json(
        { success: false, error: 'Brief has already been submitted' },
        { status: 400 },
      )
    }

    // ── 2. Build allowed-fields update payload ────────────────────────────────
    const update: Partial<Record<AllowedField, unknown>> & {
      last_autosaved_at: string
      updated_at: string
    } = {
      last_autosaved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        update[field] = body[field]
      }
    }

    // Price is no longer derived from the page selection — it is agreed per job
    // and entered by an admin when the brief is sent, so changing pages here
    // does not reprice anything.

    // ── 3. Update brief ───────────────────────────────────────────────────────
    const { data: updatedBrief, error: updateError } = await supabaseAdmin
      .from('briefs')
      .update(update)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedBrief) {
      console.error('[briefs/autosave] update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to autosave brief' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: { brief: updatedBrief as Brief },
    })
  } catch (err) {
    console.error('[briefs/autosave] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
