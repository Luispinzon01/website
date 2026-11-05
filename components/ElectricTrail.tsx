"use client";

import { useEffect } from "react";

type Pt = { x: number; y: number; t: number };

const LIFE = 220; // ms a point stays in the trail
const STILL = 50; // ms without movement before the bolt starts retracting

// Silver "electricity" cursor: a crackling bolt behind the mouse, built from
// the last ~200ms of movement. The path is re-jittered every frame, which is
// what makes it flicker. Mouse-only; skipped under reduced motion.
export default function ElectricTrail() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:95;pointer-events:none";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    let trail: Pt[] = [];
    let lastMove = 0;
    let raf = 0;

    // Walk the trail, dropping a jittered vertex roughly every 18px.
    const bolt = (pts: Pt[], spread: number, drift: number) => {
      ctx.beginPath();
      const first = pts[0] as Pt;
      ctx.moveTo(first.x + drift, first.y + drift);
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1] as Pt;
        const b = pts[i] as Pt;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.floor(len / 18));
        for (let s = 1; s <= steps; s++) {
          const k = s / steps;
          const jx = s === steps && i === pts.length - 1 ? 0 : (Math.random() - 0.5) * spread;
          const jy = s === steps && i === pts.length - 1 ? 0 : (Math.random() - 0.5) * spread;
          ctx.lineTo(a.x + dx * k + jx + drift, a.y + dy * k + jy + drift);
        }
      }
      ctx.stroke();
    };

    const frame = () => {
      const now = performance.now();
      trail = trail.filter((p) => now - p.t < LIFE);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let pts = trail;
      if (now - lastMove > STILL && trail.length > 1) {
        // Cursor stopped: retract the bolt toward the pointer.
        const k = Math.min((now - lastMove - STILL) / LIFE, 1);
        pts = trail.slice(-Math.max(2, Math.floor(trail.length * (1 - k * 0.9))));
      }

      if (pts.length > 1) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        // Three passes: wide soft halo, mid body, thin white core.
        ctx.shadowColor = "rgba(225, 232, 245, 0.9)";
        ctx.shadowBlur = 14;
        ctx.strokeStyle = "rgba(205, 212, 225, 0.28)";
        ctx.lineWidth = 3.4;
        bolt(pts, 9, 2);
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(225, 230, 240, 0.65)";
        ctx.lineWidth = 1.6;
        bolt(pts, 7, 1);
        ctx.shadowBlur = 3;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 0.8;
        bolt(pts, 5, 0);
        ctx.shadowBlur = 0;
      }

      if (trail.length > 1) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      trail.push({ x: e.clientX, y: e.clientY, t: now });
      lastMove = now;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", fit);
      canvas.remove();
    };
  }, []);

  return null;
}
