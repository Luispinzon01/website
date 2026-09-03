import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Site">
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.mark} href="#top">
          <Image className={styles.lp} src="/logo/lp-mark-dark.png" alt="LP" width={480} height={480} priority />
          <span className={styles.full}>Luis Pinzón</span>
        </Link>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={link.isCta ? styles.cta : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
