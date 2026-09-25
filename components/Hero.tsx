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
          sizes="100vw"
        />
        <div className={styles.shade} aria-hidden="true" />
        <Wave />
        <div className={`wrap ${styles.inner}`}>
          <h1 className={styles.name}>
            <Image src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} priority />
          </h1>
          <p className={styles.fullName}>
            <b>Luis Pinzón</b>
          </p>
          <div className={styles.sub}>
            <span className={styles.coords}>33.7490° N / 84.3880° W — ATL</span>
          </div>
          <a className={`btn ${styles.bookBtn}`} href="#book">
            Book LP →
          </a>
        </div>
      </header>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span className={styles.avail}>Available For</span>
          <span>Clubs</span>
          <span>Lounges</span>
          <span>Rooftops</span>
          <span>Private Events</span>
          <span>Brand Activations</span>
          <span className={styles.avail}>Available For</span>
          <span>Clubs</span>
          <span>Lounges</span>
          <span>Rooftops</span>
          <span>Private Events</span>
          <span>Brand Activations</span>
        </div>
      </div>
    </>
  );
}
