"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";

const whyItems = [
  "Trusted counsel to businesses, executives, investors, entrepreneurs, and private clients",
  "Experience across immigration, sanctions, regulatory, corporate, and trust matters",
  "Practical advice that considers legal, business, family, and reputational objectives",
  "Responsive, partner-led service",
  "Discreet handling of sensitive and high stakes matters",
  "Long-term relationships built on clarity, judgment, and trust",
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
              Strategic Counsel{" "}
              <span className="text-teal-800">When Immigration, Business, and Reputation Are at Stake</span>
            </h2>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-4">
              Armooh-Williams, PLLC advises businesses, executives, investors, entrepreneurs, and private clients whose legal matters cross borders and carry significant personal, financial, and reputational consequences.
            </p>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-4">
              Our clients turn to us when expanding internationally, relocating key talent, responding to government scrutiny, navigating sanctions and compliance risks, structuring businesses, protecting assets, or planning for long-term family and business succession.
            </p>

            <p className="font-body text-brand-slate text-base leading-relaxed mb-10">
              These challenges are rarely isolated. {/* An immigration matter can affect a company&rsquo;s growth. — hidden, not deleted */} A regulatory inquiry can impact a hard-earned reputation. A corporate or trust decision can shape a family&rsquo;s future for generations. We help clients evaluate risk, make informed decisions, and move forward with confidence.
            </p>

            <p className="font-body text-brand-slate text-base leading-relaxed">
              Our approach combines international perspective, strategic legal judgment, commercial practicality, and discreet, responsive service. Every engagement is handled with care, clarity, and a deep understanding of what is at stake.
            </p>

            {/* Buttons — desktop only (mobile version sits below the why list) */}
            {/* <div className="hidden lg:flex flex-wrap gap-4">
              <GoogleCalendarButton label="Schedule a Consultation" color="#115E59" />
              <Link
                href="/about/the-firm"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-teal-800/30 hover:border-teal-800 text-teal-800 font-body font-semibold rounded-xl text-sm transition-all duration-200"
              >
                Our Story
              </Link>
            </div> */}
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
                The Armooh-Williams Difference
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
              <GoogleCalendarButton label="Schedule a Consultation" color="#115E59" />
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
