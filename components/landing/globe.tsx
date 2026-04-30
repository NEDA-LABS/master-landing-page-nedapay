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
  if (theta < 0.001) {
    return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
  }
  const s = Math.sin(theta);
  return {
    x: (Math.sin((1 - t) * theta) * a.x + Math.sin(t * theta) * b.x) / s,
    y: (Math.sin((1 - t) * theta) * a.y + Math.sin(t * theta) * b.y) / s,
    z: (Math.sin((1 - t) * theta) * a.z + Math.sin(t * theta) * b.z) / s,
  };
}

function elevate(v: Vec3, t: number, lift: number): Vec3 {
  const elev = 1 + lift * Math.sin(Math.PI * t);
  return { x: v.x * elev, y: v.y * elev, z: v.z * elev };
}

const CITIES = [
  { name: 'Tanzania',  lat: -6.8,  lon: 39.3,   highlight: true  },
  { name: 'China',     lat: 31.2,  lon: 121.5,  highlight: true  },
  { name: 'New York',  lat: 40.7,  lon: -74.0,  highlight: false },
  { name: 'London',    lat: 51.5,  lon: -0.1,   highlight: false },
  { name: 'Dubai',     lat: 25.2,  lon: 55.3,   highlight: false },
  { name: 'Lagos',     lat: 6.5,   lon: 3.4,    highlight: false },
  { name: 'Singapore', lat: 1.3,   lon: 103.8,  highlight: false },
  { name: 'Nairobi',   lat: -1.3,  lon: 36.8,   highlight: false },
  { name: 'Mumbai',    lat: 19.1,  lon: 72.9,   highlight: false },
];

const ROUTES = [
  { from: 0, to: 1, hue: 'cyan',  delay: 0.0  },
  { from: 1, to: 0, hue: 'blue',  delay: 0.35 },
  { from: 2, to: 0, hue: 'cyan',  delay: 0.1  },
  { from: 0, to: 3, hue: 'blue',  delay: 0.55 },
  { from: 4, to: 0, hue: 'cyan',  delay: 0.7  },
  { from: 5, to: 1, hue: 'blue',  delay: 0.2  },
  { from: 1, to: 2, hue: 'cyan',  delay: 0.85 },
  { from: 6, to: 0, hue: 'blue',  delay: 0.45 },
  { from: 8, to: 4, hue: 'cyan',  delay: 0.6  },
];

const STEPS = 80;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);
  const timeRef = useRef(0);
  const { resolvedTheme } = useTheme();

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
    const R = Math.min(W, H) * 0.44;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rot = rotRef.current;
    const t = timeRef.current;

    // ── Globe background ──────────────────────────────
    const bg = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, 0, cx, cy, R);
    if (isDark) {
      bg.addColorStop(0, 'rgba(20,50,120,0.55)');
      bg.addColorStop(1, 'rgba(4,12,40,0.85)');
    } else {
      bg.addColorStop(0, 'rgba(210,230,255,0.6)');
      bg.addColorStop(1, 'rgba(190,215,255,0.3)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = bg;
    ctx.fill();

    // Globe rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ── Grid lines ───────────────────────────────────
    const gridAlpha = isDark ? 0.13 : 0.1;
    ctx.lineWidth = 0.5;

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = 0; lon <= 360; lon += 4) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const alpha = Math.max(0, (p.z + 0.2) / 1.2) * gridAlpha;
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = isDark ? `rgba(100,160,255,${gridAlpha})` : `rgba(59,130,246,${gridAlpha})`;
      ctx.stroke();
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = isDark ? `rgba(100,160,255,${gridAlpha})` : `rgba(59,130,246,${gridAlpha})`;
      ctx.stroke();
    }

    // ── Arcs ─────────────────────────────────────────
    ROUTES.forEach((route) => {
      const from = ll2xyz(CITIES[route.from].lat, CITIES[route.from].lon);
      const to   = ll2xyz(CITIES[route.to].lat,   CITIES[route.to].lon);

      // pre-compute arc path
      const arcPts: { v: Vec3; t: number }[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const ti = i / STEPS;
        const v = slerp(from, to, ti);
        arcPts.push({ v: elevate(v, ti, 0.28), t: ti });
      }

      // particle position (0→1 with delay and looping)
      const speed = 0.0006;
      const rawT = ((t * speed + route.delay) % 1 + 1) % 1;

      // Draw dim base arc (visible hemisphere only)
      ctx.lineWidth = 0.8;
      arcPts.forEach((pt, i) => {
        if (i === 0) return;
        const rA = rotY(arcPts[i - 1].v, rot);
        const rB = rotY(pt.v, rot);
        if (rA.z < -0.1 && rB.z < -0.1) return;
        const alpha = Math.max(0, Math.min(1, (rA.z + rB.z) / 2 + 0.15)) * (isDark ? 0.18 : 0.12);
        ctx.beginPath();
        ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
        ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${alpha})`
          : `rgba(96,165,250,${alpha})`;
        ctx.stroke();
      });

      // Draw particle trail
      const trailLen = 0.14;
      const trailStart = Math.max(0, rawT - trailLen);
      ctx.lineWidth = 2;
      for (let i = 1; i <= STEPS; i++) {
        const ti = i / STEPS;
        const tiPrev = (i - 1) / STEPS;
        if (ti < trailStart || ti > rawT) continue;
        const rA = rotY(arcPts[i - 1].v, rot);
        const rB = rotY(arcPts[i].v, rot);
        if (rA.z < -0.05 && rB.z < -0.05) continue;
        const fade = (ti - trailStart) / trailLen;
        const alpha = Math.max(0, fade) * Math.max(0, Math.min(1, ((rA.z + rB.z) / 2) + 0.3));
        ctx.beginPath();
        ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
        ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${alpha * 0.9})`
          : `rgba(147,197,253,${alpha * 0.9})`;
        ctx.stroke();
      }

      // Draw particle dot head
      const headIdx = Math.round(rawT * STEPS);
      if (headIdx < arcPts.length) {
        const rH = rotY(arcPts[headIdx].v, rot);
        if (rH.z > -0.1) {
          const hx = cx + rH.x * R;
          const hy = cy - rH.y * R;
          // Glow
          const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 6);
          const col = route.hue === 'cyan' ? '34,211,238' : '147,197,253';
          glow.addColorStop(0, `rgba(${col},0.9)`);
          glow.addColorStop(1, `rgba(${col},0)`);
          ctx.beginPath();
          ctx.arc(hx, hy, 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(hx, hy, 2, 0, Math.PI * 2);
          ctx.fillStyle = route.hue === 'cyan' ? '#67e8f9' : '#bfdbfe';
          ctx.fill();
        }
      }
    });

    // ── City dots ────────────────────────────────────
    CITIES.forEach((city) => {
      const p = rotY(ll2xyz(city.lat, city.lon), rot);
      if (p.z < 0) return;
      const sx = cx + p.x * R;
      const sy = cy - p.y * R;

      if (city.highlight) {
        // Pulsing ring
        const pulse = (Math.sin(t * 0.004) + 1) / 2;
        const ringR = 5 + pulse * 5;
        ctx.beginPath();
        ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(34,211,238,${0.5 - pulse * 0.3})`
          : `rgba(37,99,235,${0.4 - pulse * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#22d3ee' : '#2563eb';
        ctx.fill();
        // Label
        ctx.font = 'bold 10px ui-monospace, monospace';
        ctx.fillStyle = isDark ? 'rgba(186,230,253,0.9)' : 'rgba(30,64,175,0.85)';
        ctx.fillText(city.name, sx + 7, sy - 4);
      } else {
        // Regular dot
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(147,197,253,0.7)' : 'rgba(59,130,246,0.6)';
        ctx.fill();
        // Small label
        ctx.font = '9px ui-monospace, monospace';
        ctx.fillStyle = isDark ? 'rgba(147,197,253,0.55)' : 'rgba(59,130,246,0.5)';
        ctx.fillText(city.name, sx + 5, sy - 2);
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
      rotRef.current += dt * 0.00018;  // slow auto-rotation
      timeRef.current = ts;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
