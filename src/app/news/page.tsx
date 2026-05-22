import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Legal News & Insights",
  description: "Expert legal news, analysis, and updates from Armooh-Williams, PLLC attorneys.",
};

async function getPublishedPosts() {
  try {
    return await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function NewsPage() {
  const allPosts = await getPublishedPosts();

  const serialized = allPosts.map((p) => ({
    ...p,
    imageUrl: p.imageUrl ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)))];

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
                Legal News
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              Legal News
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
              Expert analysis, legal updates, and strategic insights from the attorneys of Armooh-Williams, PLLC.
            </p>
          </div>
        </section>

        {serialized.length === 0 ? (
          <section className="py-24 bg-white text-center">
            <BookOpen size={48} className="text-brand-gray mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-brand-dark font-semibold mb-2">No Articles Yet</h2>
            <p className="font-body text-brand-dark/55 text-sm">Check back soon for legal news and updates.</p>
          </section>
        ) : (
          <NewsClient posts={serialized} categories={categories} />
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
