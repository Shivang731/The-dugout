import json
import os
import time

SCENARIOS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "scenarios")

_list_cache = None
_list_cache_time = 0
_LIST_CACHE_TTL = 300


def load_scenario(scenario_id: str) -> dict:
    filepath = os.path.join(SCENARIOS_DIR, f"{scenario_id}.json")
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Scenario '{scenario_id}' not found at {filepath}")
    with open(filepath, "r") as f:
        return json.load(f)


def list_scenarios(force: bool = False) -> list:
    global _list_cache, _list_cache_time
    now = time.time()
    if not force and _list_cache is not None and now - _list_cache_time < _LIST_CACHE_TTL:
        return _list_cache

    scenarios = []
    for fname in os.listdir(SCENARIOS_DIR):
        if not fname.endswith(".json"):
            continue
        sid = fname[:-5]
        try:
            data = load_scenario(sid)
            scenarios.append({
                "id": sid,
                "order": data.get("meta", {}).get("order", 99),
                "meta": data.get("meta", {}),
                "scoreline": data.get("scoreline", {}),
                "home_team": data.get("home_team", ""),
                "away_team": data.get("away_team", ""),
            })
        except Exception as e:
            print(f"Error loading {fname}: {e}")

    scenarios.sort(key=lambda s: s["order"])
    _list_cache = scenarios
    _list_cache_time = now
    return scenarios
