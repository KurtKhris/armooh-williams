import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import { db } from "@/lib/db";
import { legalPages } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Armooh-Williams, PLLC",
  description: "Disclaimer for Armooh-Williams, PLLC",
};

async function getPage() {
  try {
    const [page] = await db.select().from(legalPages).where(eq(legalPages.type, "disclaimer"));
    return page ?? null;
  } catch {
    return null;
  }
}

export default async function DisclaimerPage() {
  const page = await getPage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 gradient-hero">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-500/15 border border-coral-500/25 mb-4">
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Legal</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-white leading-tight">
              {page?.title ?? "Disclaimer"}
            </h1>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {page?.content ? (
                  <div
                    className="rich-content font-body text-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                ) : (
                  <p className="text-brand-dark/40 font-body italic py-12 text-center">This page is being updated. Please check back soon.</p>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-4">
                  <div className="p-6 rounded-2xl bg-teal-950">
                    <h3 className="font-heading text-lg font-semibold text-white mb-2">Have Questions?</h3>
                    <p className="font-body text-white/60 text-sm leading-relaxed mb-5">
                      If you have any questions about our disclaimer, schedule a consultation with our team.
                    </p>
                    <Link
                      href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors"
                    >
                      <Calendar size={15} />
                      Book a Consultation
                    </Link>
                  </div>
                  <div className="p-5 rounded-2xl bg-brand-gray/50 border border-brand-gray space-y-2">
                    <h4 className="font-body font-semibold text-brand-dark text-sm mb-1">Other Legal Pages</h4>
                    <Link href="/privacy" className="block font-body text-sm text-brand-dark/60 hover:text-coral-500 transition-colors">Privacy Policy →</Link>
                    <Link href="/terms" className="block font-body text-sm text-brand-dark/60 hover:text-coral-500 transition-colors">Terms of Service →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
