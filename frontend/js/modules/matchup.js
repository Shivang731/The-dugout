// Matchup panel — shows 1v1 battles with advantage indicators

// Render the matchup list from scenario data
function renderMatchups(scenario) {
  const list = document.getElementById('matchup-list');
  const matchups = scenario.matchups || [];
  if (!matchups.length) {
    list.innerHTML = '<p style="color:#6B7FA0;font-size:13px">No matchup data available.</p>';
    return;
  }
  list.innerHTML = matchups.map((m, i) => `
    <div class="matchup-item ${m.critical ? 'critical' : ''}">
      <span style="flex:1">${m.attacker}</span>
      <span class="matchup-score">${m.advantage} ${m.diff}</span>
      <span style="flex:1;text-align:right">${m.defender}${m.critical ? ' ⚠️' : ''}</span>
    </div>
  `).join('');
}

// Call API for matchup fix solutions
async function fixMatchup() {
  const btn = document.getElementById('fix-matchup-btn');
  const solutionsDiv = document.getElementById('matchup-solutions');
  btn.disabled = true;
  btn.textContent = 'Analyzing...';
  solutionsDiv.classList.remove('hidden');
  solutionsDiv.innerHTML = '<div class="spinner"></div>';

  try {
    const data = await fetchMatchupFix(currentScenario.id, 0);
    solutionsDiv.innerHTML = data.solutions
      ? '<h4 style="color:var(--accent);margin-bottom:8px">Tactical Fixes</h4><div style="font-size:13px;line-height:1.6">' + data.solutions.replace(/\n/g, '<br>') + '</div>'
      : '<p class="err">Could not generate solutions.</p>';
  } catch (e) {
    solutionsDiv.innerHTML = '<p class="err">Error: ' + e.message + '</p>';
  }
  btn.disabled = false;
  btn.textContent = 'Fix This Matchup';
}
