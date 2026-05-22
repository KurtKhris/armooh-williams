import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import Stats from "@/components/sections/Stats";
import FounderBio from "@/components/sections/FounderBio";

export const revalidate = 60; // ISR: revalidate in background every 60 seconds

export default async function HomePage() {
  const areas = await db
    .select()
    .from(practiceAreas)
    .where(eq(practiceAreas.published, true))
    .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt))
    .catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PracticeAreas areas={areas} />
        <Stats />
        <FounderBio />
        <Testimonials />
        <BlogPreview />
        <ClientsMarquee />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
