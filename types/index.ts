export type LeadStatus =
  | 'new'
  | 'quoted'
  | 'booked'
  | 'meeting_one_done'
  | 'brief_sent'
  | 'brief_received'
  | 'deposit_pending'
  | 'deposit_paid'
  | 'meeting_two_booked'
  | 'meeting_two_done'
  | 'awaiting_final_payment'
  | 'nurture'
  | 'final_payment_received'
  | 'building'
  | 'review'
  | 'complete'
  | 'lost'

export type MeetingType = 'discovery' | 'brief_review' | 'progress_review'
export type MeetingStatus = 'scheduled' | 'completed' | 'no_show' | 'cancelled'
export type BriefStatus = 'draft' | 'sent' | 'submitted' | 'reviewed'
export type MeetingPlatform = 'teams' | 'zoom' | 'google_meet' | 'manual'

export interface Lead {
  id: string
  created_at: string
  business_name: string
  business_type: string
  business_type_custom?: string
  email: string
  phone?: string
  full_name?: string
  region?: string
  currency_code?: string
  source: string
  pages_selected?: PageSelection[]
  session_max_pages?: number
  style?: string
  primary_colour?: string
  secondary_colour?: string
  content_visual_ratio?: number
  /** @deprecated GBP quoting is gone. Column retained; no longer written. */
  quote_amount_gbp?: number
  /** @deprecated Pricing is per job now, set on the brief, not the lead. */
  quote_amount_local?: number
  /** @deprecated FX engine removed — ZAR only. */
  exchange_rate_used?: number
  heard_from?: string
  wants_quote_copy: boolean
  on_nurture_list: boolean
  nurture_added_at?: string
  final_payment_sent_at?: string
  final_payment_paid: boolean
  final_payment_ref?: string
  notes?: string
  assigned_to: string
  status: LeadStatus
}

export interface PageSelection {
  name: string
  sections: number
  is_custom: boolean
}

export interface Meeting {
  id: string
  created_at: string
  lead_id: string
  meeting_time: string
  meeting_end_time: string
  calendar_event_id?: string
  meeting_link?: string
  platform?: MeetingPlatform
  meeting_type: MeetingType
  recording_url?: string
  transcript_raw?: string
  transcript_summary?: string
  transcript_processed: boolean
  notes_from_client?: string
  status: MeetingStatus
}

export interface Brief {
  id: string
  lead_id: string
  created_at: string
  updated_at: string
  sent_at?: string
  submitted_at?: string
  last_autosaved_at?: string
  business_name?: string
  business_type?: string
  style?: string
  primary_colour?: string
  secondary_colour?: string
  region?: string
  currency_code?: string
  pages?: PageSelection[]
  logo_url?: string
  logo_storage_path?: string
  social_handles?: SocialHandles
  reference_sites?: string[]
  reference_site_notes?: Record<string, string>
  additional_notes?: string
  tagline?: string
  tone?: string
  target_audience?: string
  cta_goals?: string[]
  services?: { name: string; description: string }[]
  page_sections_data?: Record<string, { id: string; title: string; content: string; image_description: string }[]>
  contact_email?: string
  contact_phone?: string
  contact_address?: string
  business_hours?: string
  content_visual_ratio?: number
  /** @deprecated GBP quoting is gone. Column retained; no longer written. */
  base_price_gbp?: number
  /** @deprecated FX engine removed — ZAR only. */
  exchange_rate?: number
  /** The agreed project price in rands, entered by an admin on send-brief. */
  final_price_local?: number
  deposit_amount?: number
  deposit_paid: boolean
  deposit_reference?: string
  deposit_paid_at?: string
  rate_locked: boolean
  decision_status?: 'proceed' | 'not_ready'
  decision_notes?: string
  meeting_booked: boolean
  generated_prompt?: string
  prefill_source?: Record<string, unknown>
  status: BriefStatus
}

export interface SocialHandles {
  instagram?: string
  facebook?: string
  twitter?: string
  linkedin?: string
  tiktok?: string
}

export interface GeneratedSite {
  id: string
  brief_id: string
  lead_id: string
  created_at: string
  generation_platform: string
  github_repo_url?: string
  github_repo_name?: string
  preview_url?: string
  vercel_deployment_url?: string
  generation_prompt?: string
  generation_response?: Record<string, unknown>
  status: 'pending' | 'generating' | 'complete' | 'failed'
  error_message?: string
  reviewed_by_owner: boolean
  approved_for_client: boolean
}

export interface NurtureEntry {
  id: string
  lead_id: string
  email: string
  full_name?: string
  business_name?: string
  business_type?: string
  region?: string
  added_at: string
  source: 'post_meeting_two' | 'manual' | 'other'
  subscribed: boolean
  unsubscribed_at?: string
  tags?: string[]
}

export interface AdCampaign {
  id: string
  created_at: string
  updated_at: string
  platform: string
  campaign_id?: string
  ad_set_id?: string
  ad_id?: string
  headline?: string
  body_copy?: string
  offer_type?: string
  /** @deprecated Ad spend is in rands. Columns kept; rename is a DB migration. */
  daily_budget_gbp?: number
  /** @deprecated Ad spend is in rands. Columns kept; rename is a DB migration. */
  spend_gbp: number
  impressions: number
  clicks: number
  leads_generated: number
  /** @deprecated Ad spend is in rands. Columns kept; rename is a DB migration. */
  cost_per_lead_gbp?: number
  ctr?: number
  status: 'active' | 'paused' | 'archived'
  pause_reason?: string
  ai_suggestions?: AdSuggestion[]
  last_synced_at?: string
}

export interface AdSuggestion {
  headline: string
  body?: string
  reasoning?: string
  generated_at: string
}

export interface Notification {
  id: string
  created_at: string
  type: NotificationType
  title: string
  body: string
  lead_id?: string
  metadata?: Record<string, unknown>
  read: boolean
  webhook_forwarded: boolean
  webhook_response_code?: number
}

export type NotificationType =
  | 'lead_created'
  | 'meeting_booked'
  | 'meeting_completed'
  | 'meeting_transcribed'
  | 'brief_submitted'
  | 'deposit_received'
  | 'final_payment_requested'
  | 'final_payment_received'
  | 'lead_nurtured'
  | 'site_generated'
  | 'ad_paused'
  | 'ad_scaled'
  | 'ad_suggestions_ready'

export interface FxRates {
  id: string
  fetched_at: string
  base: string
  rates: Record<string, number>
}

export interface TranscriptAnalysis {
  goals: string[]
  style_notes: string[]
  content_notes: string[]
  specific_requests: string[]
  budget_notes: string[]
  red_flags: string[]
  suggested_brief_prefills: Record<string, unknown>
}

// API response types
export interface ApiSuccess<T = unknown> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

// Booking slot
export interface BookingSlot {
  datetime: string
  end_datetime: string
  available: boolean
}

// Peach Payments
export interface PeachCheckout {
  checkoutId: string
  paymentUrl: string
  expiresAt: string
}
