import { bookingTypes, socials, bookingMailto } from "@/lib/content";
import styles from "./Book.module.css";

export default function Book() {
  return (
    <section className={styles.book} id="book">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Bookings</p>
          <h2>Get LP on the decks</h2>
        </div>
        <div className={styles.grid}>
          <ul className={styles.types}>
            {bookingTypes.map((type) => (
              <li key={type.title}>
                <span className={styles.t}>{type.title}</span>
                <span className={styles.d}>{type.detail}</span>
              </li>
            ))}
          </ul>
          <div className={styles.ctaPanel}>
            <h3>Lock the date</h3>
            <p>Date, venue, vibe — send it over and you&apos;ll hear back fast. The DMs are open.</p>
            <a className="btn" href={bookingMailto()}>
              Email LP →
            </a>
            <a className="btn btnGhost" href={socials.instagram} target="_blank" rel="noopener">
              DM @luispinzon_1
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
