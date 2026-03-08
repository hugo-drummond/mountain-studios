import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendSiteGeneratedAlert } from '@/lib/email'
import { requireAdmin } from '@/lib/auth'
import type { Brief, PageSelection } from '@/types'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const V0_API_BASE = 'https://api.v0.dev/v1'
const GITHUB_API_BASE = 'https://api.github.com'
const VERCEL_API_BASE = 'https://api.vercel.com'
const POLL_INTERVAL_MS = 30_000  // 30 seconds
const POLL_TIMEOUT_MS = 10 * 60 * 1000 // 10 minutes

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function buildPrompt(brief: Brief): string {
  const pages = (brief.pages as PageSelection[] | null) ?? []
  const pageList = pages
    .map((p) => `  - ${p.name} (${p.sections} section${p.sections !== 1 ? 's' : ''})`)
    .join('\n')

  const social = brief.social_handles
    ? Object.entries(brief.social_handles)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')
    : 'none provided'

  const refs = Array.isArray(brief.reference_sites) && brief.reference_sites.length > 0
    ? brief.reference_sites.join(', ')
    : 'none provided'

  return [
    `Build a modern ${brief.style ?? 'clean'} website for ${brief.business_name ?? 'the client'}, a ${brief.business_type ?? 'business'} business.`,
    `Primary colour: ${brief.primary_colour ?? 'not specified'}. Secondary colour: ${brief.secondary_colour ?? 'not specified'}.`,
    `Pages needed:\n${pageList || '  - Home'}`,
    `Social: ${social}.`,
    `Reference sites: ${refs}.`,
    `Additional notes: ${brief.additional_notes ?? 'none'}.`,
  ].join('\n')
}

async function pollV0Generation(generationId: string): Promise<Record<string, unknown>> {
  const apiKey = process.env.VERCEL_V0_API_KEY ?? ''
  const deadline = Date.now() + POLL_TIMEOUT_MS

  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))

    const res = await fetch(`${V0_API_BASE}/generations/${generationId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (!res.ok) {
      throw new Error(`[v0 poll] HTTP ${res.status}: ${res.statusText}`)
    }

    const json = await res.json()

    if (json.status === 'complete' || json.status === 'completed') {
      return json
    }

    if (json.status === 'failed' || json.status === 'error') {
      throw new Error(`[v0 poll] Generation failed: ${json.error ?? 'unknown error'}`)
    }

    // status === 'generating' / 'pending' — keep polling
  }

  throw new Error('[v0 poll] Timed out after 10 minutes')
}

async function createGithubRepo(
  slug: string,
): Promise<{ repoName: string; repoUrl: string; repoFullName: string }> {
  const org = process.env.GITHUB_ORG ?? ''
  const token = process.env.GITHUB_TOKEN ?? ''
  const repoName = `${slug}-website`

  const res = await fetch(`${GITHUB_API_BASE}/orgs/${org}/repos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      private: true,
      auto_init: true,
      description: `Generated website for ${slug}`,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`[github] Failed to create repo: ${res.status} ${err}`)
  }

  const json = await res.json()
  return { repoName, repoUrl: json.html_url, repoFullName: json.full_name }
}

async function pushCodeToGithub(repoFullName: string, generatedCode: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN ?? ''

  // Get default branch SHA
  const refRes = await fetch(
    `${GITHUB_API_BASE}/repos/${repoFullName}/git/ref/heads/main`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } },
  )

  let sha: string | undefined
  if (refRes.ok) {
    const refJson = await refRes.json()
    sha = refJson.object?.sha
  }

  // Create a blob
  const blobRes = await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}/git/blobs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: generatedCode, encoding: 'utf-8' }),
  })

  if (!blobRes.ok) {
    throw new Error(`[github] Failed to create blob: ${blobRes.status}`)
  }

  const { sha: blobSha } = await blobRes.json()

  // Get base tree SHA from the current commit
  let baseTreeSha: string | undefined
  if (sha) {
    const baseCommitRes = await fetch(
      `${GITHUB_API_BASE}/repos/${repoFullName}/git/commits/${sha}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } },
    )
    if (baseCommitRes.ok) {
      const commitJson = await baseCommitRes.json()
      baseTreeSha = commitJson.tree?.sha
    }
  }

  // Create tree
  const treeRes = await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}/git/trees`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: [{ path: 'index.html', mode: '100644', type: 'blob', sha: blobSha }],
    }),
  })

  if (!treeRes.ok) {
    throw new Error(`[github] Failed to create tree: ${treeRes.status}`)
  }

  const { sha: newTreeSha } = await treeRes.json()

  // Create commit
  const commitRes = await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}/git/commits`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Initial generated site',
      tree: newTreeSha,
      parents: sha ? [sha] : [],
    }),
  })

  if (!commitRes.ok) {
    throw new Error(`[github] Failed to create commit: ${commitRes.status}`)
  }

  const { sha: newCommitSha } = await commitRes.json()

  // Update ref
  await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}/git/refs/heads/main`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sha: newCommitSha }),
  })
}

async function deployToVercel(repoFullName: string, repoName: string): Promise<string> {
  const token = process.env.VERCEL_TOKEN ?? ''
  const vercelTeamId = process.env.VERCEL_TEAM_ID ?? undefined

  const body: Record<string, unknown> = {
    name: repoName,
    gitSource: {
      type: 'github',
      repoId: repoFullName,
      ref: 'main',
    },
    projectSettings: { framework: null },
  }

  const url = vercelTeamId
    ? `${VERCEL_API_BASE}/v13/deployments?teamId=${vercelTeamId}`
    : `${VERCEL_API_BASE}/v13/deployments`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`[vercel] Deployment failed: ${res.status} ${err}`)
  }

  const json = await res.json()
  return json.url ? `https://${json.url}` : ''
}

// ---------------------------------------------------------------------------
// POST /api/admin/briefs/[id]/generate
// ---------------------------------------------------------------------------

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── Admin auth ────────────────────────────────────────────────────────────
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  const briefId = params.id
  let generatedSiteId: string | null = null

  try {
    // ── 1. Fetch brief ────────────────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('id', briefId)
      .single()

    if (briefError || !brief) {
      return NextResponse.json(
        { success: false, error: 'Brief not found' },
        { status: 404 },
      )
    }

    // ── 2. Fetch lead ─────────────────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', brief.lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found for this brief' },
        { status: 404 },
      )
    }

    // ── Guard: payment must be confirmed ──────────────────────────────────────
    if (lead.status !== 'final_payment_received') {
      return NextResponse.json(
        {
          success: false,
          error: `Payment not yet confirmed. Lead status: '${lead.status}'`,
        },
        { status: 400 },
      )
    }

    // ── 3. Build prompt ───────────────────────────────────────────────────────
    const generationPrompt: string = brief.generated_prompt ?? buildPrompt(brief as Brief)

    // ── Insert generated_sites row with status='generating' ───────────────────
    const { data: generatedSite, error: gsInsertError } = await supabaseAdmin
      .from('generated_sites')
      .insert({
        brief_id: briefId,
        lead_id: lead.id,
        generation_platform: 'v0',
        status: 'generating',
        generation_prompt: generationPrompt,
        reviewed_by_owner: false,
        approved_for_client: false,
      })
      .select()
      .single()

    if (gsInsertError || !generatedSite) {
      console.error('[generate] generated_sites insert error:', gsInsertError)
      return NextResponse.json(
        { success: false, error: 'Failed to create generation record' },
        { status: 500 },
      )
    }

    generatedSiteId = generatedSite.id

    // ── Call v0 API to start generation ───────────────────────────────────────
    const v0ApiKey = process.env.VERCEL_V0_API_KEY ?? ''
    const v0Res = await fetch(`${V0_API_BASE}/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${v0ApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: generationPrompt }),
    })

    if (!v0Res.ok) {
      const errText = await v0Res.text()
      throw new Error(`[v0] Generation request failed: ${v0Res.status} ${errText}`)
    }

    const v0Json = await v0Res.json()
    const generationId: string = v0Json.id ?? v0Json.generationId ?? ''

    if (!generationId) {
      throw new Error('[v0] No generation ID returned from v0 API')
    }

    // ── Poll for completion ───────────────────────────────────────────────────
    const v0Result = await pollV0Generation(generationId)

    // Extract generated code from v0 result
    const generatedCode: string =
      (v0Result.code as string) ??
      (v0Result.html as string) ??
      (v0Result.output as string) ??
      ''

    // ── 4. Create GitHub repo and push generated code ─────────────────────────
    const slug = buildSlug(lead.business_name ?? 'site')
    const { repoName, repoUrl, repoFullName } = await createGithubRepo(slug)

    if (generatedCode) {
      await pushCodeToGithub(repoFullName, generatedCode)
    }

    // ── 5. Deploy to Vercel ───────────────────────────────────────────────────
    const vercelDeploymentUrl = await deployToVercel(repoFullName, repoName)

    // ── 6. Update generated_sites row ─────────────────────────────────────────
    const { data: updatedSite } = await supabaseAdmin
      .from('generated_sites')
      .update({
        status: 'complete',
        github_repo_url: repoUrl,
        github_repo_name: repoName,
        vercel_deployment_url: vercelDeploymentUrl,
        preview_url: vercelDeploymentUrl,
        generation_response: v0Result,
      })
      .eq('id', generatedSiteId)
      .select()
      .single()

    // ── 7. Update lead status → 'building' ────────────────────────────────────
    await supabaseAdmin
      .from('leads')
      .update({ status: 'building' })
      .eq('id', lead.id)

    // ── 8. Send site generated alert to agency owner ──────────────────────────
    await sendSiteGeneratedAlert(config.agency.email, {
      lead_name: lead.full_name ?? lead.business_name,
      business_name: lead.business_name,
      preview_url: vercelDeploymentUrl,
      github_url: repoUrl,
    })

    // ── 9. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'site_generated',
      title: `Site generated: ${lead.business_name}`,
      body: `Website generated and deployed for ${lead.email}`,
      lead_id: lead.id,
      metadata: {
        generated_site_id: generatedSiteId,
        github_repo_url: repoUrl,
        vercel_deployment_url: vercelDeploymentUrl,
      },
    })

    // ── 10. Webhook forwarded automatically via createNotification ────────────

    // ── 11. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: { generated_site: updatedSite ?? generatedSite },
    })
  } catch (err) {
    console.error('[briefs/generate] error:', err)

    // Mark generated_sites row as failed if we got that far
    if (generatedSiteId) {
      await supabaseAdmin
        .from('generated_sites')
        .update({
          status: 'failed',
          error_message: err instanceof Error ? err.message : String(err),
        })
        .eq('id', generatedSiteId)
        .then(({ error: updateErr }) => {
          if (updateErr) console.error('[briefs/generate] failed to mark as failed:', updateErr)
        })
    }

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}
