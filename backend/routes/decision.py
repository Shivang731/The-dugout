import json
import os
from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from backend.ai_client import generate, generate_structured, generate_stream, model_name
from backend.fixture_loader import load_scenario
from backend.analyst_personas import persona, language_line
from backend import cache
from backend.scoring import compute_action_quality, compute_dna, compute_stakes

router = APIRouter()


class DecisionRequest(BaseModel):
    scenario_id: str
    user_choice: str
    lang: str = "en"


SCORING_PROMPT = """You are a football tactical analyst. Judge this ONE managerial decision.

MATCH: {match_name}
MOMENT: {trigger_label}
SCORE: {score}
STAGE: {stage}
CONTEXT: {context}

THE MANAGER CHOSE: Option {user_choice} — {chosen_action}
RISK: {chosen_risk}

ALL OPTIONS:
A: {option_a} (Risk: {risk_a})
B: {option_b} (Risk: {risk_b})
C: {option_c} (Risk: {risk_c})
D: {option_d} (Risk: {risk_d})

REAL MANAGER'S CHOICE: Option {real_opt}

{persona_voice}

Score this decision dimension by dimension. Return ONLY valid JSON with NO markdown fences, NO explanation, NO commentary outside the JSON:

{{
  "action_quality": {{
    "score": <0-100 overall>,
    "label": "<Outstanding|Good|Reasonable|Poor>",
    "components": {{"decision": <0-100>, "timing": <0-100>, "difficulty": <0-100>}},
    "pros": ["<pro 1>", "<pro 2>"],
    "cons": ["<con 1>", "<con 2>"]
  }},
  "dna": {{
    "difficulty": <0.0-1.0>,
    "vision": <0.0-1.0>,
    "risk": <0.0-1.0>,
    "decisiveness": <0.0-1.0>,
    "leverage": <0.0-1.0>
  }},
  "stakes": {{
    "score": <0.0-1.0>,
    "level": "<Decisive|High|Medium|Low>",
    "drivers": ["<driver 1>", "<driver 2>"]
  }}
}}

Action Quality: decision = was this the best option; timing = right moment for this change; difficulty = how hard the situation was (stage, scoreline, pressure). Score 0-100 per component.
DNA: difficulty (0-1), vision (how creative/unexpected, 0-1), risk (how risky the chosen option is, 0-1), decisiveness (how bold/resolute, 0-1), leverage (how much this mattered based on match context, 0-1).
Stakes: how much this moment could decide the match/tournament.

{language_instruction}
Thresholds for score label: >=80 Outstanding, >=65 Good, >=45 Reasonable, else Poor."""


EXPLANATION_PROMPT = """You are a football tactical analyst.

{persona_voice}

MATCH: {match_name}
MOMENT: {trigger_label}
SCORE: {score}
STAGE: {stage}
CONTEXT: {context}

THE MANAGER CHOSE: Option {user_choice} — {chosen_action}
RISK: {chosen_risk}

ALL OPTIONS:
A: {option_a} (Risk: {risk_a})
B: {option_b} (Risk: {risk_b})
C: {option_c} (Risk: {risk_c})
D: {option_d} (Risk: {risk_d})

REAL MANAGER'S CHOICE: Option {real_opt}
REAL OUTCOME: {real_desc}

Analyze all four options with clear headers. For each: explain the tactical logic, the risk, and why it works or fails. End with a verdict on the manager's choice. Write for a smart football fan, not an analyst. Under 500 words.

{language_instruction}"""


def _stage_label(order):
    labels = {1: "Group Stage", 2: "Round of 16", 3: "Quarter-finals",
              4: "Semi-finals", 5: "3rd Place Final", 6: "Final"}
    return labels.get(order, f"Match {order}")


def _username(p):
    return p["name"]


@router.post("/api/decision")
async def explain_decision(req: DecisionRequest):
    try:
        scenario = load_scenario(req.scenario_id)
        p = persona(req.lang)
        pre_gen = scenario.get("pre_generated_explanations", {})
        cache_key = f"{req.scenario_id}:{req.user_choice}:{req.lang}"

        cached = cache.get("decisions", cache_key)
        if cached:
            return cached

        opts = scenario.get("options", [])
        chosen = next((o for o in opts if o["label"] == req.user_choice), {})
        meta = scenario.get("meta", {})
        stage = meta.get("stage", "Match")

        if req.user_choice in pre_gen:
            explanation = pre_gen[req.user_choice].replace("{choice}", req.user_choice)
            aq = compute_action_quality(scenario, req.user_choice)
            dna = compute_dna(scenario, req.user_choice)
            sk = compute_stakes(scenario)
            result = {
                "explanation": explanation,
                "action_quality": aq,
                "dna": dna,
                "stakes": sk,
                "real_decision": scenario["real_decision"],
                "user_was_optimal": req.user_choice == scenario["real_decision"]["option"],
                "source": "pre_generated",
                "via": "",
                "analyst": p["name"],
            }
            cache.put("decisions", cache_key, result)
            return result

        prompt = EXPLANATION_PROMPT.format(
            match_name=meta.get("title", "Match"),
            trigger_label=meta.get("trigger_label", ""),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            stage=stage,
            context=scenario.get("context", ""),
            user_choice=req.user_choice,
            chosen_action=chosen.get("action", ""),
            chosen_risk=chosen.get("risk", "Medium"),
            option_a=opts[0]["action"] if len(opts) > 0 else "",
            risk_a=opts[0].get("risk", "Medium") if len(opts) > 0 else "",
            option_b=opts[1]["action"] if len(opts) > 1 else "",
            risk_b=opts[1].get("risk", "Medium") if len(opts) > 1 else "",
            option_c=opts[2]["action"] if len(opts) > 2 else "",
            risk_c=opts[2].get("risk", "Medium") if len(opts) > 2 else "",
            option_d=opts[3]["action"] if len(opts) > 3 else "",
            risk_d=opts[3].get("risk", "Medium") if len(opts) > 3 else "",
            real_opt=scenario.get("real_decision", {}).get("option", "?"),
            real_desc=scenario.get("real_decision", {}).get("description", ""),
            persona_voice=p["voice"],
            language_instruction=language_line(req.lang),
        )
        text = await generate(prompt)

        # Try AI scoring, fall back to local engine
        scoring_prompt = SCORING_PROMPT.format(
            match_name=meta.get("title", "Match"),
            trigger_label=meta.get("trigger_label", ""),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            stage=stage,
            context=scenario.get("context", ""),
            user_choice=req.user_choice,
            chosen_action=chosen.get("action", ""),
            chosen_risk=chosen.get("risk", "Medium"),
            option_a=opts[0]["action"] if len(opts) > 0 else "",
            risk_a=opts[0].get("risk", "Medium") if len(opts) > 0 else "",
            option_b=opts[1]["action"] if len(opts) > 1 else "",
            risk_b=opts[1].get("risk", "Medium") if len(opts) > 1 else "",
            option_c=opts[2]["action"] if len(opts) > 2 else "",
            risk_c=opts[2].get("risk", "Medium") if len(opts) > 2 else "",
            option_d=opts[3]["action"] if len(opts) > 3 else "",
            risk_d=opts[3].get("risk", "Medium") if len(opts) > 3 else "",
            real_opt=scenario.get("real_decision", {}).get("option", "?"),
            persona_voice=p["voice"],
            language_instruction=language_line(req.lang),
        )
        structured = await generate_structured(scoring_prompt)

        result = {
            "explanation": text,
            "action_quality": structured.get("action_quality") if structured else compute_action_quality(scenario, req.user_choice),
            "dna": structured.get("dna") if structured else compute_dna(scenario, req.user_choice),
            "stakes": structured.get("stakes") if structured else compute_stakes(scenario),
            "real_decision": scenario.get("real_decision", {}),
            "user_was_optimal": req.user_choice == scenario.get("real_decision", {}).get("option", ""),
            "source": "live_ai",
            "via": model_name(),
            "analyst": p["name"],
        }
        cache.put("decisions", cache_key, result)
        return result
    except Exception as e:
        print(f"Decision error: {e}")
        return {"error": str(e)}


@router.get("/api/decision/stream")
async def stream_decision(
    scenario_id: str = Query(...),
    user_choice: str = Query(...),
    lang: str = Query("en"),
):
    """Stream the AI explanation as SSE for typewriter effect.
    Falls back to pre-generated explanation when available."""
    try:
        scenario = load_scenario(scenario_id)
        p = persona(lang)
        opts = scenario.get("options", [])
        chosen = next((o for o in opts if o["label"] == user_choice), {})
        meta = scenario.get("meta", {})

        # Check for pre-generated explanation first
        pre_gen = scenario.get("pre_generated_explanations", {})
        if user_choice in pre_gen:
            pre_gen_text = pre_gen[user_choice].replace("{choice}", user_choice)

            async def pregen_stream():
                yield f"data: {json.dumps({'text': pre_gen_text})}\n\n"
                yield f"data: {json.dumps({'done': True})}\n\n"

            return StreamingResponse(
                pregen_stream(),
                media_type="text/event-stream",
                headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
            )

        prompt = EXPLANATION_PROMPT.format(
            match_name=meta.get("title", "Match"),
            trigger_label=meta.get("trigger_label", ""),
            score=scenario.get("scoreline", {}).get("display", "0-0"),
            stage=meta.get("stage", "Match"),
            context=scenario.get("context", ""),
            user_choice=user_choice,
            chosen_action=chosen.get("action", ""),
            chosen_risk=chosen.get("risk", "Medium"),
            option_a=opts[0]["action"] if len(opts) > 0 else "",
            risk_a=opts[0].get("risk", "Medium") if len(opts) > 0 else "",
            option_b=opts[1]["action"] if len(opts) > 1 else "",
            risk_b=opts[1].get("risk", "Medium") if len(opts) > 1 else "",
            option_c=opts[2]["action"] if len(opts) > 2 else "",
            risk_c=opts[2].get("risk", "Medium") if len(opts) > 2 else "",
            option_d=opts[3]["action"] if len(opts) > 3 else "",
            risk_d=opts[3].get("risk", "Medium") if len(opts) > 3 else "",
            real_opt=scenario.get("real_decision", {}).get("option", "?"),
            real_desc=scenario.get("real_decision", {}).get("description", ""),
            persona_voice=p["voice"],
            language_instruction=language_line(lang),
        )

        async def event_stream():
            async for chunk in generate_stream(prompt):
                if chunk:
                    yield f"data: {json.dumps({'text': chunk})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"

        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    except Exception as e:
        async def error_stream():
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")
