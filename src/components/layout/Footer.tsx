"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useSettings } from "@/components/SettingsContext";
import { useEffect, useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Principal Attorney", href: "/principal-attorney" },
  { label: "Our Attorneys", href: "/principal-attorney#team" },
  { label: "Legal News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
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
    { href: linkedin, icon: "/linkedin.png", title: "LinkedIn" },
    { href: twitter, icon: "/twitter.png", title: "Twitter / X" },
    { href: facebook, icon: "/facebook.png", title: "Facebook" },
    { href: instagram, icon: "/instagram.png", title: "Instagram" },
  ].filter((s) => s.href);

  const [addressLine1, addressLine2] = address.split("\n");

  return (
    <footer className="bg-teal-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-coral-500/30 group-hover:ring-coral-500/60 transition-all duration-300 bg-white shrink-0">
                <Image
                  src="/logo.png"
                  alt="Armooh-Williams, PLLC"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div>
                <div className="font-heading font-semibold text-lg leading-none text-white">Armooh-Williams</div>
                <div className="text-coral-500 text-xs tracking-[0.2em] uppercase mt-0.5">PLLC</div>
              </div>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              Armooh-Williams, PLLC is a Washington, DC-based law firm advising businesses, executives, professionals, and international clients in high-stakes immigration, government investigation, and white-collar defense matters.
            </p>
            
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Capabilities</h3>
            <ul className="space-y-2.5">
              {capabilities.length === 0 ? (
                <li className="text-white/30 font-body text-sm">No capabilities yet.</li>
              ) : (
                capabilities.map((cap) => (
                  <li key={cap.slug}>
                    <Link
                      href={`/capabilities/${cap.slug}`}
                      className="text-white/55 hover:text-coral-500 font-body text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      {cap.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-coral-500 font-body text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-coral-500 shrink-0 mt-0.5" />
                <span className="text-white/60 font-body text-sm">
                  {addressLine1}
                  {addressLine2 && <><br />{addressLine2}</>}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-coral-500 shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-white/60 hover:text-white font-body text-sm transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-coral-500 shrink-0" />
                <a href={`mailto:${email}`} className="text-white/60 hover:text-white font-body text-sm transition-colors">
                  {email}
                </a>
              </li>
            </ul>
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ href, icon, title }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-coral-500 border border-white/10 hover:border-coral-500 transition-all duration-200 group"
                  >
                    <Image src={icon} alt={title} width={18} height={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 font-body text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Armooh-Williams, PLLC. All rights reserved. Attorney Advertising.
          </p>
          <p className="text-white/30 font-body text-xs text-center">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
