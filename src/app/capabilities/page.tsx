import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import PracticeAreas from "@/components/sections/PracticeAreas";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capabilities | Armooh-Williams, PLLC",
  description: "Armooh-Williams, PLLC offers comprehensive legal services across international law, community economic development, immigration, business law, and more.",
};

export default async function CapabilitiesPage() {
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
        <section className="pt-32 pb-16 gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6">
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Our Expertise</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-white mb-5">
              Our{" "}
              <span className="text-coral-500">Capabilities</span>
            </h1>
            <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
              Comprehensive legal expertise across every major practice area — delivered with precision, strategy, and dedication to your success.
            </p>
          </div>
        </section>
        <div className="bg-white">
          <PracticeAreas areas={areas} />
        </div>
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
