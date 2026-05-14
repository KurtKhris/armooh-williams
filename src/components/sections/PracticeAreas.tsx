"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Building2, Gavel, Globe, Heart, Home, Earth, Lightbulb, Scale,
  Briefcase, Users, Shield, FileText, ArrowUpRight,
} from "lucide-react";
import type { PracticeArea } from "@/lib/schema";

const iconMap: Record<string, React.ElementType> = {
  building: Building2,
  gavel: Gavel,
  globe: Globe,
  heart: Heart,
  home: Home,
  earth: Earth,
  lightbulb: Lightbulb,
  scale: Scale,
  briefcase: Briefcase,
  users: Users,
  shield: Shield,
  "file-text": FileText,
};

const gradients = [
  "from-teal-800 to-teal-700",
  "from-coral-500 to-coral-700",
  "from-teal-700 to-teal-800",
  "from-coral-700 to-coral-500",
  "from-teal-800 to-teal-500",
  "from-coral-500 to-coral-400",
  "from-teal-950 to-teal-800",
  "from-coral-600 to-coral-500",
];

export default function PracticeAreas({ areas }: { areas: PracticeArea[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="practice-areas" className="section-padding bg-brand-gray/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-coral-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/8 border border-teal-800/15 mb-6">
            <Scale size={13} className="text-teal-800" />
            <span className="text-teal-800 text-xs font-body font-semibold tracking-[0.15em] uppercase">
              Capabilities
            </span>
          </div>
          <p className="text-brand-dark/60 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Corporate Immigration & White-Collar Defense for Global Businesses, Executives, and Cross-Border Professionals
          </p>
        </motion.div>

        {areas.length === 0 ? (
          <p className="text-center text-brand-dark/40 font-body py-10">Capabilities coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {areas.map((area, i) => {
              const Icon = iconMap[area.icon] ?? Scale;
              const gradient = gradients[i % gradients.length];
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <Link href={`/capabilities/${area.slug}`} className="block h-full group">
                    <div className="h-full relative p-6 rounded-3xl bg-white border border-brand-gray hover:border-transparent shadow-luxury hover:shadow-luxury-lg transition-all duration-400 overflow-hidden">
                      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none ring-1 ring-white/20" />
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={22} className="text-white" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-brand-dark group-hover:text-white mb-3 transition-colors duration-300">
                          {area.title}
                        </h3>
                        <p className="font-body text-sm text-brand-dark/60 group-hover:text-white/75 leading-relaxed mb-5 transition-colors duration-300">
                          {area.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-coral-500 group-hover:text-white/80 font-body text-sm font-semibold transition-colors duration-300">
                          Learn More
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white font-body font-semibold rounded-2xl transition-all duration-200 group"
          >
            View All Capabilities
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
