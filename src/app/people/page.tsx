import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, ScrollToTop, Toast } from "@/components/ui/FloatingWidgets";
import Image from "next/image";
import Link from "next/link";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People | Joyce Williams, Esq. | Armooh-Williams, PLLC",
  description:
    "Joyce Williams is the Founder and Principal Attorney of Armooh-Williams, PLLC, advising businesses, executives, investors, and international clients on corporate immigration, white collar defense, sanctions, and cross-border legal matters.",
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
    org: "American Immigration Lawyers Association (AILA)",
    role: "Co-Chair, Enforcement & Removal Subcommittee",
  },
  {
    org: "American Bar Association, Section of International Law",
    role: "Editor, International Trade Committee & Corporate Counsel Committee; Rule of Law Chair, Africa Committee; Board Member, Rule of Law",
  },
  {
    org: "Washington, D.C. Women's Bar Association",
    role: "Co-Chair, International Law Committee",
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
  {
    org: "Diocese of Arlington",
    role: "Financial Council Member",
  },
  {
    org: "Good Shepherd Catholic Church",
    role: "Lector & Parish Financial Council Member",
  },
];

const bioParagraphs = [
  "Joyce Williams is the Founder and Principal Attorney of Armooh-Williams, PLLC, a Washington, DC-based law firm focused on corporate immigration, white collar defense, sanctions, and cross-border investigations. As an immigrant originally from Ghana and the first attorney in her family, Joyce brings both professional excellence and personal understanding to the clients and communities she serves.",
  "She represents businesses, executives, entrepreneurs, investors, and international clients navigating complex legal matters where immigration status, government scrutiny, business interests, or personal reputation may be at risk. Clients rely on Joyce for strategic judgment, discretion, and clear guidance during moments that are often urgent, unfamiliar, and deeply consequential.",
  "With a background spanning international law, immigration, trade, business transactions, and cross-border advisory work, Joyce has advised governments, multinational companies, startups, and mission-driven organizations across North America, Africa, and emerging markets. Her experience includes work involving high-value transactions, sovereign guarantees, public-private investment structures, tax concessions, political risk, and international regulatory matters.",
  "Today, Joyce applies that global perspective to a focused legal practice helping clients navigate corporate immigration, executive mobility, government investigations, sanctions concerns, financial crime matters, and enforcement-sensitive business activity. She is particularly effective in matters where immigration, business strategy, and legal risk intersect.",
  "Known for her calm, thoughtful, and client-centered approach, Joyce takes the time to understand each client's unique circumstances, explain the legal landscape clearly, and protect what matters most — liberty, livelihood, family, business, and reputation.",
  "Beyond her legal practice, Joyce is deeply committed to mentorship, leadership, and creating opportunities for the next generation of attorneys and globally minded professionals.",
];

export default function PeoplePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero — Clarkson full-bleed editorial ── */}
        <section className="pt-18 bg-linear-to-br from-teal-800 to-teal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 min-h-[70vh] items-end">

              {/* Left — text anchored to bottom */}
              <div className="py-20 lg:py-28">
                <div className="flex items-center gap-4 mb-6">
                  <span className="gold-rule" />
                  <span className="text-brand-gold text-xs font-body font-semibold tracking-[0.22em] uppercase">
                    People
                  </span>
                </div>

                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-4">
                  Joyce Williams,{" "}
                  <span className="text-coral-500">Esq.</span>
                </h1>
                <p className="font-body text-white/50 text-lg mb-8 tracking-wide">
                  Founder &amp; Principal Attorney
                </p>
                <p className="font-body text-white/60 text-base leading-relaxed max-w-lg mb-10">
                  Originally from Ghana and the first attorney in her family, Joyce combines global legal
                  experience with a deeply personal understanding of the challenges clients face when
                  navigating immigration, business risk, and government scrutiny.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GoogleCalendarButton label="Schedule a Consultation" />
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/8 hover:bg-white/14 text-white border border-white/20 font-body font-semibold rounded-xl text-sm transition-colors duration-200"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Right — portrait bleeds to edge */}
              <div className="hidden lg:flex items-end justify-end h-full">
                <div className="relative w-full max-w-sm xl:max-w-md">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src="/Joyce2.jpg"
                      alt="Joyce Williams, Esq. — Founder & Principal Attorney"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-teal-950/50 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bio — Clarkson editorial, 12-col grid ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Main bio */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <span className="gold-rule" />
                  <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                    Biography
                  </span>
                </div>

                <div className="space-y-5 mb-12">
                  {bioParagraphs.map((para, i) => (
                    <p key={i} className="font-body text-brand-slate text-base leading-[1.85]">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Education */}
                <div className="pt-8 border-t border-brand-gray">
                  <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6">Education</h3>
                  <div className="space-y-5">
                    {[
                      { degree: "Juris Doctor", school: "Arizona Summit Law School" },
                      { degree: "Bachelor of Science, Economics", school: "Campbell University" },
                    ].map(({ degree, school }) => (
                      <div key={degree} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-coral-500 mt-2.5 shrink-0" />
                        <div>
                          <p className="font-body font-semibold text-brand-dark text-sm">{degree}</p>
                          <p className="font-body text-brand-slate text-sm">{school}</p>
                        </div>
                      </div>
                    ))}
                    <p className="font-body text-brand-slate/60 text-sm pl-6">
                      Admitted to practice in Arizona and the District of Columbia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-6">

                  {/* Court Admissions */}
                  <div className="p-6 rounded-2xl bg-teal-950">
                    <h3 className="font-heading text-lg font-semibold text-white mb-5">
                      Court Admissions
                    </h3>
                    <ul className="space-y-3">
                      {courtAdmissions.map((court) => (
                        <li key={court} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-[0.45rem] shrink-0" />
                          <span className="font-body text-white/65 text-xs leading-relaxed">{court}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Consultation card */}
                  <div className="p-6 rounded-2xl bg-brand-ivory border border-brand-gray">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="gold-rule" />
                      <h4 className="font-heading text-lg font-semibold text-brand-dark">
                        Schedule a Consultation
                      </h4>
                    </div>
                    <p className="font-body text-brand-slate text-sm leading-relaxed mb-5">
                      Discuss your matter directly with Joyce. All consultations are handled with the
                      utmost discretion and confidentiality.
                    </p>
                    <GoogleCalendarButton label="Book Now" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Professional Affiliations ── */}
        <section className="py-20 lg:py-28 bg-brand-ivory border-t border-brand-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <span className="gold-rule" />
                <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                  Leadership &amp; Service
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark">
                Professional Affiliations
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {affiliations.map(({ org, role }) => (
                <div
                  key={org}
                  className="p-6 rounded-2xl bg-white border border-brand-gray hover:border-teal-800/20 hover:luxury-shadow transition-all duration-300 group"
                >
                  <div className="w-5 h-5 rounded-full bg-coral-500/10 group-hover:bg-coral-500/20 flex items-center justify-center mb-4 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                  </div>
                  <p className="font-body font-semibold text-brand-dark text-sm leading-snug mb-1.5">{org}</p>
                  {role && (
                    <p className="font-body text-brand-slate text-xs leading-relaxed">{role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-16 bg-teal-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-heading text-2xl font-semibold text-white mb-1">
                  Ready to protect what matters most?
                </p>
                <p className="font-body text-white/50 text-sm">
                  Liberty, livelihood, family, business, and reputation.
                </p>
              </div>
              <GoogleCalendarButton label="Schedule a Consultation" />
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
