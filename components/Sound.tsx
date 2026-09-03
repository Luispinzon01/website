import Image from "next/image";
import { rooms } from "@/lib/content";
import styles from "./Sound.module.css";

export default function Sound() {
  return (
    <section className={styles.sound} id="sound">
      <div className="wrap">
        <div className={styles.top}>
          <div className={`secHead ${styles.head}`}>
            <p className="kicker">The Sound</p>
            <h2>House, played for the room it&apos;s in</h2>
            <p>
              No preset playlist survives contact with a dance floor. Every set is built live — reading the
              room, doubling down on what lands, and steering the night instead of soundtracking it.
            </p>
          </div>
          <figure className={styles.fig}>
            <Image
              src="/photos/sound-mirage.jpg"
              alt="LP behind the decks, close on his hands working the mixer, lit in red"
              width={1067}
              height={1600}
              sizes="(max-width: 56rem) 60vw, 24rem"
              priority
            />
            <figcaption>Mirage @ El Valle · 08.28</figcaption>
          </figure>
        </div>
        <div className={styles.cards}>
          {rooms.map((room) => (
            <div className={styles.card} key={room.title}>
              <span className={styles.idx}>{room.index}</span>
              <h3>{room.title}</h3>
              <p>{room.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
