"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Tag, ArrowRight } from "lucide-react";
import { formatDate, truncate } from "@/lib/utils";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  published: boolean;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export default function NewsClient({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold transition-colors duration-200 border ${
                active === cat
                  ? "bg-teal-800 text-white border-teal-800"
                  : "bg-brand-gray/60 text-brand-dark/60 border-brand-gray hover:border-teal-800/40 hover:text-teal-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen size={40} className="text-brand-gray mx-auto mb-4" />
            <p className="font-heading text-brand-dark/40 text-lg">No articles in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link href={`/news/${featured.slug}`} className="block group mb-12">
                <div className="rounded-3xl overflow-hidden border border-brand-gray shadow-luxury hover:shadow-luxury-lg transition-all duration-400 grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto bg-linear-to-br from-teal-800 to-teal-950 flex items-center justify-center">
                    {featured.imageUrl ? (
                      <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 50vw" />
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
                      <span className="flex items-center gap-1.5"><Clock size={10} />{formatDate(featured.createdAt)}</span>
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

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                    <div className="h-full rounded-3xl bg-white border border-brand-gray hover:border-coral-500/25 shadow-luxury hover:shadow-luxury-lg transition-all duration-400 overflow-hidden">
                      <div className="h-44 bg-linear-to-br from-teal-800 to-teal-950 relative flex items-center justify-center">
                        {post.imageUrl ? (
                          <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        ) : (
                          <BookOpen size={36} className="text-white/15" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-teal-950/50 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-white/90 text-brand-dark text-xs font-body font-semibold">{post.category}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="font-body text-xs text-brand-dark/40 mb-2">{formatDate(post.createdAt)}</p>
                        <h3 className="font-heading text-lg font-semibold text-brand-dark group-hover:text-teal-800 mb-2 transition-colors leading-snug">{post.title}</h3>
                        <p className="font-body text-sm text-brand-dark/55 leading-relaxed mb-4">{truncate(post.excerpt || post.content, 100)}</p>
                        <div className="flex items-center gap-1.5 text-coral-500 font-body text-sm font-semibold">Read More <ArrowRight size={13} /></div>
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
  );
}
