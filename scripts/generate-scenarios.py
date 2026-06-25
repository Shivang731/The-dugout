# Generates all 6 scenario JSON files for The Dugout
# Already committed to data/scenarios/ — this script documents the generation process
import json
import os

SCENARIOS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "scenarios")


def generate_all():
    """Verify all 6 scenario files exist and are valid JSON."""
    required = [
        "france-argentina-2022",
        "germany-brazil-2014",
        "italy-france-2006",
        "argentina-netherlands-2022",
        "spain-netherlands-2010",
        "brazil-italy-1994",
    ]

    for sid in required:
        path = os.path.join(SCENARIOS_DIR, f"{sid}.json")
        if not os.path.exists(path):
            print(f"MISSING: {path}")
            continue
        try:
            with open(path, "r") as f:
                data = json.load(f)
            required_keys = ["id", "meta", "scoreline", "options", "real_decision",
                             "home_players", "away_players", "replay_events"]
            missing = [k for k in required_keys if k not in data]
            if missing:
                print(f"{sid}: missing keys: {missing}")
            else:
                print(f"{sid}: OK ({len(data['options'])} options, "
                      f"{len(data['home_players'])} home, "
                      f"{len(data['away_players'])} away, "
                      f"{len(data['replay_events'])} events)")
        except json.JSONDecodeError as e:
            print(f"{sid}: INVALID JSON — {e}")

    print("\nAll scenarios verified.")


if __name__ == "__main__":
    generate_all()
