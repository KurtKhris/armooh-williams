"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useSettings } from "@/components/SettingsContext";
import { useEffect, useState } from "react";

const quickLinks = [
  { label: "Events",        href: "/events" },
  { label: "Contact",       href: "/contact" },
  { label: "Privacy Policy",href: "/privacy" },
  { label: "Terms of Use",  href: "/terms" },
  { label: "Disclaimer",    href: "/disclaimer" },
];

const practiceLinks = [
  { label: "Global Mobility & Immigration",  href: "/capabilities/global-mobility-immigration" },
  { label: "White Collar Defense & Sanctions",href: "/capabilities/white-collar-defense-sanctions" },
  { label: "Trust & Corporate Services",     href: "/capabilities/trust-corporate-services" },
];

type Capability = { title: string; slug: string };

export default function Footer() {
  const { phone, email, address, linkedin, facebook, instagram, twitter } = useSettings();
  const [capabilities, setCapabilities] = useState<Capability[]>([]);

  useEffect(() => {
    fetch("/api/practice-areas")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCapabilities(data.filter((a) => a.published));
      })
      .catch(() => {});
  }, []);

  const socials = [
    { href: linkedin,  icon: "/linkedin.png",  title: "LinkedIn" },
    { href: twitter,   icon: "/twitter.png",   title: "Twitter / X" },
    { href: facebook,  icon: "/facebook.png",  title: "Facebook" },
    { href: instagram, icon: "/instagram.png", title: "Instagram" },
  ].filter((s) => s.href);

  const [addressLine1, addressLine2] = address.split("\n");

  /* Use DB capabilities if available, else static PDF list */
  const displayCapabilities =
    capabilities.length > 0
      ? capabilities.map((c) => ({ label: c.title, href: `/capabilities/${c.slug}` }))
      : practiceLinks;

  return (
    <footer className="bg-teal-950 text-white">

      {/* ── Gold top accent line ── */}
      <div className="h-px bg-brand-gold/40" />

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-white px-3 py-2 rounded-lg">
                <Image
                  src="/aw_logo.png"
                  alt="Armooh-Williams, PLLC"
                  width={130}
                  height={52}
                  className="h-11 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-6">
              A Washington, DC-based boutique law firm advising businesses, executives, investors,
              and private clients on high-stakes global legal matters.
            </p>
            <p className="font-heading italic text-white/35 text-sm">
              Global Reach. Strategic Protection. Trusted Counsel.
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-5 text-white tracking-wide">
              Capabilities
            </h3>
            <ul className="space-y-2.5">
              {displayCapabilities.map((cap) => (
                <li key={cap.href}>
                  <Link
                    href={cap.href}
                    className="text-white/50 hover:text-coral-500 font-body text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-200" />
                    {cap.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-5 text-white tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-coral-500 font-body text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-5 text-white tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-coral-500 shrink-0 mt-0.5" />
                <span className="text-white/50 font-body text-sm">
                  {addressLine1}
                  {addressLine2 && <><br />{addressLine2}</>}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-coral-500 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-white/50 hover:text-white font-body text-sm transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-coral-500 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-white/50 hover:text-white font-body text-sm transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <div className="flex items-center gap-2.5">
                {socials.map(({ href, icon, title }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/6 hover:bg-coral-500 border border-white/8 hover:border-coral-500 transition-all duration-200 group"
                  >
                    <Image
                      src={icon}
                      alt={title}
                      width={16}
                      height={16}
                      className="opacity-55 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 font-body text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Armooh-Williams, PLLC. All rights reserved. Attorney Advertising.
          </p>
          <p className="text-white/25 font-body text-xs text-center">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
