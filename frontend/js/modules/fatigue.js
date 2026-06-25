// Player fatigue popup — instant JSON lookup, no AI call

// Return color for a fatigue value
function fatigueColor(f) {
  if (f < 40) return '#22c55e';
  if (f < 65) return '#f59e0b';
  return '#ef4444';
}

// Show fatigue popup anchored to player position
function showFatiguePopup(player, scenario, anchorX, anchorY) {
  const text = (scenario.fatigue_popups && scenario.fatigue_popups[player.name]) ||
    `${player.name} has a fatigue score of ${player.fatigue}/100.`;

  const popup = document.getElementById('fatigue-popup');
  popup.innerHTML = `
    <div class="popup-head">
      <span class="jersey-num" style="background:${player.team === 'away' ? '#1e3a8a' : '#7f1d1d'}; color:#fff">${player.number}</span>
      <div>
        <strong>${player.name}</strong>
        <span class="pos-tag">${player.pos}</span>
      </div>
      <button style="margin-left:auto;background:none;border:none;color:#8899bb;font-size:18px;cursor:pointer" onclick="this.closest('.fatigue-popup').classList.add('hidden')">&times;</button>
    </div>
    <div class="fatigue-bar-wrap">
      <div class="fatigue-bar-fill" style="width:${player.fatigue}%;background:${fatigueColor(player.fatigue)}"></div>
    </div>
    <div class="fatigue-stats">
      <span>${player.fatigue}<small>/100</small></span>
      <span>Fatigue</span>
    </div>
    <p class="fatigue-text">${text}</p>
  `;
  popup.style.left = Math.min(anchorX, window.innerWidth - 280) + 'px';
  popup.style.top = (anchorY - 20) + 'px';
  popup.classList.remove('hidden');
}
