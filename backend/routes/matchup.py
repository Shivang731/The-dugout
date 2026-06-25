# POST /api/matchup-fix — AI generates tactical fixes for a critical matchup
from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate
from backend.fixture_loader import load_scenario

router = APIRouter()


class MatchupRequest(BaseModel):
    scenario_id: str
    matchup_index: int = 0


MATCHUP_PROMPT = """You are an elite football tactical coach. You need to fix a
critical 1v1 matchup that is losing the game for your team.

MATCH: {match_name}
MATCHUP: {attacker} ({attacker_team}) vs {defender} ({defender_team})
ADVANTAGE: {advantage} (difference: {diff})
CONTEXT: {context}

Generate 3 tactical fixes to solve this matchup problem:
1. A formation/positional adjustment (low risk)
2. A substitution or personnel change (medium risk)
3. A tactical instruction or pressing trigger (high risk, high reward)

For each fix, explain:
- What to do
- Why it would work
- The risk involved (Low/Medium/High)
- A historical World Cup precedent if relevant

Keep under 400 words total."""


@router.post("/api/matchup-fix")
async def fix_matchup(req: MatchupRequest):
    """Generate 3 tactical solutions for a critical matchup."""
    try:
        scenario = load_scenario(req.scenario_id)
        matchups = scenario.get("matchups", [])

        if req.matchup_index >= len(matchups):
            return {"error": "Matchup index out of range"}

        m = matchups[req.matchup_index]
        prompt = MATCHUP_PROMPT.format(
            match_name=scenario.get("meta", {}).get("title", "Match"),
            attacker=m.get("attacker", ""),
            attacker_team=m.get("attacker_team", ""),
            defender=m.get("defender", ""),
            defender_team=m.get("defender_team", ""),
            advantage=m.get("advantage", ""),
            diff=m.get("diff", ""),
            context=scenario.get("context", ""),
        )
        text = await generate(prompt)
        return {"solutions": text}
    except Exception as e:
        print(f"Matchup fix error: {e}")
        return {"error": str(e)}
