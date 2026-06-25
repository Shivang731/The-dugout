let _allScenarios = [];
let _activeStage = 'All';

function renderScenarioCards(scenarios) {
  _allScenarios = scenarios;
  _applyFilters();
}

function _applyFilters() {
  let filtered = [..._allScenarios];
  if (_activeStage !== 'All') {
    filtered = filtered.filter(s => (s.meta && s.meta.stage) === _activeStage);
  }
  filtered.sort((a, b) => ((a.meta && a.meta.order) || 99) - ((b.meta && b.meta.order) || 99));

  const grid = document.getElementById('scenario-grid');
  const count = document.getElementById('match-count');
  if (!filtered.length) {
    grid.innerHTML = '<div class="scenario-empty">No matches found for this stage.</div>';
    if (count) count.textContent = '0 matches';
    return;
  }

  if (count) count.textContent = `${filtered.length} match${filtered.length !== 1 ? 'es' : ''}`;

  grid.innerHTML = filtered.map((s, i) => {
    const meta = s.meta || {};
    const diff = meta.difficulty || 1;
    const diffClass = diff <= 2 ? 'easy' : diff <= 4 ? 'medium' : 'hard';
    const diffLabel = diff <= 2 ? 'Easy' : diff <= 4 ? 'Medium' : 'Hard';
    const teaser = (meta.trigger_label || s.context || '').substring(0, 80);
    const stage = meta.stage || '';

    return `
      <a class="scenario-card" href="/static/game.html?scenario=${s.id}" style="animation-delay:${(i % 12) * 0.04}s">
        <div class="scenario-card-header">
          <span class="scenario-flags">${flagForTeam(s.home_team)} ${flagForTeam(s.away_team)}</span>
          <span class="scenario-teams">${s.home_team} vs ${s.away_team}</span>
        </div>
        <div class="scenario-score">${s.scoreline.display || '0-0'}</div>
        <div class="scenario-moment">${teaser ? teaser + '…' : ''}</div>
        <div class="scenario-footer">
          <span class="scenario-difficulty ${diffClass}">${diffLabel}</span>
          <span class="scenario-stage-tag">${stage}</span>
          <span class="scenario-enter">Enter →</span>
        </div>
      </a>
    `;
  }).join('');
}

function setStageFilter(stage) {
  _activeStage = stage;
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.stage === stage);
  });
  _applyFilters();
}

function flagForTeam(team) {
  const flags = {
    'Spain': '🇪🇸', 'Netherlands': '🇳🇱', 'Argentina': '🇦🇷', 'France': '🇫🇷',
    'Germany': '🇩🇪', 'Brazil': '🇧🇷', 'Italy': '🇮🇹',
    'Qatar': '🇶🇦', 'Ecuador': '🇪🇨', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Senegal': '🇸🇳',
    'Iran': '🇮🇷', 'United States': '🇺🇸', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Mexico': '🇲🇽',
    'Poland': '🇵🇱', 'Saudi Arabia': '🇸🇦', 'Denmark': '🇩🇰', 'Tunisia': '🇹🇳',
    'Costa Rica': '🇨🇷', 'Japan': '🇯🇵', 'Belgium': '🇧🇪', 'Canada': '🇨🇦',
    'Cameroon': '🇨🇲', 'Serbia': '🇷🇸', 'South Korea': '🇰🇷', 'Ghana': '🇬🇭',
    'Uruguay': '🇺🇾', 'Portugal': '🇵🇹', 'Switzerland': '🇨🇭', 'Croatia': '🇭🇷',
    'Morocco': '🇲🇦', 'Australia': '🇦🇺',
  };
  return flags[team] || '🏳️';
}
