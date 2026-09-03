import Link from "next/link";
import { socials } from "@/lib/content";
import styles from "./ActionBar.module.css";

export default function ActionBar() {
  return (
    <div className={styles.bar}>
      <div className={`wrap ${styles.grid}`}>
        <Link href="#book" className={styles.item}>
          <span className={styles.label}>Book a Date →</span>
          <span className={styles.sub}>Lock the details</span>
        </Link>
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener"
          className={styles.item}
        >
          <span className={styles.label}>Follow</span>
          <span className={styles.sub}>@luispinzon_1</span>
        </a>
        <Link href="#gallery" className={styles.item}>
          <span className={styles.label}>Gallery ↓</span>
          <span className={styles.sub}>Recent sets</span>
        </Link>
      </div>
    </div>
  );
}
