import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import { db } from "@/lib/db";
import { postCategories } from "@/lib/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Armooh-Williams, PLLC",
  description:
    "Legal and business intelligence, audio briefings, regulatory analysis, and perspectives at the intersection of law, business, and global mobility.",
};

export const revalidate = 60;

const GRADIENTS = [
  "from-teal-950 via-teal-900 to-teal-800",
  "from-teal-800 via-teal-900 to-teal-950",
  "from-teal-950 via-teal-800 to-teal-900",
  "from-teal-900 via-teal-950 to-teal-800",
];

export default async function InsightsPage() {
  const categories = await db
    .select()
    .from(postCategories)
    .orderBy(asc(postCategories.sortOrder), asc(postCategories.createdAt))
    .catch(() => []);

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-18 bg-linear-to-br from-teal-800 to-teal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                Knowledge &amp; Analysis
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              Insights
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
              Legal and business intelligence for a rapidly evolving global world — from the
              attorneys of Armooh-Williams, PLLC.
            </p>
          </div>
        </section>

        {/* Category grid */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <span className="gold-rule" />
                <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                  Our Channels
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark">
                Four Ways We Share Knowledge
              </h2>
            </div>

            {categories.length === 0 ? (
              <div className="py-20 text-center text-brand-dark/40 font-body">
                No channels published yet.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-1">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.id}
                    href={`/insights/${slugify(cat.name)}`}
                    className="relative block overflow-hidden group"
                  >
                    <div className="relative h-80 lg:h-96">
                      {cat.imageUrl ? (
                        <Image
                          src={cat.imageUrl}
                          alt={cat.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-linear-to-br ${GRADIENTS[i % 4]}`} />
                      )}

                      {/* Base overlay */}
                      <div className="absolute inset-0 bg-teal-950/40" />

                      {/* Sliding content block */}
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="p-8 translate-y-[calc(100%-9rem)] group-hover:translate-y-0 transition-transform duration-400 ease-out">
                          <h3 className="font-heading text-4xl font-semibold text-white leading-tight mb-3">
                            {cat.name}
                          </h3>
                          <div className="w-8 h-0.5 bg-coral-500" />
                          {cat.description && (
                            <p className="hidden sm:block font-body text-white/75 text-base leading-relaxed mt-16">
                              {cat.description}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 mt-4 text-coral-500 font-body text-xs font-semibold uppercase tracking-widest">
                            Explore <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
