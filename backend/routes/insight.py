from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate
from backend.fixture_loader import load_scenario

router = APIRouter()

class InsightRequest(BaseModel):
    scenario_id: str
    lang: str = "en"

INSIGHT_PROMPT = """You are a football tactical analyst providing pre-match insight.

MATCH: {match_name}
SCORE: {score}
STAGE: {stage}
CONTEXT: {context}

HOME TEAM: {home_team}
HOME FORMATION: {home_formation}
AWAY TEAM: {away_team}
AWAY FORMATION: {away_formation}

Provide a concise tactical insight (3-4 sentences) analyzing:
1. The current match situation and what each team needs
2. Key tactical patterns visible in the game
3. What the trailing team should consider changing

Write for a smart football fan. Be specific about formations and tactics."""

@router.post("/api/match/insight")
async def match_insight(req: InsightRequest):
    try:
        scenario = load_scenario(req.scenario_id)
        meta = scenario.get("meta", {})
        opts = scenario.get("options", [])

        prompt = INSIGHT_PROMPT.format(
            match_name=meta.get("title", "Match"),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            stage=meta.get("stage", "Group Stage"),
            context=scenario.get("context", ""),
            home_team=scenario.get("home_team", ""),
            home_formation=scenario.get("home_formation", "4-3-3"),
            away_team=scenario.get("away_team", ""),
            away_formation=scenario.get("away_formation", "4-3-3"),
        )

        text = await generate(prompt, max_tokens=400)
        return {"insight": text, "via": "granite"}
    except Exception as e:
        h = scenario.get("home_team", "")
        a = scenario.get("away_team", "")
        hf = scenario.get("home_formation", "4-3-3")
        af = scenario.get("away_formation", "4-3-3")
        return {
            "insight": f"{h} are organised in a {hf} while {a} defend in a {af}. The current scoreline means {h} need to take more risks in possession. Creating overloads in the final third will be key to breaking down the defensive block.",
            "via": "fallback"
        }
