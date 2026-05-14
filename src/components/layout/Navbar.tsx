"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu, setMobileMenuOpen } from "@/store/uiSlice";
import { useSettings } from "@/components/SettingsContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Principal Attorney", href: "/principal-attorney" },
  { label: "Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const { phone } = useSettings();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-teal-950/95 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.3)] border-b border-white/5"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-coral-500/30 group-hover:ring-coral-500/70 transition-all duration-300 bg-white shrink-0">
                <Image
                  src="/logo.png"
                  alt="Armooh-Williams, PLLC"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain p-0.5"
                  priority
                />
              </div>
              <div className="sm:block">
                <div className="text-white font-heading font-semibold text-lg leading-none tracking-wide">
                  Armooh-Williams
                </div>
                <div className="text-coral-500 text-xs font-body tracking-[0.2em] uppercase mt-0.5">
                  PLLC
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-white/80 hover:text-white text-sm font-body font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone size={14} />
                <span className="font-body">{phone}</span>
              </a>
              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white text-sm font-body font-semibold rounded-xl transition-colors duration-200 shadow-[0_4px_16px_rgba(239,75,67,0.4)]"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 text-white rounded-xl hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-teal-950 border-l border-white/10 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link href="/" onClick={() => dispatch(setMobileMenuOpen(false))} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-coral-500/40 bg-white shrink-0">
                    <Image src="/logo.png" alt="Armooh-Williams, PLLC" width={36} height={36} className="w-full h-full object-contain p-0.5" />
                  </div>
                  <span className="text-white font-heading text-base font-semibold">Armooh-Williams, PLLC</span>
                </Link>
                <button
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                  className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => dispatch(setMobileMenuOpen(false))}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl font-body font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 space-y-3">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  <span className="font-body text-sm">{phone}</span>
                </a>
                <Link
                  href="https://calendar.google.com/calendar/u/0/appointments/AcZssZ2GDJMlLObqrZgcvSDljz5vUBbLNsq8lFU3P1k="
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                  className="block w-full py-3 text-center bg-coral-500 text-white font-body font-semibold rounded-xl text-sm"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
