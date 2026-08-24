import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'

// ---------------------------------------------------------------------------
// POST /api/preview/[token]/claim
//
// The client tapped "I want this website" on a shared preview.
//
// This one does notify. Unlike job applications — hundreds of them, most junk —
// a claim is a business owner saying yes while looking at their own site. It is
// rare, and it goes stale in hours.
// ---------------------------------------------------------------------------

const NOTIFY_TO = 'hello@mountainstudios.co.za'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface PreviewRow {
  id: string
  business_name: string
  lead_id: string | null
  expires_at: string
  revoked: boolean
  claimed_at: string | null
}

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  let name: string
  let phone: string
  let note: string | null
  try {
    const body = await req.json()
    name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
    phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : ''
    note = typeof body.note === 'string' && body.note.trim() ? body.note.trim().slice(0, 2000) : null
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  if (!name || !phone) {
    return NextResponse.json({ success: false, error: 'Please give us your name and number.' }, { status: 400 })
  }

  let preview: PreviewRow | null = null
  try {
    const { data, error } = await crmAdmin()
      .from('shared_previews')
      .select('id, business_name, lead_id, expires_at, revoked, claimed_at')
      .eq('token', params.token)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    preview = (data as PreviewRow | null) ?? null
  } catch (err) {
    console.error('[preview/claim] lookup failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not send your details. Please try again.' }, { status: 502 })
  }

  if (!preview || preview.revoked || new Date(preview.expires_at) < new Date()) {
    return NextResponse.json({ success: false, error: 'This preview is no longer available.' }, { status: 410 })
  }

  // A second tap is not an error — the client already told us, and saying so
  // would only make them think it failed the first time.
  if (preview.claimed_at) {
    return NextResponse.json({ success: true, alreadyClaimed: true })
  }

  let recorded = false
  try {
    const { error } = await crmAdmin()
      .from('shared_previews')
      .update({ claimed_at: new Date().toISOString(), claim_name: name, claim_phone: phone, claim_note: note })
      .eq('id', preview.id)
    if (error) throw error
    recorded = true
  } catch (err) {
    console.error('[preview/claim] could not record claim:', err instanceof Error ? err.message : err)
  }

  // Existing leads get flagged in place; a preview sent to someone not yet in
  // the CRM creates the lead, so an interested business can never fall through.
  try {
    if (preview.lead_id) {
      // Keep every number we have. A scraped business line and the number the
      // person actually typed are both worth holding, so neither overwrites the
      // other: the first number found lands in phone, a second and different one
      // in director_phone, and notes carry the whole claim either way. Until now
      // this branch wrote only the two status flags, so on any preview that
      // already had a lead — which is every wizard preview — the claimant's name
      // and number never reached the CRM screen a rep actually works.
      const { data: lead } = await crmAdmin()
        .from('leads')
        .select('phone, director_phone, director_name, notes')
        .eq('id', preview.lead_id)
        .maybeSingle()

      const digitsOnly = (value: string | null | undefined): string => (value || '').replace(/\D/g, '')
      const updates: Record<string, unknown> = { crm_status: 'qualified', mockup_ready: true }

      if (!lead?.director_name) updates.director_name = name
      if (!lead?.phone) {
        updates.phone = phone
      } else if (digitsOnly(lead.phone) !== digitsOnly(phone) && !lead.director_phone) {
        updates.director_phone = phone
      }

      const claimLine = `Claimed their website preview.\nContact: ${name} · ${phone}${note ? `\n\nThey said:\n${note}` : ''}`
      updates.notes = lead?.notes ? `${lead.notes}\n\n${claimLine}` : claimLine

      await crmAdmin().from('leads').update(updates).eq('id', preview.lead_id)
    } else {
      await crmAdmin().from('leads').insert({
        business_name: preview.business_name,
        phone,
        director_name: name,
        notes: `Claimed their website preview.\nContact: ${name} · ${phone}${note ? `\n\nThey said:\n${note}` : ''}`,
        source: 'preview',
        has_website: false,
        crm_status: 'qualified',
        mockup_ready: true,
      })
    }
  } catch (err) {
    console.error('[preview/claim] CRM write failed:', err instanceof Error ? err.message : err)
  }

  let emailed = false
  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Preview claimed — ${preview.business_name}`,
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Preview claimed</p>
        <h1 style="font-size:22px;color:#0f172a;margin:0 0 16px;">${escapeHtml(preview.business_name)}</h1>
        <p style="font-size:15px;color:#0f172a;margin:0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
        <p style="font-size:15px;color:#0f172a;margin:0 0 16px;"><a href="tel:${escapeHtml(phone)}" style="color:#535f77;">${escapeHtml(phone)}</a></p>
        ${note ? `<div style="padding:16px;background:#f6f5fb;border-radius:10px;margin-bottom:16px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">They said</p>
          <p style="font-size:14px;color:#0f172a;margin:0;white-space:pre-wrap;">${escapeHtml(note)}</p>
        </div>` : ''}
        <p style="font-size:13px;color:#64748b;margin:0;">They tapped this while looking at their own preview. Call while it&rsquo;s warm.</p>
        ${recorded ? '' : '<p style="font-size:13px;color:#b91c1c;margin:12px 0 0;"><strong>Not recorded against the preview — this email is the only copy.</strong></p>'}
      </div>`,
    })
    emailed = true
  } catch (err) {
    console.error('[preview/claim] notification email failed:', err instanceof Error ? err.message : err)
  }

  if (!recorded && !emailed) {
    return NextResponse.json({ success: false, error: 'Could not send your details. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
