"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
};

const GRADIENTS = [
  "from-teal-950 via-teal-900 to-teal-800",
  "from-teal-800 via-teal-900 to-teal-950",
  "from-teal-950 via-teal-800 to-teal-900",
  "from-teal-900 via-teal-950 to-teal-800",
];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  return (
    <Link
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
          <div className={`absolute inset-0 bg-linear-to-br ${GRADIENTS[index % 4]}`} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-teal-950/40" />

        {/* Sliding content block */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="p-6 sm:p-8 translate-y-[calc(100%-6rem)] sm:translate-y-[calc(100%-7rem)] group-hover:translate-y-0 transition-transform duration-400 ease-out">
            <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-white leading-tight mb-3">
              {cat.name}
            </h3>
            <div className="w-8 h-0.5 bg-coral-500" />
            {cat.description && (
              <p className="font-body text-white/80 text-base leading-relaxed mt-10">
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
  );
}

export default function BlogPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  // Show at most 4 in a 2×2 grid
  const display = categories.slice(0, 4);

  return (
    <section id="insights" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="gold-rule" />
              <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">Insights</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark">
              Our <span className="text-teal-800">Channels</span>
            </h2>
          </div>
          <Link
            href="/insights"
            className="flex items-center gap-2 text-teal-800 hover:text-coral-500 font-body font-semibold text-sm transition-colors duration-200 group shrink-0"
          >
            All Insights
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-1"
        >
          {display.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
