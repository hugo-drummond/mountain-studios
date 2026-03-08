import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import Groq from 'groq-sdk'
import Anthropic from '@anthropic-ai/sdk'
import type { TranscriptAnalysis } from '@/types'

// ---------------------------------------------------------------------------
// POST /api/worker/transcribe
// Called by the Python worker. Requires x-worker-secret header.
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // ── 1. Validate auth header ───────────────────────────────────────────────
    const workerSecret = req.headers.get('x-worker-secret')
    if (!workerSecret || workerSecret !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const body = await req.json()
    const {
      meeting_id,
      recording_url,
      audio_base64,
      audio_filename,
    } = body as {
      meeting_id: string
      recording_url?: string
      audio_base64?: string
      audio_filename?: string
    }

    if (!meeting_id) {
      return NextResponse.json(
        { success: false, error: 'meeting_id is required' },
        { status: 400 },
      )
    }

    if (!recording_url && !audio_base64) {
      return NextResponse.json(
        { success: false, error: 'Either recording_url or audio_base64 is required' },
        { status: 400 },
      )
    }

    // ── 2. Fetch meeting ──────────────────────────────────────────────────────
    const { data: meeting, error: meetingError } = await supabaseAdmin
      .from('meetings')
      .select('*')
      .eq('id', meeting_id)
      .single()

    if (meetingError || !meeting) {
      return NextResponse.json(
        { success: false, error: 'Meeting not found' },
        { status: 404 },
      )
    }

    // ── 3. Get audio ──────────────────────────────────────────────────────────
    let audioFile: File

    if (recording_url) {
      const audioRes = await fetch(recording_url)
      if (!audioRes.ok) {
        return NextResponse.json(
          { success: false, error: `Failed to fetch recording: ${audioRes.status}` },
          { status: 500 },
        )
      }
      const audioBuffer = await audioRes.arrayBuffer()
      const filename = audio_filename ?? 'recording.mp4'
      audioFile = new File([audioBuffer], filename, { type: 'audio/mp4' })
    } else {
      // audio_base64
      const buffer = Buffer.from(audio_base64!, 'base64')
      const filename = audio_filename ?? 'recording.mp3'
      const mimeType = filename.endsWith('.mp4') ? 'audio/mp4' : 'audio/mpeg'
      audioFile = new File([buffer], filename, { type: mimeType })
    }

    // ── 4. Call Groq Whisper transcription ────────────────────────────────────
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3-turbo',
      response_format: 'text',
    })

    const transcriptText =
      typeof transcription === 'string'
        ? transcription
        : (transcription as unknown as Record<string, unknown>).text as string ?? ''

    // ── 5. Analyse with Claude Haiku ──────────────────────────────────────────
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const claudeRes = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system:
        'You are an assistant for a web design agency. Extract key information from this client discovery meeting transcript. Respond ONLY with valid JSON matching the requested schema.',
      messages: [
        {
          role: 'user',
          content: `Analyse this meeting transcript and return a JSON object with these keys:
- goals: string[] (client's business/website goals)
- style_notes: string[] (design preferences, aesthetic notes)
- content_notes: string[] (content requirements, copywriting notes)
- specific_requests: string[] (specific features or functionality requested)
- budget_notes: string[] (any budget or timeline mentions)
- red_flags: string[] (concerns, hesitations, potential issues)
- suggested_brief_prefills: object (key/value pairs to pre-populate the brief form, only include confident suggestions)

Transcript:
${transcriptText}`,
        },
      ],
    })

    const rawContent = claudeRes.content[0]
    let analysis: TranscriptAnalysis

    try {
      const jsonText =
        rawContent.type === 'text' ? rawContent.text : ''
      // Strip markdown code fences if present
      const cleaned = jsonText.replace(/```(?:json)?\n?/g, '').replace(/```$/g, '').trim()
      analysis = JSON.parse(cleaned) as TranscriptAnalysis
    } catch (parseErr) {
      console.error('[worker/transcribe] Failed to parse Claude response:', parseErr)
      analysis = {
        goals: [],
        style_notes: [],
        content_notes: [],
        specific_requests: [],
        budget_notes: [],
        red_flags: [],
        suggested_brief_prefills: {},
      }
    }

    // ── 6. Update meeting row ─────────────────────────────────────────────────
    await supabaseAdmin
      .from('meetings')
      .update({
        transcript_raw: transcriptText,
        transcript_summary: JSON.stringify(analysis),
        transcript_processed: true,
      })
      .eq('id', meeting_id)

    // ── 7. Merge suggested_brief_prefills into brief ──────────────────────────
    const prefills = analysis.suggested_brief_prefills ?? {}
    const hasPrefills = Object.keys(prefills).length > 0

    if (hasPrefills) {
      const { data: brief } = await supabaseAdmin
        .from('briefs')
        .select('*')
        .eq('lead_id', meeting.lead_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (brief) {
        const briefUpdate: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(prefills)) {
          // Only fill empty/null/undefined fields — never overwrite existing data
          const existing = (brief as Record<string, unknown>)[key]
          if (
            existing === null ||
            existing === undefined ||
            existing === '' ||
            (Array.isArray(existing) && existing.length === 0)
          ) {
            briefUpdate[key] = value
          }
        }

        if (Object.keys(briefUpdate).length > 0) {
          briefUpdate.prefill_source = {
            ...(brief.prefill_source ?? {}),
            meeting_id,
          }
          briefUpdate.updated_at = new Date().toISOString()

          await supabaseAdmin
            .from('briefs')
            .update(briefUpdate)
            .eq('id', brief.id)
        }
      }
    }

    // ── 8. Create notification ────────────────────────────────────────────────
    const meetingLabel = meeting.meeting_type
      ? `${meeting.meeting_type} on ${new Date(meeting.meeting_time).toLocaleDateString('en-GB')}`
      : meeting_id

    await createNotification({
      type: 'meeting_transcribed',
      title: `Meeting transcribed: ${meetingLabel}`,
      body: `Transcript processed for lead ${meeting.lead_id}`,
      lead_id: meeting.lead_id,
      metadata: {
        meeting_id,
        transcript_length: transcriptText.length,
        has_prefills: hasPrefills,
      },
    })

    // ── 9. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: {
        transcript_summary: analysis,
        meeting_id,
      },
    })
  } catch (err) {
    console.error('[worker/transcribe] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
