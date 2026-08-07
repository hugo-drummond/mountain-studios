import logging

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, BackgroundTasks, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from ads import run_ads_cycle

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = AsyncIOScheduler()
    # Ads cycle every 6 hours
    scheduler.add_job(run_ads_cycle, "interval", hours=6, id="ads_cycle")
    scheduler.start()
    yield
    scheduler.shutdown()


app = FastAPI(title="Agency Worker", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_worker_secret(x_worker_secret: str = Header(None)):
    if x_worker_secret != settings.worker_secret:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/transcribe")
async def transcribe_meeting(
    body: dict,
    background_tasks: BackgroundTasks,
    x_worker_secret: str = Header(None),
):
    verify_worker_secret(x_worker_secret)
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{settings.next_app_url}/api/worker/transcribe",
            json=body,
            headers={"x-worker-secret": settings.worker_secret},
            timeout=300,
        )
    return resp.json()


@app.post("/ads/run")
async def trigger_ads(x_worker_secret: str = Header(None)):
    verify_worker_secret(x_worker_secret)
    result = await run_ads_cycle()
    return {"success": True, "result": result}
