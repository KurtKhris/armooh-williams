"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Phone, MapPin, Globe, Link2, MessageCircle, Mail } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import type { SiteSettings } from "@/lib/settings-config";
import { SETTING_DEFAULTS } from "@/lib/settings-config";

export default function SiteSettingsPage() {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SiteSettings>(SETTING_DEFAULTS);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => r.json())
      .then((data) => setForm((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const set = (key: keyof SiteSettings, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        dispatch(showToast({ message: "Site settings saved.", type: "success" }));
      } else {
        dispatch(showToast({ message: "Failed to save settings.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-white mb-1">Site Settings</h1>
            <p className="font-body text-white/50 text-sm">
              These values appear live on the website — phone, WhatsApp, address, and social links.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Contact Info */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
              <h2 className="font-heading text-white text-base font-semibold flex items-center gap-2">
                <Phone size={16} className="text-coral-500" /> Contact Information
              </h2>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+1 (703) 220-4504"
                    className="w-full pl-8 pr-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="info@armooh-williams.com"
                    className="w-full pl-8 pr-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  WhatsApp Number <span className="normal-case text-white/30">(digits only, with country code)</span>
                </label>
                <div className="relative">
                  <MessageCircle size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    placeholder="17035978170"
                    className="w-full pl-8 pr-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                </div>
                <p className="font-body text-white/30 text-xs mt-1.5">e.g. 17035978170 — used for the WhatsApp chat button</p>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  <span className="flex items-center gap-1.5"><MapPin size={11} />Office Address</span>
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  rows={2}
                  placeholder={"2611 South Clark Street, Suite 600\nArlington, Virginia 22202"}
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors resize-none"
                />
                <p className="font-body text-white/30 text-xs mt-1.5">Use a line break to split street and city</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
              <h2 className="font-heading text-white text-base font-semibold flex items-center gap-2">
                <Globe size={16} className="text-coral-500" /> Social Media Links
              </h2>
              <p className="font-body text-white/40 text-xs">Leave blank to hide that icon from the footer.</p>

              {[
                { key: "linkedin" as const, label: "LinkedIn", placeholder: "https://linkedin.com/company/armooh-williams" },
                { key: "twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/armoohwilliams" },
                { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/armoohwilliams" },
                { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/armoohwilliams" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      value={form[key]}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full pl-8 pr-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save Settings"}
            </motion.button>
          </form>
        </div>
    </main>
  );
}
