import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ActionBar from "@/components/ActionBar";
import Sound from "@/components/Sound";
import Gallery from "@/components/Gallery";
import Dates from "@/components/Dates";
import Book from "@/components/Book";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ActionBar />
        <Sound />
        <Gallery />
        <Dates />
        <Book />
      </main>
      <Footer />
    </>
  );
}
