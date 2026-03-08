import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Brief, Lead, LeadStatus, Meeting } from '@/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable.')
}
if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable.')
}

// Singleton pattern — one admin client per process
let _adminClient: SupabaseClient | null = null

function getAdminClient(): SupabaseClient {
  if (!_adminClient) {
    _adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _adminClient
}

export const supabaseAdmin = getAdminClient()

// ─── Helper: leads ────────────────────────────────────────────────────────────

/**
 * Fetch a single lead by primary key.
 * Returns null if not found or on error.
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // row not found
    console.error('[supabase-admin] getLeadById error:', error.message)
    return null
  }

  return data as Lead
}

/**
 * Update the status column for a lead.
 * Throws on database error.
 */
export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const { error } = await supabaseAdmin
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    throw new Error(`[supabase-admin] updateLeadStatus failed: ${error.message}`)
  }
}

// ─── Helper: briefs ───────────────────────────────────────────────────────────

/**
 * Fetch a single brief by primary key.
 * Returns null if not found or on error.
 */
export async function getBriefById(id: string): Promise<Brief | null> {
  const { data, error } = await supabaseAdmin
    .from('briefs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('[supabase-admin] getBriefById error:', error.message)
    return null
  }

  return data as Brief
}

// ─── Helper: meetings ─────────────────────────────────────────────────────────

/**
 * Fetch a single meeting by primary key.
 * Returns null if not found or on error.
 */
export async function getMeetingById(id: string): Promise<Meeting | null> {
  const { data, error } = await supabaseAdmin
    .from('meetings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('[supabase-admin] getMeetingById error:', error.message)
    return null
  }

  return data as Meeting
}

export default supabaseAdmin
