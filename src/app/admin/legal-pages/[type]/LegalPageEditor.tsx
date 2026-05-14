"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import RichTextEditor from "@/components/admin/RichTextEditor";

const TYPE_SLUGS: Record<string, string> = {
  privacy: "privacy",
  terms: "terms",
  disclaimer: "disclaimer",
};

interface Props {
  type: string;
  label: string;
  initial: { type: string; title: string; content: string };
}

export default function LegalPageEditor({ type, label, initial }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: initial.title, content: initial.content });

  const handleSave = async () => {
    if (!form.title || !form.content) {
      dispatch(showToast({ message: "Title and content are required.", type: "error" }));
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/legal-pages/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        dispatch(showToast({ message: `${label} saved.`, type: "success" }));
        router.refresh();
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Failed to save.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* Toolbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 bg-[#071a1f] border-b border-white/8">
        <div className="flex items-center gap-4">
          <Link href="/admin/legal-pages" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors">
            <ArrowLeft size={16} />
            Legal Pages
          </Link>
          <div className="w-px h-4 bg-white/15" />
          <h1 className="font-heading text-white text-lg font-semibold">{label}</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/${TYPE_SLUGS[type]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 text-white/60 hover:text-white font-body text-sm transition-colors"
          >
            <ExternalLink size={14} />
            Preview
          </a>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-body font-semibold text-sm rounded-xl transition-colors shadow-coral"
          >
            <Save size={15} />
            {saving ? "Saving..." : "Save"}
          </motion.button>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-8 py-8 space-y-5">
        <div>
          <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Page Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder={label}
            className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-heading text-xl font-semibold focus:outline-none focus:border-coral-500/40 transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Content</label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            placeholder={`Write the ${label} content here...`}
          />
        </div>
      </div>
    </div>
  );
}
