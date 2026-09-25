"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { tourDates, socials } from "@/lib/content";
import styles from "./Dates.module.css";

export default function Dates() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Only advance while the ticket is actually in view — play on enter,
  // pause on exit, so the carousel never runs for a reader who's elsewhere.
  useEffect(() => {
    const ticket = ticketRef.current;
    if (!ticket) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry?.isIntersecting ?? false), {
      threshold: 0.5,
    });
    io.observe(ticket);
    return () => io.disconnect();
  }, []);

  // Auto-advance, paused on hover, keyboard focus, offscreen, and entirely
  // under prefers-reduced-motion (the reduced state is the static first card).
  const paused = hovered || focused || !onScreen;
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % tourDates.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  // Scroll the track itself — never scrollIntoView, which also scrolls the
  // page to reach the card and dragged the whole site down to this section
  // on load and on every tick.
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[active] as HTMLElement | undefined;
    if (!track || !card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    if (Math.abs(track.scrollLeft - left) < 1) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active]);

  // Keep the dots honest when someone swipes the track by hand.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(tourDates.length - 1, i)));
      }, 120);
    };
    track.addEventListener("scroll", sync, { passive: true });
    return () => {
      clearTimeout(settle);
      track.removeEventListener("scroll", sync);
    };
  }, []);

  return (
    <section id="dates">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Dates</p>
          <h2>On the decks</h2>
        </div>

        <div
          className={styles.ticket}
          ref={ticketRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div className={styles.head}>
            <Image className={styles.lp} src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} />
            <span className={styles.label}>Set Card · 2026</span>
          </div>

          <div
            className={styles.track}
            ref={trackRef}
            role="table"
            aria-label="Upcoming and recent dates"
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
