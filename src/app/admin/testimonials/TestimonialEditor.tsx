"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import ImageUpload from "@/components/admin/ImageUpload";
import ConfirmModal from "@/components/admin/ConfirmModal";
import type { Testimonial } from "@/lib/schema";

interface Props {
  testimonial?: Testimonial;
  mode: "create" | "edit";
}

export default function TestimonialEditor({ testimonial, mode }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({
    name: testimonial?.name ?? "",
    role: testimonial?.role ?? "",
    content: testimonial?.content ?? "",
    rating: testimonial?.rating ?? 5,
    imageUrl: testimonial?.imageUrl ?? "",
    sortOrder: testimonial?.sortOrder ?? 0,
    published: testimonial?.published ?? true,
  });

  const handleSave = async () => {
    if (!form.name || !form.content) {
      dispatch(showToast({ message: "Name and content are required.", type: "error" }));
      return;
    }
    setSaving(true);
    try {
      const url = mode === "edit" ? `/api/admin/testimonials/${testimonial!.id}` : "/api/admin/testimonials";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        dispatch(showToast({ message: mode === "edit" ? "Testimonial saved." : "Testimonial created.", type: "success" }));
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Failed to save.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/admin/testimonials/${testimonial!.id}`, { method: "DELETE" });
      dispatch(showToast({ message: "Testimonial deleted.", type: "success" }));
      router.push("/admin/testimonials");
      router.refresh();
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="min-h-full">
        {/* Toolbar */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 bg-[#071a1f] border-b border-white/8">
          <div className="flex items-center gap-4">
            <Link href="/admin/testimonials" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors">
              <ArrowLeft size={16} />
              Testimonials
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <h1 className="font-heading text-white text-lg font-semibold">
              {mode === "create" ? "New Testimonial" : "Edit Testimonial"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body text-sm text-white/60">Publish</span>
              <div
                onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.published ? "bg-teal-500" : "bg-white/20"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </label>
            {mode === "edit" && (
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-coral-500/10 hover:bg-coral-500/20 border border-coral-500/20 text-coral-500 font-body text-sm transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
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

        {/* Form */}
        <div className="max-w-3xl mx-auto px-8 py-8 space-y-5">
          {/* Client info */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-4">
            <h2 className="font-heading text-white text-sm font-semibold">Client Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. David Chen"
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Title / Company</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. CEO, TechVentures International"
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, rating: n }))}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={24}
                      className={n <= form.rating ? "text-coral-500" : "text-white/20"}
                      fill={n <= form.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
                <span className="font-body text-white/40 text-sm ml-1">{form.rating}/5</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  min={0}
                  className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors"
                />
                <p className="font-body text-white/30 text-xs mt-1.5">Lower numbers appear first</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8 space-y-3">
            <h2 className="font-heading text-white text-sm font-semibold">Testimonial Quote *</h2>
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              rows={5}
              placeholder="Write the client's testimonial here..."
              className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/50 transition-colors resize-none"
            />
          </div>

          {/* Photo */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8">
            <ImageUpload
              label="Client Photo (optional)"
              value={form.imageUrl}
              onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
            />
            <p className="font-body text-white/30 text-xs mt-2">If no photo is uploaded, initials will be shown instead.</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Testimonial"
        message="This testimonial will be permanently deleted. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
