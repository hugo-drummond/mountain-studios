import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendBookingConfirmation } from '@/lib/email'
import type { PageSelection } from '@/types'

// ---------------------------------------------------------------------------
// POST /api/leads/create
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      business_name,
      business_type,
      business_type_custom,
      email,
      phone,
      full_name,
      pages_selected,
      session_max_pages,
      style,
      primary_colour,
      secondary_colour,
      content_visual_ratio,
      heard_from,
      wants_quote_copy,
      source,
    } = body

    // ── 1. Validate required fields ──────────────────────────────────────────
    const missing: string[] = []
    if (!business_name) missing.push('business_name')
    if (!business_type) missing.push('business_type')
    if (!email) missing.push('email')
    if (!pages_selected || !Array.isArray(pages_selected) || pages_selected.length === 0) {
      missing.push('pages_selected')
    }

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    // ── 2. Validate email format ─────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 },
      )
    }

    // ── 3. Insert lead ────────────────────────────────────────────────────────
    // No quote is computed here any more. Pricing is per job, agreed with the
    // client, and entered by an admin when the brief is sent.
    const { data: lead, error: insertError } = await supabaseAdmin
      .from('leads')
      .insert({
        business_name,
        business_type,
        business_type_custom: business_type_custom ?? null,
        email,
        phone: phone ?? null,
        full_name: full_name ?? null,
        // South Africa only — the region picker and multi-currency quoting are gone.
        region: 'South Africa',
        currency_code: 'ZAR',
        pages_selected: pages_selected as PageSelection[],
        session_max_pages: session_max_pages ?? null,
        style: style ?? null,
        primary_colour: primary_colour ?? null,
        secondary_colour: secondary_colour ?? null,
        content_visual_ratio: content_visual_ratio ?? null,
        heard_from: heard_from ?? null,
        wants_quote_copy: wants_quote_copy ?? false,
        source: source ?? 'intake_form',
        status: 'new',
        on_nurture_list: false,
        final_payment_paid: false,
        assigned_to: 'admin',
      })
      .select()
      .single()

    if (insertError || !lead) {
      console.error('[leads/create] insert error:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to create lead' },
        { status: 500 },
      )
    }

    // ── 4. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'lead_created',
      title: `New lead: ${business_name}`,
      body: `${email} — ${business_type}`,
      lead_id: lead.id,
      metadata: {
        business_type,
        pages: (pages_selected as PageSelection[]).length,
      },
    })

    // ── 5. Send follow-up email if requested ──────────────────────────────────
    if (wants_quote_copy && email) {
      await sendBookingConfirmation(email, {
        client_name: full_name ?? business_name,
        meeting_time: 'To be confirmed',
        meeting_link: '',
        meeting_type: 'Discovery call',
      })
    }

    // ── 6. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: {
        lead_id: lead.id,
      },
    })
  } catch (err) {
    console.error('[leads/create] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
