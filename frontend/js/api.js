// All fetch calls to the FastAPI backend
const API_BASE = window.location.origin;

async function fetchScenario(id) {
  const r = await fetch(`${API_BASE}/api/scenario/${id}`);
  if (!r.ok) throw new Error('Failed to load scenario');
  return r.json();
}

async function fetchExplanation(scenarioId, choice, lang) {
  const r = await fetch(`${API_BASE}/api/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario_id: scenarioId, user_choice: choice, lang: lang || 'en' }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function fetchDecisionStream(scenarioId, choice, lang, onChunk, onDone, onError) {
  const url = `${API_BASE}/api/decision/stream?scenario_id=${encodeURIComponent(scenarioId)}&user_choice=${encodeURIComponent(choice)}&lang=${encodeURIComponent(lang || 'en')}`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Stream error ' + r.status);
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) { if (onDone) onDone(); return; }
            if (data.error) { if (onError) onError(data.error); return; }
            if (data.text && onChunk) onChunk(data.text);
          } catch (e) { /* skip malformed */ }
        }
      }
    }
    if (onDone) onDone();
  } catch (e) {
    if (onError) onError(e.message);
  }
}

async function fetchMatchupFix(scenarioId, matchupIndex) {
  const r = await fetch(`${API_BASE}/api/matchup-fix`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario_id: scenarioId, matchup_index: matchupIndex }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function fetchCounterfactual(scenarioId, userChoice, chosenOptionText, lang) {
  const r = await fetch(`${API_BASE}/api/counterfactual`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scenario_id: scenarioId,
      user_choice: userChoice,
      chosen_option_text: chosenOptionText,
      lang: lang || 'en',
    }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function fetchLibraryAnswer(question) {
  const r = await fetch(`${API_BASE}/api/library`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function fetchIQRating(decisions) {
  const r = await fetch(`${API_BASE}/api/iq-rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decisions }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function fetchAnalysts() {
  const r = await fetch(`${API_BASE}/api/analysts`);
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}

async function listScenarios() {
  const r = await fetch(`${API_BASE}/api/scenarios`);
  if (!r.ok) throw new Error(`Failed to load scenarios (${r.status})`);
  return r.json();
}

async function fetchMatchInsight(scenarioId) {
  const r = await fetch(`${API_BASE}/api/match/insight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario_id: scenarioId }),
  });
  if (!r.ok) throw new Error('API error ' + r.status);
  return r.json();
}
