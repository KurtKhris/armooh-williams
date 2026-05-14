"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-gray/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-coral-500/4 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/5 max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-luxury-lg">
              <Image
                src="/Joyce.jpg"
                alt="Armooh-Williams, PLLC Attorney"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-5 py-4">
                  <p className="text-white font-heading text-lg font-semibold">Armooh-Williams, PLLC</p>
                  <p className="text-white/60 font-body text-sm mt-1">Strategic Legal Excellence Since 2009</p>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-light rounded-2xl p-4 shadow-luxury border border-white/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-coral-500 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-body font-bold text-brand-dark text-sm">98%</p>
                  <p className="font-body text-brand-dark/60 text-xs">Success Rate</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-3xl border-2 border-coral-500/20 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/10 border border-coral-500/20 mb-6">
              <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">About the Firm</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark mb-2 leading-tight">
              Legal Strategy{" "}
              <span className="text-gradient-teal">for Impact</span>
            </h2>
            <p className="font-heading text-lg font-medium text-coral-500 tracking-wide mb-6 uppercase">
              — From Local Roots to Global Reach
            </p>

            <p className="text-brand-dark/65 font-body text-base leading-relaxed mb-5">
              Whether you&apos;re launching a company, expanding across borders, navigating immigration, or investing in community transformation — Armooh-Williams, PLLC provides strategic legal counsel to help you move forward with clarity and confidence.
            </p>

            <p className="text-brand-dark/65 font-body text-base leading-relaxed mb-5">
              Founded by Joyce Williams—a Ghanaian-born attorney, award-winning advocate, and the first lawyer in her family—the firm&apos;s mission is shaped by her journey from immigrant to trusted legal advisor. That mission is simple but powerful: to deliver justice-driven, client-centered, and faith-informed legal leadership.
            </p>

            <p className="text-brand-dark/65 font-body text-base leading-relaxed mb-10">
              Our practice spans International Law & Trade, Community Economic Development, Immigration Law, and Business & Corporate Law—serving clients at every stage, from startup to scale-up, from vision to measurable impact. We lead with integrity, a global perspective, and a deep commitment to helping clients build, grow, and thrive—both locally and beyond.
            </p>


            <Link
              href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k=" target="_blank"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-body font-semibold rounded-2xl transition-colors duration-200 group"
            >
              Book a Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}