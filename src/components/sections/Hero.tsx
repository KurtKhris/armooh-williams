"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";

const BG_IMAGES = ["/FRONTPAGE.webp", "/FRONTPAGETWO.webp", "/FRONTTHREE.webp", "/FRONTFIVE.webp"];
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % BG_IMAGES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" aria-label="Hero">

      {/* ── Fullscreen background slideshow ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            >
              <Image
                src={BG_IMAGES[index]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
                aria-hidden
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay — lighter at top so image shows, denser at bottom for text legibility */}
        <div className="absolute inset-0 bg-teal-950/30" />
        <div className="absolute inset-0 bg-linear-to-t from-teal-950/90 via-teal-950/30 to-transparent" />
      </div>

      {/* ── Content — Clarkson: text anchored bottom-left, editorial ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">

        {/* Gold rule + label — signature Clarkson editorial touch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="gold-rule" />
          <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
            Armooh-Williams, PLLC &nbsp;·&nbsp; Washington, DC
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-semibold text-white leading-[1.05] max-w-4xl mb-5"
        >
          Strategic Legal Counsel{" "}
          <span className="text-brand-gold">for a Global World</span>
        </motion.h1>

        {/* Practice areas — immediately visible without scrolling */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="font-body text-white/60 text-sm sm:text-[0.95rem] mb-8 tracking-wide"
        >
          {/* hidden — content preserved, not deleted
          Immigration &amp; Global Mobility
          <span className="mx-3 text-white/25">·</span>
          */}
          White Collar Defense &amp; Sanctions
          <span className="mx-3 text-white/25">·</span>
          Trusts &amp; Corporate Services
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <GoogleCalendarButton label="Schedule a Confidential Consultation" />
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/8 hover:bg-white/14 text-white border border-white/20 hover:border-white/35 font-body font-semibold rounded-xl text-sm transition-all duration-200"
          >
            Explore Our Practice Areas
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Bottom tagline — Clarkson editorial divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 pt-6 border-t border-white/12 flex flex-wrap items-center gap-6"
        >
          {["Global Reach", "Strategic Protection", "Trusted Counsel"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-3 text-white/40 font-body text-xs tracking-widest uppercase">
              {i > 0 && <span className="w-px h-3 bg-white/20" />}
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-1.5">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-0.5 transition-all duration-500 rounded-full ${
              i === index ? "w-8 bg-coral-500" : "w-3 bg-white/25 hover:bg-white/45"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
