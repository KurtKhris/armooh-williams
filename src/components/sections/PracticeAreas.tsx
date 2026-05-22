"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PracticeArea } from "@/lib/schema";

const FALLBACK_AREAS = [
  {
    title: "Global Mobility & Immigration",
    description:
      "Strategic immigration solutions for international businesses, executives, investors, and global talent — enabling seamless cross-border movement with confidence.",
    slug: "global-mobility-immigration",
    imageUrl: null,
  },
  {
    title: "White Collar Defense & Sanctions",
    description:
      "Sophisticated representation in government investigations, compliance matters, sanctions issues, and regulatory disputes — protecting your interests with precision and discretion.",
    slug: "white-collar-defense-sanctions",
    imageUrl: null,
  },
  {
    title: "Trust & Corporate Services",
    description:
      "Tailored structuring, governance, and wealth preservation solutions designed for long-term stability, asset protection, and generational growth.",
    slug: "trust-corporate-services",
    imageUrl: null,
  },
];

const FALLBACK_GRADIENTS = [
  "from-teal-950 via-teal-900 to-teal-800",
  "from-teal-800 via-teal-900 to-teal-950",
  "from-teal-950 via-teal-800 to-teal-900",
];

function AreaRow({
  area,
  index,
}: {
  area: { title: string; description: string; slug: string; imageUrl?: string | null };
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  const textSide = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -28 : 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1 }}
      className={`flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 ${isEven ? "bg-white" : "bg-brand-ivory"}`}
    >
      <span className="font-heading text-8xl font-bold text-teal-800/6 leading-none -mb-4 select-none">
        {num}
      </span>
      <div className="flex items-center gap-3 mb-5">
        <span className="gold-rule" />
        <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
          Capability
        </span>
      </div>
      <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark leading-[1.1] mb-5">
        {area.title}
      </h3>
      <p className="font-body text-brand-slate text-base leading-relaxed mb-8 max-w-md">
        {area.description}
      </p>
      <Link
        href={`/capabilities/${area.slug}`}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group w-fit"
      >
        Learn More
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </motion.div>
  );

  const imageSide = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 28 : -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85 }}
      className="relative min-h-80 lg:min-h-0 lg:h-full overflow-hidden"
    >
      {area.imageUrl ? (
        <Image
          src={area.imageUrl}
          alt={area.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-br ${FALLBACK_GRADIENTS[index % 3]}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-[9rem] font-bold text-white/5 select-none leading-none">
              {num}
            </span>
          </div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-teal-950/15" />
    </motion.div>
  );

  return (
    <div ref={ref} className="grid lg:grid-cols-2">
      {isEven ? (
        <>
          {textSide}
          {imageSide}
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1 h-full">{imageSide}</div>
          <div className="order-1 lg:order-2">{textSide}</div>
        </>
      )}
    </div>
  );
}

export default function PracticeAreas({ areas }: { areas: PracticeArea[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const displayAreas =
    areas.length > 0
      ? areas.map((a) => ({
          title: a.title,
          description: a.description,
          slug: a.slug,
          imageUrl: a.imageUrl,
        }))
      : FALLBACK_AREAS;

  return (
    <section id="practice-areas" className="bg-white overflow-x-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-14">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="gold-rule" />
              <span className="text-brand-slate text-xs font-body font-semibold tracking-[0.18em] uppercase">
                Our Practice Areas
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark leading-[1.1]">
              Capabilities
            </h2>
          </div>
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 text-teal-800 hover:text-coral-500 font-body font-semibold text-sm transition-colors duration-200 group shrink-0"
          >
            All Capabilities
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* Alternating rows */}
      <div className="border-t border-brand-gray">
        {displayAreas.map((area, i) => (
          <div key={area.slug} className={i < displayAreas.length - 1 ? "border-b border-brand-gray" : ""}>
            <AreaRow area={area} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
