import Link from "next/link";
import { ArrowRight, Home, Scale } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleCalendarButton from "@/components/ui/GoogleCalendarButton";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-teal-950 flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 mb-8">
            <Scale size={28} className="text-coral-500" />
          </div>

          <p className="font-body text-sm tracking-[0.2em] uppercase text-white/40 mb-4">
            Error 404
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-white mb-6">
            This page is not on the record.
          </h1>

          <p className="font-body text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-10">
            The page you&apos;re looking for may have been moved, renamed, or is no longer
            available. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 group"
            >
              <Home size={16} />
              Back to Home
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <GoogleCalendarButton label="Schedule a Consultation" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
