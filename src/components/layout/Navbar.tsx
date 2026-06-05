"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu, setMobileMenuOpen } from "@/store/uiSlice";
import { useSettings } from "@/components/SettingsContext";

const aboutItems = [
  { label: "The Firm", href: "/about/the-firm" },
  { label: "Armooh Williams Foundation", href: "https://armooh-williamsfoundation.org", target: "_blank", rel: "noopener" },
];

const navLinks = [
  { label: "Home",         href: "/",            dropdown: null },
  { label: "Capabilities", href: "/capabilities", dropdown: null },
  { label: "People",       href: "/people",       dropdown: null },
  { label: "Insights",     href: "/insights",     dropdown: null },
  { label: "About",        href: null,            dropdown: aboutItems },
];

export default function Navbar() {
  const dispatch     = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const { phone }    = useSettings();
  const pathname     = usePathname();
  const [aboutOpen, setAboutOpen]   = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  /* close dropdown on outside click */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  /* lock scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);


  const isActive = (href: string | null) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isAboutActive = aboutItems.some((i) => pathname.startsWith(i.href));

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-teal-900/10"
        style={{ boxShadow: "0 2px 24px rgba(4,13,18,0.08)" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">

            {/* ── Logo ── */}
            <Link href="/" className="shrink-0 group">
              <Image
                src="/naw_logo.png"
                alt="Armooh-Williams, PLLC"
                width={160}
                height={52}
                unoptimized
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div
                      key="about"
                      ref={aboutRef}
                      className="relative"
                      onMouseEnter={() => setAboutOpen(true)}
                      onMouseLeave={() => setAboutOpen(false)}
                    >
                      <button
                        onClick={() => setAboutOpen((v) => !v)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-200 relative group ${
                          isAboutActive ? "text-teal-900" : "text-teal-800/65 hover:text-teal-900"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                        />
                        {isAboutActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-px bg-coral-500" />
                        )}
                        {!isAboutActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-px bg-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        )}
                      </button>

                      <AnimatePresence>
                        {aboutOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white border border-teal-900/10 rounded-xl shadow-[0_8px_32px_rgba(4,13,18,0.12)] overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setAboutOpen(false)}
                                className="block px-5 py-3 text-sm font-body text-teal-800/70 hover:text-teal-900 hover:bg-teal-50 transition-colors duration-150"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`px-4 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-200 relative group ${
                      isActive(link.href) ? "text-teal-900" : "text-teal-800/65 hover:text-teal-900"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) ? (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-coral-500" />
                    ) : (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-teal-800/50 hover:text-teal-800 text-xs font-body transition-colors duration-200"
              >
                <Phone size={13} />
                <span>{phone}</span>
              </a>
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white text-sm font-body font-semibold rounded-xl transition-colors duration-200"
                style={{ boxShadow: "0 3px 14px rgba(196,30,36,0.28)" }}
              >
                Schedule Consultation
              </Link>
            </div>

            {/* ── Mobile menu button ── */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 text-teal-900 rounded-xl hover:bg-teal-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 310 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white border-l border-teal-900/10 lg:hidden overflow-y-auto"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-teal-900/10">
                <Link href="/" onClick={() => dispatch(setMobileMenuOpen(false))}>
                  <Image src="/naw_logo.png" alt="Armooh-Williams, PLLC" width={120} height={40} unoptimized priority className="h-10 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                  className="p-2 text-teal-800/50 hover:text-teal-900 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile links */}
              <div className="px-4 py-5 space-y-0.5">
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key="about-mobile">
                        <button
                          onClick={() => setMobileAbout((v) => !v)}
                          className="w-full flex items-center justify-between px-4 py-3 text-teal-800/75 hover:text-teal-900 hover:bg-teal-50 rounded-xl font-body font-medium transition-colors duration-200 text-sm"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`text-teal-800/35 transition-transform duration-200 ${mobileAbout ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileAbout && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-1 space-y-0.5">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => dispatch(setMobileMenuOpen(false))}
                                    className="block px-4 py-2.5 text-teal-800/60 hover:text-teal-900 hover:bg-teal-50 rounded-xl font-body text-sm transition-colors duration-200"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href!}
                      onClick={() => dispatch(setMobileMenuOpen(false))}
                      className={`block px-4 py-3 hover:bg-teal-50 rounded-xl font-body font-medium transition-colors duration-200 text-sm ${
                        isActive(link.href) ? "text-teal-900" : "text-teal-800/75 hover:text-teal-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile footer CTA */}
              <div className="px-6 py-6 border-t border-teal-900/10 space-y-3 mt-auto">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-teal-800/55 hover:text-teal-800 transition-colors text-sm font-body"
                >
                  <Phone size={15} />
                  <span>{phone}</span>
                </a>
                <Link
                  href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                  className="block w-full py-3 text-center bg-coral-500 text-white font-body font-semibold rounded-xl text-sm"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
