"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Lock } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

interface ContactInfo {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export default function ContactSection({ 
  contactInfo, 
  practiceAreas 
}: { 
  contactInfo?: ContactInfo;
  practiceAreas?: { id: string | number; title: string }[];
}) {
  const displayOffice = contactInfo || {
    city: "Arlington, Virginia",
    address: "2611 South Clark Street, Suite 600\nArlington, Virginia 22202",
    phone: "+1 (703) 220-4504",
    email: "info@armooh-williams.com"
  };
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", practiceArea: "", message: "",
    website: "", // honeypot — must stay empty
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
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      if (res.ok) {
        setSubmitted(true);
        dispatch(showToast({ message: "Message sent!", type: "success" }));
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
      dispatch(showToast({ message: msg, type: "error" }));
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-gray/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/8 border border-teal-800/15 mb-6">
            <Mail size={13} className="text-teal-800" />
            <span className="text-teal-800 text-xs font-body font-semibold tracking-[0.15em] uppercase">Contact Us</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark mb-4">
            Let&apos;s Start a{" "}
            <span className="text-coral-500">Conversation</span>
          </h2>
          <p className="text-brand-dark/60 font-body text-lg max-w-xl mx-auto">
            Whether you have a specific legal question or need comprehensive counsel, we&apos;re ready to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Office hours */}
            <div className="p-6 rounded-3xl bg-linear-to-br from-teal-800 to-teal-950 border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-coral-500/20 flex items-center justify-center">
                  <Clock size={18} className="text-coral-500" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">Office Hours</h3>
              </div>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-white/70">
                  <span>Monday – Friday</span>
                  <span className="text-white font-medium">9:00 AM – 5:00 PM EST</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Saturday</span>
                  <span className="text-white font-medium">By Appointment Only</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Sunday</span>
                  <span className="text-white/50">Closed</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <p className="text-white/50 text-xs leading-relaxed">
                    <span className="text-coral-400 font-semibold">Federal Holidays:</span> Our offices observe all U.S. federal holidays. Inquiries received during closures will be addressed on the next business day.
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    To schedule a consultation, please contact our office or use our online appointment scheduler.
                  </p>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="p-6 rounded-3xl bg-brand-gray/40 border border-brand-gray">
              <h4 className="font-heading text-lg font-semibold text-brand-dark mb-4">{displayOffice.city}</h4>
              <div className="space-y-3 text-sm font-body">
                <div className="flex items-start gap-3 text-brand-dark/65">
                  <MapPin size={15} className="text-coral-500 shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{displayOffice.address}</span>
                </div>
                <div className="flex items-center gap-3 text-brand-dark/65">
                  <Phone size={15} className="text-coral-500 shrink-0" />
                  <a href={`tel:${displayOffice.phone}`} className="hover:text-coral-500 transition-colors">{displayOffice.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-brand-dark/65">
                  <Mail size={15} className="text-coral-500 shrink-0" />
                  <a href={`mailto:${displayOffice.email}`} className="hover:text-coral-500 transition-colors">{displayOffice.email}</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-3xl bg-white border border-brand-gray shadow-luxury">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-teal-600" />
                  </div>
                  <h3 className="font-heading text-2xl text-brand-dark font-semibold mb-2">Message Received</h3>
                  <p className="text-brand-dark/60 font-body text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from humans, bots fill it in */}
                  <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">First Name</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="John"
                        className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark placeholder:text-brand-dark/30 font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Doe"
                        className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark placeholder:text-brand-dark/30 font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark placeholder:text-brand-dark/30 font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (703) 220-4504"
                        className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark placeholder:text-brand-dark/30 font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">Practice Area</label>
                      <select name="practiceArea" value={form.practiceArea} onChange={handleChange}
                        className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all">
                        <option value="">Select area</option>
                        {practiceAreas?.map((a) => <option key={a.id} value={a.title}>{a.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-xs font-semibold text-brand-dark/60 uppercase tracking-wide mb-2">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us about your legal matter..."
                      className="w-full px-4 py-3 bg-brand-gray/40 border border-brand-gray rounded-xl text-brand-dark placeholder:text-brand-dark/30 font-body text-sm focus:outline-none focus:border-teal-800/50 focus:bg-white transition-all resize-none" />
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-800/4 border border-teal-800/10">
                    <Lock size={13} className="text-teal-800 shrink-0" />
                    <p className="text-brand-dark/50 font-body text-xs">Protected by attorney-client privilege. All communications are strictly confidential.</p>
                  </div>

                  <Turnstile
                    ref={turnstileRef}
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    options={{ appearance: "interaction-only", size: "flexible" }}
                  />

                  <motion.button
                    type="submit"
                    disabled={loading || !turnstileToken}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold rounded-xl text-sm transition-colors duration-200 shadow-coral"
                  >
                    <Send size={16} />
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}