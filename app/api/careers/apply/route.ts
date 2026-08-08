import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'

// ---------------------------------------------------------------------------
// POST /api/careers/apply
//
// The application form on /careers/sales-rep. Three destinations, in order of
// how much it would hurt to lose them:
//   1. the row in mountainstudios.rep_applications
//   2. the CV in the private rep-cvs bucket
//   3. an email to Ant so he knows without watching the table
//
// The row goes in first and on its own. A CV that fails to upload costs us an
// attachment; a row that fails to insert costs us the person. Each leg is
// caught separately, and only a total loss is reported back as a failure.
//
// Multipart rather than JSON, because the CV rides along with the answers.
// ---------------------------------------------------------------------------

const NOTIFY_TO = 'ant88835@gmail.com'
const CV_BUCKET = 'rep-cvs'
const MAX_CV_BYTES = 5 * 1024 * 1024
const ALLOWED_CV_EXT = ['pdf', 'doc', 'docx']
// A week is long enough to read an application at the weekend and short enough
// that a forwarded email does not become a permanent public link.
const CV_LINK_TTL_SECONDS = 60 * 60 * 24 * 7

const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
]

// Long enough to rule out "asdf" and a bot's empty-ish filler, short enough that
// someone typing on a phone in a taxi still gets through.
const MIN_ANSWER_LENGTH = 20

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`
}

function block(label: string, value: string): string {
  return `<div style="margin-top:20px;padding:16px;background:#f6f5fb;border-radius:10px;">
    <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">${escapeHtml(label)}</p>
    <p style="font-size:14px;color:#0f172a;margin:0;white-space:pre-wrap;">${escapeHtml(value)}</p>
  </div>`
}

function str(form: FormData, key: string): string {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function bool(form: FormData, key: string): boolean | null {
  const value = str(form, key)
  if (value === 'yes' || value === 'true') return true
  if (value === 'no' || value === 'false') return false
  return null
}

function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf('.')
  return dot === -1 ? '' : filename.slice(dot + 1).toLowerCase()
}

// Storage keys are URL path segments. Anything exotic in an uploaded filename
// either breaks the key or escapes the folder, so only these survive.
function safeFilename(filename: string): string {
  const cleaned = filename
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return cleaned || 'cv'
}

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Could not read the form.' }, { status: 400 })
  }

  // Bots fill every field they find. A real applicant never sees this one.
  if (str(form, 'website')) {
    return NextResponse.json({ success: true, applicationId: null, emailed: false, eligible: true })
  }

  const fullName = str(form, 'full_name')
  const email = str(form, 'email')
  const phone = str(form, 'phone')
  const province = str(form, 'province')
  const city = str(form, 'city')
  const whySales = str(form, 'why_sales')
  const persuasion = str(form, 'persuasion')
  const workRights = bool(form, 'work_rights')
  const hasLaptop = bool(form, 'has_laptop')

  const missing = !fullName || !email || !phone || !province || !city || !whySales || !persuasion
  if (missing || workRights === null || hasLaptop === null) {
    return NextResponse.json({ success: false, error: 'Please fill in every question.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'That email address does not look right.' }, { status: 400 })
  }
  if (!PROVINCES.includes(province)) {
    return NextResponse.json({ success: false, error: 'Choose a province from the list.' }, { status: 400 })
  }
  if (whySales.length < MIN_ANSWER_LENGTH || persuasion.length < MIN_ANSWER_LENGTH) {
    return NextResponse.json(
      { success: false, error: 'Give us a couple of sentences on each of the two questions.' },
      { status: 400 },
    )
  }

  // The file is validated before anything is written, so a bad upload costs the
  // applicant a retry rather than leaving a half-finished row behind.
  const cvEntry = form.get('cv')
  const cv = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null
  if (cv) {
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json({ success: false, error: 'Your CV must be under 5MB.' }, { status: 400 })
    }
    if (!ALLOWED_CV_EXT.includes(extensionOf(cv.name))) {
      return NextResponse.json({ success: false, error: 'Your CV must be a PDF, DOC or DOCX.' }, { status: 400 })
    }
  }

  let applicationId: string | null = null
  try {
    const { data, error } = await crmAdmin()
      .from('rep_applications')
      .insert({
        full_name: fullName,
        email,
        phone,
        province,
        city,
        why_sales: whySales,
        persuasion,
        work_rights: workRights,
        has_laptop: hasLaptop,
        status: 'new',
        source: 'website',
      })
      .select('id')
      .single()

    if (error) throw error
    applicationId = data?.id ?? null
  } catch (err) {
    console.error('[careers/apply] insert failed:', err instanceof Error ? err.message : err)
  }

  let cvPath: string | null = null
  let cvLink: string | null = null
  if (cv && applicationId) {
    try {
      const path = `${applicationId}/${safeFilename(cv.name)}`
      const { error } = await crmAdmin()
        .storage.from(CV_BUCKET)
        .upload(path, cv, { contentType: cv.type || 'application/octet-stream', upsert: true })
      if (error) throw error

      cvPath = path
      await crmAdmin().from('rep_applications').update({ cv_path: path }).eq('id', applicationId)

      const { data } = await crmAdmin().storage.from(CV_BUCKET).createSignedUrl(path, CV_LINK_TTL_SECONDS)
      cvLink = data?.signedUrl ?? null
    } catch (err) {
      console.error('[careers/apply] CV upload failed:', err instanceof Error ? err.message : err)
    }
  }

  let emailed = false
  try {
    const cvLine = !cv
      ? 'No CV attached.'
      : cvLink
        ? `<a href="${cvLink}" style="color:#535f77;">Open CV</a> — link expires in 7 days.`
        : cvPath
          ? 'CV stored, but the link could not be generated. Find it in the rep-cvs bucket.'
          : '<strong style="color:#b91c1c;">CV upload failed — ask them to resend it.</strong>'

    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">New rep application</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${escapeHtml(fullName)}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">${escapeHtml(`${city}, ${province}`)}</p>
      ${workRights ? '' : `<p style="font-size:14px;color:#b91c1c;font-weight:600;margin:0 0 20px;padding:12px 16px;background:#fef2f2;border-radius:10px;">Says they do not have the legal right to work in South Africa. They were told the role requires it.</p>`}
      <table style="border-collapse:collapse;width:100%;">
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Work rights', workRights ? 'Yes' : 'No')}
        ${row('Laptop + internet', hasLaptop ? 'Yes' : 'No')}
      </table>
      ${block('Why sales, and why this role', whySales)}
      ${block('A time they sold or convinced someone', persuasion)}
      <p style="font-size:13px;color:#64748b;margin:24px 0 0;">${cvLine}</p>
      ${applicationId ? '' : '<p style="font-size:13px;color:#b91c1c;margin:8px 0 0;"><strong>Not saved to the database — this email is the only copy.</strong></p>'}
      <p style="font-size:13px;color:#94a3b8;margin:8px 0 0;">Reply to this email to answer ${escapeHtml(fullName.split(' ')[0])} directly.</p>
    </div>`

    await sendMail({
      to: NOTIFY_TO,
      subject: `${workRights ? '' : '[NO WORK RIGHTS] '}New rep application — ${fullName} (${city}, ${province})`,
      html,
      replyTo: email,
    })
    emailed = true
  } catch (err) {
    console.error('[careers/apply] notification email failed:', err instanceof Error ? err.message : err)
  }

  if (!applicationId && !emailed) {
    // Nothing reached us. Say so, so the page keeps the form filled in rather
    // than thanking someone for an application we never received.
    return NextResponse.json(
      { success: false, error: 'Could not send your application. Please try again.' },
      { status: 502 },
    )
  }

  // eligible: false is not a failure. The application is recorded either way —
  // the flag only decides which message the page shows.
  return NextResponse.json({ success: true, applicationId, emailed, eligible: workRights })
}
