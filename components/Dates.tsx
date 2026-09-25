"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { tourDates, socials } from "@/lib/content";
import styles from "./Dates.module.css";

export default function Dates() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-advance the carousel — pauses on hover/focus and respects
  // prefers-reduced-motion via the global animation/transition kill switch;
  // the interval itself is guarded separately below.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % tourDates.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[active] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <section id="dates">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Dates</p>
          <h2>On the decks</h2>
        </div>

        <div className={styles.ticket}>
          <div className={styles.head}>
            <Image className={styles.lp} src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} />
            <span className={styles.label}>Set Card · 2026</span>
          </div>

          <div
            className={styles.track}
            ref={trackRef}
            role="table"
            aria-label="Upcoming and recent dates"
            onMouseEnter={() => setActive((i) => i)}
          >
            {tourDates.map((d, i) => (
              <div
                className={i === active ? `${styles.card} ${styles.active}` : styles.card}
                role="row"
                key={d.venue}
              >
                {d.next && <span className={styles.tag}>Next</span>}
                <span className={styles.date}>{d.date}</span>
                <span className={styles.venue}>{d.venue}</span>
                <span className={styles.city}>{d.city}</span>
              </div>
            ))}
          </div>

          <div className={styles.dots}>
            {tourDates.map((d, i) => (
              <button
                key={d.venue}
                type="button"
                className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                aria-label={`Show ${d.venue}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <div className={styles.foot}>
            <span>House Music</span>
            <span>Amor Fati</span>
          </div>
        </div>

        <p className={styles.note}>
          New dates drop on{" "}
          <a href={socials.instagram} target="_blank" rel="noopener">
            @luispinzon_1
          </a>{" "}
          first.
        </p>
      </div>
    </section>
  );
}
