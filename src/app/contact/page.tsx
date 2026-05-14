import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { siteSettings, practiceAreas } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Armooh-Williams, PLLC. Schedule a confidential legal consultation today.",
};

export const revalidate = 60; // ISR: revalidate in background every 60 seconds

export default async function ContactPage() {
  const settings = await db.select().from(siteSettings).catch(() => []);
  const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);

  const contactInfo = {
    city: "Arlington, Virginia", // Hardcoded label as it's not managed separately in site settings
    address: settingsMap['address'] || "2611 South Clark Street, Suite 600\nArlington, Virginia 22202",
    phone: settingsMap['phone'] || "+1 (703) 220-4504",
    email: settingsMap['email'] || "info@armooh-williams.com",
  };

  const dbAreas = await db
    .select()
    .from(practiceAreas)
    .where(eq(practiceAreas.published, true))
    .orderBy(asc(practiceAreas.sortOrder))
    .catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6">
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Contact Us</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-white mb-5">
              Let&apos;s <span className="text-coral-500">Connect</span>
            </h1>
            <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
              Whether you need immediate assistance or want to explore a long-term legal partnership, we&apos;re here to help.
            </p>
          </div>
        </section>
        <div className="bg-white">
          <ContactSection contactInfo={contactInfo} practiceAreas={dbAreas} />
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