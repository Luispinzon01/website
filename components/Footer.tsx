import Image from "next/image";
import { socials } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>
          <Image src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} className={styles.markImg} />
          Luis Pinzón
        </span>
        <ul className={styles.links}>
          <li>
            <a href={socials.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
          </li>
          <li>
            <a href={socials.threads} target="_blank" rel="noopener">
              Threads
            </a>
          </li>
        </ul>
        <small className={styles.small}>© 2026 Luis Pinzón · Soli Deo Gloria · Photos: Clip Play Media</small>
      </div>
    </footer>
  );
}
