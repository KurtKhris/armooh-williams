"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const whyItems = [
  "Internationally focused legal counsel",
  "Responsive, partner-led service",
  "Strategic and commercially minded advice",
  "Discreet handling of sensitive matters",
  "Long-term client relationships built on trust",
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="about" className="section-padding bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: main text content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                About the Firm
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark leading-[1.1] mb-6">
              Precision, Discretion,{" "}
              <span className="text-teal-800">and a Commercially Focused Approach</span>
            </h2>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-4">
              Complex legal matters demand more than technical expertise — they require strategic thinking,
              international perspective, and trusted relationships.
            </p>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-4">
              Our firm advises businesses, executives, investors, and private clients on global
              mobility &amp; immigration, white collar defense &amp; sanctions, and trust &amp;
              corporate services.
            </p>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-10">
              From cross-border expansion and regulatory investigations to asset protection and
              long-term succession planning, we help clients navigate high-stakes decisions with
              confidence and clarity.
            </p>

            {/* Buttons — desktop only (mobile version sits below the why list) */}
            <div className="hidden lg:flex flex-wrap gap-4">
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group"
              >
                Schedule a Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/about/the-firm"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-teal-800/30 hover:border-teal-800 text-teal-800 font-body font-semibold rounded-xl text-sm transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

          {/* Right: image + why list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18 }}
            className="flex flex-col gap-10"
          >
            {/* Full image, no cropping */}
            <Image
              src="/FIRMHISTORY.png"
              alt="Armooh-Williams, PLLC — Firm History"
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto block rounded-2xl"
            />

            {/* Why Clients Choose Us — fills the space below the image */}
            <div>
              <p className="font-heading text-lg font-semibold text-brand-dark mb-5">
                Why Clients Choose Us
              </p>
              <ul className="space-y-3">
                {whyItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" />
                    <span className="font-body text-brand-slate text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons — mobile only (desktop version sits in the text column) */}
            <div className="flex lg:hidden flex-wrap gap-4">
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group"
              >
                Schedule a Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/about/the-firm"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-teal-800/30 hover:border-teal-800 text-teal-800 font-body font-semibold rounded-xl text-sm transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
