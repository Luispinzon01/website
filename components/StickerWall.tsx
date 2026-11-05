"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { galleryGroups } from "@/lib/content";
import styles from "./StickerWall.module.css";

const photos = galleryGroups.flatMap((g) => g.photos.map((p) => ({ ...p, group: g.title })));
const PHI = 0.6180339887;

type Pos = { x: number; y: number; rot: number };

// Y2K sticker board: photos are die-cut stickers you pick up and fling.
// Pure pointer events (no deps); momentum + wall bounce; the grabbed one
// jumps to the front. Arrow keys nudge a focused sticker.
export default function StickerWall() {
  const board = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLElement | null)[]>([]);
  const pos = useRef<Pos[]>(photos.map((_, i) => ({ x: 0, y: 0, rot: ((i * 37) % 17) - 8 })));
  const top = useRef(photos.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = new Map<number, number>();
    const P = (i: number) => pos.current[i] as Pos;

    const apply = (i: number, tilt = 0) => {
      const p = P(i);
      const el = els.current[i];
      if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot + tilt}deg)`;
    };
    // Keep a sticker inside the board; returns which axes hit a wall.
    const clamp = (i: number) => {
      const b = board.current;
      const el = els.current[i];
      if (!b || !el) return { hx: false, hy: false };
      const bb = b.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      let dx = 0;
      let dy = 0;
      if (r.left < bb.left) dx = bb.left - r.left;
      else if (r.right > bb.right) dx = bb.right - r.right;
      if (r.top < bb.top) dy = bb.top - r.top;
      else if (r.bottom > bb.bottom) dy = bb.bottom - r.bottom;
      P(i).x += dx;
      P(i).y += dy;
      return { hx: dx !== 0, hy: dy !== 0 };
    };

    const cleanups = els.current.map((el, i) => {
      if (!el) return () => {};
      let down = false;
      let sx = 0;
      let sy = 0;
      let ox = 0;
      let oy = 0;
      let lx = 0;
      let ly = 0;
      let lt = 0;
      let vx = 0;
      let vy = 0;

      const glide = () => {
        const p = P(i);
        p.x += vx;
        p.y += vy;
        const { hx, hy } = clamp(i);
        if (hx) vx *= -0.5;
        if (hy) vy *= -0.5;
        vx *= 0.93;
        vy *= 0.93;
        apply(i, Math.max(-10, Math.min(10, vx * 1.2)));
        if (Math.abs(vx) + Math.abs(vy) > 0.4) raf.set(i, requestAnimationFrame(glide));
        else apply(i);
      };
      const onDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        cancelAnimationFrame(raf.get(i) ?? 0);
        down = true;
        sx = lx = e.clientX;
        sy = ly = e.clientY;
        ox = P(i).x;
        oy = P(i).y;
        lt = performance.now();
        vx = vy = 0;
        top.current += 1;
        el.style.zIndex = String(top.current);
        el.dataset.held = "true";
        el.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!down) return;
        P(i).x = ox + e.clientX - sx;
        P(i).y = oy + e.clientY - sy;
        clamp(i);
        const now = performance.now();
        const dt = Math.max(now - lt, 8);
        vx = Math.max(-45, Math.min(45, ((e.clientX - lx) / dt) * 16));
        vy = Math.max(-45, Math.min(45, ((e.clientY - ly) / dt) * 16));
        lx = e.clientX;
        ly = e.clientY;
        lt = now;
        apply(i, Math.max(-10, Math.min(10, vx * 1.2)));
      };
      const onUp = () => {
        if (!down) return;
        down = false;
        delete el.dataset.held;
        if (reduce) apply(i);
        else raf.set(i, requestAnimationFrame(glide));
      };
      const onKey = (e: KeyboardEvent) => {
        const step = 24;
        const d: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
        };
        const m = d[e.key];
        if (!m) return;
        e.preventDefault();
        top.current += 1;
        el.style.zIndex = String(top.current);
        P(i).x += m[0];
        P(i).y += m[1];
        clamp(i);
        apply(i);
      };

      apply(i);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(raf.get(i) ?? 0);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("keydown", onKey);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section className={styles.wall} id="gallery">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Gallery</p>
          <h2>Recent rooms</h2>
          <p>Straight off the last few nights. Pick one up and throw it.</p>
        </div>
      </div>
      <div className={styles.board} ref={board}>
        {photos.map((p, i) => {
          // Low-discrepancy scatter: even coverage, same on server and client.
          const left = 2 + ((i * PHI) % 1) * 74;
          const topPct = 2 + ((i * PHI * PHI * 3.7) % 1) * 78;
          return (
            <figure
              key={p.src}
              className={styles.sticker}
              ref={(n) => {
                els.current[i] = n;
              }}
              style={{ left: `min(${left}%, calc(100% - var(--w) - 0.4rem))`, top: `${topPct}%`, zIndex: i + 1 }}
              tabIndex={0}
              aria-label={`${p.group}: ${p.caption}. Drag, or use arrow keys to move.`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 40rem) 40vw, 16rem"
                draggable={false}
              />
              <figcaption>
                {p.group} · {p.caption}
              </figcaption>
              {i % 5 === 0 && <span className={styles.star} aria-hidden="true">✦</span>}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
