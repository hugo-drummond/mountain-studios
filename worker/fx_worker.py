import logging
from datetime import datetime, timezone

import httpx

from supabase_client import supabase

logger = logging.getLogger(__name__)

FX_API_URL = "https://api.frankfurter.app/latest"
CURRENCIES = "ZAR,USD,EUR,AUD,NAD"


async def fetch_and_store_fx_rates() -> dict:
    """
    Fetch GBP-based FX rates from Frankfurter and store them in Supabase.

    Returns the rates dict on success, or raises on unrecoverable failure.
    """
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.get(
                FX_API_URL,
                params={"from": "GBP", "to": CURRENCIES},
            )
            resp.raise_for_status()
            data = resp.json()

        rates = data.get("rates", {})
        base = data.get("base", "GBP")
        date = data.get("date", datetime.now(timezone.utc).date().isoformat())

        row = {
            "base": base,
            "date": date,
            "rates": rates,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        }

        supabase.table("fx_rates").insert(row).execute()
        logger.info("FX rates stored successfully: %s", rates)
        return rates

    except httpx.HTTPStatusError as exc:
        logger.error(
            "FX fetch HTTP error %s: %s", exc.response.status_code, exc.response.text
        )
        raise
    except Exception as exc:
        logger.error("FX fetch failed: %s", exc)
        raise
