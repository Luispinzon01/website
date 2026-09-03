// Single source of truth for site copy and structured data.
// Design system §12: "Content in one data module, not scattered through components."

export type NavLink = {
  href: string;
  label: string;
  isCta?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "#sound", label: "Sound" },
  { href: "#gallery", label: "Gallery" },
  { href: "#dates", label: "Dates" },
  { href: "#book", label: "Book →", isCta: true },
];

export const socials = {
  instagram: "https://www.instagram.com/luispinzon_1/",
  threads: "https://www.threads.net/@luispinzon_1",
};

export const contact = {
  email: "lpsessionsllc@gmail.com",
};

// Design system §8: "Forms without a backend — both sites compose a
// structured mailto:, no server to stand up." A prefilled subject/body
// beats a bare address: it tells LP exactly what to answer.
export function bookingMailto(): string {
  const subject = "Booking inquiry — LP";
  const body = [
    "Hey LP,",
    "",
    "Date:",
    "Venue / city:",
    "Event type (rooftop, private, corporate, etc.):",
    "Expected crowd size:",
    "",
    "Details:",
  ].join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type Room = {
  index: string;
  title: string;
  copy: string;
};

export const rooms: Room[] = [
  {
    index: "ROOM / 01",
    title: "Rooftops",
    copy: "Golden-hour into after-dark. Grooves that build with the skyline — the Clermont Rooftop kind of night.",
  },
  {
    index: "ROOM / 02",
    title: "Pubs & Bars",
    copy: "House in the neighborhood — Virginia-Highland energy. Warm, loose, and loud enough to pull the bar onto its feet.",
  },
  {
    index: "ROOM / 03",
    title: "Beach & Daytime",
    copy: "Sun-up sets on the coast — Grayton Beach afternoons. Easy tempo, good vibes, no rush.",
  },
];

export type TourDate = {
  date: string;
  venue: string;
  city: string;
  next?: boolean;
};

export const tourDates: TourDate[] = [
  { date: "08 · 28", venue: "Mirage @ El Valle", city: "Atlanta, GA", next: true },
  { date: "08 · 21", venue: "Clermont Rooftop", city: "Atlanta, GA" },
  { date: "05 · 23", venue: "Chiringo", city: "Grayton Beach, FL" },
  { date: "05 · 15", venue: "Neighbor's Pub — PorchFest Mic Check", city: "Virginia-Highland, ATL" },
];

export type BookingType = {
  title: string;
  detail: string;
};

export const bookingTypes: BookingType[] = [
  { title: "Rooftops & Bars", detail: "Residencies · guest sets" },
  { title: "Private Events", detail: "Parties · celebrations" },
  { title: "Daytime & Patio", detail: "Brunch · beach · pool" },
  { title: "Corporate", detail: "Launches · socials" },
];

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** The one large banner photo that opens its group. */
  feature?: boolean;
};

export type GalleryGroup = {
  slug: string;
  kicker: string;
  title: string;
  photos: GalleryPhoto[];
};

// Alt text and captions describe only what is visibly true in the frame —
// no invented venue names or dates beyond the confirmed Mirage @ El Valle set (§1.9, §11).
export const galleryGroups: GalleryGroup[] = [
  {
    slug: "mirage",
    kicker: "08.28 · Atlanta",
    title: "Mirage @ El Valle",
    photos: [
      {
        src: "/photos/gallery-mirage-booth.jpg",
        width: 1200,
        height: 1800,
        alt: "LP behind the decks under the Mirage sign, crowd silhouetted in red light",
        caption: "On the decks",
        feature: true,
      },
      {
        src: "/photos/gallery-mirage-lights.jpg",
        width: 933,
        height: 1400,
        alt: "Abstract red stage lighting bursting over the Mirage dance floor",
        caption: "The room, mid-set",
      },
      {
        src: "/photos/gallery-mirage-crowd.jpg",
        width: 933,
        height: 1400,
        alt: "Silhouetted crowd with hands raised under red light at Mirage",
        caption: "Hands up",
      },
      {
        src: "/photos/gallery-mirage-dance.jpg",
        width: 933,
        height: 1400,
        alt: "Dancers close to the camera under red club lighting",
        caption: "On the floor",
      },
      {
        src: "/photos/gallery-mirage-friends.jpg",
        width: 933,
        height: 1400,
        alt: "A group dancing and laughing together under red light",
        caption: "The crowd",
      },
      {
        src: "/photos/gallery-mirage-cheers.jpg",
        width: 933,
        height: 1400,
        alt: "Two women laughing with drinks in hand on the dance floor",
        caption: "Cheers",
      },
      {
        src: "/photos/gallery-mirage-group.jpg",
        width: 1400,
        height: 933,
        alt: "A group of five posed together in front of the glowing Mirage sign",
        caption: "Under the sign",
      },
    ],
  },
  {
    slug: "rooms",
    kicker: "Rooftops, pubs & lounges",
    title: "More rooms",
    photos: [
      {
        src: "/photos/gallery-rooftop-skyline.jpg",
        width: 933,
        height: 1400,
        alt: "LP DJing on a rooftop with the Atlanta skyline lit up behind him",
        caption: "Rooftop set, Atlanta skyline",
        feature: true,
      },
      {
        src: "/photos/gallery-pub-booth.jpg",
        width: 1115,
        height: 1400,
        alt: "LP DJing at a small wood-paneled neighborhood bar",
        caption: "Neighborhood bar set",
      },
      {
        src: "/photos/gallery-pub-crowd.jpg",
        width: 1400,
        height: 934,
        alt: "LP DJing with the crowd cheering under blue disco lighting",
        caption: "Neighborhood bar set",
      },
      {
        src: "/photos/gallery-lounge-solo.jpg",
        width: 1400,
        height: 1050,
        alt: "LP DJing solo in a warmly lit wood-paneled lounge",
        caption: "Lounge set",
      },
      {
        src: "/photos/gallery-crew.jpg",
        width: 1400,
        height: 933,
        alt: "Four friends posing together at the bar before the set",
        caption: "Before the set",
      },
    ],
  },
];
