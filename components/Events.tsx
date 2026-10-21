import Image from "next/image";
import { upcomingEvents, upcomingFlyer } from "@/lib/content";
import styles from "./Events.module.css";

export default function Events() {
  return (
    <section className={styles.events} id="events">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Upcoming</p>
          <h2>Halloween with LP</h2>
        </div>
        <div className={styles.grid}>
          <figure className={styles.flyer}>
            <Image
              src={upcomingFlyer.src}
              alt={upcomingFlyer.alt}
              width={upcomingFlyer.width}
              height={upcomingFlyer.height}
              sizes="(max-width: 56rem) 90vw, 26rem"
            />
          </figure>
          <div className={styles.list}>
            <ul>
              {upcomingEvents.map((e) => (
                <li key={`${e.date}-${e.title}`}>
                  <span className={styles.date}>{e.date}</span>
                  <span className={styles.body}>
                    <span className={styles.title}>{e.title}</span>
                    <span className={styles.meta}>
                      @ {e.venue} · {e.time}
                    </span>
                  </span>
                  {e.tickets && (
                    <a className={styles.tix} href={e.tickets} target="_blank" rel="noopener">
                      Tickets →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
