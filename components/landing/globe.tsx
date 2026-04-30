'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

const DEG = Math.PI / 180;
interface Vec3 { x: number; y: number; z: number }

function ll2xyz(lat: number, lon: number): Vec3 {
  const phi = (90 - lat) * DEG;
  const theta = lon * DEG;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotY(v: Vec3, a: number): Vec3 {
  return {
    x: v.x * Math.cos(a) - v.z * Math.sin(a),
    y: v.y,
    z: v.x * Math.sin(a) + v.z * Math.cos(a),
  };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot);
  if (theta < 0.001) return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
  const s = Math.sin(theta);
  return {
    x: (Math.sin((1 - t) * theta) * a.x + Math.sin(t * theta) * b.x) / s,
    y: (Math.sin((1 - t) * theta) * a.y + Math.sin(t * theta) * b.y) / s,
    z: (Math.sin((1 - t) * theta) * a.z + Math.sin(t * theta) * b.z) / s,
  };
}

function elevate(v: Vec3, t: number, lift: number): Vec3 {
  const e = 1 + lift * Math.sin(Math.PI * t);
  return { x: v.x * e, y: v.y * e, z: v.z * e };
}

const CITIES = [
  { name: 'Tanzania',  flag: '🇹🇿', lat: -6.8,  lon: 39.3,   highlight: true  },
  { name: 'China',     flag: '🇨🇳', lat: 31.2,  lon: 121.5,  highlight: true  },
  { name: 'New York',  flag: '🇺🇸', lat: 40.7,  lon: -74.0,  highlight: false },
  { name: 'London',    flag: '🇬🇧', lat: 51.5,  lon: -0.1,   highlight: false },
  { name: 'Dubai',     flag: '🇦🇪', lat: 25.2,  lon: 55.3,   highlight: false },
  { name: 'Lagos',     flag: '🇳🇬', lat: 6.5,   lon: 3.4,    highlight: false },
  { name: 'Singapore', flag: '🇸🇬', lat: 1.3,   lon: 103.8,  highlight: false },
  { name: 'Nairobi',   flag: '🇰🇪', lat: -1.3,  lon: 36.8,   highlight: false },
  { name: 'Mumbai',    flag: '🇮🇳', lat: 19.1,  lon: 72.9,   highlight: false },
  { name: 'Paris',     flag: '🇫🇷', lat: 48.9,  lon: 2.3,    highlight: false },
  { name: 'São Paulo', flag: '🇧🇷', lat: -23.5, lon: -46.6,  highlight: false },
];

// Each route can carry multiple simultaneous particles (offsets)
const ROUTES = [
  { from: 0, to: 1,  hue: 'cyan', offsets: [0.0, 0.5]        },
  { from: 1, to: 0,  hue: 'blue', offsets: [0.25, 0.75]       },
  { from: 2, to: 0,  hue: 'cyan', offsets: [0.1]              },
  { from: 0, to: 3,  hue: 'blue', offsets: [0.6]              },
  { from: 4, to: 0,  hue: 'cyan', offsets: [0.4]              },
  { from: 5, to: 1,  hue: 'blue', offsets: [0.2, 0.7]         },
  { from: 1, to: 2,  hue: 'cyan', offsets: [0.35]             },
  { from: 6, to: 0,  hue: 'blue', offsets: [0.55]             },
  { from: 8, to: 4,  hue: 'cyan', offsets: [0.15]             },
  { from: 9, to: 0,  hue: 'blue', offsets: [0.8]              },
  { from: 10, to: 0, hue: 'cyan', offsets: [0.45]             },
  { from: 0, to: 6,  hue: 'blue', offsets: [0.9]              },
  { from: 7, to: 1,  hue: 'cyan', offsets: [0.05, 0.6]        },
];

const STEPS = 90;

// Pre-compute arc points for each route
function buildArc(from: (typeof CITIES)[0], to: (typeof CITIES)[0]) {
  const a = ll2xyz(from.lat, from.lon);
  const b = ll2xyz(to.lat, to.lon);
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    return elevate(slerp(a, b, t), t, 0.32);
  });
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef(0.4);   // start offset so Africa faces viewer
  const timeRef   = useRef(0);
  const arcsRef   = useRef<Vec3[][]>([]);
  const { resolvedTheme } = useTheme();

  // Build arcs once
  useEffect(() => {
    arcsRef.current = ROUTES.map(r => buildArc(CITIES[r.from], CITIES[r.to]));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = resolvedTheme === 'dark';
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.43;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rot = rotRef.current;
    const t   = timeRef.current;

    // ── Atmosphere glow ──────────────────────────────
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
    atmo.addColorStop(0, isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)');
    atmo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = atmo;
    ctx.fill();

    // ── Globe background ─────────────────────────────
    const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    if (isDark) {
      bg.addColorStop(0, 'rgba(24,58,120,0.65)');
      bg.addColorStop(0.6, 'rgba(10,25,70,0.80)');
      bg.addColorStop(1, 'rgba(3,10,35,0.92)');
    } else {
      bg.addColorStop(0, 'rgba(215,232,255,0.75)');
      bg.addColorStop(1, 'rgba(190,215,255,0.4)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = bg;
    ctx.fill();

    // Specular highlight
    const spec = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.7);
    spec.addColorStop(0, isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.25)');
    spec.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();

    // Globe rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.4)' : 'rgba(59,130,246,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ── Grid ────────────────────────────────────────
    const gridC = isDark ? '100,160,255' : '59,130,246';
    ctx.lineWidth = 0.5;

    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = 0; lon <= 360; lon += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const a = Math.max(0, p.z * 0.18);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridC},0.14)`;
      ctx.stroke();
    }
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridC},0.14)`;
      ctx.stroke();
    }

    // ── Arcs ─────────────────────────────────────────
    const speed = 0.00085; // faster than before

    ROUTES.forEach((route, ri) => {
      const arc = arcsRef.current[ri];
      if (!arc) return;

      // Dim base path
      ctx.lineWidth = 0.7;
      for (let i = 1; i <= STEPS; i++) {
        const rA = rotY(arc[i - 1], rot);
        const rB = rotY(arc[i], rot);
        if (rA.z < -0.15 && rB.z < -0.15) continue;
        const vis = Math.max(0, ((rA.z + rB.z) / 2 + 0.15));
        const alpha = vis * (isDark ? 0.15 : 0.1);
        ctx.beginPath();
        ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
        ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${alpha})` : `rgba(147,197,253,${alpha})`;
        ctx.stroke();
      }

      // Multiple particles per route
      route.offsets.forEach((offset) => {
        const rawT = ((t * speed + offset) % 1 + 1) % 1;
        const trailLen = 0.18;
        const trailStart = Math.max(0, rawT - trailLen);

        // Bright trail
        ctx.lineWidth = 2.2;
        for (let i = 1; i <= STEPS; i++) {
          const ti = i / STEPS;
          if (ti < trailStart || ti > rawT) continue;
          const rA = rotY(arc[i - 1], rot);
          const rB = rotY(arc[i], rot);
          if (rA.z < -0.1 && rB.z < -0.1) continue;
          const fade = (ti - trailStart) / trailLen;
          const vis  = Math.max(0, ((rA.z + rB.z) / 2) + 0.3);
          const alpha = fade * vis * 0.95;
          const col = route.hue === 'cyan' ? '34,211,238' : '147,197,253';
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
          if (rH.z > -0.1) {
            const hx = cx + rH.x * R, hy = cy - rH.y * R;
            const col = route.hue === 'cyan' ? '34,211,238' : '147,197,253';

            // Outer glow
            const g1 = ctx.createRadialGradient(hx, hy, 0, hx, hy, 9);
            g1.addColorStop(0, `rgba(${col},0.8)`);
            g1.addColorStop(1, `rgba(${col},0)`);
            ctx.beginPath(); ctx.arc(hx, hy, 9, 0, Math.PI * 2);
            ctx.fillStyle = g1; ctx.fill();

            // Core
            ctx.beginPath(); ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = route.hue === 'cyan' ? '#a5f3fc' : '#dbeafe';
            ctx.fill();

            // Arrival burst when reaching destination
            if (rawT > 0.92) {
              const burst = (rawT - 0.92) / 0.08;
              const br = burst * 16;
              const g2 = ctx.createRadialGradient(hx, hy, 0, hx, hy, br);
              g2.addColorStop(0, `rgba(${col},${0.5 * (1 - burst)})`);
              g2.addColorStop(1, `rgba(${col},0)`);
              ctx.beginPath(); ctx.arc(hx, hy, br, 0, Math.PI * 2);
              ctx.fillStyle = g2; ctx.fill();
            }
          }
        }
      });
    });

    // ── City dots + flags ────────────────────────────
    CITIES.forEach((city) => {
      const p = rotY(ll2xyz(city.lat, city.lon), rot);
      if (p.z < 0.0) return;
      const sx = cx + p.x * R;
      const sy = cy - p.y * R;
      const vis = Math.min(1, (p.z + 0.1) * 4);

      if (city.highlight) {
        // Multi-ring pulse
        const pulse1 = (Math.sin(t * 0.006) + 1) / 2;
        const pulse2 = (Math.sin(t * 0.006 + Math.PI) + 1) / 2;

        ctx.beginPath();
        ctx.arc(sx, sy, 5 + pulse1 * 8, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(34,211,238,${(0.55 - pulse1 * 0.4) * vis})`
          : `rgba(37,99,235,${(0.4 - pulse1 * 0.3) * vis})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, 3 + pulse2 * 5, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(34,211,238,${(0.35 - pulse2 * 0.25) * vis})`
          : `rgba(59,130,246,${(0.3 - pulse2 * 0.2) * vis})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#22d3ee' : '#2563eb';
        ctx.globalAlpha = vis;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Flag emoji
        ctx.font = '14px serif';
        ctx.globalAlpha = vis;
        ctx.fillText(city.flag, sx - 18, sy - 8);
        ctx.globalAlpha = 1;

        // Name label
        ctx.font = 'bold 10px ui-monospace, monospace';
        ctx.fillStyle = isDark
          ? `rgba(186,230,253,${0.95 * vis})`
          : `rgba(30,64,175,${0.9 * vis})`;
        ctx.fillText(city.name, sx + 7, sy + 4);

      } else {
        // Regular cities
        ctx.beginPath();
        ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.75 * vis})`
          : `rgba(59,130,246,${0.65 * vis})`;
        ctx.fill();

        // Flag
        ctx.font = '11px serif';
        ctx.globalAlpha = vis * 0.85;
        ctx.fillText(city.flag, sx - 13, sy - 5);
        ctx.globalAlpha = 1;

        // Name
        ctx.font = '9px ui-monospace, monospace';
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.6 * vis})`
          : `rgba(59,130,246,${0.55 * vis})`;
        ctx.fillText(city.name, sx + 5, sy + 3);
      }
    });

    ctx.restore();
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = 0;
    const loop = (ts: number) => {
      const dt = ts - last;
      last = ts;
      rotRef.current  += dt * 0.00025;   // ~25% faster rotation
      timeRef.current  = ts;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
}
