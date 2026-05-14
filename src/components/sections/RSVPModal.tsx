"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Clock } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import type { Event } from "@/types";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function RSVPModal({ isOpen, onClose, event }: RSVPModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setLoading(true);

    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId: event.id }),
      });

      if (res.ok) {
        dispatch(
          showToast({ message: "RSVP submitted successfully! We will be in touch.", type: "success" })
        );
        onClose();
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error || "Failed to submit RSVP.", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "An error occurred. Please try again.", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-teal-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6"
          >
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-luxury-lg border border-brand-gray max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-coral-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header (Fixed) */}
              <div className="gradient-hero p-6 sm:px-8 sm:pt-8 sm:pb-6 text-white relative shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral-500/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
                <h3 className="font-heading text-2xl font-semibold mb-2 pr-6 text-white">RSVP for Event</h3>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-4">{event.title}</p>
                <div className="flex flex-wrap items-center gap-3 font-body text-xs text-white/80">
                  <span className="flex items-center gap-1.5 bg-white/15 px-2 py-1 rounded-md">
                    <Calendar size={12} className="text-coral-500" />
                    {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {event.eventTime && (
                    <span className="flex items-center gap-1.5 bg-white/15 px-2 py-1 rounded-md">
                      <Clock size={12} className="text-coral-500" />
                      {event.eventTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Body & Footer wrapped in Form */}
              <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                {/* Body (Scrollable) */}
                <div className="p-6 sm:px-8 sm:py-6 space-y-4 overflow-y-auto scrollbar-admin">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-body text-xs font-semibold text-brand-dark/70 uppercase tracking-widest">First Name *</label>
                      <input
                        required
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-gray bg-brand-gray/30 focus:bg-white focus:border-coral-500/50 focus:outline-none transition-colors font-body text-brand-dark text-sm placeholder:text-brand-dark/30"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-body text-xs font-semibold text-brand-dark/70 uppercase tracking-widest">Last Name *</label>
                      <input
                        required
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-gray bg-brand-gray/30 focus:bg-white focus:border-coral-500/50 focus:outline-none transition-colors font-body text-brand-dark text-sm placeholder:text-brand-dark/30"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-body text-xs font-semibold text-brand-dark/70 uppercase tracking-widest">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray bg-brand-gray/30 focus:bg-white focus:border-coral-500/50 focus:outline-none transition-colors font-body text-brand-dark text-sm placeholder:text-brand-dark/30"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-body text-xs font-semibold text-brand-dark/70 uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray bg-brand-gray/30 focus:bg-white focus:border-coral-500/50 focus:outline-none transition-colors font-body text-brand-dark text-sm placeholder:text-brand-dark/30"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-body text-xs font-semibold text-brand-dark/70 uppercase tracking-widest">Questions / Comments</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray bg-brand-gray/30 focus:bg-white focus:border-coral-500/50 focus:outline-none transition-colors font-body text-brand-dark text-sm placeholder:text-brand-dark/30 resize-none"
                      placeholder="Anything you'd like to ask before the event?"
                    />
                  </div>
                </div>

                {/* Footer (Fixed) */}
                <div className="p-4 sm:px-8 sm:py-5 bg-white border-t border-brand-gray/40 shrink-0">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm transition-colors shadow-coral disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Complete RSVP"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
