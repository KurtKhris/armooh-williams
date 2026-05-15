import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { BookOpen, Clock, Tag, ArrowRight } from "lucide-react";
import { formatDate, truncate } from "@/lib/utils";
import type { Metadata } from "next";

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

export const revalidate = 60; // ISR: revalidate in background every 60 seconds

export default async function NewsPage() {
  const allPosts = await getPublishedPosts();
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  // Derive categories dynamically from actual posts
  const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)))];

  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6">
              <BookOpen size={13} className="text-coral-500" />
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Legal Insights</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-white mb-5">
              Legal <span className="text-coral-500">News</span>
            </h1>
            <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
              Expert analysis, legal updates, and strategic insights from the attorneys of Armooh-Williams, PLLC.
            </p>
          </div>
        </section>

        {allPosts.length === 0 ? (
          <section className="py-24 bg-white text-center">
            <BookOpen size={48} className="text-brand-gray mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-brand-dark font-semibold mb-2">No Articles Yet</h2>
            <p className="font-body text-brand-dark/55 text-sm">Check back soon for legal news and updates.</p>
          </section>
        ) : (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Featured post */}
              {featured && (
                <Link href={`/news/${featured.slug}`} className="block group mb-12">
                  <div className="rounded-3xl overflow-hidden border border-brand-gray shadow-luxury hover:shadow-luxury-lg transition-all duration-400 grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto bg-linear-to-br from-teal-800 to-teal-950 flex items-center justify-center">
                      {featured.imageUrl ? (
                        <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <BookOpen size={64} className="text-white/15" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-body font-semibold">Featured</span>
                      </div>
                    </div>
                    <div className="p-8 sm:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-brand-dark/45 font-body text-xs mb-4">
                        <span className="flex items-center gap-1.5"><Tag size={10} />{featured.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5"><Clock size={10} />{formatDate(featured.createdAt.toISOString())}</span>
                      </div>
                      <h2 className="font-heading text-3xl font-semibold text-brand-dark group-hover:text-teal-800 mb-4 transition-colors">{featured.title}</h2>
                      <p className="font-body text-brand-dark/60 text-sm leading-relaxed mb-6">{truncate(featured.excerpt || featured.content, 180)}</p>
                      <div className="flex items-center gap-2 text-coral-500 font-body font-semibold text-sm group-hover:gap-3 transition-all">
                        Read Full Article <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Category filter label */}
              {rest.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((cat) => (
                    <span key={cat} className="px-4 py-1.5 rounded-full bg-brand-gray/60 text-brand-dark/60 font-body text-xs font-semibold border border-brand-gray cursor-default">
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Rest of posts */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                      <div className="h-full rounded-3xl bg-white border border-brand-gray hover:border-coral-500/25 shadow-luxury hover:shadow-luxury-lg transition-all duration-400 overflow-hidden">
                        <div className="h-44 bg-linear-to-br from-teal-800 to-teal-950 relative flex items-center justify-center">
                          {post.imageUrl ? (
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <BookOpen size={36} className="text-white/15" />
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-teal-950/50 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full bg-white/90 text-brand-dark text-xs font-body font-semibold">{post.category}</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="font-body text-xs text-brand-dark/40 mb-2">{formatDate(post.createdAt.toISOString())}</p>
                          <h3 className="font-heading text-lg font-semibold text-brand-dark group-hover:text-teal-800 mb-2 transition-colors leading-snug">{post.title}</h3>
                          <p className="font-body text-sm text-brand-dark/55 leading-relaxed mb-4">{truncate(post.excerpt || post.content, 100)}</p>
                          <div className="flex items-center gap-1.5 text-coral-500 font-body text-sm font-semibold">Read More <ArrowRight size={13} /></div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
