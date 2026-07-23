import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { MobileApp } from "@/components/MobileApp";
import { ProjectBoost } from "@/components/ProjectBoost";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <MobileApp />
        <ProjectBoost />
        <Process />
        <Testimonials />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
