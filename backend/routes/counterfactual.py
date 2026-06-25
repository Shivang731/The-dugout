from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate, generate_structured
from backend.fixture_loader import load_scenario
from backend.analyst_personas import persona, language_line
from backend import cache
from backend.scoring import compute_stakes

router = APIRouter()


class CounterfactualRequest(BaseModel):
    scenario_id: str
    user_choice: str
    chosen_option_text: str
    lang: str = "en"


COUNTERFACTUAL_PROMPT = """You are a football tactical analyst specializing
in counterfactual match analysis.

{persona_voice}

MATCH: {match_name}
MOMENT: {trigger_label}
SCORE: {score}

THE USER CHOSE: Option {user_choice} — "{chosen_option_text}"

WHAT ACTUALLY HAPPENED:
{real_decision_desc}

ALL OPTIONS AND THEIR TACTICAL VALUE:
A: {option_a} (Risk: {risk_a})
B: {option_b} (Risk: {risk_b})
C: {option_c} (Risk: {risk_c})
D: {option_d} (Risk: {risk_d})

First, write a brief alternate timeline (3-4 events) of what might have happened
if Option {user_choice} had been chosen instead of the real decision. Be specific
but honest about uncertainty. Under 200 words.

Then provide a tactical valuation of all 4 options. Rate each from 1-10 on how
well it addresses the tactical problem, and give a brief reason. Return the
valuations as a JSON object at the end, wrapped in ```json ... ``` marks.

{language_instruction}"""


VALUATION_PROMPT = """Rate each tactical option for this match scenario on a scale of 1-10
based on how well it addresses the tactical problem.

MATCH: {match_name}
MOMENT: {trigger_label}
SCORE: {score}
CONTEXT: {context}

OPTIONS:
A: {option_a} (Risk: {risk_a})
B: {option_b} (Risk: {risk_b})
C: {option_c} (Risk: {risk_c})
D: {option_d} (Risk: {risk_d})

REAL CHOICE: Option {real_opt}

Return ONLY valid JSON:
{{
  "valuations": [
    {{"label": "A", "rating": <1-10>, "reason": "<brief reason>"}},
    {{"label": "B", "rating": <1-10>, "reason": "<brief reason>"}},
    {{"label": "C", "rating": <1-10>, "reason": "<brief reason>"}},
    {{"label": "D", "rating": <1-10>, "reason": "<brief reason>"}}
  ]
}}"""


@router.post("/api/counterfactual")
async def counterfactual(req: CounterfactualRequest):
    try:
        scenario = load_scenario(req.scenario_id)
        p = persona(req.lang)
        opts = scenario.get("options", [])
        meta = scenario.get("meta", {})

        cache_key = f"counter:{req.scenario_id}:{req.user_choice}:{req.lang}"
        cached = cache.get("counterfactuals", cache_key)
        if cached:
            return cached

        prompt = COUNTERFACTUAL_PROMPT.format(
            match_name=meta.get("title", "Match"),
            trigger_label=meta.get("trigger_label", ""),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            user_choice=req.user_choice,
            chosen_option_text=req.chosen_option_text,
            real_decision_desc=scenario.get("real_decision", {}).get("description", ""),
            option_a=opts[0]["action"] if len(opts) > 0 else "",
            risk_a=opts[0].get("risk", "Medium") if len(opts) > 0 else "",
            option_b=opts[1]["action"] if len(opts) > 1 else "",
            risk_b=opts[1].get("risk", "Medium") if len(opts) > 1 else "",
            option_c=opts[2]["action"] if len(opts) > 2 else "",
            risk_c=opts[2].get("risk", "Medium") if len(opts) > 2 else "",
            option_d=opts[3]["action"] if len(opts) > 3 else "",
            risk_d=opts[3].get("risk", "Medium") if len(opts) > 3 else "",
            persona_voice=p["voice"],
            language_instruction=language_line(req.lang),
        )
        text = await generate(prompt, max_tokens=600)

        valuation_prompt = VALUATION_PROMPT.format(
            match_name=meta.get("title", "Match"),
            trigger_label=meta.get("trigger_label", ""),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            context=scenario.get("context", ""),
            option_a=opts[0]["action"] if len(opts) > 0 else "",
            risk_a=opts[0].get("risk", "Medium") if len(opts) > 0 else "",
            option_b=opts[1]["action"] if len(opts) > 1 else "",
            risk_b=opts[1].get("risk", "Medium") if len(opts) > 1 else "",
            option_c=opts[2]["action"] if len(opts) > 2 else "",
            risk_c=opts[2].get("risk", "Medium") if len(opts) > 2 else "",
            option_d=opts[3]["action"] if len(opts) > 3 else "",
            risk_d=opts[3].get("risk", "Medium") if len(opts) > 3 else "",
            real_opt=scenario.get("real_decision", {}).get("option", "?"),
        )
        valuations_data = await generate_structured(valuation_prompt)
        valuations = valuations_data.get("valuations") if valuations_data else None

        # Local fallback for valuations
        if not valuations:
            opts = scenario.get("options", [])
            real_opt = scenario.get("real_decision", {}).get("option", "")
            risk_scores = {"Low": 6, "Medium": 7, "High": 8, "Very High": 5}
            valuations = []
            for o in opts:
                base = risk_scores.get(o.get("risk", "Medium"), 6)
                is_real = o["label"] == real_opt
                rating = min(10, base + (2 if is_real else 0))
                reason = "The manager's actual choice" if is_real else "A viable tactical option"
                valuations.append({"label": o["label"], "rating": rating, "reason": reason})

        result = {
            "alternate_timeline": text,
            "valuations": valuations,
            "analyst": p["name"],
        }
        cache.put("counterfactuals", cache_key, result)
        return result
    except Exception as e:
        print(f"Counterfactual error: {e}")
        return {"error": str(e)}
