"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CreditCard, Lock, ExternalLink } from "lucide-react";

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-16 bg-teal-950 overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-10 rounded-2xl border border-white/8 bg-white/4"
        >
          {/* Icon */}
          <div className="shrink-0 w-16 h-16 rounded-xl bg-coral-500/15 border border-coral-500/20 flex items-center justify-center">
            <CreditCard size={28} className="text-coral-500" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading text-2xl font-semibold text-white mb-2">
              Online Payment Portal
            </h2>
            <p className="font-body text-white/55 text-sm leading-relaxed max-w-2xl">
              Armooh-Williams, PLLC provides a secure and convenient online payment portal for our U.S.-based clients.
              Payments can be made by electronic check (ACH) or credit card through our encrypted system.
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
              <Lock size={12} className="text-teal-400" />
              <span className="font-body text-teal-400 text-xs tracking-wide">Secured &amp; Encrypted</span>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <a
              href="https://secure.lawpay.com/pages/armooh-williams/operating"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors duration-200 whitespace-nowrap"
              style={{ boxShadow: "0 4px 16px rgba(196,30,36,0.35)" }}
            >
              Pay Now
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
