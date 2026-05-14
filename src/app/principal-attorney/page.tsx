import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import ConsultationModal from "@/components/sections/ConsultationModal";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joyce Williams, Esq. | Principal Attorney | Armooh-Williams, PLLC",
  description: "Joyce Williams is the Founder and Principal Attorney of Armooh-Williams, PLLC, focused on corporate immigration, white collar defense, and cross-border investigations.",
};

const courtAdmissions = [
  "United States Supreme Court",
  "United States Court of Appeals for the Fourth, Fifth, and Ninth Circuits",
  "United States District Court, District of Arizona",
  "U.S. District and Bankruptcy Court for the District of Columbia",
  "United States Court of International Trade",
  "United States District Court for the Northern District of Ohio",
];

const affiliations = [
  {
    org: "American Immigration Lawyers Association",
    role: "Co-chair, Enforcement and Removal Sub Committee",
  },
  {
    org: "American Bar Association, Section of International Law",
    role: "Editor, International Trade Committee / Corporate Counsel Committee; Africa Committee Rule of Law Chair; Board Member, Rule of Law",
  },
  {
    org: "Washington, D.C. Women's Bar Association",
    role: "International Law Committee Co-Chair",
  },
  {
    org: "International Bar Foundation",
    role: "Trustee",
  },
  {
    org: "African Women in Law",
    role: "Board Member",
  },
  {
    org: "African Union Mission Diaspora Committee",
    role: "Board Member",
  },
  {
    org: "AfCFTA Policy Network",
    role: "",
  },
  {
    org: "John Carroll Society",
    role: "",
  },
  {
    org: "Thomas More Society",
    role: "",
  },
];

export default function PrincipalAttorneyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-0 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-coral-500/8 blur-[120px]" />
            <div className="absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              {/* Left: text */}
              <div className="pb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/15 border border-coral-500/25 mb-6">
                  <span className="text-coral-500 text-xs font-body font-semibold tracking-[0.15em] uppercase">Principal Attorney</span>
                </div>
                <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-white mb-3 leading-tight">
                  Joyce Williams,{" "}
                  <span className="text-coral-500">Esq.</span>
                </h1>
                <p className="font-body text-white/55 text-lg mb-8 tracking-wide">
                  Founder &amp; Principal Attorney
                </p>
                <p className="font-body text-white/70 text-base leading-relaxed max-w-lg mb-8">
                  Joyce Williams is the Founder and Principal Attorney of Armooh-Williams, PLLC, a Washington, DC-based law firm focused on corporate immigration, white collar defense, and cross-border investigations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold rounded-2xl transition-colors text-sm"
                  >
                    <Calendar size={15} />
                    Book a Consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-body font-semibold rounded-2xl transition-colors text-sm"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Right: portrait */}
              <div className="flex justify-center lg:justify-end items-end">
                <div className="relative w-80 sm:w-96">
                  <div className="relative rounded-t-3xl overflow-hidden shadow-luxury-lg" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src="/Joyce2.jpg"
                      alt="Joyce Williams, Esq. — Principal Attorney"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-teal-950/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-14">
              {/* Main bio */}
              <div className="lg:col-span-2 space-y-5">
                <h2 className="font-heading text-3xl font-semibold text-brand-dark">About Joyce</h2>

                {[
                  "Joyce represents businesses, executives, professionals, founders, and international clients facing complex legal matters where immigration status, business interests, government scrutiny, or reputation may be at stake. Clients turn to her for careful judgment, discretion, and practical guidance during moments that often feel urgent, unfamiliar, and high-risk.",
                  "Her background spans international law, business, immigration, trade, and cross-border dispute work. She has advised governments, multinational companies, entrepreneurs, and mission-driven organizations across North America, Africa, and emerging markets, including in high-value transactions and complex matters involving sovereign guarantees, tax concessions, political risk, and public-private investment structures.",
                  "Joyce brings that global experience to a focused practice helping clients navigate corporate immigration, executive mobility, government investigations, financial crime concerns, and enforcement-sensitive business activity. She is especially effective in matters where immigration, business decisions, and legal risk overlap.",
                  "Joyce's approach is calm, strategic, and deeply personal. She takes time to understand each client's circumstances, explain the path ahead clearly, and protect what matters most: liberty, livelihood, family, business, and reputation.",
                ].map((para, i) => (
                  <p key={i} className="font-body text-brand-dark/70 text-base leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Education */}
                <div className="pt-4 border-t border-brand-gray">
                  <h3 className="font-heading text-xl font-semibold text-brand-dark mb-4">Education</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-coral-500 mt-2 shrink-0" />
                      <div>
                        <p className="font-body font-semibold text-brand-dark text-sm">Juris Doctor</p>
                        <p className="font-body text-brand-dark/55 text-sm">Arizona Summit Law School</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-coral-500 mt-2 shrink-0" />
                      <div>
                        <p className="font-body font-semibold text-brand-dark text-sm">Bachelor of Science, Economics</p>
                        <p className="font-body text-brand-dark/55 text-sm">Campbell University</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-brand-dark/50 text-sm mt-4">
                    Joyce is admitted to practice in Arizona and the District of Columbia.
                  </p>
                </div>
              </div>

              {/* Sidebar: Court Admissions */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-5">
                  <div className="p-6 rounded-2xl bg-teal-950">
                    <h3 className="font-heading text-base font-semibold text-white mb-4">Court Admissions</h3>
                    <ul className="space-y-2.5">
                      {courtAdmissions.map((court) => (
                        <li key={court} className="flex gap-2.5 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-1.5 shrink-0" />
                          <span className="font-body text-white/70 text-xs leading-relaxed">{court}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-brand-gray/50 border border-brand-gray">
                    <h4 className="font-body font-semibold text-brand-dark text-sm mb-3">Schedule a Consultation</h4>
                    <p className="font-body text-brand-dark/55 text-xs leading-relaxed mb-4">
                      Discuss your matter directly with Joyce.
                    </p>
                    <Link
                      href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-xs rounded-xl transition-colors"
                    >
                      <Calendar size={13} />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Affiliations */}
        <section className="py-16 bg-brand-gray/30 border-t border-brand-gray">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/8 border border-teal-800/15 mb-4">
                <Award size={13} className="text-teal-800" />
                <span className="text-teal-800 text-xs font-body font-semibold tracking-[0.15em] uppercase">Leadership &amp; Service</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold text-brand-dark">
                Professional Affiliations
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {affiliations.map(({ org, role }) => (
                <div
                  key={org}
                  className="p-5 rounded-2xl bg-white border border-brand-gray hover:border-coral-500/25 hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="w-6 h-6 rounded-full bg-coral-500/12 group-hover:bg-coral-500/20 flex items-center justify-center mb-3 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-coral-500" />
                  </div>
                  <p className="font-body font-semibold text-brand-dark text-sm leading-snug mb-1">{org}</p>
                  {role && <p className="font-body text-brand-dark/50 text-xs leading-relaxed">{role}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ConsultationModal />
      <WhatsAppButton />
      <ScrollToTop />
      <Toast />
    </>
  );
}
