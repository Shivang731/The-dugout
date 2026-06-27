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
  'QATAR AIRWAYS', 'FIFA', 'HYUNDAI', 'VISA', 'ADIDAS',
  'COCA-COLA', 'BUDWEISER', 'KIA', 'SONY', 'PEPSI',
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
// GRASS TEXTURE GENERATION — lengthwise mowing stripes
// ===================================================================
var _grassTexCache = null;
function _createGrassTexture() {
  if (_grassTexCache) return _grassTexCache;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const lightGreen = '#3a8c3f';
  const darkGreen = '#368838';
  // vertical stripes so they run lengthwise on the pitch (along Z)
  const stripeW = canvas.width / 12;

  for (let i = 0; i < 12; i++) {
    const color = i % 2 === 0 ? lightGreen : darkGreen;
    ctx.fillStyle = color;
    ctx.fillRect(i * stripeW, 0, stripeW, canvas.height);
  }

  // subtle grain overlay
  ctx.fillStyle = 'rgba(0,0,0,0.015)';
  for (let i = 0; i < 8000; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3 + 1,
      Math.random() * 2 + 0.5,
    );
  }

  // mowing direction streaks (vertical, following stripe direction)
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < canvas.width; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, canvas.height);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.anisotropy = 4;
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

  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
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
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 256, 256);

  const cellSize = 12;
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= 256; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y <= 256; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // knot dots at intersections
  ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
  for (let x = 0; x <= 256; x += cellSize) {
    for (let y = 0; y <= 256; y += cellSize) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
}

function _createSponsorTexture(name) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 128);

  ctx.font = '700 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // glow
  ctx.shadowColor = 'rgba(255,255,255,0.3)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 256, 64);

  // sharp text
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 256, 64);

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
    roughness: 0.95,
    metalness: 0,
    color: 0xffffff,
  });
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W + 10, PITCH_L + 10),
    grassMat,
  );
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.15;
  grass.receiveShadow = true;
  scene.add(grass);

  // pitch border run-off track
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x1a2e1a,
    roughness: 1,
    metalness: 0,
  });
  const track = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W + 6, PITCH_L + 6),
    trackMat,
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = -0.13;
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

  [-HALF_L, +HALF_L].forEach(z => {
    const sign = z < 0 ? 1 : -1;

    // --- Goalposts ---
    const postMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.3,
    });

    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, GOAL_H, 10),
        postMat,
      );
      post.position.set(x, GOAL_H / 2, z);
      post.castShadow = true;
      scene.add(post);
    });

    // Crossbar
    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, GOAL_W, 10),
      postMat,
    );
    crossbar.rotation.x = Math.PI / 2;
    crossbar.position.set(0, GOAL_H, z);
    crossbar.castShadow = true;
    scene.add(crossbar);

    // --- Rear frame supports ---
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.4,
      roughness: 0.4,
    });
    const rearZ = z + sign * GOAL_D;
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, GOAL_H, 6),
        frameMat,
      );
      support.position.set(x, GOAL_H / 2, rearZ);
      scene.add(support);
    });

    // Top rear crossbar
    const rearCrossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, GOAL_W, 6),
      frameMat,
    );
    rearCrossbar.rotation.x = Math.PI / 2;
    rearCrossbar.position.set(0, GOAL_H, rearZ);
    scene.add(rearCrossbar);

    // Side diagonal supports (goal frame depth)
    const diagMat = new THREE.MeshStandardMaterial({
      color: 0xbbbbbb,
      metalness: 0.3,
      roughness: 0.5,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const diag = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, GOAL_D * 1.1, 4),
        diagMat,
      );
      diag.position.set(x, 0.05, z + sign * GOAL_D / 2);
      diag.rotation.x = 0.3 * sign;
      scene.add(diag);
    });

    // --- Net (back) ---
    const backNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      color: 0xcccccc,
      roughness: 0.8,
      depthWrite: false,
    });
    const backNet = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W, GOAL_H),
      backNetMat,
    );
    backNet.position.set(0, GOAL_H / 2, rearZ);
    backNet.receiveShadow = true;
    scene.add(backNet);

    // --- Net (top) ---
    const topNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      color: 0xcccccc,
      roughness: 0.8,
      depthWrite: false,
    });
    const topNet = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W, GOAL_D),
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
      opacity: 0.18,
      side: THREE.DoubleSide,
      color: 0xcccccc,
      roughness: 0.8,
      depthWrite: false,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const sideNet = new THREE.Mesh(
        new THREE.PlaneGeometry(GOAL_D, GOAL_H),
        sideNetMat,
      );
      sideNet.rotation.y = Math.PI / 2 * (x < 0 ? 1 : -1);
      sideNet.position.set(x, GOAL_H / 2, z + sign * GOAL_D / 2);
      sideNet.receiveShadow = true;
      scene.add(sideNet);
    });

    // --- Net (ground inside goal) ---
    const groundNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      color: 0xcccccc,
      roughness: 0.9,
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
  const boardH = 1.2;
  const boardY = 0.6;

  const addBoardRow = (xStart, zStart, xEnd, zEnd, sponsorIdx) => {
    const dx = xEnd - xStart;
    const dz = zEnd - zStart;
    const totalLen = Math.sqrt(dx * dx + dz * dz);
    const numBoards = Math.max(1, Math.floor(totalLen / 3));
    const segDx = dx / numBoards;
    const segDz = dz / numBoards;
    const angle = Math.atan2(dx, dz);

    for (let i = 0; i < numBoards; i++) {
      const t = (i + 0.5) / numBoards;
      const bx = xStart + t * dx;
      const bz = zStart + t * dz;
      const sp = sponsors[(sponsorIdx + i) % sponsors.length];
      const tex = _createSponsorTexture(sp);

      const boardMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.6,
        metalness: 0.2,
        emissive: 0x222233,
        emissiveIntensity: 0.15,
        emissiveMap: tex,
      });

      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, boardH),
        boardMat,
      );
      board.position.set(bx, boardY, bz);
      board.rotation.y = angle;
      board.castShadow = true;
      scene.add(board);

      // Frame
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.8,
        metalness: 0.1,
      });
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, boardH + 0.1, 0.05),
        frameMat,
      );
      frame.position.set(bx, boardY, bz);
      frame.position.y = boardY;
      // Slight offset behind the board
      const offset = 0.05;
      frame.position.x += Math.sin(angle) * offset;
      frame.position.z += Math.cos(angle) * offset;
      scene.add(frame);

      // Stand legs
      const legMat = new THREE.MeshStandardMaterial({
        color: 0x333355,
        roughness: 0.7,
        metalness: 0.2,
      });
      [-0.6, 0.6].forEach(legOff => {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.04, boardY * 2, 4),
          legMat,
        );
        const perpX = Math.cos(angle) * legOff;
        const perpZ = -Math.sin(angle) * legOff;
        leg.position.set(bx + perpX, boardY * 0.5, bz + perpZ);
        scene.add(leg);
      });

      // Glow light on ground from board
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x3344aa,
        transparent: true,
        opacity: 0.04,
      });
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(3.5, 1),
        glowMat,
      );
      glow.rotation.x = -Math.PI / 2;
      const perpGlowX = Math.cos(angle) * 0.8;
      const perpGlowZ = -Math.sin(angle) * 0.8;
      glow.position.set(bx + perpGlowX, -0.12, bz + perpGlowZ);
      scene.add(glow);

      boards.push(board);
    }
    return numBoards;
  };

  // Boards along both touchlines
  let spIdx = 0;
  spIdx += addBoardRow(-HALF_W - 2, -HALF_L + 5, -HALF_W - 2, HALF_L - 5, spIdx);
  spIdx += addBoardRow(+HALF_W + 2, -HALF_L + 5, +HALF_W + 2, HALF_L - 5, spIdx);

  // Boards behind goals (shorter)
  spIdx += addBoardRow(-HALF_W + 5, -HALF_L - 2, HALF_W - 5, -HALF_L - 2, spIdx);
  spIdx += addBoardRow(-HALF_W + 5, +HALF_L + 2, HALF_W - 5, +HALF_L + 2, spIdx);

  return boards;
}

// ===================================================================
// BUILD STADIUM
// ===================================================================
function _buildStadium(scene) {
  const standMat = new THREE.MeshStandardMaterial({
    color: 0x16162a,
    roughness: 0.85,
    metalness: 0.05,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a30,
    roughness: 0.75,
    metalness: 0.1,
  });
  const beamMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a3e,
    roughness: 0.6,
    metalness: 0.2,
  });

  // Main stands along sidelines (3 tiers each)
  [-1, 1].forEach(side => {
    for (let tier = 0; tier < 3; tier++) {
      const yBase = tier * 3 + 1;
      const tw = 42;
      const td = 4.5;
      const stand = new THREE.Mesh(
        new THREE.BoxGeometry(tw, 2.5, td),
        standMat,
      );
      stand.position.set(0, yBase + 1.25, side * (HALF_L + 3 + tier * 2.5));
      stand.castShadow = true;
      stand.receiveShadow = true;
      scene.add(stand);
    }
    // Roof
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(44, 0.25, 16),
      roofMat,
    );
    roof.position.set(0, 10.5, side * (HALF_L + 8.5));
    roof.castShadow = true;
    scene.add(roof);

    // Roof structural beams
    for (let i = -18; i <= 18; i += 4) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.5, 14),
        beamMat,
      );
      beam.position.set(i, 10.8, side * (HALF_L + 8.5));
      scene.add(beam);
    }
    // Vertical support columns
    for (let i = -16; i <= 16; i += 8) {
      for (let j = -4; j <= 4; j += 8) {
        const col = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.2, 10, 6),
          beamMat,
        );
        col.position.set(i, 5, side * (HALF_L + 5 + j));
        scene.add(col);
      }
    }
  });

  // Behind-goal stands (smaller)
  [-1, 1].forEach(side => {
    const gs = new THREE.Mesh(
      new THREE.BoxGeometry(22, 4, 6),
      standMat,
    );
    gs.position.set(0, 2, side * (HALF_L + 10));
    gs.castShadow = true;
    scene.add(gs);

    const gs2 = new THREE.Mesh(
      new THREE.BoxGeometry(22, 3, 5),
      standMat,
    );
    gs2.position.set(0, 5.5, side * (HALF_L + 11));
    scene.add(gs2);

    // Roof
    const gRoof = new THREE.Mesh(
      new THREE.BoxGeometry(24, 0.2, 8),
      roofMat,
    );
    gRoof.position.set(0, 8, side * (HALF_L + 12));
    scene.add(gRoof);
  });

  // Corner stands
  [-1, 1].forEach(sx => {
    [-1, 1].forEach(sz => {
      const cs = new THREE.Mesh(
        new THREE.BoxGeometry(8, 3.5, 8),
        standMat,
      );
      cs.position.set(sx * (HALF_W + 4), 1.75, sz * (HALF_L + 4));
      scene.add(cs);
    });
  });

  // Subs benches / dugouts
  const dugoutMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a30,
    roughness: 0.7,
    metalness: 0.1,
  });
  [-1, 1].forEach(side => {
    const dugout = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.6, 2.2),
      dugoutMat,
    );
    dugout.position.set(side * (HALF_W + 1.5), 0.3, -7);
    scene.add(dugout);

    // Roof over dugout
    const dRoof = new THREE.Mesh(
      new THREE.BoxGeometry(6.5, 0.1, 2.5),
      new THREE.MeshStandardMaterial({ color: 0x2a2a3e, roughness: 0.7 }),
    );
    dRoof.position.set(side * (HALF_W + 1.5), 1.2, -7);
    scene.add(dRoof);

    // Seats
    const seatMat = _mat(0x333355, 0.6, 0.05);
    for (let i = -2; i <= 2; i += 0.8) {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.2, 0.5),
        seatMat,
      );
      seat.position.set(side * (HALF_W + 1.5) + i, 0.5, -7);
      scene.add(seat);
    }
  });

  // Tunnel
  const tunnelMat = _mat(0x0a0a14, 0.8, 0.1);
  const tunnel = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 6),
    tunnelMat,
  );
  tunnel.position.set(0, 1.5, -(HALF_L + 10));
  scene.add(tunnel);

  // Tunnel arch
  const archMat = _mat(0x333355, 0.5, 0.2);
  const arch = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.12, 6, 12, Math.PI),
    archMat,
  );
  arch.position.set(0, 3, -(HALF_L + 7));
  arch.rotation.x = Math.PI / 2;
  scene.add(arch);

  // Tunnel light
  const tunnelLight = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshBasicMaterial({
      color: 0xffeedd,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    }),
  );
  tunnelLight.position.set(0, 2.5, -(HALF_L + 7));
  scene.add(tunnelLight);
}

// ===================================================================
// BUILD CROWD
// ===================================================================
function _buildCrowd(scene, homeTeam, awayTeam) {
  const homeColors = _getTeamColors(homeTeam);
  const awayColors = _getTeamColors(awayTeam);
  const group = new THREE.Group();

  const neutralPalette = [0x1a1a2e, 0x16213e, 0x0f3460, 0x2d1b4e, 0x1c1c2a];

  function _createSpectator(color) {
    // Low-poly person: torso + head
    const g = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.9,
    });
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.5, 4),
      bodyMat,
    );
    body.position.y = 0.35;
    g.add(body);

    const headMat = new THREE.MeshStandardMaterial({
      color: 0xe8d5b8,
      roughness: 0.8,
    });
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 4, 4),
      headMat,
    );
    head.position.y = 0.65;
    g.add(head);

    return g;
  }

  // Main stand crowds (along sidelines)
  const standConfigs = [
    { z: -(HALF_L + 4), y: 1.8, side: 0 },
    { z: -(HALF_L + 6.5), y: 4.8, side: 0 },
    { z: -(HALF_L + 9), y: 7.8, side: 0 },
    { z: +(HALF_L + 4), y: 1.8, side: 1 },
    { z: +(HALF_L + 6.5), y: 4.8, side: 1 },
    { z: +(HALF_L + 9), y: 7.8, side: 1 },
  ];

  standConfigs.forEach(config => {
    const isAway = config.side === 1;
    const baseColor = isAway ? awayColors.crowd : homeColors.crowd;
    const rowWidth = 40;
    const spacing = 0.55;

    for (let i = -rowWidth / 2; i <= rowWidth / 2; i += spacing) {
      const jitter = (Math.random() - 0.5) * 0.2;
      const isHomeSection = Math.abs(i) < 8;
      let color;
      if (isHomeSection) {
        color = baseColor;
      } else if (Math.random() < 0.3) {
        color = baseColor;
      } else {
        color = neutralPalette[Math.floor(Math.random() * neutralPalette.length)];
      }
      const spec = _createSpectator(color);
      spec.position.set(i + jitter, config.y + Math.random() * 0.2, config.z + (Math.random() - 0.5) * 0.3);
      spec.scale.set(1, 0.8 + Math.random() * 0.4, 1);
      group.add(spec);
    }
  });

  // Behind-goal crowds
  [-1, 1].forEach(sign => {
    for (let row = 0; row < 3; row++) {
      const z = sign * (HALF_L + 10 + row * 2);
      const y = 1.5 + row * 1.5;
      for (let i = -12; i <= 12; i += 0.6) {
        const jitter = (Math.random() - 0.5) * 0.2;
        const color = neutralPalette[Math.floor(Math.random() * neutralPalette.length)];
        const spec = _createSpectator(color);
        spec.position.set(i + jitter, y + Math.random() * 0.2, z + (Math.random() - 0.5) * 0.3);
        spec.scale.set(1, 0.7 + Math.random() * 0.3, 1);
        group.add(spec);
      }
    }
  });

  return group;
}

// ===================================================================
// BUILD FLOODLIGHTS
// ===================================================================
function _buildFloodlights(scene) {
  const towers = [];
  const towerPositions = [
    [-HALF_W - 8, -HALF_L - 8],
    [+HALF_W + 8, -HALF_L - 8],
    [-HALF_W - 8, +HALF_L + 8],
    [+HALF_W + 8, +HALF_L + 8],
    [-HALF_W - 8, -20],
    [+HALF_W + 8, -20],
    [-HALF_W - 8, +20],
    [+HALF_W + 8, +20],
  ];

  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a3e,
    roughness: 0.7,
    metalness: 0.2,
  });

  towerPositions.forEach(([x, z]) => {
    // Main tower pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.5, 30, 8),
      towerMat,
    );
    pole.position.set(x, 15, z);
    pole.castShadow = true;
    scene.add(pole);

    // Cross arm
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.08, 0.08),
      towerMat,
    );
    arm.position.set(x, 29.5, z);
    scene.add(arm);

    // Light heads (multiple per tower)
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      emissive: 0xfff4d6,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.5,
    });
    [-0.8, 0, 0.8].forEach(offset => {
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.2, 0.3),
        headMat,
      );
      head.position.set(x + offset, 30, z);
      scene.add(head);
    });

    // Light glow sprite
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 244, 214, 0.5)');
    grad.addColorStop(0.3, 'rgba(255, 244, 214, 0.15)');
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
    glowSpr.scale.set(15, 15, 1);
    glowSpr.position.set(x, 30, z);
    scene.add(glowSpr);

    towers.push({ pole, arm, x, z });
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
  const mainColorDark = new THREE.Color(mainColor).multiplyScalar(0.7).getHex();

  const group = new THREE.Group();

  const H = PLAYER_HEIGHT;

  // --- Ground shadow (drop shadow, no depth write) ---
  const shadow = new THREE.Mesh(
    _sharedGeo('shadow', () => new THREE.CircleGeometry(1.0, 16)),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  group.add(shadow);

  // --- Boots ---
  const bootMat = _mat(isAway ? 0x000000 : 0xffffff, 0.5, 0.1);
  [-0.12, 0.12].forEach(offset => {
    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.08, 0.18),
      bootMat,
    );
    boot.position.set(offset, 0.04, 0.04);
    group.add(boot);
  });

  // --- Legs (socks) ---
  const legMat = _mat(socksColor, 0.6, 0.05);
  const legH = H * 0.3;
  [-0.1, 0.1].forEach(offset => {
    const leg = new THREE.Mesh(
      _sharedGeo('leg', () => new THREE.CylinderGeometry(0.07, 0.09, legH, 6)),
      legMat,
    );
    leg.position.set(offset, 0.04 + legH / 2, 0);
    leg.castShadow = true;
    group.add(leg);
  });

  // --- Shorts ---
  const shortsH = H * 0.12;
  const shorts = new THREE.Mesh(
    _sharedGeo('shorts', () => new THREE.CylinderGeometry(0.28, 0.24, shortsH, 10)),
    _mat(shortsColor, 0.45, 0.05),
  );
  shorts.position.y = 0.04 + legH + shortsH / 2;
  shorts.castShadow = true;
  group.add(shorts);

  // --- Torso (main shirt) ---
  const torsoH = H * 0.32;
  const torso = new THREE.Mesh(
    _sharedGeo('torso', () => new THREE.CylinderGeometry(0.32, 0.26, torsoH, 10)),
    _mat(mainColor, 0.35, 0.05),
  );
  torso.position.y = 0.04 + legH + shortsH + torsoH / 2;
  torso.castShadow = true;
  group.add(torso);

  // --- Contrast shorts/socks band (lower torso band) ---
  const bandH = 0.06;
  const bandGeo = _sharedGeo('band', () => new THREE.CylinderGeometry(0.33, 0.28, bandH, 10));
  const bandMatColor = new THREE.Color(shortsColor).lerp(new THREE.Color(socksColor), 0.5).getHex();
  const band = new THREE.Mesh(bandGeo, _mat(bandMatColor, 0.5, 0.0));
  band.position.y = 0.04 + legH + shortsH - bandH * 0.5;
  band.castShadow = true;
  group.add(band);

  // --- Arms ---
  const armMatVal = _mat(mainColor, 0.35, 0.05);
  const armH = H * 0.2;
  [-0.32, 0.32].forEach(offset => {
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.07, armH, 6),
      armMatVal,
    );
    const armY = 0.04 + legH + shortsH + torsoH * 0.4;
    arm.position.set(offset, armY, 0);
    arm.rotation.z = offset < 0 ? 0.2 : -0.2;
    arm.castShadow = true;
    group.add(arm);
  });

  // --- Hands / GK gloves ---
  if (isGK) {
    const gloveMat = _mat(gkColor, 0.4, 0.05);
    [-0.32, 0.32].forEach(offset => {
      const glove = new THREE.Mesh(
        _sharedGeo('glove', () => new THREE.SphereGeometry(0.08, 6, 6)),
        gloveMat,
      );
      glove.position.set(offset, 0.04 + legH + shortsH + torsoH * 0.6, 0.05);
      group.add(glove);
    });
  }

  // --- Head ---
  const headMat = _mat(0xf0d5b8, 0.4, 0.02);
  const headR = isGK ? 0.2 : 0.18;
  const head = new THREE.Mesh(
    _sharedGeo('head', () => new THREE.SphereGeometry(headR, 10, 10)),
    headMat,
  );
  head.position.y = 0.04 + legH + shortsH + torsoH + headR * 0.8;
  head.castShadow = true;
  group.add(head);

  // --- Hair ---
  const hairMat = _mat(0x2d1a0e, 0.7, 0.02);
  const hair = new THREE.Mesh(
    _sharedGeo('hair', () => new THREE.SphereGeometry(headR * 1.05, 8, 6)),
    hairMat,
  );
  hair.position.y = 0.04 + legH + shortsH + torsoH + headR * 0.9;
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
    this.scene.background = new THREE.Color(0x060a12);
    this.scene.fog = new THREE.FogExp2(0x060a12, 0.003);

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
    this.renderer.toneMappingExposure = 1.0;
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
    // Ambient light
    this.scene.add(new THREE.AmbientLight(0x334466, 0.4));

    // Key light (floodlight feel, warm)
    const key = new THREE.DirectionalLight(0xfff4d6, 1.2);
    key.position.set(25, 45, 20);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 130;
    key.shadow.camera.left = -70;
    key.shadow.camera.right = 70;
    key.shadow.camera.top = 70;
    key.shadow.camera.bottom = -70;
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.02;
    this.scene.add(key);

    // Fill light (cool)
    const fill = new THREE.DirectionalLight(0x8899cc, 0.25);
    fill.position.set(-20, 30, -25);
    this.scene.add(fill);

    // Rim/back light
    const rim = new THREE.DirectionalLight(0xccddff, 0.12);
    rim.position.set(0, 15, -50);
    this.scene.add(rim);

    // Floodlight point lights
    const flPositions = [
      [-42, 30, -42], [+42, 30, -42],
      [-42, 30, +42], [+42, 30, +42],
      [-42, 30, -20], [+42, 30, -20],
      [-42, 30, +20], [+42, 30, +20],
    ];
    flPositions.forEach(([x, y, z]) => {
      const l = new THREE.PointLight(0xfff4d6, 0.35, 90);
      l.position.set(x, y, z);
      this.scene.add(l);
    });

    // Stadium ambient glow
    const amb2 = new THREE.HemisphereLight(0x223366, 0x112211, 0.3);
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

    if (mode === 'shape') {
      // nothing extra
    } else if (mode === 'pressing') {
      this._drawPressingOverlay();
    } else if (mode === 'attack') {
      this._drawAttackOverlay();
    } else if (mode === 'passing') {
      this._drawPassingOverlay();
    } else if (mode === 'defensive') {
      this._drawDefensiveOverlay();
    }
  }

  _drawPressingOverlay() {
    const homePlayers = this.players.filter(p => p.data.team === 'home');
    const awayPlayers = this.players.filter(p => p.data.team === 'away');

    const attackers = homePlayers.filter(p => {
      const pos = p.data.pos;
      return ['LW','RW','ST','FW','CF','SS','LM','RM','CM','AM'].includes(pos);
    });
    const defenders = awayPlayers.filter(p => {
      const pos = p.data.pos;
      return ['CB','DF','LB','RB','WB','GK','LCB','RCB','LWB','RWB'].includes(pos);
    });

    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x8bf55a,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    attackers.forEach(att => {
      const ax = att.group.position.x;
      const az = att.group.position.z;
      let closest = null;
      let minDist = Infinity;
      defenders.forEach(def => {
        const dx = def.group.position.x;
        const dz = def.group.position.z;
        const dist = Math.sqrt((ax - dx) ** 2 + (az - dz) ** 2);
        if (dist < minDist) { minDist = dist; closest = def; }
      });

      if (closest && minDist < 25) {
        const dx = closest.group.position.x;
        const dz = closest.group.position.z;

        // Line
        const midX = (ax + dx) / 2;
        const midZ = (az + dz) / 2;
        const angle = Math.atan2(dx - ax, dz - az);
        const len = Math.sqrt((dx - ax) ** 2 + (dz - az) ** 2);

        const line = new THREE.Mesh(
          new THREE.PlaneGeometry(0.05, len),
          lineMat.clone(),
        );
        line.rotation.x = -Math.PI / 2;
        line.rotation.z = angle;
        line.position.set(midX, 0.03, midZ);
        this.scene.add(line);
        this._passingLines.push(line);

        // Arrow head
        const headShape = new THREE.Shape();
        const headSize = 0.6;
        headShape.moveTo(0, 0);
        headShape.lineTo(-headSize * 0.5, -headSize);
        headShape.lineTo(headSize * 0.5, -headSize);
        headShape.closePath();
        const headGeo = new THREE.ShapeGeometry(headShape);
        const head = new THREE.Mesh(headGeo, lineMat.clone());
        head.rotation.x = -Math.PI / 2;
        head.position.set(dx, 0.035, dz);
        head.rotation.z = angle;
        this.scene.add(head);
        this._passingLines.push(head);
      }
    });
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

  _drawPassingOverlay() {
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });

    const homePlayers = this.players.filter(p => p.data.team === 'home');
    const mids = homePlayers.filter(p => {
      const pos = p.data.pos;
      return ['CM','DM','AM','MF','LM','RM'].includes(pos);
    });
    const fwds = homePlayers.filter(p => {
      const pos = p.data.pos;
      return ['LW','RW','ST','FW','CF','SS'].includes(pos);
    });

    mids.forEach((m, i) => {
      // Connections between midfielders
      for (let j = i + 1; j < mids.length; j++) {
        const mx = m.group.position.x;
        const mz = m.group.position.z;
        const nx = mids[j].group.position.x;
        const nz = mids[j].group.position.z;
        const dx = nx - mx;
        const dz = nz - mz;
        const len = Math.sqrt(dx * dx + dz * dz);
        const midX = (mx + nx) / 2;
        const midZ = (mz + nz) / 2;
        const angle = Math.atan2(dx, dz);

        const line = new THREE.Mesh(
          new THREE.PlaneGeometry(0.03, len),
          lineMat.clone(),
        );
        line.rotation.x = -Math.PI / 2;
        line.rotation.z = angle;
        line.position.set(midX, 0.025, midZ);
        this.scene.add(line);
        this._passingLines.push(line);
      }

      // Connections to forwards
      fwds.forEach(f => {
        const mx = m.group.position.x;
        const mz = m.group.position.z;
        const fx = f.group.position.x;
        const fz = f.group.position.z;
        const dx = fx - mx;
        const dz = fz - mz;
        const len = Math.sqrt(dx * dx + dz * dz);
        const midX = (mx + fx) / 2;
        const midZ = (mz + fz) / 2;
        const angle = Math.atan2(dx, dz);

        const line = new THREE.Mesh(
          new THREE.PlaneGeometry(0.02, len),
          new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.06,
            side: THREE.DoubleSide,
          }),
        );
        line.rotation.x = -Math.PI / 2;
        line.rotation.z = angle;
        line.position.set(midX, 0.025, midZ);
        this.scene.add(line);
        this._passingLines.push(line);
      });
    });
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
    }
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = '700 44px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#22c55e';
    ctx.fillText('◆ Showing: Real Outcome', 256, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, sizeAttenuation: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(3.5, 0.7, 1);
    sprite.position.set(0, 3.5, 0);
    this.scene.add(sprite);
    this._replayLabel = sprite;
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


