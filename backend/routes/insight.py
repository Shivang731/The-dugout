from fastapi import APIRouter
from pydantic import BaseModel
from backend.ai_client import generate
from backend.fixture_loader import load_scenario

router = APIRouter()

LANG_MAP = {
    "en": "English",
    "es": "Spanish",
    "pt": "Portuguese",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "nl": "Dutch",
    "ar": "Arabic",
    "hi": "Hindi",
    "ja": "Japanese",
}

LANG_TERMINOLOGY = {
    "en": "English football terms: 'high press', 'low block', 'half-spaces', 'defensive shape', 'transition'.",
    "es": "Términos de fútbol en español: 'presión alta', 'bloque defensivo', 'espacios interiores', 'carriles de pase', 'línea defensiva'.",
    "pt": "Termos de futebol em português: 'pressão alta', 'bloco defensivo', 'linhas de passe', 'espaços interiores'.",
    "fr": "Vocabulaire du football en français : 'bloc défensif', 'pression haute', 'couloirs de passe', 'ligne défensive'.",
    "de": "Deutsche Fußballbegriffe: 'Pressing', 'Defensivblock', 'Passwege', 'Abwehrkette', 'Umschaltspiel', 'Halbräume'.",
    "it": "Termini calcistici italiani: 'blocco difensivo', 'pressione', 'linee di passaggio', 'spazi interiori'.",
    "nl": "Nederlandse voetbaltermen: 'pressing', 'verdedigend blok', 'passlijnen', 'vrije ruimte', 'omschakeling'.",
    "ar": "المصطلحات الكروية العربية: 'الضغط العالي', 'الكتلة الدفاعية', 'ممرات التمرير', 'التحول', 'العمق الدفاعي'.",
    "hi": "फुटबॉल के हिंदी शब्द: 'ऊँचा दबाव', 'रक्षात्मक ब्लॉक', 'पास लाइनें', 'संक्रमण', 'रक्षापंक्ति'।",
    "ja": "サッカー用語：『ハイプレス』『守備ブロック』『パスコース』『最終ライン』『トランジション』。",
}

class InsightRequest(BaseModel):
    scenario_id: str
    lang: str = "en"

@router.post("/api/match/insight")
async def match_insight(req: InsightRequest):
    scenario = None
    try:
        scenario = load_scenario(req.scenario_id)
        meta = scenario.get("meta", {})
        opts = scenario.get("options", [])

        lang_name = LANG_MAP.get(req.lang, "English")
        terminology = LANG_TERMINOLOGY.get(req.lang, "")

        print(f"[INSIGHT] Requested language: {req.lang} ({lang_name})")

        system_prompt = f"You are a football tactical analyst. You ALWAYS write entirely in {lang_name}. Never write in English. Use football terminology natural for {lang_name} speakers. {terminology}"

        user_prompt = f"""Analyze this match:

Match: {meta.get("title", "Match")}
Score: {scenario.get("scoreline", {}).get("display", "0-0")}
Stage: {meta.get("stage", "Group Stage")}
Context: {scenario.get("context", "")}

Home: {scenario.get("home_team", "")} ({scenario.get("home_formation", "4-3-3")})
Away: {scenario.get("away_team", "")} ({scenario.get("away_formation", "4-3-3")})

Write 3-4 sentences covering:
1. The current match situation and what each team needs
2. Key tactical patterns visible
3. What the trailing team should consider changing

Remember: write in {lang_name}, not English. Use {lang_name} football terminology."""

        text = await generate(user_prompt, max_tokens=500, system=system_prompt)
        print(f"[INSIGHT] Generated text (lang={req.lang}): {text[:100]}...")
        return {"insight": text, "via": "granite"}
    except Exception as e:
        print(f"[INSIGHT] Error generating insight: {e}")
        if scenario is None:
            return {"insight": "Tactical analysis unavailable.", "via": "fallback"}
        h = scenario.get("home_team", "")
        a = scenario.get("away_team", "")
        hf = scenario.get("home_formation", "4-3-3")
        af = scenario.get("away_formation", "4-3-3")
        return {
            "insight": f"{h} are organised in a {hf} while {a} defend in a {af}. The current scoreline means {h} need to take more risks in possession. Creating overloads in the final third will be key to breaking down the defensive block.",
            "via": "fallback"
        }
