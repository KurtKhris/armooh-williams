import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import { db } from "@/lib/db";
import { legalPages } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Armooh-Williams, PLLC",
  description: "Terms of Service for Armooh-Williams, PLLC",
};

async function getPage() {
  try {
    const [page] = await db.select().from(legalPages).where(eq(legalPages.type, "terms"));
    return page ?? null;
  } catch {
    return null;
  }
}

export default async function TermsPage() {
  const page = await getPage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-18 bg-linear-to-br from-teal-800 to-teal-950 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                Legal
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              {page?.title ?? "Terms of Service"}
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
              Please read these terms carefully before using our website or services.
            </p>
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
                      If you have any questions about our terms, schedule a consultation with our team.
                    </p>
                    <GoogleCalendarButton label="Book a Consultation" className="w-full" />
                  </div>
                  <div className="p-5 rounded-2xl bg-brand-gray/50 border border-brand-gray space-y-2">
                    <h4 className="font-body font-semibold text-brand-dark text-sm mb-1">Other Legal Pages</h4>
                    <Link href="/privacy" className="block font-body text-sm text-brand-dark/60 hover:text-coral-500 transition-colors">Privacy Policy →</Link>
                    <Link href="/disclaimer" className="block font-body text-sm text-brand-dark/60 hover:text-coral-500 transition-colors">Disclaimer →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
