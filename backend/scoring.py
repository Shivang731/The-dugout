"""Local scoring engine for The Dugout.

Computes Action Quality, Decision DNA, and Stakes from scenario data
without requiring AI. Used when AI is unavailable or for pre-generated paths."""


STAGE_WEIGHTS = {
    "Group Stage": 0.55, "Round of 16": 0.74,
    "Quarter-finals": 0.84, "Semi-finals": 0.93,
    "3rd Place Final": 0.60, "Final": 1.00,
}


def compute_stakes(scenario):
    meta = scenario.get("meta", {})
    stage = meta.get("stage", "Group Stage")
    scoreline = scenario.get("scoreline", {})
    diff = meta.get("difficulty", 3)
    stage_label = stage
    stage_w = STAGE_WEIGHTS.get(stage, 0.6)

    drivers = [stage_label]

    home = scoreline.get("home", 0)
    away = scoreline.get("away", 0)
    margin = abs(home - away)
    is_knockout = stage not in ("Group Stage", "Round of 16")

    if margin == 0:
        state = "Scores level"
    elif margin == 1:
        state = "One-goal game"
    elif margin <= 2:
        state = f"{margin}-goal deficit"
    else:
        state = "Comfortable margin"

    if is_knockout:
        drivers.append(f"Knockout tie")
    drivers.append(state)

    # Stakes = stage importance + scoreline tension + difficulty
    occasion = stage_w * (1.0 if margin <= 1 else 0.7 if margin <= 2 else 0.5)
    swing = 0.2 + diff * 0.08
    score = min(1.0, swing + 0.5 * occasion)

    level = "Decisive" if score >= 0.80 else "High" if score >= 0.60 else "Medium" if score >= 0.40 else "Low"

    return {
        "score": round(score, 2),
        "level": level,
        "drivers": drivers[:3],
    }


def compute_action_quality(scenario, user_choice):
    meta = scenario.get("meta", {})
    diff = meta.get("difficulty", 3)
    order = meta.get("order", 3)
    opts = scenario.get("options", [])
    real_opt = scenario.get("real_decision", {}).get("option", "")

    chosen = next((o for o in opts if o["label"] == user_choice), None)
    is_optimal = user_choice == real_opt

    # Decision quality: did they pick the right option?
    decision = 95 if is_optimal else 40 + diff * 5
    decision = max(20, min(100, decision))

    # Timing: based on difficulty and whether the option fits the situation
    risk_map = {"Low": 0.8, "Medium": 0.6, "High": 0.4, "Very High": 0.2}
    chosen_risk = risk_map.get(chosen.get("risk", "Medium"), 0.5) if chosen else 0.5
    timing = int(50 + chosen_risk * 30 + (1 - diff / 5) * 20)
    timing = max(20, min(100, timing))

    # Difficulty: based on scenario difficulty and stage weight
    ORDER_WEIGHT = {1: 0.55, 2: 0.74, 3: 0.84, 4: 0.93, 5: 0.60, 6: 1.00}
    stage_w = ORDER_WEIGHT.get(order, 0.6)
    difficulty = int(30 + diff * 10 + stage_w * 15)
    difficulty = max(20, min(100, difficulty))

    # Overall score
    score = int(decision * 0.5 + timing * 0.25 + difficulty * 0.25)
    score = max(5, min(99, score))

    label = "Outstanding" if score >= 80 else "Good" if score >= 65 else "Reasonable" if score >= 45 else "Poor"

    # Pros/Cons
    pros = []
    cons = []

    if is_optimal:
        pros.append("Matched the real manager's decision")
        pros.append("Correct tactical read of the situation")
    else:
        cons.append("Did not match the real manager's call")

    if chosen:
        chosen_risk = chosen.get("risk", "Medium")
        if chosen_risk in ("High", "Very High") and is_optimal:
            pros.append("Bold decision that paid off")
        elif chosen_risk in ("High", "Very High") and not is_optimal:
            cons.append("High-risk choice that didn't pay off")
        elif chosen_risk == "Low" and is_optimal:
            pros.append("Conservative but correct choice")

    if diff >= 4:
        if is_optimal:
            pros.append("Excellent reading of a high-pressure situation")
        else:
            cons.append("Misread a very difficult tactical situation")
    elif diff <= 2 and not is_optimal:
        cons.append("Should have read this straightforward situation better")

    if order >= 5 and is_optimal:
        pros.append("Made the right call in a decisive match")
    elif order >= 5 and not is_optimal:
        cons.append("A costly mistake in a high-stakes match")

    if not pros and is_optimal:
        pros.append("Sound tactical decision")
    if not cons and not is_optimal:
        cons.append("A different approach might have worked better")

    return {
        "score": score,
        "label": label,
        "components": {
            "decision": decision,
            "timing": timing,
            "difficulty": difficulty,
        },
        "pros": pros[:3],
        "cons": cons[:3],
    }


def compute_dna(scenario, user_choice):
    meta = scenario.get("meta", {})
    diff = meta.get("difficulty", 3)
    order = meta.get("order", 3)
    opts = scenario.get("options", [])
    real_opt = scenario.get("real_decision", {}).get("option", "")
    is_optimal = user_choice == real_opt

    chosen = next((o for o in opts if o["label"] == user_choice), None)

    # Difficulty (0-1): how hard was the tactical situation?
    difficulty_val = min(1.0, 0.2 + diff * 0.16)

    # Vision (0-1): how creative/unexpected was the choice?
    risk_map = {"Low": 0.2, "Medium": 0.4, "High": 0.7, "Very High": 0.9}
    chosen_risk = risk_map.get(chosen.get("risk", "Medium"), 0.4) if chosen else 0.4
    # If they chose the real option, vision is moderate (it was the "correct" play)
    # If they chose differently, vision is higher (more creative thinking)
    vision_val = chosen_risk * (0.5 if is_optimal else 0.8)

    # Risk (0-1): how risky was the chosen option?
    risk_val = chosen_risk

    # Decisiveness (0-1): how bold was the response?
    # Higher difficulty + high risk = high decisiveness
    decisiveness_val = min(1.0, (diff / 5) * 0.6 + risk_val * 0.4)

    # Leverage (0-1): how much did this moment matter?
    stakes = compute_stakes(scenario)
    leverage_val = stakes["score"]

    return {
        "difficulty": round(difficulty_val, 2),
        "vision": round(vision_val, 2),
        "risk": round(risk_val, 2),
        "decisiveness": round(decisiveness_val, 2),
        "leverage": round(leverage_val, 2),
    }
