# POST /api/iq-rating — Calculate tactical IQ score from completed scenarios
from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate
from backend.fixture_loader import load_scenario

router = APIRouter()


class IQRequest(BaseModel):
    decisions: dict  # {scenario_id: user_choice}


IQ_PROMPT = """You are a football coaching assessment expert. A user has
completed {num_scenarios} World Cup scenarios in The Dugout. Their decisions are below.

DECISIONS:
{decision_summary}

For each scenario:
- Real manager's choice
- Whether the user matched it

Score the user from 0-100 in these 5 dimensions:
1. Attacking Instinct — willingness to make offensive changes
2. Defensive Pragmatism — ability to protect a lead
3. Substitution Timing — knowing when to make changes
4. Formation Flexibility — adapting shape to the match state
5. Pressure Management — keeping composure under time pressure

Tier labels (score range):
- 0-40: Scout (learning the game)
- 41-60: Coach (solid fundamentals)
- 61-80: Gaffer (sharp tactical instincts)
- 81-100: The Special One (elite manager)

Return a JSON object with this exact structure:
{{
  "scores": {{"attacking": 0, "defensive": 0, "sub_timing": 0, "formation": 0, "pressure": 0}},
  "total": 0,
  "tier": ""
}}"""


@router.post("/api/iq-rating")
async def iq_rating(req: IQRequest):
    """Calculate and return the user's tactical IQ rating."""
    try:
        summary_lines = []
        matches = 0
        for sid, choice in req.decisions.items():
            try:
                scenario = load_scenario(sid)
                real = scenario.get("real_decision", {}).get("option", "")
                matched = "YES" if choice == real else "NO"
                summary_lines.append(
                    f"- {scenario.get('meta', {}).get('title', sid)}: "
                    f"user chose {choice}, real was {real} ({matched})"
                )
                if choice == real:
                    matches += 1
            except Exception:
                summary_lines.append(f"- {sid}: data not found")
                continue

        prompt = IQ_PROMPT.format(num_scenarios=len(req.decisions), decision_summary="\n".join(summary_lines))
        text = await generate(prompt, max_tokens=500)

        # Try to parse JSON from the response
        import json
        import re
        json_match = re.search(r"\{.*\}", text, re.DOTALL)
        if json_match:
            scores = json.loads(json_match.group())
        else:
            scores = {"scores": {}, "total": 0, "tier": "Scout"}

        return {
            "scores": scores,
            "matches": matches,
            "total_scenarios": len(req.decisions),
            "raw_text": text,
        }
    except Exception as e:
        print(f"IQ rating error: {e}")
        return {"error": str(e)}
