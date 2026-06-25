// Tactical IQ radar chart + result card after completing scenarios

const IQ_MIN_SCENARIOS = 6;

async function showIQOverlay() {
  const decisions = window.allDecisions || {};
  const completed = Object.keys(decisions);
  if (completed.length < IQ_MIN_SCENARIOS) return;

  try {
    const data = await fetchIQRating(decisions);
    renderIQModal(data);
  } catch (e) {
    console.warn('IQ rating error:', e);
  }
}

// Render the IQ modal with radar chart and tier
function renderIQModal(data) {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.id = 'iq-overlay';
  overlay.innerHTML = `
    <div style="background:#121828;border:1px solid #1E293B;border-radius:16px;padding:32px;max-width:500px;width:90%;text-align:center">
      <h2 style="color:var(--accent);font-size:20px;margin-bottom:4px;font-family:var(--font-display);letter-spacing:3px">TACTICAL IQ</h2>
      <div style="font-size:60px;font-weight:900;margin:12px 0;color:#fff;font-family:var(--font-display)">${data.scores.total || 0}</div>
      <div style="font-size:18px;font-weight:700;color:var(--accent);margin-bottom:16px">${data.scores.tier || 'Scout'}</div>
      <div style="max-width:300px;margin:0 auto 20px">
        <canvas id="iq-radar" width="300" height="300"></canvas>
      </div>
      <div style="text-align:left;font-size:13px;color:var(--text-muted);margin-bottom:16px">
        <p>Matches: ${data.matches || 0}/${data.total_scenarios || 0} optimal</p>
      </div>
      <button class="btn-primary" onclick="downloadIQCard()">Download Card</button>
      <button class="btn-outline" style="margin-left:8px" onclick="document.getElementById('iq-overlay').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Render radar chart
  const scores = data.scores.scores || {};
  const ctx = document.getElementById('iq-radar');
  if (ctx && window.Chart) {
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Attacking', 'Defensive', 'Sub Timing', 'Formation', 'Pressure'],
        datasets: [{
          data: [
            scores.attacking || 0,
            scores.defensive || 0,
            scores.sub_timing || 0,
            scores.formation || 0,
            scores.pressure || 0,
          ],
          backgroundColor: 'rgba(245,166,35,0.15)',
          borderColor: '#F5A623',
          pointBackgroundColor: '#F5A623',
        }],
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { display: false } } },
        plugins: { legend: { display: false } },
      },
    });
  }

  window.iqData = data;
}

// Download shareable IQ result card image
function downloadIQCard() {
  const data = window.iqData || {};
  const score = data.scores.total || 0;
  const tier = data.scores.tier || 'Scout';

  const c = document.createElement('canvas');
  c.width = 600; c.height = 315;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0A0E1A'; ctx.fillRect(0, 0, 600, 315);
  ctx.fillStyle = '#F5A623'; ctx.font = 'bold 13px sans-serif';
  ctx.fillText('THE DUGOUT — TACTICAL IQ', 30, 36);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 80px sans-serif';
  ctx.fillText(String(score), 30, 130);
  ctx.fillStyle = '#F5A623'; ctx.font = 'bold 22px sans-serif';
  ctx.fillText(tier, 30, 165);
  ctx.fillStyle = '#8892A8'; ctx.font = '14px sans-serif';
  ctx.fillText('Tactical IQ Rating', 30, 195);

  const a = document.createElement('a');
  a.download = 'dugout-iq.png';
  a.href = c.toDataURL();
  a.click();
}
