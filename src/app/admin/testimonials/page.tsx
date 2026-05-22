"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star, Quote } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import type { Testimonial } from "@/lib/schema";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function TestimonialsAdminPage() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const togglePublished = async (item: Testimonial) => {
    const res = await fetch(`/api/admin/testimonials/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, published: !item.published }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((t) => t.id === item.id ? { ...t, published: !t.published } : t));
    } else {
      dispatch(showToast({ message: "Failed to update status.", type: "error" }));
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    const res = await fetch(`/api/admin/testimonials/${confirmDeleteId}`, { method: "DELETE" });
    setDeletingId(null);
    setConfirmDeleteId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((t) => t.id !== confirmDeleteId));
      dispatch(showToast({ message: "Testimonial deleted.", type: "success" }));
    } else {
      dispatch(showToast({ message: "Failed to delete.", type: "error" }));
    }
  };

  return (
    <>
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold text-white mb-1">Testimonials</h1>
              <p className="font-body text-white/50 text-sm">Manage client testimonials shown on the website.</p>
            </div>
            <Link
              href="/admin/testimonials/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors"
            >
              <Plus size={15} />
              New Testimonial
            </Link>
          </div>

          {loading ? (
            <div className="text-white/40 font-body text-sm">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-white/4 border border-white/8">
              <Quote size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40 font-body">No testimonials yet.</p>
              <Link href="/admin/testimonials/new" className="mt-3 inline-block text-coral-500 font-body text-sm hover:underline">
                Add your first one
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/4 border border-white/8 hover:border-white/15 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-coral-500/15 flex items-center justify-center shrink-0 font-heading text-coral-500 font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-white text-sm truncate">{item.name}</p>
                    <p className="font-body text-white/40 text-xs truncate mt-0.5">{item.role || "No role"}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={11} className="text-coral-500" fill="currentColor" />
                    ))}
                  </div>
                  <div className="shrink-0 text-white/30 font-body text-xs">Order: {item.sortOrder}</div>
                  <button
                    onClick={() => togglePublished(item)}
                    className="shrink-0 transition-colors"
                    title={item.published ? "Published — click to unpublish" : "Draft — click to publish"}
                  >
                    {item.published
                      ? <ToggleRight size={22} className="text-teal-400" />
                      : <ToggleLeft size={22} className="text-white/30" />}
                  </button>
                  <span className={`shrink-0 text-xs font-body px-2 py-0.5 rounded-full ${item.published ? "bg-teal-500/15 text-teal-400" : "bg-white/8 text-white/35"}`}>
                    {item.published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/testimonials/${item.id}`}
                    className="shrink-0 p-2 rounded-xl hover:bg-white/8 text-white/50 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    disabled={deletingId === item.id}
                    className="shrink-0 p-2 rounded-xl hover:bg-coral-500/10 text-white/50 hover:text-coral-500 transition-colors disabled:opacity-40"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmModal
        open={!!confirmDeleteId}
        title="Delete Testimonial"
        message="This testimonial will be permanently removed from the website. This action cannot be undone."
        loading={!!deletingId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </>
  );
}
