import Image from "next/image";
import { galleryGroups } from "@/lib/content";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section className={styles.gallery} id="gallery">
      <div className="wrap">
        <div className="secHead">
          <p className="kicker">Gallery</p>
          <h2>Recent rooms</h2>
          <p>
            Straight off the last few nights — Mirage @ El Valle, a rooftop, a neighborhood bar. No stage, no
            filter.
          </p>
        </div>

        {galleryGroups.map((group) => {
          const [feature, ...rest] = group.photos;
          return (
            <div className={styles.group} key={group.slug}>
              <div className={styles.groupHead}>
                <p className="kicker">{group.kicker}</p>
                <h3>{group.title}</h3>
              </div>

              {feature && (
                <figure className={styles.feature}>
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    width={feature.width}
                    height={feature.height}
                    sizes="(max-width: 40rem) 100vw, 72rem"
                    priority={false}
                  />
                  <figcaption className={styles.featureCaption}>{feature.caption}</figcaption>
                </figure>
              )}

              <div className={styles.masonry}>
                {rest.map((photo) => (
                  <figure className={styles.card} key={photo.src}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 34rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                      loading="lazy"
                    />
                    <figcaption className={styles.cardLabel}>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
