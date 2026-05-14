"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/utils";

type TestimonialItem = {
  id: string | number;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl?: string | null;
};

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [items, setItems] = useState<TestimonialItem[]>([...TESTIMONIALS]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback((idx: number, dir?: number) => {
    setDirection(dir ?? (idx > current ? 1 : -1));
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => goTo((current - 1 + items.length) % items.length, -1), [current, items.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % items.length, 1), [current, items.length, goTo]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, items.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const t = items[current] ?? items[0];
  if (!t) return null;

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-gray/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-teal-800/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/8 border border-coral-500/15 mb-6">
            <Star size={13} className="text-coral-500" fill="currentColor" />
            <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">
              Client Testimonials
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark mb-5">
            What Our Clients{" "}
            <span className="text-coral-500">Say</span>
          </h2>
          <p className="text-brand-dark/60 font-body text-lg max-w-xl mx-auto">
            Trusted by businesses and individuals across the globe. Here&apos;s what they say about working with us.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={String(t.id)}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="relative p-8 sm:p-12 rounded-3xl bg-linear-to-br from-teal-800 to-teal-950 border border-white/10 shadow-luxury-lg overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-coral-500/8 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/4 blur-[60px] pointer-events-none" />
                <div className="absolute top-8 right-8 opacity-15">
                  <Quote size={80} className="text-white" />
                </div>

                <div className="relative">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-coral-500" fill="currentColor" />
                    ))}
                  </div>

                  <blockquote className="font-heading text-xl sm:text-2xl text-white leading-relaxed mb-8 font-light italic">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {t.imageUrl ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-coral-500/30">
                        <Image src={t.imageUrl} alt={t.name} width={56} height={56} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-linear-to-br from-coral-500 to-coral-700 flex items-center justify-center text-white font-heading font-bold text-xl shadow-coral shrink-0">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-body font-semibold text-white text-base">{t.name}</div>
                      {t.role && <div className="font-body text-white/55 text-sm">{t.role}</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2.5 bg-coral-500"
                      : "w-2.5 h-2.5 bg-brand-gray hover:bg-coral-500/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-2xl bg-brand-gray hover:bg-teal-800 text-teal-800 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-2xl bg-teal-800 hover:bg-coral-500 text-white flex items-center justify-center transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* BBB Link */}
          <div className="mt-12 text-center">
            <a
              href="https://www.bbb.org/us/va/arlington/profile/immigration-lawyer/armooh-williams-pllc-0241-236077420/customer-reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-semibold text-brand-dark/50 hover:text-coral-500 transition-colors text-sm group"
            >
              Read Verified Client Reviews on BBB 
              <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
