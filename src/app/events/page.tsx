import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import EventsList from "@/components/sections/EventsList";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
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
        <section className="pt-18 bg-linear-to-br from-teal-800 to-teal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                Events
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              Upcoming Events
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
              Join us for seminars, workshops, and community events hosted by Armooh-Williams, PLLC.
            </p>
          </div>
        </section>

        <EventsList upcoming={upcoming} past={past} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
