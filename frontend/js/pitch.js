// 3D pitch — broadcast‑quality match experience
// Works with game.js which expects `new Pitch3D('pitch-container')'

// ===================================================================
// CONSTANTS
// ===================================================================
const PITCH_W = 68;
const PITCH_L = 105;
const HALF_W = PITCH_W / 2;
const HALF_L = PITCH_L / 2;
const GOAL_W = 7.32;
const GOAL_H = 2.44;
const GOAL_D = 2.5;
const PEN_AREA_W = 40.32;
const PEN_AREA_L = 16.5;
const SIX_YARD_W = 18.32;
const SIX_YARD_L = 5.5;
const CENTER_R = 9.15;
const PEN_SPOT_DIST = 11;
const CORNER_R = 1;
const PLAYER_HEIGHT = 2.2;

// ===================================================================
// TEAM COLORS
// ===================================================================
const TEAM_COLORS = {
  'Argentina':         { shirt: 0x75aadb, shorts: 0x000000, socks: 0xffffff, gk: 0x22c55e, crowd: 0x75aadb },
  'Croatia':           { shirt: 0xed1c24, shorts: 0xffffff, socks: 0x0000ff, gk: 0x22c55e, crowd: 0xffffff },
  'Brazil':            { shirt: 0xf7d100, shorts: 0x003cff, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xf7d100 },
  'Japan':             { shirt: 0x003cff, shorts: 0xffffff, socks: 0x003cff, gk: 0x22c55e, crowd: 0x003cff },
  'France':            { shirt: 0x002395, shorts: 0xffffff, socks: 0xed1c24, gk: 0x22c55e, crowd: 0x002395 },
  'Netherlands':       { shirt: 0xff6b00, shorts: 0xffffff, socks: 0xff6b00, gk: 0x22c55e, crowd: 0xff6b00 },
  'Senegal':           { shirt: 0x00853e, shorts: 0xf7d100, socks: 0xed1c24, gk: 0x22c55e, crowd: 0x00853e },
  'England':           { shirt: 0xffffff, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'USA':               { shirt: 0xffffff, shorts: 0x002868, socks: 0xffffff, gk: 0x22c55e, crowd: 0x002868 },
  'Wales':             { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Iran':              { shirt: 0xffffff, shorts: 0x239f40, socks: 0xffffff, gk: 0x22c55e, crowd: 0x239f40 },
  'Mexico':            { shirt: 0x006847, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0x006847 },
  'Poland':            { shirt: 0xffffff, shorts: 0xcf1020, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'Saudi Arabia':      { shirt: 0xffffff, shorts: 0x006847, socks: 0xffffff, gk: 0x22c55e, crowd: 0x006847 },
  'Australia':         { shirt: 0xf7d100, shorts: 0x006847, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xf7d100 },
  'Denmark':           { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Tunisia':           { shirt: 0xffffff, shorts: 0xcf1020, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xffffff },
  'Spain':             { shirt: 0xcf1020, shorts: 0xf7d100, socks: 0x002868, gk: 0x22c55e, crowd: 0xcf1020 },
  'Costa Rica':        { shirt: 0xcf1020, shorts: 0xffffff, socks: 0x003cff, gk: 0x22c55e, crowd: 0xcf1020 },
  'Germany':           { shirt: 0xffffff, shorts: 0x000000, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'Belgium':           { shirt: 0xcf1020, shorts: 0x000000, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xcf1020 },
  'Canada':            { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Morocco':           { shirt: 0xcf1020, shorts: 0x006847, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Portugal':          { shirt: 0xcf1020, shorts: 0x006847, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Ghana':             { shirt: 0xffffff, shorts: 0xf7d100, socks: 0x000000, gk: 0x22c55e, crowd: 0xffffff },
  'Uruguay':           { shirt: 0x75aadb, shorts: 0x000000, socks: 0x75aadb, gk: 0x22c55e, crowd: 0x75aadb },
  'Switzerland':       { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Cameroon':          { shirt: 0x006847, shorts: 0xcf1020, socks: 0xf7d100, gk: 0x22c55e, crowd: 0x006847 },
  'Serbia':            { shirt: 0xcf1020, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xcf1020 },
  'South Korea':       { shirt: 0xcf1020, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xcf1020 },
  'Qatar':             { shirt: 0xffffff, shorts: 0x800000, socks: 0xffffff, gk: 0x22c55e, crowd: 0x800000 },
  'Ecuador':           { shirt: 0xf7d100, shorts: 0x003cff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xf7d100 },
};
const DEFAULT_COLORS = { shirt: 0x3b82f6, shorts: 0x1e3a8a, socks: 0x3b82f6, gk: 0x2563eb, crowd: 0x3b82f6 };

function _getTeamColors(teamName) {
  return TEAM_COLORS[teamName] || DEFAULT_COLORS;
}

// ===================================================================
// ADVERTISING SPONSORS (cycle based on scenario hash)
// ===================================================================
const SPONSORS = [
  'THE DUGOUT', 'UNDERSTAND THE GAME', 'TACTICAL ANALYSIS',
  'IBM GRANITE', 'WORLD CUP',
];
function _selectSponsors(scenarioId) {
  const hash = (scenarioId || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const idx = hash % (SPONSORS.length - 3);
  return SPONSORS.slice(idx, idx + 4);
}

// ===================================================================
// HELPERS
// ===================================================================
function _pNormToWorld(p) {
  const x = (p.x - 0.5) * 68;
  const z = p.team === 'away'
    ? (p.y - 0.5) * 105
    : (0.5 - p.y) * 105;
  return { x, z };
}

function _fatigueHex(val) {
  if (val < 40) return 0x22c55e;
  if (val < 65) return 0xf59e0b;
  return 0xef4444;
}

function _mat(color, roughness = 0.55, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

var _sharedGeoCache = {};
function _sharedGeo(key, factory) {
  if (!_sharedGeoCache[key]) _sharedGeoCache[key] = factory();
  return _sharedGeoCache[key];
}

function _easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ===================================================================
// GRASS TEXTURE GENERATION — broadcast-quality mowing stripes
// ===================================================================
var _grassTexCache = null;
function _createGrassTexture() {
  if (_grassTexCache) return _grassTexCache;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  const stripeH = canvas.height / 12;

  // ── Base stripe colours (subtle 8–15% luminance difference) ──
  const darkGreen  = '#0D4F1B';
  const lightGreen = '#10591E';

  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? darkGreen : lightGreen;
    ctx.fillRect(0, i * stripeH, canvas.width, stripeH);
  }

  // ── Subtle grain: dark specks ──
  ctx.fillStyle = 'rgba(0,0,0,0.018)';
  for (let i = 0; i < 12000; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2.5 + 0.5,
      Math.random() * 1.5 + 0.5,
    );
  }

  // ── Natural colour variation patches ──
  const variationColours = ['#0D4F1B', '#10591E'];
  for (let i = 0; i < 10000; i++) {
    ctx.fillStyle = variationColours[Math.random() * 2 | 0] + '20';
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 6 + 2,
      Math.random() * 4 + 1,
    );
  }

  // ── Mowing streaks with alternating direction per stripe ──
  ctx.lineWidth = 1.0;
  for (let s = 0; s < 12; s++) {
    const yBase = s * stripeH;
    const dir = s % 2 === 0 ? 1 : -1;
    for (let row = 0; row < stripeH; row += 8) {
      ctx.beginPath();
      ctx.moveTo(dir > 0 ? 0 : canvas.width, yBase + row);
      const drift = (Math.random() - 0.5) * 5;
      const opacity = 0.015 + Math.random() * 0.015;
      ctx.strokeStyle = dir > 0
        ? `rgba(255,255,255,${opacity})`
        : `rgba(0,0,0,${opacity})`;
      ctx.lineTo(dir > 0 ? canvas.width : 0, yBase + row + drift);
      ctx.stroke();
    }
  }

  // ── Radial vignette — darker edges (matching 2D pitch) ──
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = Math.max(canvas.width, canvas.height) * 0.65;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0)');
  grad.addColorStop(0.80, 'rgba(0,0,0,0.04)');
  grad.addColorStop(0.93, 'rgba(0,0,0,0.10)');
  grad.addColorStop(1, 'rgba(0,0,0,0.20)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── Centre spotlight — subtle brightening in the middle ──
  const spotR = Math.max(canvas.width, canvas.height) * 0.55;
  const spotGrad = ctx.createRadialGradient(cx, cy, spotR * 0.35, cx, cy, spotR * 0.55);
  spotGrad.addColorStop(0, 'rgba(255,255,255,0)');
  spotGrad.addColorStop(0.7, 'rgba(255,255,255,0)');
  spotGrad.addColorStop(0.85, 'rgba(255,255,255,0.012)');
  spotGrad.addColorStop(1, 'rgba(255,255,255,0.025)');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── Faint directional sheen per stripe ──
  for (let s = 0; s < 12; s++) {
    const yBase = s * stripeH;
    const dir = s % 2 === 0 ? 1 : -1;
    const sheenGrad = ctx.createLinearGradient(
      dir > 0 ? 0 : canvas.width, 0,
      dir > 0 ? canvas.width : 0, 0,
    );
    sheenGrad.addColorStop(0, 'rgba(255,255,255,0.015)');
    sheenGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
    sheenGrad.addColorStop(1, 'rgba(0,0,0,0.010)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, yBase, canvas.width, stripeH);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.anisotropy = 16;
  _grassTexCache = tex;
  return tex;
}

// ===================================================================
// PITCH MARKINGS TEXTURE — single transparent overlay
// ===================================================================
var _markingsTexCache = null;
function _createMarkingsTexture() {
  if (_markingsTexCache) return _markingsTexCache;
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 3160; // matches PITCH_W:PITCH_L ratio
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;

  // scaling helpers: pitch coords → canvas coords
  const px = (x) => (x / PITCH_W + 0.5) * w;
  const pz = (z) => (-z / PITCH_L + 0.5) * h;

  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 3;

  function line(x1, z1, x2, z2) {
    ctx.beginPath();
    ctx.moveTo(px(x1), pz(z1));
    ctx.lineTo(px(x2), pz(z2));
    ctx.stroke();
  }

  function circle(cx, cz, r) {
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), (r / PITCH_W) * w, 0, Math.PI * 2);
    ctx.stroke();
  }

  function arc(cx, cz, r, a1, a2) {
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), (r / PITCH_W) * w, a1, a2);
    ctx.stroke();
  }

  function dot(cx, cz, rad) {
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), rad * (w / PITCH_W), 0, Math.PI * 2);
    ctx.fill();
  }

  // Outer boundary
  line(-HALF_W, -HALF_L, HALF_W, -HALF_L);
  line(HALF_W, -HALF_L, HALF_W, HALF_L);
  line(HALF_W, HALF_L, -HALF_W, HALF_L);
  line(-HALF_W, HALF_L, -HALF_W, -HALF_L);

  // Halfway line
  line(-HALF_W, 0, HALF_W, 0);

  // Center circle
  circle(0, 0, CENTER_R);

  // Center spot
  dot(0, 0, 0.3);

  // Penalty areas
  line(-PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L);
  line(PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  line(PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  line(-PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L);
  line(-PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L);
  line(PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  line(PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  line(-PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L);

  // Six-yard boxes
  line(-SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L);
  line(SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  line(SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  line(-SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L);
  line(-SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L);
  line(SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  line(SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  line(-SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L);

  // Penalty spots
  dot(0, HALF_L - PEN_SPOT_DIST, 0.25);
  dot(0, -HALF_L + PEN_SPOT_DIST, 0.25);

  // Penalty arcs
  const penArcR = CENTER_R;
  const nz = HALF_L - PEN_SPOT_DIST;
  arc(0, nz, penArcR, -0.7, 0.7);
  arc(0, -nz, penArcR, Math.PI - 0.7, Math.PI + 0.7);

  // Corner arcs
  const cr = CORNER_R;
  arc(-HALF_W, -HALF_L, cr, 0, Math.PI / 2);
  arc(HALF_W, -HALF_L, cr, Math.PI / 2, Math.PI);
  arc(HALF_W, HALF_L, cr, Math.PI, 3 * Math.PI / 2);
  arc(-HALF_W, HALF_L, cr, 3 * Math.PI / 2, 2 * Math.PI);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  _markingsTexCache = tex;
  return tex;
}

function _createNetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  const cellSize = 26;
  const lineWidth = 2.8;
  const knotR = 3.5;

  // Draw square mesh grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  for (let x = 0; x <= 512; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Knots at every intersection
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let x = 0; x <= 512; x += cellSize) {
    for (let y = 0; y <= 512; y += cellSize) {
      ctx.beginPath();
      ctx.arc(x, y, knotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 2);
  tex.anisotropy = 8;
  return tex;
}

// Subdivided plane geometry with subtle parabolic sag for realistic net hang
function _makeNetPlane(w, h, segW, segH, sag) {
  const geo = new THREE.PlaneGeometry(w, h, segW, segH);
  const pos = geo.attributes.position;
  const hw = w / 2;
  const hh = h / 2;
  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i) / hw;
    const ny = pos.getY(i) / hh;
    const s = sag * (1 - nx * nx) * (1 - ny * ny);
    pos.setZ(i, pos.getZ(i) - s);
  }
  geo.computeVertexNormals();
  return geo;
}

function _createSponsorTexture(name) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // LED panel background
  ctx.fillStyle = '#08080f';
  ctx.fillRect(0, 0, 512, 128);

  // Subtle inner border
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 120);

  // Text glow
  ctx.font = '600 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255,255,255,0.15)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 256, 64);

  // Sharp text overlay
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f0f0f5';
  ctx.fillText(name, 256, 64);

  // Very subtle LED scanline effect
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  for (let y = 0; y < 128; y += 3) {
    ctx.fillRect(0, y, 512, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ===================================================================
// BUILD PITCH
// ===================================================================
function _buildPitch(scene, scenario) {
  const grassTex = _createGrassTexture();
  const grassMat = new THREE.MeshStandardMaterial({
    map: grassTex,
    roughness: 0.55,
    metalness: 0,
    color: 0xffffff,
    envMapIntensity: 0.3,
  });
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W, PITCH_L),
    grassMat,
  );
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.02;
  grass.receiveShadow = true;
  scene.add(grass);

  // pitch border run-off track — BELOW the grass so the stripe texture
  // is the visible surface on the playing area
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x1a4d20,
    roughness: 1,
    metalness: 0,
  });
  const track = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W + 8, PITCH_L + 8),
    trackMat,
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = -0.15;
  scene.add(track);

  // ===== PITCH MARKINGS — single transparent overlay texture =====
  const markingsTex = _createMarkingsTexture();

  // The canvas is painted in pitch-coordinate space so we render it
  // on a plane at the exact pitch dimensions.
  const markingsMat = new THREE.MeshBasicMaterial({
    map: markingsTex,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  const markings = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W, PITCH_L),
    markingsMat,
  );
  markings.rotation.x = -Math.PI / 2;
  markings.position.y = 0.03;
  markings.receiveShadow = false;
  scene.add(markings);

  // Pitch edge shadow gradients (keep these)
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.15,
  });
  [-1, 1].forEach(side => {
    const edge = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, PITCH_L + 4),
      edgeMat,
    );
    edge.rotation.x = -Math.PI / 2;
    edge.position.set(side * (HALF_W + 2.5), -0.12, 0);
    scene.add(edge);
  });
}

// ===================================================================
// BUILD GOALS
// ===================================================================
function _buildGoals(scene) {
  const netTex = _createNetTexture();
  const PR = 0.065;
  const SEGS = 24;
  const RSEGS = 12;

  // Shared bright white matte finish for all structural goal parts
  const postMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.6,
  });

  [-HALF_L, +HALF_L].forEach(z => {
    const sign = z < 0 ? 1 : -1;
    const rearZ = z + sign * GOAL_D;

    // --- Goalposts ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(PR, PR, GOAL_H, SEGS),
        postMat,
      );
      post.position.set(x, GOAL_H / 2, z);
      post.castShadow = true;
      scene.add(post);
    });

    // --- Crossbar ---
    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(PR, PR, GOAL_W, SEGS),
      postMat,
    );
    crossbar.rotation.x = Math.PI / 2;
    crossbar.position.set(0, GOAL_H, z);
    crossbar.castShadow = true;
    scene.add(crossbar);

    // --- Corner fillets (smooth post-crossbar joints) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const fillet = new THREE.Mesh(
        new THREE.SphereGeometry(PR, SEGS, SEGS),
        postMat,
      );
      fillet.position.set(x, GOAL_H, z);
      fillet.castShadow = true;
      scene.add(fillet);
    });

    // --- Post base plates ---
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      metalness: 0,
      roughness: 0.7,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(PR + 0.025, PR + 0.035, 0.04, SEGS),
        baseMat,
      );
      base.position.set(x, 0.02, z);
      scene.add(base);
    });

    // --- Goal-line ground bar (connects the two posts at ground level) ---
    const groundBar = new THREE.Mesh(
      new THREE.CylinderGeometry(PR, PR, GOAL_W, SEGS),
      postMat,
    );
    groundBar.rotation.x = Math.PI / 2;
    groundBar.position.set(0, PR, z);
    groundBar.castShadow = true;
    scene.add(groundBar);

    // --- Rear vertical supports ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, GOAL_H, RSEGS),
        postMat,
      );
      support.position.set(x, GOAL_H / 2, rearZ);
      support.castShadow = true;
      scene.add(support);
    });

    // --- Top rear crossbar ---
    const rearCrossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, GOAL_W, RSEGS),
      postMat,
    );
    rearCrossbar.rotation.x = Math.PI / 2;
    rearCrossbar.position.set(0, GOAL_H, rearZ);
    rearCrossbar.castShadow = true;
    scene.add(rearCrossbar);

    // --- Bottom rear crossbar ---
    const bottomRearBar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, GOAL_W, RSEGS),
      postMat,
    );
    bottomRearBar.rotation.x = Math.PI / 2;
    bottomRearBar.position.set(0, 0.04, rearZ);
    bottomRearBar.castShadow = true;
    scene.add(bottomRearBar);

    // --- Side ground rails (front post to rear support at ground level) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const sideLen = GOAL_D;
      const sideRail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, sideLen, RSEGS),
        postMat,
      );
      sideRail.rotation.z = Math.PI / 2;
      sideRail.position.set(x, 0.03, z + sign * GOAL_D / 2);
      sideRail.castShadow = true;
      scene.add(sideRail);
    });

    // --- Top side rails (front post top to rear support top) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const topRail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, GOAL_D, RSEGS),
        postMat,
      );
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(x, GOAL_H, z + sign * GOAL_D / 2);
      topRail.castShadow = true;
      scene.add(topRail);
    });

    // --- Diagonal braces (front post at 65% height to rear support base) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const braceHeight = GOAL_H * 0.65;
      const len = Math.sqrt(braceHeight * braceHeight + GOAL_D * GOAL_D);
      const brace = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, len, RSEGS),
        postMat,
      );
      brace.position.set(x, braceHeight / 2, z + sign * GOAL_D / 2);
      brace.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, braceHeight, sign * GOAL_D).normalize(),
      );
      brace.castShadow = true;
      scene.add(brace);
    });

    // --- Net (back) ---
    const netColor = 0xffffff;
    const netRoughness = 0.65;

    const backNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    const backNet = new THREE.Mesh(
      _makeNetPlane(GOAL_W, GOAL_H, 20, 14, 0.18),
      backNetMat,
    );
    const bp = backNet.geometry.attributes.position;
    for (let i = 0; i < bp.count; i++) bp.setZ(i, bp.getZ(i) * sign);
    backNet.geometry.computeVertexNormals();
    backNet.position.set(0, GOAL_H / 2, rearZ);
    backNet.receiveShadow = true;
    scene.add(backNet);

    // --- Net (top) ---
    const topNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    const topNet = new THREE.Mesh(
      _makeNetPlane(GOAL_W, GOAL_D, 20, 8, 0.08),
      topNetMat,
    );
    topNet.rotation.x = -Math.PI / 2;
    topNet.position.set(0, GOAL_H, z + sign * GOAL_D / 2);
    topNet.receiveShadow = true;
    scene.add(topNet);

    // --- Net (sides) ---
    const sideNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const sideNet = new THREE.Mesh(
        _makeNetPlane(GOAL_D, GOAL_H, 8, 14, 0.08),
        sideNetMat,
      );
      const sp = sideNet.geometry.attributes.position;
      for (let i = 0; i < sp.count; i++) sp.setZ(i, sp.getZ(i) * (x < 0 ? -1 : 1));
      sideNet.geometry.computeVertexNormals();
      sideNet.rotation.y = Math.PI / 2 * (x < 0 ? 1 : -1);
      sideNet.position.set(x, GOAL_H / 2, z + sign * GOAL_D / 2);
      sideNet.receiveShadow = true;
      scene.add(sideNet);
    });

    // --- Net (ground inside goal) ---
    const groundNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: 0.8,
      metalness: 0,
      depthWrite: false,
    });
    const groundNet = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W, GOAL_D),
      groundNetMat,
    );
    groundNet.rotation.x = -Math.PI / 2;
    groundNet.position.set(0, 0.01, z + sign * GOAL_D / 2);
    scene.add(groundNet);

    // --- Goal shadow on ground ---
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.05,
    });
    const goalShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W + 0.5, GOAL_D + 0.3),
      shadowMat,
    );
    goalShadow.rotation.x = -Math.PI / 2;
    goalShadow.position.set(0, 0.005, z + sign * GOAL_D / 2);
    scene.add(goalShadow);
  });
}

// ===================================================================
// BUILD CORNER FLAGS
// ===================================================================
function _buildCornerFlags(scene) {
  const flagData = [];
  const positions = [
    [-HALF_W, -HALF_L],
    [+HALF_W, -HALF_L],
    [+HALF_W, +HALF_L],
    [-HALF_W, +HALF_L],
  ];

  positions.forEach(([x, z]) => {
    // Pole
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.5,
    });
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 1.5, 6),
      poleMat,
    );
    pole.position.set(x, 0.75, z);
    pole.castShadow = true;
    scene.add(pole);

    // Flag triangle
    const flagShape = new THREE.Shape();
    flagShape.moveTo(0, 0);
    flagShape.lineTo(0.5, 0.25);
    flagShape.lineTo(0, 0.5);
    flagShape.closePath();

    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
    const flagMat = new THREE.MeshStandardMaterial({
      color: color,
      side: THREE.DoubleSide,
      roughness: 0.7,
    });
    const flag = new THREE.Mesh(new THREE.ShapeGeometry(flagShape), flagMat);
    flag.position.set(x, 1.2, z);
    // Face diagonal inward
    const angle = Math.atan2(-z, -x);
    flag.rotation.y = angle;
    scene.add(flag);

    flagData.push({
      pole,
      flag,
      phase: Math.random() * Math.PI * 2,
      baseRot: angle,
      baseX: x,
      baseZ: z,
    });
  });

  return flagData;
}

// ===================================================================
// BUILD ADVERTISING BOARDS
// ===================================================================
function _buildAdvertisingBoards(scene, scenarioId) {
  const sponsors = _selectSponsors(scenarioId);
  const boards = [];

  const boardW = 3;
  const boardH = 1.05;
  const boardD = 0.08;
  const boardY = 0.525;
  const pitchGap = 2.5;
  const cornerGap = 2.5;

  // Cache materials per sponsor for reuse
  const matCache = {};
  function _getMat(name) {
    if (!matCache[name]) {
      const tex = _createSponsorTexture(name);
      matCache[name] = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.05,
        emissive: 0x111122,
        emissiveIntensity: 0.25,
        emissiveMap: tex,
        side: THREE.DoubleSide,
      });
    }
    return matCache[name];
  }

  // Shared geometry
  const faceGeo = _sharedGeo('adFace', () => new THREE.PlaneGeometry(boardW, boardH));
  const caseGeo = _sharedGeo('adCase', () => new THREE.BoxGeometry(boardW, boardH, boardD));

  function addRow(xStart, zStart, xEnd, zEnd, spIdx) {
    const dx = xEnd - xStart;
    const dz = zEnd - zStart;
    const totalLen = Math.sqrt(dx * dx + dz * dz);
    const numBoards = Math.max(1, Math.floor(totalLen / boardW));

    // Inward-facing angle: rotate so +Z normal points toward pitch centre
    const cx = (xStart + xEnd) / 2;
    const cz = (zStart + zEnd) / 2;
    const angle = Math.atan2(-cx, -cz);

    for (let i = 0; i < numBoards; i++) {
      const t = (i + 0.5) / numBoards;
      const bx = xStart + t * dx;
      const bz = zStart + t * dz;
      const sp = sponsors[(spIdx + i) % sponsors.length];
      const mat = _getMat(sp);

      // Casing
      const casing = new THREE.Mesh(caseGeo, mat);
      casing.position.set(bx, boardY, bz);
      casing.rotation.y = angle;
      scene.add(casing);
      boards.push(casing);

      // LED face (slightly proud of casing)
      const face = new THREE.Mesh(faceGeo, mat);
      face.position.set(
        bx + Math.sin(angle) * (boardD / 2 + 0.005),
        boardY,
        bz + Math.cos(angle) * (boardD / 2 + 0.005),
      );
      face.rotation.y = angle;
      scene.add(face);
      boards.push(face);
    }
    return numBoards;
  }

  const limit = HALF_L - cornerGap;
  const wLimit = HALF_W - cornerGap;
  let spIdx = 0;

  // Touchline rows (full length, minus corner gaps)
  spIdx += addRow(-HALF_W - pitchGap, -limit, -HALF_W - pitchGap, limit, spIdx);
  spIdx += addRow(+HALF_W + pitchGap, -limit, +HALF_W + pitchGap, limit, spIdx);

  // Behind-goal rows
  spIdx += addRow(-wLimit, -HALF_L - pitchGap, wLimit, -HALF_L - pitchGap, spIdx);
  spIdx += addRow(-wLimit, +HALF_L + pitchGap, wLimit, +HALF_L + pitchGap, spIdx);

  return boards;
}

// ===================================================================
// BUILD STADIUM
// ===================================================================
function _buildStadium(scene) {
  // Materials — dark modern aesthetic
  const concDark = new THREE.MeshStandardMaterial({
    color: 0x12122a,
    roughness: 0.9,
    metalness: 0.02,
  });
  const concMid = new THREE.MeshStandardMaterial({
    color: 0x181830,
    roughness: 0.85,
    metalness: 0.02,
  });
  const concLight = new THREE.MeshStandardMaterial({
    color: 0x20203a,
    roughness: 0.8,
    metalness: 0.02,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a52,
    roughness: 0.35,
    metalness: 0.7,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x16162e,
    roughness: 0.6,
    metalness: 0.15,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xaaccee,
    transparent: true,
    opacity: 0.2,
    roughness: 0.05,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  // ===================================================================
  // 1. SIDELINE GRANDSTANDS (East & West)
  // ===================================================================
  // Each side has 3 tiers stepping back from the pitch.
  // Outer (back) edge aligns at |x| = 49 for a clean exterior wall.
  [-1, 1].forEach(side => {
    // Lower tier — closest to pitch, tallest
    const lower = new THREE.Mesh(
      new THREE.BoxGeometry(16, 4, 98),
      concDark,
    );
    lower.position.set(side * 41, 2, 0);
    lower.castShadow = true;
    lower.receiveShadow = true;
    scene.add(lower);

    // Middle tier — set back 2m, shorter in height
    const middle = new THREE.Mesh(
      new THREE.BoxGeometry(13, 3.5, 90),
      concMid,
    );
    middle.position.set(side * 43.5, 5.75, 0);
    middle.castShadow = true;
    middle.receiveShadow = true;
    scene.add(middle);

    // Upper tier — set back 2m more
    const upper = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.5, 82),
      concLight,
    );
    upper.position.set(side * 46, 9.25, 0);
    upper.castShadow = true;
    upper.receiveShadow = true;
    scene.add(upper);

    // --- Exterior wall (connects all tiers at the back) ---
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 11, 100),
      concLight,
    );
    wall.position.set(side * 49, 5.5, 0);
    scene.add(wall);

    // --- Roof structure (cantilevered from back wall) ---
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.2, 88),
      roofMat,
    );
    roof.position.set(side * 45, 12, 0);
    roof.castShadow = true;
    scene.add(roof);

    // Roof edge beam (front lip)
    const lip = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.5, 89),
      steelMat,
    );
    lip.position.set(side * 37, 12.35, 0);
    scene.add(lip);

    // Roof rear beam (along back wall)
    const rearBeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.5, 89),
      steelMat,
    );
    rearBeam.position.set(side * 53, 12.35, 0);
    scene.add(rearBeam);

    // Roof lateral beams (strut pattern)
    for (let z = -42; z <= 42; z += 7) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(16, 0.15, 0.15),
        steelMat,
      );
      beam.position.set(side * 45, 12.1, z);
      scene.add(beam);
    }

    // Vertical support columns at back wall
    for (let z = -44; z <= 44; z += 10) {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.25, 11, 8),
        steelMat,
      );
      col.position.set(side * 49, 5.5, z);
      scene.add(col);
    }

    // --- Stepped seating rows (visual strips on each tier) ---
    const seatStripMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e38,
      roughness: 0.85,
      metalness: 0.02,
    });
    for (let row = 0; row < 10; row++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(14, 0.1, 0.25),
        seatStripMat,
      );
      step.position.set(side * (34 + 0.6 + row * 1.4), 2.5 + row * 0.4, 0);
      scene.add(step);
    }
    for (let row = 0; row < 8; row++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(11, 0.1, 0.25),
        seatStripMat,
      );
      step.position.set(side * (36 + 0.6 + row * 1.4), 6.1 + row * 0.4, 0);
      scene.add(step);
    }
    for (let row = 0; row < 6; row++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.1, 0.25),
        seatStripMat,
      );
      step.position.set(side * (38 + 0.6 + row * 1.4), 9.6 + row * 0.4, 0);
      scene.add(step);
    }
  });

  // ===================================================================
  // 2. END STANDS (North & South, behind goals)
  // ===================================================================
  [-1, 1].forEach(side => {
    // Lower tier
    const endLower = new THREE.Mesh(
      new THREE.BoxGeometry(66, 3.5, 8),
      concDark,
    );
    endLower.position.set(0, 1.75, side * 57);
    endLower.castShadow = true;
    endLower.receiveShadow = true;
    scene.add(endLower);

    // Upper tier
    const endUpper = new THREE.Mesh(
      new THREE.BoxGeometry(60, 3, 7),
      concMid,
    );
    endUpper.position.set(0, 5, side * 59);
    endUpper.castShadow = true;
    endUpper.receiveShadow = true;
    scene.add(endUpper);

    // Exterior wall
    const endWall = new THREE.Mesh(
      new THREE.BoxGeometry(68, 6.5, 0.5),
      concLight,
    );
    endWall.position.set(0, 3.25, side * 65);
    scene.add(endWall);

    // Roof
    const endRoof = new THREE.Mesh(
      new THREE.BoxGeometry(64, 0.2, 8),
      roofMat,
    );
    endRoof.position.set(0, 7.5, side * 63);
    endRoof.castShadow = true;
    scene.add(endRoof);

    // Roof beams
    for (let x = -28; x <= 28; x += 7) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.35, 8),
        steelMat,
      );
      beam.position.set(x, 7.6, side * 63);
      scene.add(beam);
    }

    // Stepped seating rows
    const seatStripMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e38,
      roughness: 0.85,
      metalness: 0.02,
    });
    for (let row = 0; row < 6; row++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(60, 0.1, 0.25),
        seatStripMat,
      );
      step.position.set(0, 2.1 + row * 0.45, side * (55 + 0.5 + row * 1.2));
      scene.add(step);
    }
  });

  // ===================================================================
  // 3. CORNER SECTIONS
  // ===================================================================
  [-1, 1].forEach(sx => {
    [-1, 1].forEach(sz => {
      // Corner filler — connects sideline stands to end stands
      const corner = new THREE.Mesh(
        new THREE.BoxGeometry(24, 4, 14),
        concDark,
      );
      corner.position.set(sx * 34, 2, sz * 53);
      corner.castShadow = true;
      scene.add(corner);

      // Corner upper tier
      const cornerUp = new THREE.Mesh(
        new THREE.BoxGeometry(20, 3, 11),
        concMid,
      );
      cornerUp.position.set(sx * 36, 5.5, sz * 54.5);
      cornerUp.castShadow = true;
      scene.add(cornerUp);
    });
  });

  // ===================================================================
  // 4. PITCH-SIDE BARRIERS & WALKWAYS
  // ===================================================================
  const barrierMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a44,
    roughness: 0.7,
    metalness: 0.15,
  });

  // Sideline barriers (along touchlines)
  [-1, 1].forEach(side => {
    const barrier = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 104),
      barrierMat,
    );
    barrier.position.set(side * (HALF_W + 2), 0.25, 0);
    barrier.castShadow = true;
    scene.add(barrier);
  });

  // Goal-line barriers
  [-1, 1].forEach(side => {
    const barrier = new THREE.Mesh(
      new THREE.BoxGeometry(70, 0.5, 0.5),
      barrierMat,
    );
    barrier.position.set(0, 0.25, side * (HALF_L + 2));
    scene.add(barrier);
  });

  // Access walkway between barrier and stands (sideline)
  const walkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a40,
    roughness: 0.9,
    metalness: 0.02,
  });
  [-1, 1].forEach(side => {
    const walk = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.15, 100),
      walkMat,
    );
    walk.position.set(side * (HALF_W + 4.25), 0.07, 0);
    scene.add(walk);
  });

  // ===================================================================
  // 5. ENTRANCE TUNNEL (near halfway line on north end)
  // ===================================================================
  const tunnelMat = new THREE.MeshStandardMaterial({
    color: 0x080816,
    roughness: 0.9,
    metalness: 0.02,
  });
  const tunnelBorder = new THREE.MeshStandardMaterial({
    color: 0x2a2a46,
    roughness: 0.5,
    metalness: 0.4,
  });

  // Tunnel passage through the north end stand
  const tunnel = new THREE.Mesh(
    new THREE.BoxGeometry(5, 3.5, 10),
    tunnelMat,
  );
  tunnel.position.set(0, 1.75, -(HALF_L + 54));
  scene.add(tunnel);

  // Tunnel arch frame (front face)
  const archFrame = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.15, 8, 14, Math.PI),
    tunnelBorder,
  );
  archFrame.position.set(0, 3.5, -(HALF_L + 49));
  archFrame.rotation.x = Math.PI / 2;
  scene.add(archFrame);

  // Vertical arch pillars
  [-1, 1].forEach(side => {
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.5, 0.25),
      tunnelBorder,
    );
    pillar.position.set(side * 2.5, 1.75, -(HALF_L + 49));
    scene.add(pillar);
  });

  // Tunnel ceiling light strip
  const tunnelGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 0.5),
    new THREE.MeshBasicMaterial({
      color: 0xffeecc,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    }),
  );
  tunnelGlow.position.set(0, 3.3, -(HALF_L + 50));
  scene.add(tunnelGlow);

  // Entrance opening (dark void behind the arch)
  const voidMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  const entrance = new THREE.Mesh(
    new THREE.PlaneGeometry(4.5, 3),
    voidMat,
  );
  entrance.position.set(0, 1.5, -(HALF_L + 48.5));
  scene.add(entrance);

  // Tunnel side walls (extending from stand into stadium)
  [-1, 1].forEach(side => {
    const sideWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 3, 8),
      concMid,
    );
    sideWall.position.set(side * 3, 1.5, -(HALF_L + 46));
    scene.add(sideWall);
  });

  // ===================================================================
  // 6. HOME & AWAY DUGOUTS
  // ===================================================================
  [-1, 1].forEach(side => {
    // Dugout base platform
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.3, 2.5),
      concDark,
    );
    base.position.set(side * (HALF_W + 3.2), 0.15, -6.5);
    base.receiveShadow = true;
    scene.add(base);

    // Bench (long seat)
    const benchMat = _mat(0x333358, 0.6, 0.05);
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.15, 0.5),
      benchMat,
    );
    bench.position.set(side * (HALF_W + 3.2), 0.65, -6.5);
    scene.add(bench);

    // Bench legs
    [-2.5, 0, 2.5].forEach(xOff => {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6),
        steelMat,
      );
      leg.position.set(side * (HALF_W + 3.2) + xOff, 0.35, -6.5);
      scene.add(leg);
    });

    // Transparent dugout roof (glass shelter)
    const roofGlass = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 0.05, 3),
      glassMat,
    );
    roofGlass.position.set(side * (HALF_W + 3.2), 2, -6.5);
    scene.add(roofGlass);

    // Dugout roof support frame
    for (let zOff = -1.2; zOff <= 1.2; zOff += 2.4) {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(7.5, 0.08, 0.08),
        steelMat,
      );
      frame.position.set(side * (HALF_W + 3.2), 2, -6.5 + zOff);
      scene.add(frame);
    }
    for (let xOff = -3.2; xOff <= 3.2; xOff += 6.4) {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 3),
        steelMat,
      );
      frame.position.set(side * (HALF_W + 3.2) + xOff, 2, -6.5);
      scene.add(frame);
    }

    // Support posts for dugout roof
    [-2.5, 2.5].forEach(xOff => {
      [-1, 1].forEach(zOff => {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.06, 1.7, 6),
          steelMat,
        );
        post.position.set(
          side * (HALF_W + 3.2) + xOff,
          1.05,
          -6.5 + zOff * 1.2,
        );
        scene.add(post);
      });
    });
  });

  // ===================================================================
  // 7. SAFETY RAILINGS (upper tier edges)
  // ===================================================================
  const railingMat = new THREE.MeshStandardMaterial({
    color: 0x44445a,
    roughness: 0.4,
    metalness: 0.5,
  });

  // Sideline upper tier railings
  [-1, 1].forEach(side => {
    // Horizontal railing bar
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 80),
      railingMat,
    );
    rail.position.set(side * 38, 9.6, 0);
    scene.add(rail);

    // Vertical posts
    for (let z = -38; z <= 38; z += 4) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4),
        railingMat,
      );
      post.position.set(side * 38, 9.3, z);
      scene.add(post);
    }
  });

  // End stand railings
  [-1, 1].forEach(side => {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 58),
      railingMat,
    );
    rail.rotation.x = Math.PI / 2;
    rail.position.set(0, 5.3, side * 56);
    scene.add(rail);

    for (let x = -28; x <= 28; x += 4) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4),
        railingMat,
      );
      post.position.set(x, 5.0, side * 56);
      scene.add(post);
    }
  });
}

// ===================================================================
// BUILD CROWD — instanced, lightweight, full-stadium
// ===================================================================
function _buildCrowd(scene, homeTeam, awayTeam) {
  const homeColors = _getTeamColors(homeTeam);
  const awayColors = _getTeamColors(awayTeam);

  // Colour palette — realistic match-day clothing
  const palette = [
    homeColors.crowd, awayColors.crowd,
    0xffffff, 0xe0e0e0, 0xcccccc,
    0x888888, 0x666666, 0x444444,
    0x222222, 0x111111,
    0x1a1a2e, 0x16213e, 0x0f3460,
    0x2d1b4e, 0x333355,
    0x8b1a1a, 0xcc3333, 0xcc6633,
    0xccaa33, 0x226622, 0x1a4a6a,
  ];

  // Shared low-poly spectator geometry
  const bodyGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.5, 4);
  bodyGeo.translate(0, 0.25, 0);
  const headGeo = new THREE.SphereGeometry(0.12, 4, 4);
  headGeo.translate(0, 0.65, 0);

  // Body material — color comes from instanceColor
  const bodyMat = new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0,
  });
  // Head material — single skin tone
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xd4b896,
    roughness: 0.85,
    metalness: 0,
  });

  // Collect all spectator positions with section for facing direction.
  // All Y positions are within the tier box bounds so spectators never float,
  // clip through structures, or have heads above the roof (y=12 max).
  const seats = [];
  const SP = 0.4; // base seat spacing (tight for packed stadium look)

  // ---- Sideline grandstands (East & West) ----
  // Lower tier:  Box(16, 4, 98)  at (±41, 2, 0)  → top y=4,  x=[±33,±49], z=[-49,49]
  // Middle tier: Box(13, 3.5, 90) at (±43.5, 5.75, 0) → top y=7.5, x=[±37,±50], z=[-45,45]
  // Upper tier:  Box(10, 3.5, 82) at (±46, 9.25, 0) → top y=11,  x=[±41,±51], z=[-41,41]
  [-1, 1].forEach(side => {
    const rowDefs = [
      { rows: 5, xS: 34, xSt: 2,   yS: 2.5, ySt: 0.35, zW: 94, tag: 'sideline' },
      { rows: 4, xS: 38, xSt: 2.5, yS: 6.0, ySt: 0.5, zW: 86, tag: 'sideline' },
      { rows: 3, xS: 42, xSt: 2.5, yS: 9.5, ySt: 0.5, zW: 78, tag: 'sideline' },
    ];
    rowDefs.forEach(def => {
      for (let row = 0; row < def.rows; row++) {
        const y = def.yS + row * def.ySt;
        const x = side * (def.xS + row * def.xSt);
        for (let z = -def.zW / 2; z <= def.zW / 2; z += SP) {
          seats.push({ x, y, z, sec: def.tag });
        }
      }
    });
  });



  const count = seats.length;

  // Create instanced meshes
  const bodyMesh = new THREE.InstancedMesh(bodyGeo, bodyMat, count);
  const headMesh = new THREE.InstancedMesh(headGeo, headMat, count);
  bodyMesh.castShadow = true;
  headMesh.castShadow = true;

  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  let idx = 0;

  // Skip ~7 % for empty-seat variation
  const skipEvery = 14;

  seats.forEach(s => {
    if (idx > 0 && idx % skipEvery === 0) {
      idx++;
      return;
    }

    // Jitter for natural look
    const jx = (Math.random() - 0.5) * 0.12;
    const jz = (Math.random() - 0.5) * 0.12;
    const jy = (Math.random() - 0.5) * 0.08;
    const heightScale = 0.75 + Math.random() * 0.4;

    // Face toward pitch
    let facing;
    if (s.sec === 'sideline') {
      facing = s.x > 0 ? Math.PI : 0;
    } else if (s.sec === 'end') {
      facing = s.z > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      facing = Math.atan2(-s.z, -s.x);
    }

    // Body
    dummy.position.set(s.x + jx, s.y + jy, s.z + jz);
    dummy.scale.set(1, heightScale, 1);
    dummy.rotation.y = facing + (Math.random() - 0.5) * 0.3;
    dummy.updateMatrix();
    bodyMesh.setMatrixAt(idx, dummy.matrix);

    // Head (same base position, slightly higher)
    dummy.position.y += 0.3;
    dummy.updateMatrix();
    headMesh.setMatrixAt(idx, dummy.matrix);

    // Random colour from palette
    const c = palette[Math.floor(Math.random() * palette.length)];
    col.setHex(c);
    bodyMesh.setColorAt(idx, col);

    idx++;
  });

  bodyMesh.count = idx;
  headMesh.count = idx;
  bodyMesh.instanceMatrix.needsUpdate = true;
  if (bodyMesh.instanceColor) bodyMesh.instanceColor.needsUpdate = true;
  headMesh.instanceMatrix.needsUpdate = true;

  const group = new THREE.Group();
  group.add(bodyMesh);
  group.add(headMesh);
  return group;
}

// ===================================================================
// BUILD FLOODLIGHTS
// ===================================================================
function _buildFloodlights(scene) {
  const towers = [];
  // Option A: 4 primary corner towers — one beyond each corner, illuminating diagonally
  const towerPositions = [
    [-HALF_W - 10, -HALF_L - 10],
    [+HALF_W + 10, -HALF_L - 10],
    [-HALF_W - 10, +HALF_L + 10],
    [+HALF_W + 10, +HALF_L + 10],
  ];

  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a50,
    roughness: 0.6,
    metalness: 0.3,
  });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    emissive: 0xfff4d6,
    emissiveIntensity: 0.3,
    roughness: 0.3,
    metalness: 0.4,
  });

  towerPositions.forEach(([x, z]) => {
    // Tapered main pole (base section) — 40 m total height
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.7, 12, 8),
      towerMat,
    );
    base.position.set(x, 6, z);
    base.castShadow = true;
    scene.add(base);

    // Upper pole (narrower)
    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.4, 28, 8),
      towerMat,
    );
    upper.position.set(x, 26, z);
    upper.castShadow = true;
    scene.add(upper);

    // Cross arm array — longer to carry more floodlights
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.12, 0.15),
      towerMat,
    );
    arm.position.set(x, 38.5, z);
    scene.add(arm);

    // 7 light fixtures per tower, spaced evenly, all pointing at pitch centre
    [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].forEach(offset => {
      const housing = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.18, 0.45),
        headMat,
      );
      housing.position.set(x + offset, 38.9, z);
      scene.add(housing);
    });

    // Subtle glow sprite (smaller, lower opacity)
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 244, 214, 0.3)');
    grad.addColorStop(0.3, 'rgba(255, 244, 214, 0.08)');
    grad.addColorStop(1, 'rgba(255, 244, 214, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowSpr = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glowSpr.scale.set(10, 10, 1);
    glowSpr.position.set(x, 39, z);
    scene.add(glowSpr);

    towers.push({ base, upper, arm, x, z });
  });

  return towers;
}

// ===================================================================
// BUILD PLAYER FIGURE
// ===================================================================
function _buildPlayerFigure(p, scenario) {
  const isAway = p.team === 'away';
  const isGK = p.pos === 'GK';

  const homeTeamName = scenario?.home_team || '';
  const awayTeamName = scenario?.away_team || '';
  const homeColors = _getTeamColors(homeTeamName);
  const awayColors = _getTeamColors(awayTeamName);

  const shirtColor = isAway ? awayColors.shirt : homeColors.shirt;
  const shortsColor = isAway ? awayColors.shorts : homeColors.shorts;
  const socksColor = isAway ? awayColors.socks : homeColors.socks;
  const gkColor = isAway ? awayColors.gk : homeColors.gk;

  const mainColor = isGK ? gkColor : shirtColor;

  const group = new THREE.Group();
  const H = PLAYER_HEIGHT;

  const skinMat = _mat(0xf0d5b8, 0.4, 0.02);

  // --- Ground shadow ---
  const shadow = new THREE.Mesh(
    _sharedGeo('shadow', () => new THREE.CircleGeometry(1.0, 16)),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  group.add(shadow);

  // --- Boots ---
  const bootMat = _mat(0x111111, 0.5, 0.1);
  [-0.1, 0.1].forEach(offset => {
    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.08, 0.22),
      bootMat,
    );
    boot.position.set(offset, 0.04, 0.04);
    boot.castShadow = true;
    group.add(boot);
  });

  // --- Lower legs (socks) ---
  const legMat = _mat(socksColor, 0.55, 0.05);
  const lowerLegH = 0.45;
  [-0.09, 0.09].forEach(offset => {
    const leg = new THREE.Mesh(
      _sharedGeo('lowerLeg', () => new THREE.CylinderGeometry(0.07, 0.06, lowerLegH, 8)),
      legMat,
    );
    leg.position.set(offset, 0.08 + lowerLegH / 2, 0);
    leg.castShadow = true;
    group.add(leg);
  });

  // --- Upper legs (thighs) ---
  const thighMat = _mat(shortsColor, 0.5, 0.05);
  const thighH = 0.35;
  [-0.09, 0.09].forEach(offset => {
    const thigh = new THREE.Mesh(
      _sharedGeo('thigh', () => new THREE.CylinderGeometry(0.09, 0.08, thighH, 8)),
      thighMat,
    );
    thigh.position.set(offset, 0.08 + lowerLegH + thighH / 2, 0);
    thigh.castShadow = true;
    group.add(thigh);
  });

  // --- Shorts ---
  const shortsH = 0.22;
  const shorts = new THREE.Mesh(
    _sharedGeo('shorts', () => new THREE.CylinderGeometry(0.24, 0.2, shortsH, 10)),
    _mat(shortsColor, 0.4, 0.05),
  );
  shorts.position.y = 0.08 + lowerLegH + thighH + shortsH / 2;
  shorts.castShadow = true;
  group.add(shorts);

  // --- Torso (shirt) ---
  const torsoH = 0.62;
  const torso = new THREE.Mesh(
    _sharedGeo('torso', () => new THREE.CylinderGeometry(0.32, 0.24, torsoH, 10)),
    _mat(mainColor, 0.35, 0.05),
  );
  torso.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH / 2;
  torso.castShadow = true;
  group.add(torso);

  // --- Short sleeves ---
  const sleeveH = 0.1;
  [-0.33, 0.33].forEach(offset => {
    const sleeve = new THREE.Mesh(
      _sharedGeo('sleeve', () => new THREE.CylinderGeometry(0.08, 0.06, sleeveH, 8)),
      _mat(mainColor, 0.35, 0.05),
    );
    sleeve.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH - sleeveH / 2 - 0.04, 0);
    sleeve.rotation.z = offset < 0 ? 0.25 : -0.25;
    sleeve.castShadow = true;
    group.add(sleeve);
  });

  // --- Arms (skin) ---
  const armH = 0.26;
  [-0.33, 0.33].forEach(offset => {
    const arm = new THREE.Mesh(
      _sharedGeo('arm', () => new THREE.CylinderGeometry(0.04, 0.05, armH, 6)),
      skinMat,
    );
    const armY = 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55;
    arm.position.set(offset, armY, 0);
    arm.castShadow = true;
    group.add(arm);
  });

  // --- Hands (skin) or GK gloves ---
  if (isGK) {
    const gloveMat = _mat(gkColor, 0.4, 0.05);
    [-0.33, 0.33].forEach(offset => {
      const glove = new THREE.Mesh(
        _sharedGeo('glove', () => new THREE.SphereGeometry(0.075, 6, 6)),
        gloveMat,
      );
      glove.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55 - armH, 0.04);
      group.add(glove);
    });
  } else {
    [-0.33, 0.33].forEach(offset => {
      const hand = new THREE.Mesh(
        _sharedGeo('hand', () => new THREE.SphereGeometry(0.045, 6, 6)),
        skinMat,
      );
      hand.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55 - armH, 0.04);
      group.add(hand);
    });
  }

  // --- Neck ---
  const neck = new THREE.Mesh(
    _sharedGeo('neck', () => new THREE.CylinderGeometry(0.08, 0.1, 0.06, 8)),
    skinMat,
  );
  neck.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.03;
  group.add(neck);

  // --- Head ---
  const headMat = _mat(0xf0d5b8, 0.4, 0.02);
  const headR = isGK ? 0.19 : 0.17;
  const head = new THREE.Mesh(
    _sharedGeo('head', () => new THREE.SphereGeometry(headR, 10, 10)),
    headMat,
  );
  head.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.06 + headR;
  head.castShadow = true;
  group.add(head);

  // --- Hair ---
  const hairMat = _mat(0x2d1a0e, 0.7, 0.02);
  const hair = new THREE.Mesh(
    _sharedGeo('hair', () => new THREE.SphereGeometry(headR * 1.05, 8, 6)),
    hairMat,
  );
  hair.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.06 + headR * 1.15;
  hair.scale.set(1, 0.5, 1);
  group.add(hair);

  // --- Kit number sprite ---
  const numberSprite = _createShirtNumber(p.number, '#ffffff');
  numberSprite.position.set(0, H + 0.15, 0);
  numberSprite.scale.set(0.6, 0.6, 1);
  group.add(numberSprite);

  // --- Fatigue ring ---
  const fatigueRing = new THREE.Mesh(
    new THREE.RingGeometry(0.6, 0.75, 20),
    new THREE.MeshBasicMaterial({
      color: _fatigueHex(p.fatigue),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  fatigueRing.rotation.x = -Math.PI / 2;
  fatigueRing.position.y = 0.03;
  group.add(fatigueRing);

  // --- Glow ring (hover) ---
  const glow = new THREE.Mesh(
    new THREE.RingGeometry(0.7, 0.85, 20),
    new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.035;
  group.add(glow);

  // --- Hit mesh (raycaster) ---
  const hitMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, H, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  hitMesh.position.y = H / 2;
  hitMesh.userData = p;
  group.add(hitMesh);

  // Store animation data
  group.userData = {
    phase: Math.random() * Math.PI * 2,
    armPhase: Math.random() * Math.PI * 2,
    facing: isAway ? 0 : Math.PI,
  };

  // Face toward opponent goal
  group.rotation.y = isAway ? 0 : Math.PI;

  return { group, hitMesh, glow, data: p };
}

function _createShirtNumber(number, color = '#ffffff') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  // Dark circle background
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fill();

  ctx.font = '800 72px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 6;
  ctx.fillStyle = color;
  ctx.fillText(String(number), size / 2, size / 2 + 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(mat);
  return sprite;
}

// ===================================================================
// BUILD BALL
// ===================================================================
function _buildBallMesh() {
  const group = new THREE.Group();

  // Ball canvas texture with pentagon blotches
  const ballCanvas = document.createElement('canvas');
  ballCanvas.width = 256;
  ballCanvas.height = 256;
  const bctx = ballCanvas.getContext('2d');

  // off-white base
  bctx.fillStyle = '#f0ece4';
  bctx.fillRect(0, 0, 256, 256);

  // scatter pentagon-shaped blotches
  const pentagonPts = 5;
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 256;
    const cy = Math.random() * 256;
    const r = 10 + Math.random() * 16;
    const rot = Math.random() * Math.PI * 2;
    bctx.beginPath();
    for (let j = 0; j < pentagonPts; j++) {
      const a = rot + (j / pentagonPts) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      j === 0 ? bctx.moveTo(px, py) : bctx.lineTo(px, py);
    }
    bctx.closePath();
    bctx.fillStyle = `rgba(40,40,45,${0.35 + Math.random() * 0.3})`;
    bctx.fill();
  }

  // subtle seam lines
  bctx.strokeStyle = 'rgba(0,0,0,0.08)';
  bctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    bctx.beginPath();
    bctx.arc(128, 128, 40 + Math.random() * 60, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
    bctx.stroke();
  }

  const ballTex = new THREE.CanvasTexture(ballCanvas);
  ballTex.anisotropy = 2;

  const ballMat = new THREE.MeshStandardMaterial({
    map: ballTex,
    color: 0xffffff,
    roughness: 0.45,
    metalness: 0.02,
  });
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 20),
    ballMat,
  );
  ball.castShadow = true;
  ball.receiveShadow = true;
  group.add(ball);

  // Ball glow
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05,
  });
  const glowMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 12, 12),
    glowMat,
  );
  group.add(glowMesh);

  return { group, ball, glowMesh };
}

// ===================================================================
// PITCH3D CLASS
// ===================================================================
class Pitch3D {
  constructor(containerId, scenario) {
    if (typeof THREE === 'undefined')
      throw new Error('Three.js is required for Pitch3D');
    this.container = document.getElementById(containerId);
    if (!this.container)
      throw new Error(`Pitch container "${containerId}" not found`);

    this.scenario = scenario || null;
    this.players = [];
    this._ballData = null;
    this._crowdGroup = null;
    this._flagData = [];
    this._adBoards = [];
    this._floodlightTowers = [];
    this._highlightLines = [];
    this._arrowMeshes = [];
    this._labels = [];
    this._passingLines = [];
    this.onPlayerClick = null;
    this.onPlayerHover = null;
    this.onPlayerLeave = null;
    this._cameraMode = 'broadcast';
    this._previewTargets = null;
    this._previewT = 0;
    this._compactness = 0.5;
    this._running = true;
    this._targetCamPos = null;
    this._targetCamTarget = null;
    this._camAnimating = false;
    this._camAnimStart = 0;
    this._camAnimDur = 800;
    this._startCamPos = null;
    this._startCamTarget = null;
    this._animTime = 0;
    this._currentOverlay = 'shape';
    this._highlightCircles = [];
    this._passingGraphDirty = true;
    this._pressingMeshes = [];
    this._pressingCircleGeo = null;
    this._pressingGradientTexture = null;
    this._passingGraphCache = null;
    this._lastPassingPositions = null;
    this._replaying = false;
    this._replayCreatedPlayers = [];
    this._replayLabel = null;

    this._setupScene();
    this._setupLights();
    _buildPitch(this.scene, scenario);
    _buildGoals(this.scene);
    this._flagData = _buildCornerFlags(this.scene);
    this._adBoards = _buildAdvertisingBoards(this.scene, scenario?.id || '');
    _buildStadium(this.scene);
    this._floodlightTowers = _buildFloodlights(this.scene);

    if (scenario) {
      const homeTeam = scenario.home_team || '';
      const awayTeam = scenario.away_team || '';
      this._crowdGroup = _buildCrowd(this.scene, homeTeam, awayTeam);
      this.scene.add(this._crowdGroup);
    }

    this._animate();

    if (scenario) {
      this.setMatchContext(scenario);
    }

    window.addEventListener('resize', () => this._onResize());
  }

  // ===== SCENE SETUP =====
  _setupScene() {
    const W = this.container.clientWidth;
    const H = this.container.clientHeight || Math.round(W * 0.55) || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060D0A);
    this.scene.fog = new THREE.FogExp2(0x060D0A, 0.003);

    this.camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 400);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.85;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.target.set(0, 0, 0);
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 130;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this._setCameraBroadcast();
    this.controls.update();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const el = this.renderer.domElement;
    el.addEventListener('click', (e) => this._onClick(e));
    el.addEventListener('mousemove', (e) => this._onMouseMove(e));
    el.addEventListener('mouseleave', () => this._setHover(null));
  }

  _setupLights() {
    // Low ambient for night atmosphere
    this.scene.add(new THREE.AmbientLight(0x223355, 0.12));

    // Main key flood (warm, casts shadows for entire scene)
    const key = new THREE.DirectionalLight(0xfff4d6, 1.6);
    key.position.set(20, 55, 15);
    key.castShadow = true;
    key.shadow.mapSize.set(4096, 4096);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 150;
    key.shadow.camera.left = -80;
    key.shadow.camera.right = 80;
    key.shadow.camera.top = 80;
    key.shadow.camera.bottom = -80;
    key.shadow.bias = -0.0003;
    key.shadow.normalBias = 0.03;
    key.shadow.radius = 4;
    this.scene.add(key);

    // Secondary flood fill (warm, opposite side — no shadows)
    const key2 = new THREE.DirectionalLight(0xffeecc, 0.7);
    key2.position.set(-20, 50, -15);
    this.scene.add(key2);

    // Back rim (cool, separates players from background)
    const rim = new THREE.DirectionalLight(0x8899cc, 0.3);
    rim.position.set(0, 25, -60);
    this.scene.add(rim);

    // Stadium ground ambient glow
    const amb2 = new THREE.HemisphereLight(0x223366, 0x112211, 0.2);
    this.scene.add(amb2);
  }

  // ===== CAMERA SYSTEM =====
  setDisplayMode(mode, instant = false) {
    // map UI display-mode values to camera-mode values
    const cm = { broadcast: 'broadcast', tactical: 'tactical', free: 'free' };
    this.setCameraMode(cm[mode] || mode, instant);
  }

  setCameraMode(mode, instant = false) {
    this._cameraMode = mode;
    const dur = instant ? 0 : 800;
    if (mode === 'broadcast') this._animateCameraTo(35, 32, 38, 0, 0, 0, dur);
    else if (mode === 'tactical') this._animateCameraTo(0, 72, 0.1, 0, 0, 0, dur);
    else if (mode === 'free') this._animateCameraTo(50, 18, 50, 0, 0, 0, dur);
  }

  _setCameraBroadcast() {
    this.camera.position.set(35, 32, 38);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  _animateCameraTo(px, py, pz, tx, ty, tz, dur = 800) {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const endPos = new THREE.Vector3(px, py, pz);
    const endTarget = new THREE.Vector3(tx, ty, tz);

    if (dur === 0) {
      this.camera.position.copy(endPos);
      this.controls.target.copy(endTarget);
      this.camera.lookAt(endTarget);
      this.controls.update();
      return;
    }

    this._camAnimating = true;
    this._camAnimStart = performance.now();
    this._camAnimDur = dur;
    this._startCamPos = startPos;
    this._startCamTarget = startTarget;
    this._targetCamPos = endPos;
    this._targetCamTarget = endTarget;
  }

  // ===== DATA-DRIVEN SCENE =====
  setMatchContext(scenario) {
    if (!scenario) return;
    this.scenario = scenario;
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const diff = Math.abs(hScore - aScore);
    const half = getMatchMinute ? getMatchMinute(scenario) : 67;
    this._compactness = Math.max(0.2, Math.min(0.8, 0.5 - diff * 0.08 + (half > 80 ? 0.1 : 0)));

    this._buildBall(scenario);
    this._setHighlight(scenario);
    this._buildAttackDirection(scenario);
    this._buildFormationLabels(scenario);
  }

  // ===== FORMATION LABELS =====
  _buildFormationLabels(scenario) {
    this._clearLabels();
    if (!scenario) return;
    const home = scenario.home_team || '';
    const away = scenario.away_team || '';
    const hFmt = scenario.home_formation || '';
    const aFmt = scenario.away_formation || '';
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;

    this._add3DLabel(`${home} ${hFmt}`, -30, 0.5, -58, 0x75aadb, 'left');
    this._add3DLabel(`${hScore}`, -34, 0.5, -55.5, 0xffffff, 'left', 1.0);
    this._add3DLabel(`${away} ${aFmt}`, 30, 0.5, -58, 0xed1c24, 'right');
    this._add3DLabel(`${aScore}`, 34, 0.5, -55.5, 0xffffff, 'right', 1.0);

    // Minute label
    const minute = getMatchMinute ? getMatchMinute(scenario) : 67;
    this._add3DLabel(`${minute}'`, 0, 0.5, -58, 0x00b4ff, 'center', 0.7);
  }

  _add3DLabel(text, x, y, z, color, align = 'center', scale = 0.6) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = '700 52px Arial, sans-serif';
    ctx.textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 16;
    const c = new THREE.Color(color);
    ctx.fillStyle = `rgb(${c.r*255|0},${c.g*255|0},${c.b*255|0})`;
    const tx = align === 'left' ? 10 : align === 'right' ? 502 : 256;
    ctx.fillText(text, tx, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const sprite = new THREE.Sprite(mat);
    const aspect = text.length * 0.12;
    sprite.scale.set(aspect * scale, scale, 1);
    sprite.position.set(x, y, z);
    this.scene.add(sprite);
    this._labels.push(sprite);
  }

  _clearLabels() {
    this._labels.forEach(l => {
      this.scene.remove(l);
      if (l.material.map) l.material.map.dispose();
      l.material.dispose();
    });
    this._labels = [];
  }

  // ===== BALL =====
  _buildBall(scenario) {
    if (this._ballData) {
      this.scene.remove(this._ballData.group);
      this._ballData = null;
    }

    const events = scenario.replay_events || [];
    if (!events.length) return;

    const last = events[events.length - 1];
    let bx = 0.5;
    if (last.description) {
      const desc = last.description.toLowerCase();
      const home = (scenario.home_team || '').toLowerCase();
      if (desc.includes(home) || desc.includes('for')) bx = 0.65;
      else bx = 0.35;

      if (last.type === 'goal' || last.type === 'shot') bx = 0.75;
      if (last.type === 'substitution' || last.type === 'yellow_card') bx = 0.5;
    }

    const bz = 0.5;
    const w = { x: (bx - 0.5) * 68, z: (0.5 - bz) * 105 };

    const ballGroup = _buildBallMesh();
    ballGroup.group.position.set(w.x, 0.22, w.z);
    this.scene.add(ballGroup.group);

    // Ball shadow on ground
    const ballShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.15, 12),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.12,
      }),
    );
    ballShadow.rotation.x = -Math.PI / 2;
    ballShadow.position.set(w.x, 0.015, w.z);
    this.scene.add(ballShadow);

    this._ballData = ballGroup;
    this._ballData.shadow = ballShadow;
    this._ballData.restPos = { x: w.x, z: w.z };
  }

  // ===== TACTICAL HIGHLIGHTS =====
  _setHighlight(scenario) {
    this._clearHighlights();
    if (!scenario) return;

    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const trailing = hScore < aScore;
    const color = trailing ? 0x8bf55a : 0x3b82f6;

    const attMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const zone = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 35),
      attMat,
    );
    zone.rotation.x = -Math.PI / 2;
    zone.position.set(0, 0.02, trailing ? 35 : -35);
    this.scene.add(zone);
    this._highlightLines.push(zone);

    // Half-space indicators
    const hsMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const sign = trailing ? 1 : -1;
    [-1, 1].forEach(side => {
      const hs = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 18),
        hsMat.clone(),
      );
      hs.rotation.x = -Math.PI / 2;
      hs.position.set(side * 16, 0.025, sign * 20);
      this.scene.add(hs);
      this._highlightLines.push(hs);
    });
  }

  _clearHighlights() {
    this._highlightLines.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._highlightLines = [];
  }

  _clearPassingLines() {
    this._passingLines.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._passingLines = [];
  }

  // ===== OVERLAY SYSTEM =====
  setOverlay(mode) {
    this._currentOverlay = mode;
    this._clearPassingLines();
    this._clearHighlightCircles();
    this._clearPressingOverlay();

    if (mode === 'pressing') {
      this._updatePressingOverlay();
    } else if (mode === 'attack') {
      this._drawAttackOverlay();
    } else if (mode === 'passing') {
      this._passingGraphDirty = true;
      this._drawPassingOverlay();
    } else if (mode === 'defensive') {
      this._drawDefensiveOverlay();
    }
  }

  markPassingDirty() {
    this._passingGraphDirty = true;
  }

  _clearPressingOverlay() {
    this._pressingMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.material) m.material.dispose();
    });
    this._pressingMeshes = [];
    if (this._pressingCircleGeo) {
      this._pressingCircleGeo.dispose();
      this._pressingCircleGeo = null;
    }
    if (this._pressingGradientTexture) {
      this._pressingGradientTexture.dispose();
      this._pressingGradientTexture = null;
    }
  }

  _createPressingGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    this._pressingGradientTexture = new THREE.CanvasTexture(canvas);
    return this._pressingGradientTexture;
  }

  _computePressingState3D() {
    const ballPos = this._ballData?.group.position;
    if (!ballPos || this.players.length < 4) return null;

    let carrier = null;
    let minDist = Infinity;
    this.players.forEach(p => {
      if (p.data.pos === 'GK') return;
      const d = Math.sqrt(
        (p.group.position.x - ballPos.x) ** 2 +
        (p.group.position.z - ballPos.z) ** 2,
      );
      if (d < minDist) { minDist = d; carrier = p; }
    });
    if (!carrier || minDist > PITCH_W * 0.15) return null;

    const pressingTeam = carrier.data.team === 'home' ? 'away' : 'home';
    const carrierPos = { x: carrier.group.position.x, z: carrier.group.position.z };
    const maxDist = PITCH_W * 0.3;

    const pressers = this.players
      .filter(p => p.data.team === pressingTeam && p.data.pos !== 'GK')
      .map(p => {
        const dx = carrierPos.x - p.group.position.x;
        const dz = carrierPos.z - p.group.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const pressure = Math.max(0, 100 - (dist / maxDist) * 100);
        return { player: p, pressure, isActive: pressure > 15, dist };
      });

    return { pressers, carrier, carrierPos };
  }

  _updatePressingOverlay() {
    const state = this._computePressingState3D();
    if (!state) {
      this._pressingMeshes.forEach(m => { m.visible = false; });
      return;
    }

    const active = state.pressers.filter(p => p.isActive);

    // Grow mesh pool as needed
    while (this._pressingMeshes.length < active.length) {
      const geo = this._pressingCircleGeo || (this._pressingCircleGeo = new THREE.CircleGeometry(1, 32));
      const tex = this._pressingGradientTexture || this._createPressingGradientTexture();
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = 1;
      this.scene.add(mesh);
      this._pressingMeshes.push(mesh);
    }

    active.forEach((p, i) => {
      const mesh = this._pressingMeshes[i];
      mesh.visible = true;
      const pos = p.player.group.position;
      const r = 1.0 + (p.pressure / 100) * 2.5;
      mesh.position.set(pos.x, 0.03, pos.z);
      mesh.scale.set(r, r, 1);

      const int = p.pressure / 100;
      let hex;
      if (int > 0.85) hex = 0xf87171;
      else if (int > 0.70) hex = 0xfb923c;
      else if (int > 0.40) hex = 0xfde047;
      else hex = 0x93c5fd;

      mesh.material.color.setHex(hex);
      mesh.material.opacity = 0.20 + int * 0.15;
    });

    for (let i = active.length; i < this._pressingMeshes.length; i++) {
      this._pressingMeshes[i].visible = false;
    }
  }

  _drawAttackOverlay() {
    const thirdMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });

    const thirdW = HALF_W * 2 / 3;
    const fieldThirds = [
      { x: -HALF_W / 3 - thirdW / 2, w: thirdW },
      { x: 0, w: thirdW },
      { x: HALF_W / 3 + thirdW / 2, w: thirdW },
    ];

    let totalPlayers = 0;
    const zoneCount = [0, 0, 0];
    this.players.forEach(p => {
      const px = p.group.position.x;
      if (px < -HALF_W / 3) zoneCount[0]++;
      else if (px > HALF_W / 3) zoneCount[2]++;
      else zoneCount[1]++;
      totalPlayers++;
    });

    const maxZone = Math.max(1, ...zoneCount);
    fieldThirds.forEach((z, i) => {
      const intensity = 0.02 + (zoneCount[i] / maxZone) * 0.1;
      const m = thirdMat.clone();
      m.opacity = intensity;
      const zone = new THREE.Mesh(
        new THREE.PlaneGeometry(z.w, 35),
        m,
      );
      zone.rotation.x = -Math.PI / 2;
      zone.position.set(z.x, 0.025, 0);
      this.scene.add(zone);
      this._passingLines.push(zone);
    });
  }

  // ── 3D PASSING LANES ──
  // Computes and renders passing lanes on the 3D pitch.
  // Mirrors the 2D tactical engine (pitch2d.js _computePassingGraph / _evaluatePass)
  // but uses 3D world coordinates from player meshes.
  // The 2D tactical engine remains the single source of truth;
  // this is a parallel evaluation in 3D coordinate space.

  _distToSegment3D(px, pz, ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az;
    const lenSq = dx * dx + dz * dz;
    if (lenSq === 0) return Math.sqrt((px - ax) ** 2 + (pz - az) ** 2);
    let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx, cz = az + t * dz;
    return Math.sqrt((px - cx) ** 2 + (pz - cz) ** 2);
  }

  _evaluatePass3D(passerPos, receiverPos, opponents, isHome) {
    const dx = receiverPos.x - passerPos.x;
    const dz = receiverPos.z - passerPos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const pitchDiag = Math.sqrt(PITCH_W * PITCH_W + PITCH_L * PITCH_L);
    const normDist = dist / pitchDiag;

    const angle = Math.atan2(dz, dx);
    const forwardNorm = (isHome ? dx : -dx) / PITCH_W;
    const forwardScore = Math.max(0, Math.min(1, (forwardNorm + 0.3) / 0.6));

    const interceptR = PITCH_W * 0.045;
    let blocked = false;
    let blockSeverity = 0;
    let defsBetween = 0;

    opponents.forEach(def => {
      const dPos = def.group.position;
      const perpDist = this._distToSegment3D(
        dPos.x, dPos.z,
        passerPos.x, passerPos.z,
        receiverPos.x, receiverPos.z,
      );
      const along = Math.max(0, Math.min(1, (
        (dPos.x - passerPos.x) * dx +
        (dPos.z - passerPos.z) * dz
      ) / (dist * dist || 1)));

      if (perpDist < interceptR && along > 0.05 && along < 0.95) {
        blocked = true;
        blockSeverity += (1 - perpDist / interceptR) * (1 - Math.abs(along - 0.5) * 1.5);
        defsBetween++;
      }
    });

    const nearbyDefs = opponents.filter(def => {
      const dPos = def.group.position;
      return Math.sqrt(
        (dPos.x - receiverPos.x) ** 2 +
        (dPos.z - receiverPos.z) ** 2,
      ) < PITCH_W * 0.12;
    }).length;
    const spaceScore = Math.max(0, 1 - nearbyDefs / 4);

    const obstructionScore = blocked ? Math.max(0, 1 - Math.min(1, blockSeverity)) : 1;
    const distScore = Math.max(0, 1 - normDist / 0.6);
    const rawConfidence = forwardScore * 25 + distScore * 25 + obstructionScore * 30 + spaceScore * 20;
    const confidence = Math.round(Math.max(0, Math.min(100, rawConfidence)));

    let category = 'blocked';
    if (!blocked && confidence >= 60) category = 'safe';
    else if (!blocked && confidence >= 30) category = 'risky';

    return {
      dist, angle, forwardNorm, blocked, confidence, category,
      defsBetween, spaceScore,
      completionPct: blocked
        ? Math.round(15 + confidence * 0.3)
        : Math.round(60 + confidence * 0.35),
      pressure: confidence >= 65 ? 'Low' : confidence >= 40 ? 'Medium' : 'High',
    };
  }

  _computePassingGraph3D() {
    const ballPos = this._ballData?.group.position;
    if (!ballPos || this.players.length < 4) return null;

    // Find ball carrier — nearest outfield player to ball
    let carrier = null;
    let minDist = Infinity;
    this.players.forEach(p => {
      if (p.data.pos === 'GK') return;
      const d = Math.sqrt(
        (p.group.position.x - ballPos.x) ** 2 +
        (p.group.position.z - ballPos.z) ** 2,
      );
      if (d < minDist) { minDist = d; carrier = p; }
    });
    if (!carrier || minDist > PITCH_W * 0.15) return null;

    const isHome = carrier.data.team === 'home';
    const carrierPos = { x: carrier.group.position.x, z: carrier.group.position.z };

    const teammates = this.players.filter(p =>
      p.data.team === carrier.data.team && p !== carrier && p.data.pos !== 'GK',
    );
    const opponents = this.players.filter(p =>
      p.data.team !== carrier.data.team && p.data.pos !== 'GK',
    );

    const maxRange = PITCH_W * 0.55;
    const edges = [];

    teammates.forEach(receiver => {
      const recvPos = { x: receiver.group.position.x, z: receiver.group.position.z };
      const dx = recvPos.x - carrierPos.x;
      const dz = recvPos.z - carrierPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > maxRange || dist < PITCH_W * 0.02) return;

      const result = this._evaluatePass3D(carrierPos, recvPos, opponents, isHome);
      if (result) {
        result.passer = carrier;
        result.receiver = receiver;
        edges.push(result);
      }
    });

    edges.sort((a, b) => b.confidence - a.confidence);
    const blocked = edges.filter(e => e.blocked).slice(0, 2);
    const safeRisky = edges.filter(e => !e.blocked).slice(0, 5);
    const displayEdges = [...safeRisky, ...blocked];

    return { edges: displayEdges, carrier, carrierPos, isHome };
  }

  _renderPassLane(edge) {
    const pPos = edge.passer.group.position;
    const rPos = edge.receiver.group.position;
    const dx = rPos.x - pPos.x;
    const dz = rPos.z - pPos.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.1) return;

    const midX = (pPos.x + rPos.x) / 2;
    const midZ = (pPos.z + rPos.z) / 2;
    const angle = Math.atan2(dx, dz);

    // ── Colour & opacity per category (matches task spec for 3D) ──
    let color, opacity, width;
    switch (edge.category) {
      case 'safe':
        color = 0x4fc3f7;   // Light Blue
        opacity = 0.55;
        width = 0.1;
        break;
      case 'risky':
        color = 0xffc107;   // Amber
        opacity = 0.4;
        width = 0.07;
        break;
      case 'blocked':
        color = 0xef5350;   // Red
        opacity = 0.35;
        width = 0.07;
        break;
    }

    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Ribbon body
    const ribbon = new THREE.Mesh(
      new THREE.PlaneGeometry(width, len),
      mat,
    );
    ribbon.rotation.x = -Math.PI / 2;
    ribbon.rotation.z = angle;
    ribbon.position.set(midX, 0.03, midZ);
    this.scene.add(ribbon);
    this._passingLines.push(ribbon);

    // Arrow head at receiver
    const headSize = 0.5;
    const headShape = new THREE.Shape();
    headShape.moveTo(0, 0);
    headShape.lineTo(-headSize * 0.4, -headSize);
    headShape.lineTo(headSize * 0.4, -headSize);
    headShape.closePath();
    const headMat = mat.clone();
    headMat.opacity = opacity * 0.9;
    const head = new THREE.Mesh(
      new THREE.ShapeGeometry(headShape),
      headMat,
    );
    head.rotation.x = -Math.PI / 2;
    head.position.set(rPos.x, 0.035, rPos.z);
    head.rotation.z = angle;
    this.scene.add(head);
    this._passingLines.push(head);

    // Glow band (wider, low-opacity ribbon beneath)
    const glowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: opacity * 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 3, len),
      glowMat,
    );
    glow.rotation.x = -Math.PI / 2;
    glow.rotation.z = angle;
    glow.position.set(midX, 0.025, midZ);
    this.scene.add(glow);
    this._passingLines.push(glow);
  }

  _passingPositionsChanged() {
    if (!this._lastPassingPositions) return true;
    const ballPos = this._ballData?.group.position;
    if (!ballPos) return false;
    if (Math.abs(ballPos.x - this._lastPassingPositions.ball.x) > 0.01) return true;
    if (Math.abs(ballPos.z - this._lastPassingPositions.ball.z) > 0.01) return true;
    for (const p of this.players) {
      const prev = this._lastPassingPositions.players.get(p);
      if (!prev) return true;
      if (Math.abs(p.group.position.x - prev.x) > 0.01) return true;
      if (Math.abs(p.group.position.z - prev.z) > 0.01) return true;
    }
    return false;
  }

  _snapshotPassingPositions() {
    const map = new Map();
    for (const p of this.players) {
      map.set(p, { x: p.group.position.x, z: p.group.position.z });
    }
    this._lastPassingPositions = {
      ball: {
        x: this._ballData?.group.position.x || 0,
        z: this._ballData?.group.position.z || 0,
      },
      players: map,
    };
  }

  _drawPassingOverlay() {
    this._clearPassingLines();

    if (!this._ballData || this.players.length < 4) return;

    // Recompute graph
    const graph = this._computePassingGraph3D();
    if (!graph || !graph.edges.length) return;

    this._passingGraphCache = graph;
    this._snapshotPassingPositions();
    this._passingGraphDirty = false;

    graph.edges.forEach(edge => this._renderPassLane(edge));
  }

  _drawDefensiveOverlay() {
    const homeDef = this.players.filter(p => {
      if (p.data.team !== 'home') return false;
      const pos = p.data.pos;
      return ['CB','DF','LB','RB','WB','DM','LCB','RCB','LWB','RWB'].includes(pos);
    });

    if (homeDef.length < 2) return;

    const avgX = homeDef.reduce((s, p) => s + p.group.position.x, 0) / homeDef.length;
    const avgZ = homeDef.reduce((s, p) => s + p.group.position.z, 0) / homeDef.length;

    const blockMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });

    const block = new THREE.Mesh(
      new THREE.PlaneGeometry(25, 30),
      blockMat,
    );
    block.rotation.x = -Math.PI / 2;
    block.position.set(avgX, 0.02, avgZ);
    this.scene.add(block);
    this._passingLines.push(block);

    // Outline
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
    });
    const outlineGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(25, 30));
    const outline = new THREE.LineSegments(outlineGeo, outlineMat);
    outline.rotation.x = -Math.PI / 2;
    outline.position.set(avgX, 0.025, avgZ);
    this.scene.add(outline);
    this._passingLines.push(outline);
  }

  _clearHighlightCircles() {
    this._highlightCircles.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._highlightCircles = [];
  }

  // ===== ATTACK DIRECTION =====
  _buildAttackDirection(scenario) {
    this._arrowMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._arrowMeshes = [];

    if (!scenario) return;
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const trailing = hScore < aScore;
    const color = trailing ? 0x8bf55a : 0x3b82f6;

    const arrowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    const dir = trailing ? 1 : -1;
    const shaft = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 20),
      arrowMat.clone(),
    );
    shaft.rotation.x = -Math.PI / 2;
    shaft.position.set(37, 0.03, dir * 5);
    this.scene.add(shaft);
    this._arrowMeshes.push(shaft);

    const headShape = new THREE.Shape();
    headShape.moveTo(0, dir * 4);
    headShape.lineTo(-1.5, dir * 0);
    headShape.lineTo(1.5, dir * 0);
    headShape.closePath();
    const headGeo = new THREE.ShapeGeometry(headShape);
    const head = new THREE.Mesh(headGeo, arrowMat.clone());
    head.rotation.x = -Math.PI / 2;
    head.position.set(37, 0.03, dir * 15);
    this.scene.add(head);
    this._arrowMeshes.push(head);
  }

  // ===== PLAYERS =====
  load(homePlayers, awayPlayers) {
    _clearPlayers(this.scene, this.players);
    const all = [
      ...homePlayers.map((p) => ({ ...p, team: 'home' })),
      ...awayPlayers.map((p) => ({ ...p, team: 'away' })),
    ];
    this.players = all.map((p) => _createPlayer(this.scene, p, this.scenario));
  }

  // ===== TACTICAL OPTION PREVIEW =====
  setPreviewAction(action) {
    if (!action) { this._previewTargets = null; this._previewT = 0; return; }
    const a = action.toLowerCase();
    const players = this.players.filter(p => p.data.team === 'home');
    if (!players.length) return;

    this._previewTargets = players.map(p => {
      let dx = 0, dz = 0;
      if (a.includes('press') || a.includes('high line')) { dz = -8; }
      if (a.includes('drop') || a.includes('deep') || a.includes('defend')) { dz = 8; }
      if (a.includes('striker') || a.includes('forward')) {
        if (p.data.pos !== 'GK' && p.data.pos !== 'DF' && !p.data.pos?.includes('CB') && !p.data.pos?.includes('LB') && !p.data.pos?.includes('RB')) dz = -5;
      }
      if (a.includes('back 3') || a.includes('back five') || a.includes('back 5')) {
        if (p.data.pos?.includes('CB') || p.data.pos === 'DF') dz = 3;
      }
      return { idx: players.indexOf(p), dx, dz };
    });
    this._previewT = 0;
    this._animatePreview();
  }

  clearPreview() {
    this._previewTargets = null;
    this._previewT = 1;
    this._restorePlayerPositions();
  }

  _animatePreview() {
    if (!this._previewTargets || !this._previewTargets.length) return;
    const start = performance.now();
    const dur = 400;
    const step = (now) => {
      this._previewT = Math.min(1, (now - start) / dur);
      const t = _easeInOutCubic(this._previewT);
      this._previewTargets.forEach(pt => {
        const p = this.players[pt.idx];
        if (!p) return;
        const orig = p._origPos || { x: p.group.position.x, z: p.group.position.z };
        if (!p._origPos) p._origPos = { x: orig.x, z: orig.z };
        p.group.position.x = orig.x + pt.dx * t;
        p.group.position.z = orig.z + pt.dz * t;
      });
      if (this._previewT < 1) requestAnimationFrame(step);
      else this._restorePlayerPositions();
    };
    requestAnimationFrame(step);
  }

  _restorePlayerPositions() {
    this.players.forEach(p => {
      if (p._origPos) {
        p.group.position.x = p._origPos.x;
        p.group.position.z = p._origPos.z;
      }
    });
  }

  // ===== HISTORICAL REPLAY SYSTEM =====
  playReplayEvents(events, scenario) {
    if (!events || !events.length || !this._ballData) return;
    const cutOffMinute = typeof getMatchMinute === 'function' ? getMatchMinute(scenario) : 67;
    const filtered = events.filter(e => (e.minute || 0) > cutOffMinute);
    if (!filtered.length) return;
    this._replaying = true;

    const allPlayerData = [
      ...(scenario.home_players || []).map(p => ({ ...p, team: 'home' })),
      ...(scenario.away_players || []).map(p => ({ ...p, team: 'away' })),
    ];

    const finalHome = scenario.scoreline?.home || 0;
    const finalAway = scenario.scoreline?.away || 0;
    let postHome = 0, postAway = 0;
    filtered.forEach(e => {
      if (e.type === 'goal') {
        const t = this._getEventTeam(e.player, allPlayerData);
        if (t === 'home') postHome++; else postAway++;
      }
    });

    this._replayScore = { home: finalHome - postHome, away: finalAway - postAway };
    const homeEl = document.getElementById('home-score');
    const awayEl = document.getElementById('away-score');
    if (homeEl) homeEl.textContent = this._replayScore.home;
    if (awayEl) awayEl.textContent = this._replayScore.away;

    this._replayBallStartPos = {
      x: this._ballData.group.position.x,
      z: this._ballData.group.position.z,
    };

    this._runReplaySequence(filtered, allPlayerData);
  }

  _getEventTeam(playerName, allPlayerData) {
    if (!playerName) return 'home';
    const m = allPlayerData.find(p => p.name === playerName);
    return m ? m.team : 'home';
  }

  _findPlayerMesh(playerName) {
    return this.players.find(p => p.data && p.data.name === playerName) || null;
  }

  _delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async _runReplaySequence(events, allPlayerData) {
    for (const event of events) {
      if (!this._replaying || !this._running) break;
      const team = this._getEventTeam(event.player, allPlayerData);
      switch (event.type) {
        case 'goal':
          await this._animateReplayGoal(event, team);
          break;
        case 'substitution':
          await this._animateReplaySub(event, team);
          break;
        case 'yellow_card':
          await this._animateReplayYellow(event, team);
          break;
        default:
          await this._delay(600);
          continue;
      }
      await this._delay(900);
    }
    this._showReplayComplete();
  }

  async _animateReplayGoal(event, team) {
    const isHome = team === 'home';
    const targetZ = isHome ? HALF_L - 1.5 : -HALF_L + 1.5;
    const targetX = 0;
    const dur = 1800;
    const startX = this._ballData.group.position.x;
    const startZ = this._ballData.group.position.z;
    const startTime = performance.now();

    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide,
    });
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), flashMat);
    flash.rotation.x = -Math.PI / 2;
    flash.position.set(targetX, 0.05, targetZ);
    this.scene.add(flash);

    let didIncrement = false;

    return new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        this._ballData.group.position.x = startX + (targetX - startX) * ease;
        this._ballData.group.position.z = startZ + (targetZ - startZ) * ease;
        if (t > 0.6 && t < 0.85) {
          flash.material.opacity = ((t - 0.6) / 0.25) * 0.7;
        } else if (t >= 0.85) {
          flash.material.opacity = Math.max(0, (1 - (t - 0.85) / 0.15) * 0.7);
        }
        if (!didIncrement && t >= 0.7) {
          didIncrement = true;
          if (isHome) {
            this._replayScore.home++;
            const el = document.getElementById('home-score');
            if (el) el.textContent = this._replayScore.home;
          } else {
            this._replayScore.away++;
            const el = document.getElementById('away-score');
            if (el) el.textContent = this._replayScore.away;
          }
        }
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          this.scene.remove(flash);
          flash.geometry.dispose();
          flash.material.dispose();
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  async _animateReplaySub(event, team) {
    const m = event.description.match(/replaces (.+?) \(/);
    if (!m) return;
    const outName = m[1].trim();
    const inName = event.player;
    if (!inName) return;
    const outPlayer = this._findPlayerMesh(outName);
    if (!outPlayer) return;

    const posX = outPlayer.group.position.x;
    const posZ = outPlayer.group.position.z;

    const origOpacity = [];
    outPlayer.group.traverse(child => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(mat => {
          origOpacity.push({ mesh: child, mat, opacity: mat.opacity });
          mat.transparent = true;
        });
      }
    });

    const fadeDur = 500;
    const fadeStart = performance.now();
    await new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - fadeStart) / fadeDur);
        origOpacity.forEach(({ mat }) => { mat.opacity = 1 - t; });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });

    const subData = {
      name: inName, number: '?', pos: 'SUB',
      x: 0.5, y: 0.5, team, fatigue: 50,
    };
    const { group, hitMesh, glow, data } = _buildPlayerFigure(subData, this.scenario);
    group.position.set(posX, 0, posZ);
    this.scene.add(group);
    const newPlayer = { group, data: subData, hitMesh, glow };
    this.players.push(newPlayer);
    this._replayCreatedPlayers.push(newPlayer);

    group.traverse(child => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(mat => { mat.transparent = true; mat.opacity = 0; });
      }
    });

    const fadeInStart = performance.now();
    await new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - fadeInStart) / fadeDur);
        group.traverse(child => {
          if (child.isMesh && child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(mat => { mat.transparent = true; mat.opacity = t; });
          }
        });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  async _animateReplayYellow(event, team) {
    const player = this._findPlayerMesh(event.player);
    if (!player) return;
    const colored = [];
    player.group.traverse(child => {
      if (child.isMesh && child.material && child.material.color) {
        colored.push({ mesh: child, color: child.material.color.getHex() });
        child.material.color.setHex(0xffd700);
      }
    });
    await this._delay(200);
    const restoreStart = performance.now();
    const restoreDur = 400;
    return new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - restoreStart) / restoreDur);
        const gold = new THREE.Color(0xffd700);
        colored.forEach(({ mesh, color }) => {
          mesh.material.color.lerpColors(gold, new THREE.Color(color), t);
        });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  _showReplayComplete() {
    this._replaying = false;
    if (this._replayLabel) {
      this.scene.remove(this._replayLabel);
      if (this._replayLabel.material.map) this._replayLabel.material.map.dispose();
      this._replayLabel.material.dispose();
      this._replayLabel = null;
    }
  }

  // ===== INTERACTION =====
  _setHover(item) {
    this.hovered = item;
    this.renderer.domElement.style.cursor = item ? 'pointer' : 'default';
    this.players.forEach((p) => {
      p.glow.material.opacity = p === item ? 0.6 : 0;
      if (p === item) {
        p.glow.material.color.setHex(0x00b4ff);
      }
    });
  }

  _onMouseMove(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(
      this.players.map((p) => p.hitMesh),
    );
    const hit = hits.length
      ? this.players.find((p) => p.hitMesh === hits[0].object)
      : null;
    this._setHover(hit);
  }

  _onClick(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(
      this.players.map((p) => p.hitMesh),
    );

    if (hits.length && hits[0].object.userData && this.onPlayerClick) {
      const worldPos = new THREE.Vector3();
      hits[0].object.getWorldPosition(worldPos);
      worldPos.project(this.camera);
      const sx = (worldPos.x * 0.5 + 0.5) * rect.width + rect.left;
      const sy = (-worldPos.y * 0.5 + 0.5) * rect.height + rect.top;
      this.onPlayerClick(hits[0].object.userData, sx, sy);
    }
  }

  _onResize() {
    const W = this.container.clientWidth;
    const H = this.container.clientHeight || Math.round(W * 0.55) || 400;
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H);
  }

  // ===== ANIMATION LOOP =====
  _animate() {
    if (!this._running) return;
    requestAnimationFrame(() => this._animate());

    const now = performance.now();
    this._animTime += 0.016;

    // Camera animation
    if (this._camAnimating) {
      const elapsed = now - this._camAnimStart;
      const t = Math.min(1, elapsed / this._camAnimDur);
      const ease = _easeInOutCubic(t);
      if (this._startCamPos && this._targetCamPos) {
        this.camera.position.lerpVectors(this._startCamPos, this._targetCamPos, ease);
      }
      if (this._startCamTarget && this._targetCamTarget) {
        this.controls.target.lerpVectors(this._startCamTarget, this._targetCamTarget, ease);
      }
      if (t >= 1) {
        this._camAnimating = false;
        this.camera.position.copy(this._targetCamPos);
        this.controls.target.copy(this._targetCamTarget);
      }
    }

    // Idle player animation
    this.players.forEach((p, i) => {
      const phase = p.group.userData.phase || 0;
      const armPhase = p.group.userData.armPhase || 0;
      const sway = Math.sin(this._animTime * 1.0 + phase) * 0.003;
      const breath = Math.sin(this._animTime * 0.8 + phase) * 0.002;
      p.group.position.y = sway;

      // Subtle arm swing
      const armChildren = p.group.children.filter(c =>
        c.geometry && c.geometry.type === 'CylinderGeometry' && Math.abs(c.position.y - (PLAYER_HEIGHT * 0.55)) < 0.3
      );
      armChildren.forEach((arm, ai) => {
        if (arm) {
          arm.rotation.z = (arm.position.x < 0 ? 0.2 : -0.2) + Math.sin(this._animTime * 1.5 + armPhase + ai) * 0.03;
        }
      });
    });

    // Corner flag animation
    this._flagData.forEach(fd => {
      const wave = Math.sin(this._animTime * 2.0 + fd.phase) * 0.1;
      fd.flag.rotation.y = fd.baseRot + wave;
      // Slight pole bend
      fd.pole.rotation.z = Math.sin(this._animTime * 1.8 + fd.phase) * 0.005;
    });

    // Ball gentle hover and spin
    if (this._ballData) {
      const hover = Math.sin(this._animTime * 1.5) * 0.02;
      this._ballData.group.position.y = 0.22 + hover;
      if (this._ballData.ball) {
        this._ballData.ball.rotation.x += 0.01;
        this._ballData.ball.rotation.z += 0.005;
      }
      if (this._ballData.shadow) {
        this._ballData.shadow.position.x = this._ballData.group.position.x;
        this._ballData.shadow.position.z = this._ballData.group.position.z;
        this._ballData.shadow.material.opacity = 0.08 + Math.sin(this._animTime * 1.5) * 0.04;
      }
      if (this._ballData.glowMesh) {
        this._ballData.glowMesh.material.opacity = 0.03 + Math.sin(this._animTime * 2) * 0.02;
      }
    }

    // Auto-refresh passing lanes when positions change
    if (this._currentOverlay === 'passing' && this._ballData) {
      if (this._passingGraphDirty || this._passingPositionsChanged()) {
        this._drawPassingOverlay();
      }
    }

    // Live pressing overlay update
    if (this._currentOverlay === 'pressing') {
      this._updatePressingOverlay();
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  setCompactness(val) {
    this._compactness = Math.max(0.1, Math.min(0.9, val));
    this.scene.fog.density = 0.002 + (1 - this._compactness) * 0.004;
  }

  destroy() {
    this._running = false;
    this._replaying = false;
    this._clearHighlights();
    this._clearLabels();
    this._clearPassingLines();
    this._clearHighlightCircles();
    this._clearPressingOverlay();
    _clearPlayers(this.scene, this.players);
    if (this._replayCreatedPlayers.length) {
      _clearPlayers(this.scene, this._replayCreatedPlayers);
      this._replayCreatedPlayers = [];
    }
    if (this._ballData) {
      this.scene.remove(this._ballData.group);
      this._ballData = null;
    }
    if (this._crowdGroup) {
      this.scene.remove(this._crowdGroup);
    }
    if (this._replayLabel) {
      this.scene.remove(this._replayLabel);
      if (this._replayLabel.material.map) this._replayLabel.material.map.dispose();
      this._replayLabel.material.dispose();
      this._replayLabel = null;
    }
    this._arrowMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._adBoards.forEach(b => {
      this.scene.remove(b);
    });
    this.renderer.dispose();
    this.container.innerHTML = '';
    this.players = [];
  }
}

// ===================================================================
// FACTORY HELPERS
// ===================================================================
function _createPlayer(scene, p, scenario) {
  const { group, hitMesh, glow, data } = _buildPlayerFigure(p, scenario);
  const w = _pNormToWorld(p);
  group.position.set(w.x, 0, w.z);
  scene.add(group);
  return { group, data: p, hitMesh, glow };
}

function _clearPlayers(scene, players) {
  players.forEach((item) => {
    scene.remove(item.group);
    item.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((m) => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      }
    });
  });
}


