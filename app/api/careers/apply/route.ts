import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { screenApplication } from '@/lib/screen-application'

// ---------------------------------------------------------------------------
// POST /api/careers/apply
//
// The application form on /careers/sales-rep. Two destinations, in order of
// how much it would hurt to lose them:
//   1. the row in mountainstudios.rep_applications
//   2. the CV in the private rep-cvs bucket
//
// Deliberately no notification email. A public job ad produces hundreds of
// applications and most are junk; burying a real person in someone's inbox is
// worse than not sending anything. Applications are read in the review table
// at /admin/applications, ranked by a screening model.
//
// The row goes in first and on its own. A CV that fails to upload costs us an
// attachment; a row that fails to insert costs us the person. Each leg is
// caught separately, and only a total loss is reported back as a failure.
//
// Multipart rather than JSON, because the CV rides along with the answers.
// ---------------------------------------------------------------------------

const CV_BUCKET = 'rep-cvs'
const MAX_CV_BYTES = 5 * 1024 * 1024
const ALLOWED_CV_EXT = ['pdf', 'doc', 'docx']

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
    return NextResponse.json({ success: true, applicationId: null, eligible: true })
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
  if (cv && applicationId) {
    try {
      const path = `${applicationId}/${safeFilename(cv.name)}`
      const { error } = await crmAdmin()
        .storage.from(CV_BUCKET)
        .upload(path, cv, { contentType: cv.type || 'application/octet-stream', upsert: true })
      if (error) throw error

      cvPath = path
      await crmAdmin().from('rep_applications').update({ cv_path: path }).eq('id', applicationId)
    } catch (err) {
      console.error('[careers/apply] CV upload failed:', err instanceof Error ? err.message : err)
    }
  }

  if (!applicationId) {
    // The row is the only copy now that nothing is emailed. If it did not save,
    // say so, so the page keeps the form filled in rather than thanking someone
    // for an application we never received.
    return NextResponse.json(
      { success: false, error: 'Could not send your application. Please try again.' },
      { status: 502 },
    )
  }

  // Screening runs after the applicant has their answer, not before it. It is
  // deliberately not awaited: DeepSeek being slow or down must never hold up a
  // form submission. If this never finishes, screened_at stays null and the
  // rescan in /api/careers/screen picks the application up later.
  screenApplication(applicationId).catch(() => {})

  // eligible: false is not a failure. The application is recorded either way —
  // the flag only decides which message the page shows.
  return NextResponse.json({ success: true, applicationId, eligible: workRights })
}
