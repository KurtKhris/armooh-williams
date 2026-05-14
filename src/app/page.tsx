import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import ConsultationModal from "@/components/sections/ConsultationModal";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import { db } from "@/lib/db";
import { practiceAreas, posts } from "@/lib/schema";
import { eq, asc, desc } from "drizzle-orm";
import Stats from "@/components/sections/Stats";

export const revalidate = 60; // ISR: revalidate in background every 60 seconds

export default async function HomePage() {
  const areas = await db
    .select()
    .from(practiceAreas)
    .where(eq(practiceAreas.published, true))
    .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt))
    .catch(() => []);

  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(3)
    .catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PracticeAreas areas={areas} />
        <Stats />
        <Testimonials />
        <BlogPreview posts={latestPosts} />
        <ClientsMarquee />
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
