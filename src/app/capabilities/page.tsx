import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";

export const metadata: Metadata = {
  title: "Capabilities | Armooh-Williams, PLLC",
  description:
    "Global Mobility & Immigration, White Collar Defense & Sanctions, and Trust & Corporate Services — delivered with precision, discretion, and a commercially focused approach.",
};

const FALLBACK_AREAS = [
  {
    id: "fallback-1",
    title: "Global Mobility & Immigration",
    description:
      "Strategic immigration solutions for international businesses, executives, investors, and global talent — enabling seamless cross-border movement with confidence.",
    slug: "global-mobility-immigration",
    imageUrl: null as string | null,
  },
  {
    id: "fallback-2",
    title: "White Collar Defense & Sanctions",
    description:
      "Sophisticated representation in government investigations, compliance matters, sanctions issues, and regulatory disputes — protecting your interests with precision and discretion.",
    slug: "white-collar-defense-sanctions",
    imageUrl: null as string | null,
  },
  {
    id: "fallback-3",
    title: "Trust & Corporate Services",
    description:
      "Tailored structuring, governance, and wealth preservation solutions designed for long-term stability, asset protection, and generational growth.",
    slug: "trust-corporate-services",
    imageUrl: null as string | null,
  },
];

const GRADIENTS = [
  "from-teal-950 via-teal-900 to-teal-800",
  "from-teal-800 via-teal-900 to-teal-950",
  "from-teal-950 via-teal-800 to-teal-900",
];

export default async function CapabilitiesPage() {
  const dbAreas = await db
    .select()
    .from(practiceAreas)
    .where(eq(practiceAreas.published, true))
    .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt))
    .catch(() => []);

  const displayAreas = dbAreas.length > 0
    ? dbAreas.map((a) => ({ id: a.id, title: a.title, description: a.description, slug: a.slug, imageUrl: a.imageUrl }))
    : FALLBACK_AREAS;

  return (
    <>
      <Navbar />
      <main>

        {/* Page Header */}
        <section className="pt-18 bg-linear-to-br from-teal-800 to-teal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                Our Expertise
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              Our Capabilities
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
              Comprehensive legal expertise delivered with precision, discretion, and a
              commercially focused approach.
            </p>
          </div>
        </section>

        {/* Capability rows */}
        <div className="divide-y divide-brand-gray">
          {displayAreas.map((area, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isEven = i % 2 === 0;

            return (
              <section
                key={area.id}
                id={area.slug}
                className={isEven ? "bg-white" : "bg-brand-ivory"}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text side */}
                    <div className={isEven ? "" : "lg:order-2"}>
                      <span className="font-heading text-[7rem] leading-none font-bold text-teal-800/6 select-none block -mb-6">
                        {num}
                      </span>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="gold-rule" />
                        <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                          Capability
                        </span>
                      </div>
                      <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark leading-[1.08] mb-5">
                        {area.title}
                      </h2>
                      <p className="font-body text-brand-slate text-base leading-relaxed mb-8 max-w-lg">
                        {area.description}
                      </p>
                      <Link
                        href={`/capabilities/${area.slug}`}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group"
                      >
                        Learn More
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>

                    {/* Image side */}
                    <div className={`relative rounded-2xl overflow-hidden h-80 lg:h-105 ${isEven ? "" : "lg:order-1"}`}>
                      {area.imageUrl ? (
                        <Image
                          src={area.imageUrl}
                          alt={area.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-linear-to-br ${GRADIENTS[i % 3]}`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-heading text-[10rem] font-bold text-white/5 select-none leading-none">
                              {num}
                            </span>
                          </div>
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
                              backgroundSize: "28px 28px",
                            }}
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-teal-950/10 rounded-2xl" />
                    </div>

                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="py-20 bg-teal-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="gold-rule" />
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-white mb-5">
              Ready to Discuss Your Matter?
            </h2>
            <p className="font-body text-white/55 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              In an increasingly interconnected and regulated world, clients need advisors who can
              protect both opportunity and reputation. We deliver practical legal solutions designed
              for modern global challenges.
            </p>
            <GoogleCalendarButton label="Schedule a Confidential Consultation" />
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
