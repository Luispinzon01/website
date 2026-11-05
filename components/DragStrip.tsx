"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryGroups } from "@/lib/content";
import styles from "./DragStrip.module.css";

// Hand-picked order: the strongest frame from each group, then the rest.
const slides = galleryGroups.flatMap((g) => g.photos.filter((p) => p.feature)).concat(
  galleryGroups.flatMap((g) => g.photos.filter((p) => !p.feature).slice(0, 2)),
);

export default function DragStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  // Mouse drag-to-scrub with momentum. Touch and trackpads keep native
  // scrolling; keyboard users get arrow keys from the focusable scroller.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let v = 0;
    let raf = 0;

    const glide = () => {
      el.scrollLeft += v;
      v *= 0.94;
      if (Math.abs(v) > 0.3) raf = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      down = true;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastT = performance.now();
      v = 0;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "true";
      setTouched(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
      const now = performance.now();
      v = Math.max(-45, Math.min(45, ((lastX - e.clientX) / Math.max(now - lastT, 8)) * 16));
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      delete el.dataset.dragging;
      if (!reduce) raf = requestAnimationFrame(glide);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className={styles.strip} aria-label="Photo strip — drag to scroll">
      <div className={styles.hint} data-hidden={touched}>
        <span>✦ Drag</span>
        <span aria-hidden="true">←→</span>
      </div>
      <div className={styles.scroller} ref={ref} tabIndex={0}>
        {slides.map((p) => (
          <figure className={styles.frame} key={p.src}>
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(max-width: 40rem) 70vw, 40vw"
              draggable={false}
            />
            <span className={styles.gloss} aria-hidden="true" />
          </figure>
        ))}
      </div>
    </section>
  );
}
