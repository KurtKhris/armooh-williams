"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Clock, Tag, BookOpen } from "lucide-react";
import type { Post } from "@/types";
import { formatDate, truncate } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "Corporate Law": "bg-teal-800/10 text-teal-800",
  "Immigration": "bg-emerald-50 text-emerald-700",
  "Litigation": "bg-coral-500/10 text-coral-500",
  "Real Estate": "bg-amber-50 text-amber-700",
  "Family Law": "bg-rose-50 text-rose-700",
  "International Law": "bg-blue-50 text-blue-700",
  "Legal Insights": "bg-purple-50 text-purple-700",
  "General": "bg-gray-50 text-gray-600",
};

function PostCard({ post, i }: { post: Post; i: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const colorClass = categoryColors[post.category] ?? categoryColors["General"];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="group"
    >
      <Link href={`/news/${post.slug}`} className="block h-full">
        <div className="h-full rounded-3xl bg-white border border-brand-gray hover:border-coral-500/25 shadow-luxury hover:shadow-luxury-lg transition-all duration-400 overflow-hidden">
          {/* Image */}
          <div className="relative h-48 bg-linear-to-br from-teal-800 to-teal-950 overflow-hidden">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen size={40} className="text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/60 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold ${colorClass} bg-white shadow-sm`}>
                <Tag size={10} />
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-brand-dark/40 font-body text-xs mb-3">
              <Clock size={11} />
              <span>{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span>{post.authorName}</span>
            </div>

            <h3 className="font-heading text-xl font-semibold text-brand-dark mb-3 group-hover:text-teal-800 transition-colors duration-200 leading-snug">
              {post.title}
            </h3>

            <p className="font-body text-sm text-brand-dark/60 leading-relaxed mb-5">
              {truncate(post.excerpt || post.content, 120)}
            </p>

            <div className="flex items-center gap-1.5 text-coral-500 font-body text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
              Read Article
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPreview({ posts }: { posts?: Post[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  if (!posts || posts.length === 0) return null;
  
  const displayPosts = posts.slice(0, 3);

  return (
    <section id="news" className="section-padding bg-brand-gray/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/8 border border-teal-800/15 mb-5">
              <BookOpen size={13} className="text-teal-800" />
              <span className="text-teal-800 text-xs font-body font-semibold tracking-[0.15em] uppercase">Legal Insights</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark">
              Latest{" "}
              <span className="text-coral-500">News</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-teal-800 hover:text-coral-500 font-body font-semibold text-sm transition-colors duration-200 group shrink-0"
          >
            View All News
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <PostCard key={post.id} post={post} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}