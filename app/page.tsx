import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ActionBar from "@/components/ActionBar";
import Sound from "@/components/Sound";
import Events from "@/components/Events";
import StickerWall from "@/components/StickerWall";
import DragStrip from "@/components/DragStrip";
import SparkleTrail from "@/components/SparkleTrail";
import Dates from "@/components/Dates";
import Book from "@/components/Book";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SparkleTrail />
      <Nav />
      <main id="main">
        <Hero />
        <DragStrip />
        <Events />
        <ActionBar />
        <Sound />
        <StickerWall />
        <Dates />
        <Book />
      </main>
      <Footer />
    </>
  );
}
