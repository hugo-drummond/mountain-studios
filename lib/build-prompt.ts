import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Brief, PageSelection, SocialHandles, TranscriptAnalysis } from '@/types'

// ---------------------------------------------------------------------------
// Build a comprehensive AI prompt for website generation.
//
// TRUST HIERARCHY (most → least trusted):
//   1. Brief Builder — client reviewed and confirmed every field
//   2. Meeting transcripts — discussed live but may be misinterpreted
//   3. Proposal generator (lead/quote form) — quick initial input, least refined
//
// The prompt is structured in this order so the AI weights brief data highest.
// Where sources conflict, the brief wins. Meeting insights add colour/context.
// Lead data is only used as fallback when the brief field is empty.
// ---------------------------------------------------------------------------

interface LeadData {
  business_name?: string
  business_type?: string
  full_name?: string
  email?: string
  phone?: string
  region?: string
  style?: string
  primary_colour?: string
  secondary_colour?: string
  content_visual_ratio?: number
  pages_selected?: PageSelection[]
}

export async function buildGenerationPrompt(brief: Brief): Promise<string> {
  // ── 1. Fetch lead (least trusted — proposal/quote form data) ──────────────
  const { data: lead } = await supabaseAdmin
    .from('leads')
    .select('business_name, business_type, full_name, email, phone, region, style, primary_colour, secondary_colour, content_visual_ratio, pages_selected')
    .eq('id', brief.lead_id)
    .single()

  const l: LeadData = lead ?? {}

  // ── 2. Fetch meeting transcript analyses (middle trust) ───────────────────
  const { data: meetings } = await supabaseAdmin
    .from('meetings')
    .select('meeting_type, transcript_summary, transcript_raw')
    .eq('lead_id', brief.lead_id)
    .eq('transcript_processed', true)
    .order('meeting_time', { ascending: true })

  const analyses: { type: string; analysis: TranscriptAnalysis }[] = []
  if (meetings) {
    for (const m of meetings) {
      if (m.transcript_summary) {
        try {
          const parsed: TranscriptAnalysis =
            typeof m.transcript_summary === 'string'
              ? JSON.parse(m.transcript_summary)
              : m.transcript_summary
          analyses.push({ type: m.meeting_type ?? 'meeting', analysis: parsed })
        } catch {
          // skip malformed
        }
      }
    }
  }

  // ── 3. Resolve values: brief > meeting prefills > lead ────────────────────
  const businessName = brief.business_name || l.business_name || 'the client'
  const businessType = brief.business_type || l.business_type || 'business'
  const style = brief.style || l.style || 'modern, clean'
  const primaryColour = brief.primary_colour || l.primary_colour
  const secondaryColour = brief.secondary_colour || l.secondary_colour
  const visualRatio = brief.content_visual_ratio ?? l.content_visual_ratio ?? 50
  const region = brief.region || l.region

  const pages = (brief.pages as PageSelection[] | null) ?? []
  const social = brief.social_handles as SocialHandles | null
  const refs = Array.isArray(brief.reference_sites) ? brief.reference_sites.filter(Boolean) : []
  const refNotes = (brief.reference_site_notes ?? {}) as Record<string, string>
  const pageSectionsData = (brief.page_sections_data ?? {}) as Record<string, { id: string; title: string; content: string; image_description: string }[]>
  const services = brief.services ?? []
  const ctaGoals = brief.cta_goals ?? []

  // ── 4. Build prompt — ordered by trust (brief first, then meetings, then lead fallbacks)

  const sections: string[] = []

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 1: BRIEF BUILDER DATA (highest trust — client confirmed)
  // ─────────────────────────────────────────────────────────────────────────

  sections.push(`You are building a complete, production-ready website. Follow these specifications exactly — they have been reviewed and confirmed by the client.\n`)

  sections.push(`## Client-Confirmed Specifications`)
  sections.push(`These details come directly from the client's completed brief and are the primary source of truth.\n`)

  sections.push(`**Business:** ${businessName}`)
  sections.push(`**Type:** ${businessType}`)
  if (region) sections.push(`**Region:** ${region}`)
  if (brief.tagline) sections.push(`**Tagline / Slogan:** "${brief.tagline}"`)
  sections.push(`**Design Style:** ${style}`)
  if (brief.tone) sections.push(`**Tone of Voice:** ${brief.tone}`)

  if (primaryColour) sections.push(`**Primary Colour:** ${primaryColour}`)
  if (secondaryColour) sections.push(`**Secondary Colour:** ${secondaryColour}`)
  if (!primaryColour && !secondaryColour) {
    sections.push(`**Colours:** Not specified — choose colours appropriate for a ${businessType} business with a ${style} aesthetic`)
  }

  sections.push(`**Content-to-Visual Balance:** ${visualRatio}% visual / ${100 - visualRatio}% text`)

  // Target audience
  if (brief.target_audience) {
    sections.push(`\n### Target Audience`)
    sections.push(brief.target_audience)
  }

  // CTA goals
  if (ctaGoals.length > 0) {
    sections.push(`\n### Primary Calls to Action`)
    sections.push(`The website should drive visitors to:`)
    for (const cta of ctaGoals) sections.push(`- ${cta}`)
  }

  // Services / Products
  if (services.length > 0) {
    sections.push(`\n### Key Services / Products`)
    sections.push(`These are the client's main offerings — feature them prominently:`)
    for (const svc of services) {
      if (svc.description) {
        sections.push(`- **${svc.name}**: ${svc.description}`)
      } else {
        sections.push(`- **${svc.name}**`)
      }
    }
  }

  // Pages with detailed section content
  if (pages.length > 0) {
    sections.push(`\n### Pages`)
    for (const p of pages) {
      const tag = p.is_custom ? ' (custom)' : ''
      const pageSections = pageSectionsData[p.name]

      if (pageSections && pageSections.length > 0) {
        sections.push(`\n#### ${p.name}${tag}`)
        for (const s of pageSections) {
          sections.push(`- **${s.title || 'Untitled Section'}**`)
          if (s.content) sections.push(`  Content: ${s.content}`)
          if (s.image_description) sections.push(`  Image direction: ${s.image_description}`)
        }
      } else {
        sections.push(`- **${p.name}**${tag}: ${p.sections} section${p.sections !== 1 ? 's' : ''}`)
      }
    }
  }

  // Contact details (for footer + contact page)
  const hasContact = brief.contact_email || brief.contact_phone || brief.contact_address || brief.business_hours
  if (hasContact) {
    sections.push(`\n### Contact Information`)
    sections.push(`Use these real details on the Contact page and in the footer:`)
    if (brief.contact_email) sections.push(`- **Email:** ${brief.contact_email}`)
    if (brief.contact_phone) sections.push(`- **Phone:** ${brief.contact_phone}`)
    if (brief.contact_address) sections.push(`- **Address:** ${brief.contact_address}`)
    if (brief.business_hours) sections.push(`- **Business Hours:** ${brief.business_hours}`)
  }

  // Social media (from brief)
  if (social) {
    const socialEntries = Object.entries(social).filter(([, v]) => v)
    if (socialEntries.length > 0) {
      sections.push(`\n### Social Media`)
      for (const [platform, handle] of socialEntries) {
        sections.push(`- ${platform}: ${handle}`)
      }
    }
  }

  // Reference sites with notes
  if (refs.length > 0) {
    sections.push(`\n### Reference Sites`)
    sections.push(`The client likes the look and feel of these:`)
    for (const r of refs) {
      const note = refNotes[r]
      if (note) {
        sections.push(`- ${r} — "${note}"`)
      } else {
        sections.push(`- ${r}`)
      }
    }
  }

  // Client's own instructions (from brief — highest weight free-text)
  if (brief.additional_notes) {
    sections.push(`\n### Client Instructions`)
    sections.push(`> ${brief.additional_notes.split('\n').join('\n> ')}`)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 2: MEETING INSIGHTS (medium trust — discussed live, AI-extracted)
  // ─────────────────────────────────────────────────────────────────────────

  if (analyses.length > 0) {
    sections.push(`\n## Meeting Insights`)
    sections.push(`The following was extracted from client meetings. Use these to add depth and context, but if anything conflicts with the brief specifications above, the brief takes priority.\n`)

    for (const { type, analysis } of analyses) {
      const label = type === 'discovery' ? 'Discovery Call'
        : type === 'brief_review' ? 'Brief Review'
        : type === 'progress_review' ? 'Progress Review'
        : 'Meeting'
      sections.push(`### ${label}`)

      if (analysis.goals.length > 0) {
        sections.push(`**Goals:**`)
        for (const g of analysis.goals) sections.push(`- ${g}`)
      }
      if (analysis.style_notes.length > 0) {
        sections.push(`**Style & Design Notes:**`)
        for (const s of analysis.style_notes) sections.push(`- ${s}`)
      }
      if (analysis.content_notes.length > 0) {
        sections.push(`**Content & Copy Notes:**`)
        for (const c of analysis.content_notes) sections.push(`- ${c}`)
      }
      if (analysis.specific_requests.length > 0) {
        sections.push(`**Specific Requests:**`)
        for (const r of analysis.specific_requests) sections.push(`- ${r}`)
      }
      if (analysis.red_flags.length > 0) {
        sections.push(`**Important Considerations:**`)
        for (const f of analysis.red_flags) sections.push(`- ${f}`)
      }
      sections.push('')
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 3: INITIAL QUOTE FORM (lowest trust — quick first-pass input)
  // ─────────────────────────────────────────────────────────────────────────

  const leadExtras: string[] = []

  if (l.style && l.style !== style) {
    leadExtras.push(`- Originally selected style "${l.style}" in quote form (client later chose "${style}" in brief — use the brief version)`)
  }
  if (l.primary_colour && l.primary_colour !== primaryColour) {
    leadExtras.push(`- Original primary colour from quote: ${l.primary_colour} (brief may have updated this)`)
  }
  if (l.secondary_colour && l.secondary_colour !== secondaryColour) {
    leadExtras.push(`- Original secondary colour from quote: ${l.secondary_colour} (brief may have updated this)`)
  }

  if (leadExtras.length > 0) {
    sections.push(`\n## Initial Quote Form Data`)
    sections.push(`For reference only — these are the client's earliest inputs. The brief specifications above supersede these if they differ.\n`)
    sections.push(...leadExtras)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BUILD REQUIREMENTS
  // ─────────────────────────────────────────────────────────────────────────

  sections.push(`\n## Build Requirements`)
  sections.push(`- Fully responsive across all devices`)
  sections.push(`- Semantic HTML with clean, modern CSS`)
  sections.push(`- All pages linked and navigable`)
  sections.push(`- Footer with contact info and social links`)
  sections.push(`- Real, professional copy throughout — no placeholder text`)
  sections.push(`- Consistent ${style} design style on every page`)

  if (brief.tone) {
    sections.push(`- All copy should use a ${brief.tone.toLowerCase()} tone of voice`)
  }

  if (brief.tagline) {
    sections.push(`- Incorporate the tagline "${brief.tagline}" prominently on the homepage`)
  }

  if (ctaGoals.length > 0) {
    sections.push(`- Every page should include a clear call-to-action driving visitors to: ${ctaGoals.join(', ')}`)
  }

  if (visualRatio >= 70) {
    sections.push(`- Visually-led design — prioritise imagery, whitespace, and visual impact over dense text`)
  } else if (visualRatio <= 30) {
    sections.push(`- Content-heavy site — prioritise readable, well-structured text`)
  }

  sections.push(`\n## Priority Rule`)
  sections.push(`If any information conflicts between sources, follow this order:`)
  sections.push(`1. **Brief Builder** (Section "Client-Confirmed Specifications") — always wins`)
  sections.push(`2. **Meeting Insights** — use for context and depth`)
  sections.push(`3. **Quote Form Data** — reference only, lowest priority`)

  return sections.join('\n')
}
