"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Shield, Award, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const BG_IMAGES = ["/Joyce.jpg", "/Joyce2.jpg", "/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

const kenBurnsVariants = [
  { initial: { scale: 1.12, x: "3%", y: "2%" },  animate: { scale: 1, x: "0%", y: "0%" } },
  { initial: { scale: 1.1,  x: "-3%", y: "-2%" }, animate: { scale: 1, x: "0%", y: "0%" } },
];

const TypewriterText = () => {
  const text = "Corporate Immigration & White-Collar Defense";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 70); // Typing speed
    } else if (!isDeleting && displayedText.length === text.length) {
      timer = setTimeout(() => setIsDeleting(true), 4000); // Wait at end before deleting
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, 30); // Deleting speed
    } else if (isDeleting && displayedText.length === 0) {
      timer = setTimeout(() => setIsDeleting(false), 800); // Wait before restart
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting]);

  const highlightStart = text.indexOf("White-Collar Defense");
  let beforeHighlight = displayedText;
  let highlighted = "";

  if (displayedText.length > highlightStart) {
    beforeHighlight = displayedText.slice(0, highlightStart);
    highlighted = displayedText.slice(highlightStart);
  }

  return (
    <>
      {beforeHighlight}
      <span className="text-coral-500">{highlighted}</span>
      <span className="inline-block w-[4px] h-[0.9em] bg-coral-500 ml-1.5 animate-pulse align-middle" />
    </>
  );
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % BG_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const kbv = kenBurnsVariants[index % kenBurnsVariants.length];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Ken Burns background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={kbv.initial}
              animate={kbv.animate}
              transition={{ duration: 7, ease: "easeInOut" }}
            >
              <Image
                src={BG_IMAGES[index]}
                alt=""
                fill
                className="object-cover object-top"
                priority={index === 0}
                aria-hidden
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay gradient — keeps text perfectly readable */}
        <div className="absolute inset-0 bg-teal-950/80" />
        <div className="absolute inset-0 bg-linear-to-r from-teal-950/95 via-teal-950/75 to-teal-950/50" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-coral-500/8 blur-[120px] animate-pulse-slow pointer-events-none" />
        <div
          className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full bg-teal-500/12 blur-[100px] animate-pulse-slow pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="absolute right-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">
                Armooh-Williams, PLLC
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading text-5xl sm:text-6xl font-semibold text-white leading-[1.08] min-h-[140px] sm:min-h-[160px]"
            >
              <TypewriterText />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-heading text-xl sm:text-2xl text-white/50 font-normal leading-snug mb-4"
            >
              for Global Businesses, Executives, and Cross-Border Professionals
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="w-14 h-px bg-coral-500/50 mb-4 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-10"
            >
              <p className="text-white/65 font-body text-base leading-relaxed">
                Armooh-Williams, PLLC is a Washington, DC-based law firm advising businesses, executives,
                professionals, and international clients in high-stakes immigration, government investigation,
                and white-collar defense matters.
              </p>
              <p className="text-white/50 font-body text-base leading-relaxed">
                The firm provides discreet, strategic counsel when immigration status, business operations,
                professional reputation, or personal liberty may be at risk.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold rounded-2xl transition-colors duration-200 shadow-[0_4px_24px_rgba(239,75,67,0.4)]"
              >
                <Calendar size={18} />
                Book a Consultation
              </Link>
              <Link
                href="/capabilities"
                className="flex items-center gap-2.5 px-7 py-4 bg-white/8 hover:bg-white/14 text-white border border-white/15 hover:border-white/30 font-body font-semibold rounded-2xl transition-all duration-200"
              >
                Our Capabilities
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap items-center gap-5 text-white/35 text-xs font-body"
            >
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-coral-500" />
                <span>Attorney-Client Privilege</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Award size={12} className="text-coral-500" />
                <span>Award-Winning Firm</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Globe size={12} className="text-coral-500" />
                <span>Global Reach</span>
              </div>
            </motion.div>
          </div>

          {/* Right column — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:flex justify-end items-center"
          >
            <div className="relative w-full max-w-sm xl:max-w-md">
              <div
                className="relative rounded-3xl overflow-hidden shadow-luxury-lg"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src="/Joyce2.jpg"
                  alt="Joyce Williams, Esq. — Principal Attorney, Armooh-Williams, PLLC"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-teal-950/75 via-teal-950/10 to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-5 py-4">
                  <p className="font-heading text-white text-lg font-semibold leading-tight">
                    Joyce Williams, Esq.
                  </p>
                  <p className="font-body text-white/55 text-xs mt-0.5">
                    Founder &amp; Principal Attorney &middot; Washington, DC
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -top-4 -right-5 glass-light rounded-2xl px-4 py-3 flex items-center gap-3 shadow-luxury-lg"
              >
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-coral-500 to-coral-700 flex items-center justify-center shrink-0">
                  <Shield size={15} className="text-white" />
                </div>
                <div>
                  <div className="font-body font-semibold text-brand-dark text-xs leading-none">Corporate Immigration</div>
                  <div className="font-body text-brand-dark/55 text-xs mt-0.5">White-Collar Defense</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute top-1/3 -left-6 glass-light rounded-2xl px-4 py-3 flex items-center gap-3 shadow-luxury-lg animate-float"
              >
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-teal-800 to-teal-700 flex items-center justify-center shrink-0">
                  <Globe size={15} className="text-white" />
                </div>
                <div>
                  <div className="font-body font-semibold text-brand-dark text-xs leading-none">International</div>
                  <div className="font-body text-brand-dark/55 text-xs mt-0.5">Global Legal Network</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-coral-500"
            animate={{ height: ["0%", "100%"], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
