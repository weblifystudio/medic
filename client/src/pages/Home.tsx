import { Header, FloatingReserveButton } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Privatisations } from "@/components/Privatisations";
import { Reservation } from "@/components/Reservation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-softcream dark:bg-background">
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Privatisations />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <FloatingReserveButton />
    </div>
  );
}
