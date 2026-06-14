import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, and, ne, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import {
  Building2, Gavel, Globe, Heart, Home, Earth, Lightbulb, Scale,
  Briefcase, Users, Shield, FileText, ArrowLeft, ArrowRight,
} from "lucide-react";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const TEAL_BLUR = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect fill="#0B3440" width="1" height="1"/></svg>'
).toString("base64")}`;

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
        <section className="pt-18 relative overflow-hidden">
          {/* Background — image if available, else gradient */}
          <div className="absolute inset-0">
            {area.imageUrl ? (
              <Image
                src={area.imageUrl}
                alt={area.title}
                fill
                priority
                placeholder="blur"
                blurDataURL={TEAL_BLUR}
                className="object-cover object-center"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 gradient-hero" />
            )}
            <div className="absolute inset-0 bg-teal-950/50" />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/85 via-teal-950/25 to-transparent" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-body text-xs font-semibold tracking-[0.18em] uppercase transition-colors group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
                Capabilities
              </Link>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                {area.title}
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              {area.title}
            </h1>
            {area.description && (
              <p className="font-heading italic text-xl text-white/60 max-w-2xl leading-relaxed">
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
                    <GoogleCalendarButton label="Book a Consultation" className="w-full" />
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
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
