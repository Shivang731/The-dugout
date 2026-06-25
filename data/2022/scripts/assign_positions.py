#!/usr/bin/env python3
"""Assign real formation-based positions to all 64 scenario JSONs using lineup data."""

import json
import os
import re
import glob
from collections import defaultdict

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SCENARIOS_DIR = os.path.join(PROJECT_ROOT, "data", "scenarios")
DATA_DIR = os.path.join(PROJECT_ROOT, "data", "2022", "json")
MATCHES_PATH = os.path.join(DATA_DIR, "matches.json")
LINEUPS_PATH = os.path.join(DATA_DIR, "lineups_appearances.json")

# Position → (y, lateral_weight)
# lateral_weight: 0=center, -1=far left, 1=far right
POSITIONS = {
    "Goalkeeper": (0.05, 0),
    "Left Center Back": (0.10, -0.65),
    "Center Back": (0.10, 0),
    "Right Center Back": (0.10, 0.65),
    "Left Back": (0.18, -0.92),
    "Right Back": (0.18, 0.92),
    "Left Wing Back": (0.22, -0.94),
    "Right Wing Back": (0.22, 0.94),
    "Left Defensive Midfield": (0.30, -0.35),
    "Center Defensive Midfield": (0.30, 0),
    "Defensive Midfield": (0.30, 0),
    "Right Defensive Midfield": (0.30, 0.35),
    "Left Center Midfield": (0.38, -0.35),
    "Center Midfield": (0.38, 0),
    "Right Center Midfield": (0.38, 0.35),
    "Left Midfield": (0.40, -0.92),
    "Right Midfield": (0.40, 0.92),
    "Left Attacking Midfield": (0.43, -0.35),
    "Right Attacking Midfield": (0.43, 0.35),
    "Center Attacking Midfield": (0.43, 0),
    "Attacking Midfield": (0.43, 0),
    "Left Wing": (0.55, -0.92),
    "Right Wing": (0.55, 0.92),
    "Left Center Forward": (0.57, -0.40),
    "Center Forward": (0.55, 0),
    "Right Center Forward": (0.57, 0.40),
}


def short_pos(pos_str):
    """Convert full position string to short code (GK, LB, CB, etc.)"""
    m = {
        "Goalkeeper": "GK",
        "Left Back": "LB", "Right Back": "RB",
        "Left Center Back": "LCB", "Center Back": "CB", "Right Center Back": "RCB",
        "Left Wing Back": "LWB", "Right Wing Back": "RWB",
        "Left Defensive Midfield": "LDM", "Center Defensive Midfield": "CDM",
        "Defensive Midfield": "CDM", "Right Defensive Midfield": "RDM",
        "Left Center Midfield": "LCM", "Center Midfield": "CM",
        "Right Center Midfield": "RCM",
        "Left Midfield": "LM", "Right Midfield": "RM",
        "Left Attacking Midfield": "LAM", "Right Attacking Midfield": "RAM",
        "Center Attacking Midfield": "CAM", "Attacking Midfield": "AM",
        "Left Wing": "LW", "Right Wing": "RW",
        "Left Center Forward": "LCF", "Center Forward": "CF",
        "Right Center Forward": "RCF",
    }
    return m.get(pos_str, pos_str[:3].upper())


def detect_formation(positions_list):
    """Detect formation string from list of position strings."""
    def count_in_band(positions, y_min, y_max):
        count = 0
        for p in positions:
            meta = POSITIONS.get(p)
            if meta and y_min <= meta[0] <= y_max:
                count += 1
        return count

    is_cb = lambda p: "Center Back" in p or "Center back" in p
    is_fullback = lambda p: p in ("Left Back", "Right Back")
    is_wingback = lambda p: p in ("Left Wing Back", "Right Wing Back")
    is_cdm = lambda p: "Defensive Midfield" in p and "Center" not in p.split()[-2:-1] if len(p.split()) > 2 else "Defensive" in p
    is_cm = lambda p: "Center Midfield" in p
    is_wide_mid = lambda p: p in ("Left Midfield", "Right Midfield")
    is_cam = lambda p: "Attacking Midfield" in p
    is_interior = lambda p: p in ("Left Attacking Midfield", "Right Attacking Midfield")
    is_winger = lambda p: p in ("Left Wing", "Right Wing")
    is_cf = lambda p: "Forward" in p or p == "Center Forward"

    defs = [p for p in positions_list if is_cb(p) or is_fullback(p) or is_wingback(p)]
    mids = [p for p in positions_list if is_cdm(p) or is_cm(p) or is_wide_mid(p) or is_cam(p)]
    fwds = [p for p in positions_list if is_winger(p) or is_cf(p)]

    d = len(defs)
    m = len(mids)
    f = len(fwds)
    cb_count = sum(1 for p in defs if is_cb(p))
    fb_count = sum(1 for p in defs if is_fullback(p))
    wb_count = sum(1 for p in defs if is_wingback(p))

    if d == 4 and cb_count == 2:
        if f == 3:
            if m == 3: return "4-3-3"
            if m == 2: return "4-2-4"
            if any(is_cam(p) for p in mids): return "4-2-3-1"
        if f == 2:
            if m == 4: return "4-4-2"
            if m == 2 and any(is_cam(p) for p in mids): return "4-4-2"
        if f == 1:
            if m == 5: return "4-1-4-1"
            if any(is_cam(p) for p in mids): return "4-2-3-1"
            if m == 3: return "4-3-3"
        if m == 3 and f == 3: return "4-3-3"
    elif d == 4:
        if m == 3 and f == 3: return "4-3-3"
        if m == 4 and f == 2: return "4-4-2"
        if m == 5 and f == 1: return "4-1-4-1"
    elif d == 3:
        if wb_count == 2:
            if m == 3 and f == 3: return "3-4-3"
            if m == 4 and f == 2: return "3-4-3"
            if m == 3 and f == 2: return "3-5-2"
            if m == 5 and f == 1: return "3-5-1-1"
        if m == 4 and f == 3: return "3-4-3"
        if m == 5 and f == 2: return "3-5-2"
    elif d == 5:
        return "5-3-2" if f == 2 else "5-4-1"

    return f"{d}-{m}-{f}"


def assign_coords(positions_list):
    """Assign normalized (x, y) to each position in a team's starting XI."""
    result = []
    names = list(positions_list.keys())
    pos_strings = list(positions_list.values())

    # First pass: assign base y and lateral weight
    data = []
    for name, pos_str in positions_list.items():
        meta = POSITIONS.get(pos_str)
        if not meta:
            print(f"    WARNING: unknown position '{pos_str}' for {name}")
            data.append({"name": name, "pos": pos_str, "y": 0.3, "lat": 0, "base_y": 0.3})
            continue
        base_y, lateral = meta
        data.append({"name": name, "pos": pos_str, "y": base_y, "lat": lateral, "base_y": base_y})

    # Group into bands for dynamic x-spacing
    bands = [
        ("GK", 0.0, 0.07),
        ("DEF", 0.07, 0.24),
        ("MID", 0.24, 0.48),
        ("FWD", 0.48, 0.65),
    ]

    for band_name, y_min, y_max in bands:
        in_band = [d for d in data if y_min <= d["y"] <= y_max]
        if len(in_band) <= 1:
            continue

        # Special handling for CBs (same band as fullbacks)
        cbs = [d for d in in_band if "Center Back" in d["pos"]]
        fbs = [d for d in in_band if d["pos"] in ("Left Back", "Right Back")]
        wbs = [d for d in in_band if d["pos"] in ("Left Wing Back", "Right Wing Back")]

        if band_name == "DEF":
            if len(cbs) == 3:
                # 3 CBs: spread evenly
                xs = [0.15, 0.5, 0.85]
                cbs_sorted = sorted(cbs, key=lambda d: d["lat"])
                for i, d in enumerate(cbs_sorted):
                    d["lat"] = (xs[i] - 0.5) * 2
            elif len(cbs) == 2 and len(fbs) >= 2:
                pass  # Use default lateral weights

            if wbs:
                for d in wbs:
                    if d["pos"] == "Left Wing Back":
                        d["y"] = 0.22
                    elif d["pos"] == "Right Wing Back":
                        d["y"] = 0.22

        if band_name == "FWD":
            cfs = [d for d in in_band if "Forward" in d["pos"]]
            wings = [d for d in in_band if d["pos"] in ("Left Wing", "Right Wing")]
            if len(cfs) == 2:
                cfs_sorted = sorted(cfs, key=lambda d: d["lat"])
                xs = [0.28, 0.72]
                for i, d in enumerate(cfs_sorted):
                    d["lat"] = (xs[i] - 0.5) * 2
            if len(cfs) == 1 and not wings:
                d["lat"] = 0  # solo striker stays central

        if band_name == "MID":
            cdms = [d for d in in_band if "Defensive Midfield" in d["pos"]]
            cms = [d for d in in_band if "Center Midfield" in d["pos"]]
            cams = [d for d in in_band if "Attacking Midfield" in d["pos"]]
            wide_mids = [d for d in in_band if d["pos"] in ("Left Midfield", "Right Midfield")]

            if len(cdms) == 2 and (not cms) and (not cams):
                cdms_sorted = sorted(cdms, key=lambda d: d["lat"])
                xs = [0.30, 0.70]
                for i, d in enumerate(cdms_sorted):
                    d["lat"] = (xs[i] - 0.5) * 2

            if len(cams) == 1 and len(cdms) >= 2:
                for d in in_band:
                    if d["pos"] in ("Left Midfield", "Right Midfield", "Left Wing", "Right Wing"):
                        d["y"] = 0.40

    # Convert lateral weight to x-coordinate
    for d in data:
        d["x"] = 0.5 + d["lat"] * 0.5

    for d in data:
        d["x"] = round(d["x"], 3)
        d["y"] = round(d["y"], 3)

    return {d["name"]: (d["x"], d["y"], short_pos(d["pos"])) for d in data}


def main():
    print("Loading matches data...")
    with open(MATCHES_PATH) as f:
        matches = json.load(f)

    print("Loading lineup data...")
    with open(LINEUPS_PATH) as f:
        lineups = json.load(f)

    # Build match_id → team names lookup
    match_teams = {}
    for m in matches:
        match_teams[m["match_id"]] = (m["home_team"], m["away_team"])

    # Build lookup: (match_id, team) → list of starting players
    match_lineups = defaultdict(list)
    for entry in lineups:
        if entry.get("starter") and entry.get("first_position"):
            match_lineups[(entry["match_id"], entry["team"])].append(entry)

    # Load all scenario files
    scenario_files = sorted(glob.glob(os.path.join(SCENARIOS_DIR, "*.json")))
    print(f"Found {len(scenario_files)} scenario files")

    updated = 0
    skipped = 0

    for sf in scenario_files:
        with open(sf) as f:
            scenario = json.load(f)

        home_team = scenario.get("home_team", "")
        away_team = scenario.get("away_team", "")
        scenario_id = scenario.get("id", "")

        # Find match_id by matching team names
        match_id = None
        for mid, (ht, at) in match_teams.items():
            if ht == home_team and at == away_team:
                match_id = mid
                break

        if not match_id:
            print(f"  SKIP {scenario_id}: no match found for {home_team} vs {away_team}")
            skipped += 1
            continue

        home_starters = match_lineups.get((match_id, home_team), [])
        away_starters = match_lineups.get((match_id, away_team), [])

        if not home_starters or not away_starters:
            print(f"  SKIP {scenario_id}: no lineup data for match {match_id}")
            skipped += 1
            continue

        # Map player names
        def player_key(name):
            return name.lower().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n").replace("ü", "u").replace("è", "e").replace("à", "a").replace("ä", "a").replace("ö", "o").replace("ç", "c").replace("ê", "e").replace("â", "a").replace("ô", "o").replace("ã", "a").replace("õ", "o").replace("ë", "e").replace("ï", "i").replace("ş", "s").replace("ğ", "g").replace("ı", "i")

        # Build lookup: normalized name → position string
        home_pos_lookup = {}
        for s in home_starters:
            key = player_key(s["player"])
            home_pos_lookup[key] = (s["first_position"], s["player"])

        away_pos_lookup = {}
        for s in away_starters:
            key = player_key(s["player"])
            away_pos_lookup[key] = (s["first_position"], s["player"])

        # Match scenario players to lineup data
        def assign_team_players(scenario_players, pos_lookup):
            result = []
            assigned = set()
            for sp in scenario_players:
                sk = player_key(sp["name"])
                if sk in pos_lookup and sk not in assigned:
                    pos_str, full_name = pos_lookup[sk]
                    result.append((sp["name"], pos_str, sp["number"], sp.get("fatigue", 50)))
                    assigned.add(sk)
                else:
                    # Try partial match
                    found = False
                    for lk, (ps, fn) in pos_lookup.items():
                        if lk not in assigned and (lk in sk or sk in lk or player_key(fn) in sk):
                            result.append((sp["name"], ps, sp["number"], sp.get("fatigue", 50)))
                            assigned.add(lk)
                            found = True
                            break
                    if not found:
                        print(f"    NO MATCH: '{sp['name']}' in {scenario_id}")
                        result.append((sp["name"], "Center Midfield", sp["number"], sp.get("fatigue", 50)))
            return result

        home_players_data = assign_team_players(scenario.get("home_players", []), home_pos_lookup)
        away_players_data = assign_team_players(scenario.get("away_players", []), away_pos_lookup)

        if not home_players_data or not away_players_data:
            print(f"  SKIP {scenario_id}: could not match players")
            skipped += 1
            continue

        home_pos_dict = {p[0]: p[1] for p in home_players_data}
        away_pos_dict = {p[0]: p[1] for p in away_players_data}

        home_coords = assign_coords(home_pos_dict)
        away_coords = assign_coords(away_pos_dict)

        formation_home = detect_formation(list(home_pos_dict.values()))
        formation_away = detect_formation(list(away_pos_dict.values()))

        # Update scenario
        scenario["home_formation"] = formation_home
        scenario["away_formation"] = formation_away

        for player in scenario.get("home_players", []):
            if player["name"] in home_coords:
                x, y, sp = home_coords[player["name"]]
                player["x"] = x
                player["y"] = y
                player["pos"] = sp

        for player in scenario.get("away_players", []):
            if player["name"] in away_coords:
                x, y, sp = away_coords[player["name"]]
                player["x"] = x
                player["y"] = y
                player["pos"] = sp

        with open(sf, "w") as f:
            json.dump(scenario, f, indent=2, ensure_ascii=False)
            f.write("\n")

        print(f"  OK   {scenario_id}: {formation_home} vs {formation_away}")
        updated += 1

    print(f"\nDone! Updated {updated} scenarios, skipped {skipped}")


if __name__ == "__main__":
    main()
