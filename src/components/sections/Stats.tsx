"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CreditCard, Lock, ExternalLink } from "lucide-react";

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-20 gradient-teal overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-coral-500/8 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/4 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-10 p-10 rounded-3xl bg-white/6 border border-white/10"
        >
          {/* Icon */}
          <div className="shrink-0 w-20 h-20 rounded-2xl bg-coral-500/20 border border-coral-500/25 flex items-center justify-center">
            <CreditCard size={36} className="text-coral-500" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading text-3xl font-semibold text-white mb-3">
              Online Payment Portal
            </h2>
            <p className="font-body text-white/65 text-base leading-relaxed max-w-2xl">
              Armooh-Williams, PLLC provides a secure and convenient online payment portal for our U.S.-based clients.
              Payments can be made by electronic check (ACH) or credit card through our encrypted system.
            </p>
            <div className="flex items-center gap-2 mt-3 justify-center lg:justify-start">
              <Lock size={13} className="text-teal-400" />
              <span className="font-body text-teal-400 text-xs font-medium tracking-wide">Secured &amp; Encrypted</span>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <a
              href="https://secure.lawpay.com/pages/armooh-williams/operating"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral whitespace-nowrap"
            >
              Pay Now
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
