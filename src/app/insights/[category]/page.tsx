import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import { db } from "@/lib/db";
import { posts, postCategories } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { slugify, formatDate, truncate } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await db.select().from(postCategories).catch(() => []);
  const cat = categories.find((c) => slugify(c.name) === category);
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.name} | Insights | Armooh-Williams, PLLC`,
    description: cat.description ?? `Articles in the ${cat.name} category.`,
  };
}

const TEAL_BLUR_URL = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect fill="#0B3440" width="1" height="1"/></svg>'
).toString("base64")}`;

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categories = await db.select().from(postCategories).catch(() => []);
  const cat = categories.find((c) => slugify(c.name) === category);

  if (!cat) notFound();

  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .catch(() => []);

  const categoryPosts = allPosts.filter((p) => p.category === cat.name);
  const featured = categoryPosts[0];
  const rest = categoryPosts.slice(1);

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-18 gradient-hero relative overflow-hidden">
          {cat.imageUrl && (
            <>
              <div className="absolute inset-0">
                <Image src={cat.imageUrl} alt={cat.name} fill priority placeholder="blur" blurDataURL={TEAL_BLUR_URL} className="object-cover opacity-60" sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-teal-950/40" />
            </>
          )}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-body text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
              >
                <ArrowLeft size={12} />
                Insights
              </Link>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                {cat.name}
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              {cat.name}
            </h1>
            {cat.description && (
              <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed">
                {cat.description}
              </p>
            )}
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {categoryPosts.length === 0 ? (
              <div className="py-24 text-center">
                <BookOpen size={48} className="text-brand-gray mx-auto mb-4" />
                <h2 className="font-heading text-2xl text-brand-dark font-semibold mb-2">No Articles Yet</h2>
                <p className="font-body text-brand-dark/55 text-sm mb-8">
                  Check back soon for articles in this category.
                </p>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-teal-800 hover:text-coral-500 font-body font-semibold text-sm transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Insights
                </Link>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <Link href={`/news/${featured.slug}`} className="block group mb-12">
                    <div className="rounded-3xl overflow-hidden border border-brand-gray shadow-luxury hover:shadow-luxury-lg transition-all duration-400 grid lg:grid-cols-2">
                      <div className="relative h-64 lg:h-auto bg-linear-to-br from-teal-800 to-teal-950 flex items-center justify-center">
                        {featured.imageUrl ? (
                          <Image
                            src={featured.imageUrl}
                            alt={featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <BookOpen size={64} className="text-white/15" />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-body font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-brand-dark/45 font-body text-xs mb-4">
                          <span className="flex items-center gap-1.5"><Tag size={10} />{featured.category}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={10} />{formatDate(featured.createdAt)}
                          </span>
                        </div>
                        <h2 className="font-heading text-3xl font-semibold text-brand-dark group-hover:text-teal-800 mb-4 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="font-body text-brand-dark/60 text-sm leading-relaxed mb-6">
                          {truncate(featured.excerpt || featured.content, 200)}
                        </p>
                        <div className="flex items-center gap-2 text-coral-500 font-body font-semibold text-sm group-hover:gap-3 transition-all">
                          Read Full Article <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                        <div className="h-full rounded-3xl bg-white border border-brand-gray hover:border-coral-500/25 shadow-luxury hover:shadow-luxury-lg transition-all duration-400 overflow-hidden">
                          <div className="h-44 bg-linear-to-br from-teal-800 to-teal-950 relative flex items-center justify-center">
                            {post.imageUrl ? (
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <BookOpen size={36} className="text-white/15" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-teal-950/50 to-transparent" />
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 rounded-full bg-white/90 text-brand-dark text-xs font-body font-semibold">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="font-body text-xs text-brand-dark/40 mb-2">{formatDate(post.createdAt)}</p>
                            <h3 className="font-heading text-lg font-semibold text-brand-dark group-hover:text-teal-800 mb-2 transition-colors leading-snug">
                              {post.title}
                            </h3>
                            <p className="font-body text-sm text-brand-dark/55 leading-relaxed mb-4">
                              {truncate(post.excerpt || post.content, 100)}
                            </p>
                            <div className="flex items-center gap-1.5 text-coral-500 font-body text-sm font-semibold">
                              Read More <ArrowRight size={13} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
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
