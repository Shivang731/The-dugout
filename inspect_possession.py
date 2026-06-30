#!/usr/bin/env python3
"""
Inspect the codebase to understand the current state of ball possession tracking
and prepare for synchronization between 2D and 3D renderers.
"""

import os
import re
import json
from pathlib import Path

def inspect_possession_state():
    print("=" * 70)
    print("INSPECTING BALL POSSESSION STATE")
    print("=" * 70)

    print("\n1. 2D PITCH ENGINE (frontend/js/pitch2d.js):")
    print("-" * 50)

    with open('/home/shivang/The-dugout/frontend/js/pitch2d.js', 'r') as f:
        content = f.read()
        
    # Find possession initialization
    possession_matches = re.findall(r'b\.possession\s*=', content)
    print(f"   - ball.possession initialization: {len(possession_matches)} found")
    
    for match in possession_matches:
        line_num = content[:content.find(match)].count('\n') + 1
        print(f"   - Line {line_num}: {match}")

    # Find possession team initialization
    team_matches = re.findall(r'b\.possessionTeam\s*=', content)
    print(f"   - ball.possessionTeam initialization: {len(team_matches)} found")
    
    # Find _updatePossession method
    update_possession = re.search(r'// ── Update possession from an event[\s\S]*?\n  _updatePossession', content)
    if update_possession:
        print(f"   - ✓ _updatePossession method exists")
    
    # Find _getBallCarrier method
    get_carrier = re.search(r'_getBallCarrier[\s\S]*?\n  return', content)
    if get_carrier:
        print(f"   - ✓ _getBallCarrier method exists")

    print("\n2. 3D PITCH ENGINE (frontend/js/pitch.js):")
    print("-" * 50)

    with open('/home/shivang/The-dugout/frontend/js/pitch.js', 'r') as f:
        content = f.read()
        
    # Find _computePasssingGraph3D method
    pass_graph = re.search(r'_computePassingGraph3D[\s\S]*?\n  return', content)
    if pass_graph:
        print(f"   - ✓ _computePassingGraph3D method exists")
    
    # Check if it uses pitch2d ball.possession
    if 'ball.possession' in content:
        print(f"   - ✗ Uses ball.possession: YES (should consume shared state)")
    else:
        print(f"   - ✓ ball.possession usage: NONE (good - already doesn't use it)")
    
    # Find possession logic in 3D
    if 'carrier = null' in content and 'minDist = Infinity' in content:
        print(f"   - ✗ Has independent possession logic (calculates carrier via distance)")

    print("\n3. GAME.JS (SHARED TACTICAL STATE):")
    print("-" * 50)

    with open('/home/shivang/The-dugout/frontend/js/game.js', 'r') as f:
        content = f.read()
        
    # Check if 3D render gets passed the pitch object
    if 'pitch3d = new Pitch3D' in content:
        print(f"   - ✓ Creates pitch3d instance")
    
    if 'pitch3d.load' in content:
        print(f"   - ✓ Calls pitch3d.load with players")

    # Check if pitch2d is shared
    if 'window.pitchMini = new Pitch2D' in content:
        print(f"   - ✓ Creates pitch2d instance for mini-pitch")
    
    if 'pitch && pitch.ball' in content:
        print(f"   - ✓ References pitch.ball.pos (from pitch2d)")

    print("\n4. RECOMMENDATIONS:")
    print("-" * 50)
    print("   a) 3D Pitch3D class needs access to pitch2d's ball.possession state")
    print("   b) Pitch3D should consume pitch2d's possession instead of calculating it")
    print("   c) Consider passing the pitch2d reference to Pitch3D constructor")
    print("   d) Update Pitch3D methods to use pitch2d's possession logic")

    print("\n" + "=" * 70)
    print("INSPECTION COMPLETE - READY FOR SYNCHRONIZATION")
    print("=" * 70)

if __name__ == '__main__':
    inspect_possession_state()
