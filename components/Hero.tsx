import Image from "next/image";
import Wave from "./Wave";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <header className={styles.hero} id="top">
        <Image
          className={styles.photo}
          src="/photos/hero-main.jpg"
          alt="LP wearing sunglasses and headphones, lit in red at Mirage @ El Valle"
          width={1600}
          height={2400}
          priority
          sizes="(max-width: 48rem) 100vw, 68vw"
        />
        <div className={styles.shade} aria-hidden="true" />
        <Wave />
        <div className={`wrap ${styles.inner}`}>
          <p className="kicker">House DJ · Auburn | Atlanta</p>
          <h1 className={styles.name}>
            <Image src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} priority />
          </h1>
          <p className={styles.fullName}>
            <b>Luis Pinzón</b>
          </p>
          <div className={styles.sub}>
            <p>
              House music for rooms that feel good — rooftops, neighborhood pubs and beach bars. Keeping it
              simple. More coming soon.
            </p>
            <span className={styles.coords}>33.7490° N / 84.3880° W — ATL</span>
          </div>
        </div>
      </header>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>House Music</span>
          <span>Soli Deo Gloria</span>
          <span>Atlanta</span>
          <span>Amor Fati</span>
          <span>Keeping It Simple</span>
          <span>Auburn</span>
          <span>House Music</span>
          <span>Soli Deo Gloria</span>
          <span>Atlanta</span>
          <span>Amor Fati</span>
          <span>Keeping It Simple</span>
          <span>Auburn</span>
        </div>
      </div>
    </>
  );
}
