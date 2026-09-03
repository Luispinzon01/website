"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

// Ambient waveform in the hero — pure canvas, no audio input. Three
// phase-shifted sine stacks drift slowly; the red line is the "signal",
// the gold lines are the room. Reduced motion gets a single designed
// still frame (design system §1.5), not just a frozen animation.
export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function line(t: number, amp: number, freq: number, speed: number, yBase: number, color: string, lineWidth: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const n = x / width;
        // envelope tapers the wave at both edges so it feels contained
        const env = Math.sin(n * Math.PI);
        const y =
          yBase +
          Math.sin(n * freq * Math.PI * 2 + t * speed) * amp * env +
          Math.sin(n * freq * 5.3 + t * speed * 1.7) * amp * 0.25 * env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const mid = height * 0.62;
      line(t, height * 0.1, 1.6, 0.35, mid + 18, "rgba(255,255,255,0.08)", 1);
      line(t, height * 0.14, 1.1, 0.22, mid + 6, "rgba(255,255,255,0.14)", 1);
      line(t, height * 0.18, 0.8, 0.28, mid, "rgba(255,255,255,0.55)", 1.6);
    }

    function handleResize() {
      resize();
      if (reduced) draw(40);
    }

    resize();
    window.addEventListener("resize", handleResize);

    if (reduced) {
      draw(40);
    } else {
      let t = 0;
      const tick = () => {
        t += 0.016;
        draw(t);
        rafId = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} id="wave" className={styles.wave} aria-hidden="true" />;
}
