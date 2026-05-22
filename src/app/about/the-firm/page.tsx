import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Firm | About | Armooh-Williams, PLLC",
  description:
    "Founded on July 18, 2017, by Joyce Williams, Armooh-Williams, PLLC delivers sophisticated international legal counsel with accessibility, responsiveness, and strategic focus.",
};

const firmHistory = [
  {
    label: "Founded",
    text: "Founded on July 18, 2017, by Joyce Williams, Armooh-Williams, PLLC was established with a singular vision: to deliver sophisticated international legal counsel with the accessibility, responsiveness, and strategic focus often absent from traditional cross-border practices.",
  },
  {
    label: "The Inspiration",
    text: "The firm's foundation was inspired following Ms. Williams' return from Port Harcourt, where discussions with business leaders and investors revealed a significant gap in the market. Middle-market clients engaged in international transactions frequently faced limited access to high-quality counsel, with many firms offering services that were either prohibitively expensive or insufficiently tailored to their commercial realities.",
  },
  {
    label: "Growth",
    text: "Against the backdrop of Washington, D.C.'s highly competitive legal landscape, Armooh-Williams emerged as a distinguished boutique practice dedicated to serving clients navigating complex cross-border opportunities. Through measured growth, deep client relationships, and unwavering commitment to excellence, the firm quickly established itself as a trusted advisor to businesses, entrepreneurs, and institutions operating in global markets.",
  },
  {
    label: "Resilience",
    text: "While the global pandemic presented unprecedented challenges across industries, the firm's agility, resilience, and forward-thinking approach strengthened its position as a reliable strategic partner. Our ability to adapt while maintaining exceptional client service reinforced the confidence our clients place in us during moments of uncertainty and transformation.",
  },
  {
    label: "Today",
    text: "Today, Armooh-Williams has evolved into a multidisciplinary practice offering comprehensive legal and advisory services across international business transactions, global mobility and immigration, white collar defense and sanctions, trust services, and corporate advisory matters.",
  },
  {
    label: "Our Commitment",
    text: "As we continue to expand our global reach, we remain guided by the principles upon which the firm was founded: excellence in legal advocacy, commercial sophistication, integrity, and an uncompromising commitment to client service. Armooh-Williams, PLLC is proud to advise clients around the world on their most significant and consequential matters, delivering counsel defined by precision, discretion, and strategic insight.",
  },
];

const values = [
  {
    title: "Excellence",
    desc: "Uncompromising standards in every matter we handle, from initial consultation to final resolution.",
  },
  {
    title: "Integrity",
    desc: "Honest, transparent counsel grounded in our clients' best interests — always.",
  },
  {
    title: "Discretion",
    desc: "Sensitive matters handled with the confidentiality and care they demand.",
  },
  {
    title: "Commercial Sophistication",
    desc: "Legal advice that is practical, strategic, and aligned with real business objectives.",
  },
];

export default function TheFirmPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Page Hero ── */}
        <section className="pt-18 relative overflow-hidden">
          {/* Full background image */}
          <div className="absolute inset-0">
            <Image
              src="/FIRMHISTORY.png"
              alt="Armooh-Williams, PLLC — Firm History"
              fill
              priority
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect fill="#0B3440" width="1" height="1"/></svg>').toString("base64")}`}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-teal-950/50" />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-teal-950/25 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-rule" />
              <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                About &nbsp;·&nbsp; The Firm
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
              Armooh-Williams,{" "}
              <span className="text-coral-500">PLLC</span>
            </h1>
            <p className="font-heading italic text-xl text-white/55 max-w-2xl leading-relaxed mb-10">
              A distinguished boutique practice delivering sophisticated international legal counsel
              with accessibility, responsiveness, and strategic focus.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-heading text-4xl font-semibold text-white">2017</p>
                <p className="font-body text-white/45 text-xs uppercase tracking-widest mt-1">Founded</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="font-heading text-4xl font-semibold text-white">DC</p>
                <p className="font-body text-white/45 text-xs uppercase tracking-widest mt-1">Washington</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="font-heading text-4xl font-semibold text-white">3</p>
                <p className="font-body text-white/45 text-xs uppercase tracking-widest mt-1">Practice Areas</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Firm History — Clarkson numbered editorial sections ── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-16">
              <div className="flex items-center gap-4 mb-5">
                <span className="gold-rule" />
                <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark">
                Firm History
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Spine — vertical line centered on the nodes (node w-9 = 2.25rem, half = 1.125rem) */}
              <div className="absolute top-0 bottom-0 left-4.5 w-px bg-brand-gray hidden lg:block" />

              <div className="divide-y divide-brand-gray lg:divide-y-0">
                {firmHistory.map((item, i) => (
                  <div key={item.label} className="relative py-10 lg:py-12">

                    {/* Node — sits on spine, visible lg+ only */}
                    <div className="absolute top-10 lg:top-12 left-0 z-10 hidden lg:block">
                      <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-gold shadow-sm flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                      </div>
                    </div>

                    {/* Content — pushed right past the node on lg */}
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 lg:pl-14">
                      {/* Left — number + label */}
                      <div className="lg:col-span-3">
                        <p className="font-heading text-[4rem] leading-none font-semibold text-brand-gray/50 select-none mb-2">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="font-body text-brand-slate text-xs font-semibold uppercase tracking-[0.18em]">
                          {item.label}
                        </p>
                      </div>

                      {/* Right — body text */}
                      <div className="lg:col-span-9 flex items-start">
                        <p className="font-body text-brand-slate text-base leading-[1.9]">
                          {item.text}
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 lg:py-28 bg-brand-ivory border-t border-brand-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-14">
              <div className="flex items-center gap-4 mb-5">
                <span className="gold-rule" />
                <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                  What Guides Us
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark max-w-xl">
                Our Guiding Principles
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ title, desc }, i) => (
                <div key={title} className="bg-white rounded-2xl overflow-hidden luxury-shadow">
                  <div className="h-1 bg-brand-gold" />
                  <div className="p-7">
                    <p className="font-body text-xs font-semibold text-brand-gold tracking-[0.18em] uppercase mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-brand-dark mb-3">{title}</h3>
                    <p className="font-body text-brand-slate text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tagline banner ── */}
        <section className="py-16 bg-teal-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-4">
              Global Reach.{" "}
              <span className="text-coral-500">Strategic Protection.</span>{" "}
              Trusted Counsel.
            </p>
            <p className="font-body text-white/50 text-base mb-10 max-w-xl mx-auto">
              Armooh-Williams, PLLC is proud to advise clients around the world on their most
              significant and consequential matters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200"
                style={{ boxShadow: "0 4px 18px rgba(196,30,36,0.38)" }}
              >
                <Calendar size={15} />
                Schedule a Consultation
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group"
              >
                Meet Joyce Williams
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
