import asyncio
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import decision, library, matchup, counterfactual, iq_rating, insight
from backend.fixture_loader import load_scenario, list_scenarios
from backend.analyst_personas import PERSONAS

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

app = FastAPI(title="The Dugout", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

app.include_router(decision.router)
app.include_router(library.router)
app.include_router(matchup.router)
app.include_router(counterfactual.router)
app.include_router(iq_rating.router)
app.include_router(insight.router)


@app.get("/api/scenarios")
async def get_scenarios():
    loop = asyncio.get_event_loop()
    try:
        return await loop.run_in_executor(None, list_scenarios)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/scenario/{scenario_id}")
async def get_scenario(scenario_id: str):
    loop = asyncio.get_event_loop()
    try:
        return await loop.run_in_executor(None, load_scenario, scenario_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Scenario '{scenario_id}' not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/static/index.html")


@app.get("/api/ping")
async def ping():
    return {"status": "ok", "version": "2.0.0"}


@app.get("/api/analysts")
async def get_analysts():
    analysts = []
    for code, p in PERSONAS.items():
        analysts.append({
            "code": code,
            "name": p["name"],
            "language": p["language"],
            "nation": p["nation"],
            "flag": p["flag"],
            "role": p["role"],
        })
    return {"analysts": analysts}


@app.get("/api/config")
async def get_config():
    return {
        "default_lang": "en",
        "available_langs": list(PERSONAS.keys()),
        "ai_provider": os.getenv("AI_PROVIDER", "ollama"),
        "ai_model": os.getenv("OLLAMA_MODEL", "granite3.3:2b"),
        "version": "2.0.0",
    }
