import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import EventsList from "@/components/sections/EventsList";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Armooh-Williams, PLLC",
  description: "Upcoming legal events, seminars, and community outreach from Armooh-Williams, PLLC.",
};

export const revalidate = 60; // ISR: revalidate in background every 60 seconds

async function getPublishedEvents() {
  try {
    return await db.select().from(events).where(eq(events.published, true)).orderBy(desc(events.createdAt));
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const allEvents = await getPublishedEvents();
  const upcoming = allEvents.filter((e) => new Date(e.eventDate) >= new Date());
  const past = allEvents.filter((e) => new Date(e.eventDate) < new Date());

  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6">
              <Calendar size={13} className="text-coral-500" />
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Events</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-white mb-5">
              Upcoming <span className="text-coral-500">Events</span>
            </h1>
            <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
              Join us for seminars, workshops, and community events hosted by Armooh-Williams, PLLC.
            </p>
          </div>
        </section>

        <EventsList upcoming={upcoming} past={past} />
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
