"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import type { PracticeArea } from "@/lib/schema";

const ICONS = [
  { value: "scale", label: "Scale (Law / Arbitration)" },
  { value: "building", label: "Building (Corporate)" },
  { value: "gavel", label: "Gavel (Litigation)" },
  { value: "globe", label: "Globe (Immigration)" },
  { value: "heart", label: "Heart (Family)" },
  { value: "home", label: "Home (Real Estate)" },
  { value: "earth", label: "Earth (International)" },
  { value: "lightbulb", label: "Lightbulb (IP)" },
  { value: "briefcase", label: "Briefcase (Business)" },
  { value: "users", label: "Users (Community)" },
  { value: "shield", label: "Shield (Protection)" },
  { value: "file-text", label: "File (Documents)" },
];

type FormData = {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export default function PracticeAreaForm({ initial, id }: { initial?: PracticeArea; id?: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isEdit = !!id;

  const [form, setForm] = useState<FormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    longDescription: initial?.longDescription ?? "",
    icon: initial?.icon ?? "scale",
    imageUrl: initial?.imageUrl ?? "",
    sortOrder: initial?.sortOrder ?? 0,
    published: initial?.published ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(
        isEdit ? `/api/admin/practice-areas/${id}` : "/api/admin/practice-areas",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        dispatch(showToast({ message: isEdit ? "Practice area updated." : "Practice area created.", type: "success" }));
        router.push("/admin/practice-areas");
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Failed to save.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/admin/practice-areas" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-4 transition-colors">
              <ArrowLeft size={14} />
              Back to Capabilities
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-white mb-1">
              {isEdit ? "Edit Capabilities" : "New Capabilities"}
            </h1>
            <p className="font-body text-white/50 text-sm">
              {isEdit ? "Update the details for this capability." : "Add a new capability to the website."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic info */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
              <h2 className="font-heading text-white text-sm font-semibold">Basic Information</h2>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Corporate Law"
                  required
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  Brief Description <span className="normal-case text-white/30">(shown on the card)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={2}
                  placeholder="One or two sentences shown on the practice area card..."
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => set("icon", e.target.value)}
                    className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  >
                    {ICONS.map(({ value, label }) => (
                      <option key={value} value={value} className="bg-teal-950">{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)}
                    min={0}
                    className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                  />
                  <p className="font-body text-white/30 text-xs mt-1.5">Lower numbers appear first</p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-body font-semibold text-white text-sm">Published</p>
                  <p className="font-body text-white/40 text-xs">Visible on the website when enabled</p>
                </div>
                <div
                  onClick={() => set("published", !form.published)}
                  className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ${form.published ? "bg-teal-500" : "bg-white/20"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            </div>

            {/* Cover image */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-3">
              <div>
                <h2 className="font-heading text-white text-sm font-semibold">Cover Image</h2>
                <p className="font-body text-white/40 text-xs mt-1">
                  Shown in the homepage capabilities section. Recommended: 800×600px landscape.
                </p>
              </div>
              <ImageUpload value={form.imageUrl} onChange={(url) => set("imageUrl", url)} />
            </div>

            {/* Full page content */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-3">
              <div>
                <h2 className="font-heading text-white text-sm font-semibold">Full Page Content</h2>
                <p className="font-body text-white/40 text-xs mt-1">
                  Shown on the dedicated practice area page when a visitor clicks the card.
                </p>
              </div>
              <RichTextEditor
                value={form.longDescription}
                onChange={(html) => set("longDescription", html)}
                placeholder="Write the full description for this practice area — overview, what you handle, who you serve, key benefits…"
              />
            </div>

            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
            >
              <Save size={15} />
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Practice Area"}
            </motion.button>
          </form>
        </div>
    </main>
  );
}
