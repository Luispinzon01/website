import type { Metadata } from "next";
import { Big_Shoulders, Schibsted_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

// next/font self-hosts these at build time — no runtime request to Google
// Fonts, and no network-dependent build step once installed (design
// system: "Self-host fonts. Never fetch from Google at build time — it
// makes builds network-dependent and fails opaquely in CI").
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["500", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luispinzon.com"),
  title: "LP — Luis Pinzón",
  description:
    "LP — Luis Pinzón. House DJ, Atlanta. Rooftops, pubs, beach bars. Keeping it simple.",
  openGraph: {
    title: "LP — Luis Pinzón",
    description: "House DJ, Atlanta. Rooftops, pubs, beach bars. Keeping it simple.",
    images: ["/photos/hero-main.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${schibstedGrotesk.variable} ${splineSansMono.variable}`}>
      <body>
        {/* Design system §9: skip link to #main. */}
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
