"use client";
import Image from "next/image";

const clients = [
  { src: "/clients/ABA-FELLOW-opt.jpg", alt: "ABA Fellow" },
  { src: "/clients/GCP-opt.jpg", alt: "GCP" },
  { src: "/clients/JOHN-CARROL-opt.jpg", alt: "John Carroll" },
  { src: "/clients/aba-sil-logo-opt.jpg", alt: "ABA" },
  { src: "/clients/iResolve-logo2_AWP.png", alt: "iResolve" },
  { src: "/clients/imigration-law-opt.jpg", alt: "Immigration Law" },
];

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-14 bg-coral-500 border-y border-brand-gray/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="font-body text-xs font-semibold text-white tracking-[0.2em] uppercase">
          Trusted by leading organizations
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* flex + w-max via Tailwind; animation via custom CSS class */}
        <div className="flex w-max animate-marquee">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="mx-10 flex-shrink-0 flex items-center justify-center"
            >
              <div className="h-14 w-32 relative">
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
