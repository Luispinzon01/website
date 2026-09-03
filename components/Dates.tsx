import Image from "next/image";
import { tourDates, socials } from "@/lib/content";
import styles from "./Dates.module.css";

export default function Dates() {
  return (
    <section id="dates">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Dates</p>
          <h2>On the decks</h2>
        </div>
        <div className={styles.ticket} role="table" aria-label="Upcoming and recent dates">
          <div className={styles.head}>
            <Image className={styles.lp} src="/logo/lp-mark-light.png" alt="LP" width={480} height={480} />
            <span className={styles.label}>Set Card · 2026</span>
          </div>
          <div className={styles.rows}>
            {tourDates.map((d) => (
              <div className={d.next ? `${styles.row} ${styles.next}` : styles.row} role="row" key={d.venue}>
                <span className={styles.date}>{d.date}</span>
                <span className={styles.venue}>{d.venue}</span>
                <span className={styles.city}>{d.city}</span>
              </div>
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
