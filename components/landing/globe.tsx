'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';

// ╔════════════════════════════════════════════════════╗
// ║  Math helpers                                      ║
// ╚════════════════════════════════════════════════════╝
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
interface Vec3 { x: number; y: number; z: number }

const ll2xyz = (lat: number, lon: number): Vec3 => {
  const phi = (90 - lat) * DEG;
  const theta = lon * DEG;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
};

const rotY = (v: Vec3, a: number): Vec3 => ({
  x: v.x * Math.cos(a) - v.z * Math.sin(a),
  y: v.y,
  z: v.x * Math.sin(a) + v.z * Math.cos(a),
});

const rotX = (v: Vec3, a: number): Vec3 => ({
  x: v.x,
  y: v.y * Math.cos(a) - v.z * Math.sin(a),
  z: v.y * Math.sin(a) + v.z * Math.cos(a),
});

const slerp = (a: Vec3, b: Vec3, t: number): Vec3 => {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot);
  if (theta < 0.001) return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
  const s = Math.sin(theta);
  return {
    x: (Math.sin((1 - t) * theta) * a.x + Math.sin(t * theta) * b.x) / s,
    y: (Math.sin((1 - t) * theta) * a.y + Math.sin(t * theta) * b.y) / s,
    z: (Math.sin((1 - t) * theta) * a.z + Math.sin(t * theta) * b.z) / s,
  };
};

const elevate = (v: Vec3, t: number, lift: number): Vec3 => {
  const e = 1 + lift * Math.sin(Math.PI * t);
  return { x: v.x * e, y: v.y * e, z: v.z * e };
};

// Smooth ease for visibility transitions across hemisphere boundary
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

// ╔════════════════════════════════════════════════════╗
// ║  Data                                              ║
// ╚════════════════════════════════════════════════════╝
const CITIES = [
  // ── Hubs (highlighted) ──────────────────────────────
  { name: 'Tanzania',     flag: '🇹🇿', lat: -6.8,  lon: 39.3,   highlight: true },
  { name: 'China',        flag: '🇨🇳', lat: 31.2,  lon: 121.5,  highlight: true },
  // ── Global nodes ────────────────────────────────────
  { name: 'New York',     flag: '🇺🇸', lat: 40.7,  lon: -74.0  },
  { name: 'London',       flag: '🇬🇧', lat: 51.5,  lon: -0.1   },
  { name: 'Dubai',        flag: '🇦🇪', lat: 25.2,  lon: 55.3   },
  { name: 'Lagos',        flag: '🇳🇬', lat: 6.5,   lon: 3.4    },
  { name: 'Singapore',    flag: '🇸🇬', lat: 1.3,   lon: 103.8  },
  { name: 'Nairobi',      flag: '🇰🇪', lat: -1.3,  lon: 36.8   },
  { name: 'Mumbai',       flag: '🇮🇳', lat: 19.1,  lon: 72.9   },
  { name: 'Paris',        flag: '🇫🇷', lat: 48.9,  lon: 2.3    },
  { name: 'São Paulo',    flag: '🇧🇷', lat: -23.5, lon: -46.6  },
  // ── Expanded network ────────────────────────────────
  { name: 'Cairo',        flag: '🇪🇬', lat: 30.0,  lon: 31.2   },
  { name: 'Tokyo',        flag: '🇯🇵', lat: 35.7,  lon: 139.7  },
  { name: 'Istanbul',     flag: '🇹🇷', lat: 41.0,  lon: 29.0   },
  { name: 'Johannesburg', flag: '🇿🇦', lat: -26.2, lon: 28.0   },
  { name: 'Bangkok',      flag: '🇹🇭', lat: 13.7,  lon: 100.5  },
  { name: 'Toronto',      flag: '🇨🇦', lat: 43.7,  lon: -79.4  },
  { name: 'Riyadh',       flag: '🇸🇦', lat: 24.7,  lon: 46.7   },
  { name: 'Karachi',      flag: '🇵🇰', lat: 24.9,  lon: 67.0   },
  { name: 'Jakarta',      flag: '🇮🇩', lat: -6.2,  lon: 106.8  },
];

// from/to index → CITIES array above
const ROUTES = [
  // ── Core Tanzania ↔ China corridor ──────────────────
  { from: 0,  to: 1,  hue: 'cyan', offsets: [0.0,  0.55] },
  { from: 1,  to: 0,  hue: 'blue', offsets: [0.3,  0.8 ] },
  // ── Africa inbound ──────────────────────────────────
  { from: 5,  to: 0,  hue: 'blue', offsets: [0.25]       }, // Lagos → TZ
  { from: 7,  to: 0,  hue: 'cyan', offsets: [0.05]       }, // Nairobi → TZ
  { from: 11, to: 0,  hue: 'blue', offsets: [0.42]       }, // Cairo → TZ
  { from: 14, to: 0,  hue: 'cyan', offsets: [0.68]       }, // Johannesburg → TZ
  // ── Middle East / South Asia ────────────────────────
  { from: 4,  to: 0,  hue: 'blue', offsets: [0.45]       }, // Dubai → TZ
  { from: 17, to: 0,  hue: 'cyan', offsets: [0.82]       }, // Riyadh → TZ
  { from: 18, to: 4,  hue: 'blue', offsets: [0.1 ]       }, // Karachi → Dubai
  { from: 8,  to: 4,  hue: 'cyan', offsets: [0.60]       }, // Mumbai → Dubai
  { from: 13, to: 4,  hue: 'blue', offsets: [0.35]       }, // Istanbul → Dubai
  // ── East / SE Asia ──────────────────────────────────
  { from: 1,  to: 12, hue: 'cyan', offsets: [0.48]       }, // China → Tokyo
  { from: 15, to: 1,  hue: 'blue', offsets: [0.72]       }, // Bangkok → China
  { from: 6,  to: 1,  hue: 'cyan', offsets: [0.55]       }, // Singapore → China
  { from: 19, to: 6,  hue: 'blue', offsets: [0.2 ]       }, // Jakarta → Singapore
  // ── Western destinations ────────────────────────────
  { from: 2,  to: 0,  hue: 'blue', offsets: [0.15]       }, // New York → TZ
  { from: 0,  to: 3,  hue: 'cyan', offsets: [0.65]       }, // TZ → London
  { from: 5,  to: 3,  hue: 'cyan', offsets: [0.90]       }, // Lagos → London
  { from: 9,  to: 0,  hue: 'blue', offsets: [0.88]       }, // Paris → TZ
  { from: 16, to: 0,  hue: 'cyan', offsets: [0.38]       }, // Toronto → TZ
  { from: 10, to: 0,  hue: 'blue', offsets: [0.5 ]       }, // São Paulo → TZ
  { from: 1,  to: 2,  hue: 'cyan', offsets: [0.4 ]       }, // China → New York
];

const STEPS = 64;
const PARTICLE_SPEED = 0.0007;

const buildArc = (a: Vec3, b: Vec3) =>
  Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    return elevate(slerp(a, b, t), t, 0.34);
  });

// ── Orbital ring (Saturn-style) ──────────────────────
const RING_TILT = 0.42;             // ~24°
const RING_RADIUS = 1.20;
const RING_LIGHTS = [
  { phase: 0.00, hue: 'cyan' as const, speed: 1.00 },
  { phase: 0.18, hue: 'blue' as const, speed: 1.00 },
  { phase: 0.40, hue: 'cyan' as const, speed: 1.00 },
  { phase: 0.60, hue: 'blue' as const, speed: 1.00 },
  { phase: 0.78, hue: 'cyan' as const, speed: 1.00 },
];

interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; max: number;
  hue: 'cyan' | 'blue';
  size: number;
}

interface Star { x: number; y: number; size: number; phase: number }

// ╔════════════════════════════════════════════════════╗
// ║  Component                                         ║
// ╚════════════════════════════════════════════════════╝
export default function Globe() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);
  const rotRef         = useRef(0.6);
  const timeRef        = useRef(0);
  const lastTsRef      = useRef(0);
  const arcsRef        = useRef<Vec3[][]>([]);
  const sparklesRef    = useRef<Sparkle[]>([]);
  const arrivedRef     = useRef<Set<string>>(new Set());
  const isDraggingRef  = useRef(false);
  const lastPtrXRef    = useRef(0);
  const inertiaRef     = useRef(0);   // radians added per frame from drag momentum
  const hasDraggedRef  = useRef(false);
  const hintOpacityRef = useRef(1);
  const txCounterRef   = useRef(0);
  const isVisibleRef   = useRef(true);

  // Pre-build arcs once
  useEffect(() => {
    arcsRef.current = ROUTES.map(r =>
      buildArc(ll2xyz(CITIES[r.from].lat, CITIES[r.from].lon),
               ll2xyz(CITIES[r.to].lat,   CITIES[r.to].lon))
    );
  }, []);

  // Stable star field
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 50; i++) {
      const a = (i * 137.508) * DEG;
      const r = 0.55 + ((i * 31) % 100) / 100 * 0.55;
      arr.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        size: 0.4 + (i % 3) * 0.25,
        phase: i * 0.43,
      });
    }
    return arr;
  }, []);

  // ╭─ DRAW ───────────────────────────────────────────╮
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    if (W < 4 || H < 4) return;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) * 0.40;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rot = rotRef.current;
    const t   = timeRef.current;

    // ── 1. Star field (subtle, dark only) ───────────
    if (isDark) {
      stars.forEach(s => {
        const sx = cx + s.x * R * 1.7;
        const sy = cy + s.y * R * 1.7;
        if (sx < 0 || sx > W || sy < 0 || sy > H) return;
        const tw = (Math.sin(t * 0.0012 + s.phase) + 1) / 2;
        const a  = 0.18 + tw * 0.45;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, TAU);
        ctx.fillStyle = `rgba(186,230,253,${a})`;
        ctx.fill();
      });
    }

    // ── 2. Outer HUD rings + tick marks ─────────────
    ctx.lineWidth = 0.5;
    [1.30, 1.24].forEach((mult, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R * mult, 0, TAU);
      ctx.strokeStyle = isDark
        ? `rgba(96,165,250,${0.10 - i * 0.03})`
        : `rgba(59,130,246,${0.10 - i * 0.03})`;
      ctx.stroke();
    });
    // Dense tick marks every 15° (cardinal points are longer & brighter)
    for (let deg = 0; deg < 360; deg += 15) {
      const a = deg * DEG;
      const isCardinal = deg % 90 === 0;
      const tickIn  = R * 1.24;
      const tickOut = R * (isCardinal ? 1.31 : 1.27);
      const x1 = cx + Math.cos(a) * tickIn;
      const y1 = cy + Math.sin(a) * tickIn;
      const x2 = cx + Math.cos(a) * tickOut;
      const y2 = cy + Math.sin(a) * tickOut;
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = isDark
        ? `rgba(96,165,250,${isCardinal ? 0.55 : 0.22})`
        : `rgba(59,130,246,${isCardinal ? 0.5 : 0.18})`;
      ctx.lineWidth = isCardinal ? 1 : 0.6;
      ctx.stroke();
    }

    // ── 3. Atmosphere halo (smooth pulse) ───────────
    const atmoPulse = (Math.sin(t * 0.0014) + 1) / 2;
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.22);
    if (isDark) {
      atmo.addColorStop(0,   `rgba(34,211,238,${0.20 + atmoPulse * 0.10})`);
      atmo.addColorStop(0.5, `rgba(59,130,246,${0.08 + atmoPulse * 0.04})`);
      atmo.addColorStop(1,   'rgba(59,130,246,0)');
    } else {
      atmo.addColorStop(0,   `rgba(59,130,246,${0.12 + atmoPulse * 0.05})`);
      atmo.addColorStop(0.5, `rgba(59,130,246,${0.05 + atmoPulse * 0.02})`);
      atmo.addColorStop(1,   'rgba(59,130,246,0)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.22, 0, TAU);
    ctx.fillStyle = atmo;
    ctx.fill();

    // ── 4. Orbital ring — BACK half (z ≤ 0) ─────────
    const ringT = t * 0.00018;
    const ct = Math.cos(RING_TILT), st = Math.sin(RING_TILT);

    const ringPoint = (theta: number): Vec3 => {
      // Ring lies on XZ plane; rotate around X by tilt; rotate around Y by ringT
      let p: Vec3 = { x: Math.cos(theta), y: 0, z: Math.sin(theta) };
      p = { x: p.x, y: -p.z * st, z: p.z * ct };
      // Slow Y-spin (independent of globe rotation)
      const cs = Math.cos(ringT), ss = Math.sin(ringT);
      p = { x: p.x * cs - p.z * ss, y: p.y, z: p.x * ss + p.z * cs };
      return { x: p.x * RING_RADIUS, y: p.y * RING_RADIUS, z: p.z * RING_RADIUS };
    };

    // Faint ring outline (back portion)
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 220; i++) {
      const theta = (i / 220) * TAU;
      const p = ringPoint(theta);
      if (p.z >= 0) { started = false; continue; }
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.16)';
    ctx.stroke();

    // Back ring lights (passing behind the planet — subtle, dimmer)
    RING_LIGHTS.forEach((light) => {
      const theta = light.phase * TAU + ringT * 1.4 * light.speed;
      const p = ringPoint(theta);
      if (p.z >= 0) return;
      const sx = cx + p.x * R, sy = cy - p.y * R;
      const distSq = (sx - cx) ** 2 + (sy - cy) ** 2;
      // If within globe projection, hide (planet eclipses it)
      if (distSq < R * R * 0.98) return;
      const col = light.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 7);
      g.addColorStop(0, `rgba(${col},0.4)`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, 7, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // ── 5. Globe body — filled gradient (rich) ──────
    const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    if (isDark) {
      bg.addColorStop(0,    'rgba(40,90,180,0.85)');
      bg.addColorStop(0.5,  'rgba(18,48,120,0.92)');
      bg.addColorStop(1,    'rgba(4,14,50,0.98)');
    } else {
      bg.addColorStop(0,    'rgba(225,240,255,0.92)');
      bg.addColorStop(0.5,  'rgba(195,220,255,0.78)');
      bg.addColorStop(1,    'rgba(170,200,250,0.55)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fillStyle = bg;
    ctx.fill();

    // Subtle inner core glow (gentle pulse)
    const corePulse = (Math.sin(t * 0.0024) + 1) / 2;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (0.42 + corePulse * 0.08));
    core.addColorStop(0, isDark
      ? `rgba(34,211,238,${0.16 + corePulse * 0.10})`
      : `rgba(59,130,246,${0.06 + corePulse * 0.04})`);
    core.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.55, 0, TAU);
    ctx.fillStyle = core;
    ctx.fill();

    // Specular highlight
    const spec = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx - R * 0.38, cy - R * 0.38, R * 0.7);
    spec.addColorStop(0, isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.40)');
    spec.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fillStyle = spec;
    ctx.fill();

    // ── 6. Grid lines on globe surface ──────────────
    const gridStroke = isDark ? '120,180,255' : '59,130,246';
    ctx.lineWidth = 0.5;

    // Longitudes every 30° — 6° step (half the path ops)
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 6) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridStroke},0.18)`;
      ctx.stroke();
    }
    // Latitudes — 6° step
    [-60, -30, 30, 60].forEach(lat => {
      ctx.beginPath();
      let first = true;
      for (let lon = 0; lon <= 360; lon += 6) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridStroke},0.16)`;
      ctx.stroke();
    });
    // Equator (brighter) — 4° step
    ctx.beginPath();
    let firstEq = true;
    for (let lon = 0; lon <= 360; lon += 4) {
      const p = rotY(ll2xyz(0, lon), rot);
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (firstEq) { ctx.moveTo(sx, sy); firstEq = false; } else ctx.lineTo(sx, sy);
    }
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = isDark ? 'rgba(34,211,238,0.40)' : 'rgba(34,211,238,0.32)';
    ctx.stroke();

    // Globe rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.55)' : 'rgba(59,130,246,0.45)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // ── 7. Arcs ─────────────────────────────────────
    const cityActivation = new Array(CITIES.length).fill(0);

    ROUTES.forEach((route, ri) => {
      const arc = arcsRef.current[ri];
      if (!arc) return;

      // Ghost path — single stroke for the whole arc (cheap: 1 path op vs STEPS)
      {
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= STEPS; i++) {
          const rP = rotY(arc[i], rot);
          if (rP.z < -0.1) { started = false; continue; }
          const sx = cx + rP.x * R, sy = cy - rP.y * R;
          if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${isDark ? 0.10 : 0.08})`
          : `rgba(167,139,250,${isDark ? 0.10 : 0.08})`;
        ctx.stroke();
      }

      route.offsets.forEach((offset, oi) => {
        const rawT = ((t * PARTICLE_SPEED + offset) % 1 + 1) % 1;

        // City activation (label fade-in)
        if (rawT > 0.5)  cityActivation[route.to]   = Math.max(cityActivation[route.to],   smoothstep(0.5, 0.95, rawT));
        if (rawT < 0.18) cityActivation[route.from] = Math.max(cityActivation[route.from], smoothstep(0.18, 0, rawT));

        // Arrival sparkle spawn (once per loop)
        const arrivalKey = `${ri}-${oi}`;
        if (rawT > 0.94 && rawT < 0.99 && !arrivedRef.current.has(arrivalKey)) {
          arrivedRef.current.add(arrivalKey);
          const dest = CITIES[route.to];
          const p = rotY(ll2xyz(dest.lat, dest.lon), rot);
          if (p.z > 0) {
            const sx = cx + p.x * R, sy = cy - p.y * R;
            for (let s = 0; s < 4; s++) {
              const ang = (s / 7) * TAU + Math.random() * 0.4;
              const speed = 0.5 + Math.random() * 1.0;
              sparklesRef.current.push({
                x: sx, y: sy,
                vx: Math.cos(ang) * speed,
                vy: Math.sin(ang) * speed - 0.3,
                life: 1, max: 50 + Math.random() * 20,
                hue: route.hue as 'cyan' | 'blue',
                size: 0.8 + Math.random() * 1.0,
              });
            }
          }
        }
        if (rawT < 0.05) arrivedRef.current.delete(arrivalKey);

        // Bright trail
        const trailLen = 0.22;
        const trailStart = Math.max(0, rawT - trailLen);
        ctx.lineWidth = 2.4;
        for (let i = 1; i <= STEPS; i++) {
          const ti = i / STEPS;
          if (ti < trailStart || ti > rawT) continue;
          const rA = rotY(arc[i - 1], rot);
          const rB = rotY(arc[i], rot);
          if (rA.z < -0.12 && rB.z < -0.12) continue;
          const fade = (ti - trailStart) / trailLen;
          const eased = fade * fade;
          const vis = smoothstep(-0.12, 0.2, (rA.z + rB.z) / 2);
          const alpha = eased * vis;
          const col = route.hue === 'cyan' ? '34,211,238' : '167,139,250';
          ctx.beginPath();
          ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
          ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
          ctx.strokeStyle = `rgba(${col},${alpha})`;
          ctx.stroke();
        }

        // Particle head
        const headIdx = Math.min(STEPS, Math.round(rawT * STEPS));
        if (headIdx < arc.length) {
          const rH = rotY(arc[headIdx], rot);
          if (rH.z > -0.12) {
            const hx = cx + rH.x * R, hy = cy - rH.y * R;
            const headVis = smoothstep(-0.12, 0.1, rH.z);
            const col = route.hue === 'cyan' ? '34,211,238' : '167,139,250';

            const g1 = ctx.createRadialGradient(hx, hy, 0, hx, hy, 13);
            g1.addColorStop(0,    `rgba(${col},${0.85 * headVis})`);
            g1.addColorStop(0.5,  `rgba(${col},${0.25 * headVis})`);
            g1.addColorStop(1,    `rgba(${col},0)`);
            ctx.beginPath();
            ctx.arc(hx, hy, 13, 0, TAU);
            ctx.fillStyle = g1;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(hx, hy, 2.4, 0, TAU);
            ctx.fillStyle = route.hue === 'cyan' ? '#a5f3fc' : '#ddd6fe';
            ctx.globalAlpha = headVis;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });
    });

    // ── 8. Sparkles (arrival bursts) ────────────────
    sparklesRef.current = sparklesRef.current.filter(s => {
      s.life -= 1 / s.max;
      if (s.life <= 0) return false;
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.025;
      const a = s.life;
      const col = s.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
      g.addColorStop(0, `rgba(${col},${0.85 * a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 3, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * a, 0, TAU);
      ctx.fillStyle = `rgba(${col},${a})`;
      ctx.fill();
      return true;
    });

    // ── 9. City markers + flags ─────────────────────
    // Responsive sizing — everything scales with globe radius R
    const isMobile    = R < 145;
    const dotBig      = isMobile ? 2.8  : 4.2;
    const dotSmall    = isMobile ? 1.6  : 2.6;
    const haloR       = isMobile ? 7    : 12;
    const ringMax     = isMobile ? 10   : 18;
    const flagBig     = isMobile ? 11   : 15;   // px — highlight city flag
    const flagSmall   = isMobile ? 9    : 12;   // px — regular city flag
    const labelFontPx = isMobile ? 7    : 11;   // px — highlight label
    const actFontPx   = isMobile ? 6    : 9;    // px — activation label
    const labelOffX   = isMobile ? 14   : 28;   // horizontal offset from dot
    const labelOffY   = isMobile ? 5    : 10;
    const flagOffX    = isMobile ? 4    : 8;
    const flagOffY    = isMobile ? -4   : -6;
    const actOffX     = isMobile ? 12   : 22;
    const actOffY     = isMobile ? 4    : 6;

    CITIES.forEach((city, idx) => {
      const p = rotY(ll2xyz(city.lat, city.lon), rot);
      if (p.z < 0) return;
      const sx = cx + p.x * R;
      const sy = cy - p.y * R;
      const vis = smoothstep(0, 0.18, p.z);

      if (city.highlight) {
        // Expanding rings
        const baseT = t * 0.0035;
        for (let i = 0; i < 3; i++) {
          const phase = (baseT + i * 0.333) % 1;
          const ringR = (isMobile ? 3 : 5) + phase * ringMax;
          const a = (1 - phase) * 0.65 * vis;
          ctx.beginPath();
          ctx.arc(sx, sy, ringR, 0, TAU);
          ctx.strokeStyle = isDark ? `rgba(34,211,238,${a})` : `rgba(37,99,235,${a * 0.85})`;
          ctx.lineWidth = isMobile ? 0.8 : 1.1;
          ctx.stroke();
        }

        // Halo
        const haloG = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR);
        haloG.addColorStop(0, isDark ? `rgba(34,211,238,${0.5 * vis})` : `rgba(37,99,235,${0.35 * vis})`);
        haloG.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, haloR, 0, TAU);
        ctx.fillStyle = haloG;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, dotBig, 0, TAU);
        ctx.fillStyle = isDark ? '#67e8f9' : '#1d4ed8';
        ctx.globalAlpha = vis;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Flag
        ctx.font = `${flagBig}px "Apple Color Emoji","Segoe UI Emoji",serif`;
        ctx.globalAlpha = vis;
        ctx.fillText(city.flag, sx + flagOffX, sy + flagOffY);
        ctx.globalAlpha = 1;

        // Bracketed label — hidden on mobile to avoid overlap
        if (!isMobile) {
          ctx.font = `bold ${labelFontPx}px ui-monospace, "SF Mono", monospace`;
          const label  = '[' + city.name.toUpperCase().replace(/\s+/g, '.') + ']';
          const labelW = ctx.measureText(label).width;
          const lx = sx + labelOffX, ly = sy + labelOffY;
          const bx = lx - 3, by = ly - 9, bw = labelW + 6, bh = 13;
          ctx.strokeStyle = isDark ? `rgba(34,211,238,${0.55 * vis})` : `rgba(37,99,235,${0.45 * vis})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(bx, by + 3);           ctx.lineTo(bx, by);           ctx.lineTo(bx + 3, by);
          ctx.moveTo(bx + bw - 3, by);      ctx.lineTo(bx + bw, by);      ctx.lineTo(bx + bw, by + 3);
          ctx.moveTo(bx, by + bh - 3);      ctx.lineTo(bx, by + bh);      ctx.lineTo(bx + 3, by + bh);
          ctx.moveTo(bx + bw - 3, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - 3);
          ctx.stroke();
          ctx.fillStyle = isDark ? `rgba(2,15,40,${0.55 * vis})` : `rgba(255,255,255,${0.85 * vis})`;
          ctx.fillRect(bx + 1, by + 1, bw - 2, bh - 2);
          ctx.fillStyle = isDark ? `rgba(186,230,253,${0.95 * vis})` : `rgba(30,64,175,${0.95 * vis})`;
          ctx.fillText(label, lx, ly);
        }

      } else {
        // Soft halo
        const cg = ctx.createRadialGradient(sx, sy, 0, sx, sy, isMobile ? 4 : 7);
        cg.addColorStop(0, isDark ? `rgba(147,197,253,${0.45 * vis})` : `rgba(59,130,246,${0.30 * vis})`);
        cg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, isMobile ? 4 : 7, 0, TAU);
        ctx.fillStyle = cg;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, dotSmall, 0, TAU);
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.85 * vis})`
          : `rgba(59,130,246,${0.7 * vis})`;
        ctx.fill();

        // Flag — always shown, smaller on mobile
        ctx.font = `${flagSmall}px "Apple Color Emoji","Segoe UI Emoji",serif`;
        ctx.globalAlpha = vis * 0.9;
        ctx.fillText(city.flag, sx + flagOffX - 1, sy - 4);
        ctx.globalAlpha = 1;

        // TX counter — runs on all screen sizes
        const act = cityActivation[idx];
        if (act > 0.85 && Math.random() < 0.02) txCounterRef.current++;

        // Activation-driven label — desktop only
        if (!isMobile && act > 0.05) {
          const la = act * vis;
          ctx.font = `500 ${actFontPx}px ui-monospace, "SF Mono", monospace`;
          const lbl = '[' + city.name.toUpperCase().replace(/\s+/g, '.') + ']';
          const labelW = ctx.measureText(lbl).width;
          const lx = sx + actOffX, ly = sy + actOffY;
          ctx.fillStyle = isDark ? `rgba(2,15,40,${0.6 * la})` : `rgba(255,255,255,${0.85 * la})`;
          ctx.fillRect(lx - 2, ly - 8, labelW + 4, 11);
          ctx.fillStyle = isDark ? `rgba(186,230,253,${0.92 * la})` : `rgba(30,64,175,${0.9 * la})`;
          ctx.fillText(lbl, lx, ly);
        }
      }
    });

    // ── 10. Orbital ring — FRONT half (z > 0) ───────
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    started = false;
    for (let i = 0; i <= 220; i++) {
      const theta = (i / 220) * TAU;
      const p = ringPoint(theta);
      if (p.z <= 0) { started = false; continue; }
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.30)' : 'rgba(59,130,246,0.28)';
    ctx.stroke();

    // Front ring lights — bright
    RING_LIGHTS.forEach((light) => {
      const theta = light.phase * TAU + ringT * 1.4 * light.speed;
      const p = ringPoint(theta);
      if (p.z <= 0) return;
      const sx = cx + p.x * R, sy = cy - p.y * R;
      const col = light.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const fade = smoothstep(0, 0.2, p.z);

      // Halo
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
      g.addColorStop(0, `rgba(${col},${0.9 * fade})`);
      g.addColorStop(0.5, `rgba(${col},${0.3 * fade})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, TAU);
      ctx.fillStyle = light.hue === 'cyan' ? '#a5f3fc' : '#dbeafe';
      ctx.globalAlpha = fade;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // ── 11. Terminal HUD overlay ────────────────────
    const hudCol = isDark ? '34,211,238' : '37,99,235';
    const hudDim = isDark ? '186,230,253' : '30,64,175';

    // Frame corner brackets at canvas extents
    const cLen = 14, cIns = 8;
    ctx.strokeStyle = `rgba(${hudCol},0.45)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    // top-left
    ctx.moveTo(cIns, cIns + cLen); ctx.lineTo(cIns, cIns); ctx.lineTo(cIns + cLen, cIns);
    // top-right
    ctx.moveTo(W - cIns - cLen, cIns); ctx.lineTo(W - cIns, cIns); ctx.lineTo(W - cIns, cIns + cLen);
    // bottom-left
    ctx.moveTo(cIns, H - cIns - cLen); ctx.lineTo(cIns, H - cIns); ctx.lineTo(cIns + cLen, H - cIns);
    // bottom-right
    ctx.moveTo(W - cIns - cLen, H - cIns); ctx.lineTo(W - cIns, H - cIns); ctx.lineTo(W - cIns, H - cIns - cLen);
    ctx.stroke();

    // Top-left: live rotation readout
    ctx.font = '9px ui-monospace, "SF Mono", monospace';
    const deg  = ((rot * 180 / Math.PI) % 360 + 360) % 360;
    const lat0 = 0; // viewing center latitude (we only rotate Y)
    const rotLine = `ROT:${deg.toFixed(1).padStart(5,'0')}°`;
    const latLine = `LAT:${lat0.toFixed(2)}`;
    ctx.fillStyle = `rgba(${hudCol},0.65)`;
    ctx.fillText(rotLine, cIns + cLen + 4, cIns + 10);
    ctx.fillStyle = `rgba(${hudDim},0.55)`;
    ctx.fillText(latLine, cIns + cLen + 4, cIns + 22);

    // Top-right: status indicator
    const status = isDraggingRef.current ? 'TRACKING' : 'AUTO';
    const statusW = ctx.measureText(status).width;
    const dotPulse = (Math.sin(t * 0.006) + 1) / 2;
    ctx.beginPath();
    ctx.arc(W - cIns - cLen - statusW - 10, cIns + 6.5, 2.2, 0, TAU);
    ctx.fillStyle = isDraggingRef.current
      ? `rgba(${hudCol},${0.6 + dotPulse * 0.4})`
      : `rgba(${hudDim},0.5)`;
    ctx.fill();
    ctx.fillStyle = `rgba(${hudCol},0.7)`;
    ctx.fillText(status, W - cIns - cLen - statusW - 4, cIns + 10);
    // tx counter line
    const txLine = `TX:${String(txCounterRef.current).padStart(4,'0')}`;
    const txW = ctx.measureText(txLine).width;
    ctx.fillStyle = `rgba(${hudDim},0.55)`;
    ctx.fillText(txLine, W - cIns - cLen - txW - 4, cIns + 22);

    // Bottom-left: net label
    ctx.fillStyle = `rgba(${hudDim},0.45)`;
    ctx.fillText('NET.GLOBAL', cIns + cLen + 4, H - cIns - 6);

    // Bottom-right: scale marker
    const scaleLine = `R:${R.toFixed(0)}px`;
    const scaleW = ctx.measureText(scaleLine).width;
    ctx.fillStyle = `rgba(${hudDim},0.45)`;
    ctx.fillText(scaleLine, W - cIns - cLen - scaleW - 4, H - cIns - 6);

    // Drag hint (fades after first interaction)
    if (hasDraggedRef.current && hintOpacityRef.current > 0) {
      hintOpacityRef.current = Math.max(0, hintOpacityRef.current - 0.025);
    }
    if (hintOpacityRef.current > 0.01) {
      const hintPulse = (Math.sin(t * 0.004) + 1) / 2;
      const hintA = (0.45 + hintPulse * 0.35) * hintOpacityRef.current;
      ctx.font = '10px ui-monospace, "SF Mono", monospace';
      const hint = '◀ DRAG TO ROTATE ▶';
      const hw = ctx.measureText(hint).width;
      ctx.fillStyle = `rgba(${hudCol},${hintA})`;
      ctx.fillText(hint, cx - hw / 2, H - cIns - 22);
    }

    // Subtle horizontal scan-line sweeping vertically (CRT vibe, dark only)
    if (isDark) {
      const scanY = ((t * 0.04) % (H + 60)) - 30;
      const scanG = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanG.addColorStop(0,   'rgba(34,211,238,0)');
      scanG.addColorStop(0.5, 'rgba(34,211,238,0.05)');
      scanG.addColorStop(1,   'rgba(34,211,238,0)');
      ctx.fillStyle = scanG;
      ctx.fillRect(0, scanY - 30, W, 60);
    }

    ctx.restore();
  }, [stars]);

  // ╭─ Loop ───────────────────────────────────────────╮
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap at 1.5× for perf
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause animation when globe scrolls off screen
    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    // ── Drag / touch interaction ──────────────────────
    canvas.style.cursor = 'grab';

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPtrXRef.current   = e.clientX;
      inertiaRef.current    = 0;
      hasDraggedRef.current = true;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor   = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx    = e.clientX - lastPtrXRef.current;
      const scale = canvas.offsetWidth > 0 ? Math.PI / canvas.offsetWidth : 0.005;
      const delta = dx * scale * 2.6;          // strong response — feels like a real ball
      rotRef.current       += delta;
      inertiaRef.current    = delta;
      lastPtrXRef.current   = e.clientX;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      canvas.style.cursor   = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup',   onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);

    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (!isVisibleRef.current) return;
      const dt = lastTsRef.current ? ts - lastTsRef.current : 16;
      // Throttle to ~30fps — skip frame if less than 30ms elapsed
      if (dt < 30 && lastTsRef.current !== 0) return;
      lastTsRef.current = ts;
      const clamped = Math.min(dt, 50);

      if (!isDraggingRef.current) {
        // Decay inertia toward auto-rotate speed
        inertiaRef.current *= 0.92;
        rotRef.current += clamped * 0.00022 + inertiaRef.current;
      }
      // While dragging, rotation is updated directly by onPointerMove

      timeRef.current = ts;
      draw();
    };
    rafRef.current = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        lastTsRef.current = 0;
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown',  onPointerDown);
      canvas.removeEventListener('pointermove',  onPointerMove);
      canvas.removeEventListener('pointerup',    onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerUp);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="w-full h-full touch-none" style={{ display: 'block' }} />;
}
