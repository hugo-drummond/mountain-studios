from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_service_key: str
    anthropic_api_key: str
    groq_api_key: str
    meta_app_id: str = ""
    meta_ad_account_id: str = ""
    meta_page_id: str = ""
    meta_access_token: str = ""
    next_app_url: str = "http://localhost:3000"
    worker_secret: str
    notification_webhook_url: str = ""

    # Ad thresholds (matching JS config)
    auto_pause_ctr_threshold: float = 0.008
    # Converted from the old GBP threshold (£12) at ~R23/£. Confirm the real
    # target cost per lead in rands — this is a business number, not a rate.
    auto_scale_cost_per_lead_zar: float = 276.0
    auto_scale_budget_increment: float = 0.20
    min_impressions_before_judge: int = 1000

    class Config:
        env_file = ".env"


settings = Settings()
