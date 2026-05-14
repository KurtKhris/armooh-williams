"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, Phone, MessageSquare, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setConsultationModalOpen, showToast } from "@/store/uiSlice";
import { PRACTICE_AREAS } from "@/lib/utils";

export default function ConsultationModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.consultationModalOpen);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", practiceArea: "", message: "", preferredDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        dispatch(showToast({ message: "Consultation request submitted!", type: "success" }));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(showToast({ message: "Failed to submit. Please try again.", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(setConsultationModalOpen(false));
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed z-[70] inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-teal-950 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-8 pb-0">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral-500/20 border border-coral-500/30 mb-4">
                <Calendar size={12} className="text-coral-500" />
                <span className="text-coral-500 text-xs font-body font-semibold tracking-widest uppercase">Book a Consultation</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold text-white mb-2">
                Schedule Your Consultation
              </h2>
              <p className="text-white/55 font-body text-sm mb-6">
                Fill in the details below and our team will respond within 24 hours.
              </p>
            </div>

            <div className="p-8 pt-4">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-heading text-2xl text-white font-semibold mb-2">Request Received!</h3>
                  <p className="text-white/60 font-body text-sm mb-6">
                    Thank you. Our team will reach out within 24 hours to confirm your consultation.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-coral-500 text-white font-body font-semibold rounded-xl text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                      <input
                        name="preferredDate"
                        type="date"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>

                  <select
                    name="practiceArea"
                    value={form.practiceArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="">Select Practice Area</option>
                    {PRACTICE_AREAS.map((a) => (
                      <option key={a.id} value={a.title}>{a.title}</option>
                    ))}
                  </select>

                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-4 top-4 text-white/35" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your legal matter..."
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Privacy note */}
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/8">
                    <Lock size={13} className="text-coral-500 shrink-0" />
                    <p className="text-white/45 font-body text-xs">
                      All information is protected by attorney-client privilege and treated with strict confidentiality.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 shadow-coral"
                  >
                    {loading ? "Submitting..." : "Schedule Consultation"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}