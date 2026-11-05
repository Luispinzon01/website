"use client";

import { useEffect } from "react";
import styles from "./SparkleTrail.module.css";

// Y2K cursor trail: a short-lived ✦ drops behind the mouse every ~28px.
// Mouse-only (fine pointer) and skipped entirely under reduced motion.
export default function SparkleTrail() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const layer = document.createElement("div");
    layer.className = styles.layer ?? "";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    let lx = -100;
    let ly = -100;
    const onMove = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 28) return;
      if (layer.childElementCount > 40) return;
      lx = e.clientX;
      ly = e.clientY;
      const s = document.createElement("span");
      s.textContent = "✦";
      s.className = styles.spark ?? "";
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      s.style.setProperty("--r", `${Math.round(Math.random() * 120 - 60)}deg`);
      s.style.setProperty("--s", `${(0.7 + Math.random() * 0.9).toFixed(2)}`);
      s.addEventListener("animationend", () => s.remove());
      layer.appendChild(s);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      layer.remove();
    };
  }, []);

  return null;
}
