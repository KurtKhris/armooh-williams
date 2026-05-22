"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FounderBio() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section id="founder" className="relative overflow-hidden">

      <div className="grid lg:grid-cols-2" ref={ref}>

        {/* Left: text content */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="relative bg-white py-16 px-8 lg:px-16 xl:px-20 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="gold-rule" />
            <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
              Meet the Founder
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark leading-[1.08] mb-2">
            Joyce Williams, Esq.
          </h2>
          <p className="font-heading italic text-brand-gold text-lg mb-8">
            Founder &amp; Principal Attorney
          </p>

          <div className="space-y-5 mb-10 lg:max-w-lg">
            <p className="font-body text-brand-slate text-base leading-relaxed">
              Joyce Williams is the Founder and Principal Attorney of Armooh-Williams, PLLC, where she
              advises businesses, executives, investors, and international clients on corporate immigration,
              white collar defense, sanctions, and cross-border legal matters.
            </p>
            <p className="font-body text-brand-slate text-base leading-relaxed">
              Originally from Ghana and the first attorney in her family, Joyce combines global legal
              experience with a deeply personal understanding of the challenges clients face when navigating
              immigration, business risk, and government scrutiny.
            </p>
            <p className="font-body text-brand-slate text-base leading-relaxed">
              Known for her strategic judgment, discretion, and calm approach, Joyce helps clients protect
              what matters most — their future, reputation, business, and family.
            </p>
          </div>

          <Link
            href="/people"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group w-fit"
          >
            Read More
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Right: portrait image */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="relative min-h-120 sm:min-h-140 lg:min-h-0 lg:h-full overflow-hidden"
        >
          <Image
            src="/Joyce.jpg"
            alt="Joyce Williams, Esq. — Founder & Principal Attorney"
            fill
            className="object-cover object-[center_15%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-teal-950/20" />
        </motion.div>

      </div>
    </section>
  );
}
