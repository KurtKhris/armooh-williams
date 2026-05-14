import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, and, ne, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import {
  Building2, Gavel, Globe, Heart, Home, Earth, Lightbulb, Scale,
  Briefcase, Users, Shield, FileText, ArrowLeft, ArrowRight, Calendar,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

const iconMap: Record<string, React.ElementType> = {
  building: Building2, gavel: Gavel, globe: Globe, heart: Heart,
  home: Home, earth: Earth, lightbulb: Lightbulb, scale: Scale,
  briefcase: Briefcase, users: Users, shield: Shield, "file-text": FileText,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [area] = await db
    .select()
    .from(practiceAreas)
    .where(and(eq(practiceAreas.slug, slug), eq(practiceAreas.published, true)));
  if (!area) return { title: "Capability Not Found" };
  return {
    title: `${area.title} | Armooh-Williams, PLLC`,
    description: area.description,
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [area, otherAreas] = await Promise.all([
    db
      .select()
      .from(practiceAreas)
      .where(and(eq(practiceAreas.slug, slug), eq(practiceAreas.published, true)))
      .then((r) => r[0]),
    db
      .select()
      .from(practiceAreas)
      .where(and(eq(practiceAreas.published, true), ne(practiceAreas.slug, slug)))
      .orderBy(asc(practiceAreas.sortOrder))
      .limit(5),
  ]);

  if (!area) notFound();

  const Icon = iconMap[area.icon] ?? Scale;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-coral-500/8 blur-[120px]" />
            <div className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white font-body text-sm mb-8 transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              All Capabilities
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-coral-500/15 border border-coral-500/25 flex items-center justify-center shrink-0">
                <Icon size={28} className="text-coral-500" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-500/15 border border-coral-500/25 mb-2">
                  <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Capability</span>
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-white leading-tight">
                  {area.title}
                </h1>
              </div>
            </div>
            {area.description && (
              <p className="text-white/65 font-body text-lg leading-relaxed max-w-2xl">
                {area.description}
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main rich text content */}
              <div className="lg:col-span-2">
                {area.longDescription ? (
                  <div
                    className="rich-content font-body text-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: area.longDescription }}
                  />
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-brand-dark/40 font-body italic">Detailed content coming soon.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-4">
                  {/* CTA card */}
                  <div className="p-6 rounded-2xl bg-teal-950">
                    <h3 className="font-heading text-lg font-semibold text-white mb-2">
                      Need Legal Advice?
                    </h3>
                    <p className="font-body text-white/60 text-sm leading-relaxed mb-5">
                      Schedule a consultation with our {area.title.toLowerCase()} specialists today.
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

                  {/* Other capabilities */}
                  {otherAreas.length > 0 && (
                    <div className="p-5 rounded-2xl bg-brand-gray/50 border border-brand-gray">
                      <h4 className="font-body font-semibold text-brand-dark text-sm mb-3">Other Capabilities</h4>
                      <div className="space-y-2">
                        {otherAreas.map((a) => (
                          <Link
                            key={a.id}
                            href={`/capabilities/${a.slug}`}
                            className="flex items-center gap-2 font-body text-sm text-brand-dark/60 hover:text-coral-500 transition-colors group"
                          >
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            {a.title}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/capabilities"
                        className="mt-3 block font-body text-xs text-teal-800 hover:text-coral-500 transition-colors"
                      >
                        View all →
                      </Link>
                    </div>
                  )}
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
