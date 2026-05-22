"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Scale } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import type { PracticeArea } from "@/lib/schema";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function PracticeAreasList({ initial }: { initial: PracticeArea[] }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [areas, setAreas] = useState<PracticeArea[]>(initial);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const togglePublished = async (area: PracticeArea) => {
    const res = await fetch(`/api/admin/practice-areas/${area.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...area, published: !area.published }),
    });
    if (res.ok) {
      setAreas((prev) => prev.map((a) => a.id === area.id ? { ...a, published: !a.published } : a));
    } else {
      dispatch(showToast({ message: "Failed to update status.", type: "error" }));
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    const res = await fetch(`/api/admin/practice-areas/${confirmDeleteId}`, { method: "DELETE" });
    setDeletingId(null);
    setConfirmDeleteId(null);
    if (res.ok) {
      setAreas((prev) => prev.filter((a) => a.id !== confirmDeleteId));
      dispatch(showToast({ message: "Capability deleted.", type: "success" }));
      router.refresh();
    } else {
      dispatch(showToast({ message: "Failed to delete.", type: "error" }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-white mb-1">Capabilities</h1>
          <p className="font-body text-white/50 text-sm">Manage the capabilities displayed on the website.</p>
        </div>
        <Link
          href="/admin/practice-areas/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-body font-semibold text-sm rounded-xl transition-colors"
        >
          <Plus size={15} />
          New Capability
        </Link>
      </div>

      {areas.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/4 border border-white/8">
          <Scale size={32} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 font-body">No capabilities yet.</p>
          <Link href="/admin/practice-areas/new" className="mt-3 inline-block text-coral-500 font-body text-sm hover:underline">
            Add your first one
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/4 border border-white/8 hover:border-white/15 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-coral-500/15 flex items-center justify-center shrink-0">
                <Scale size={14} className="text-coral-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-white text-sm truncate">{area.title}</p>
                <p className="font-body text-white/40 text-xs truncate mt-0.5">{area.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-white/30 font-body text-xs">
                <span>Order: {area.sortOrder}</span>
              </div>
              <button
                onClick={() => togglePublished(area)}
                className="shrink-0 transition-colors"
                title={area.published ? "Published — click to unpublish" : "Draft — click to publish"}
              >
                {area.published
                  ? <ToggleRight size={22} className="text-teal-400" />
                  : <ToggleLeft size={22} className="text-white/30" />}
              </button>
              <span className={`shrink-0 text-xs font-body px-2 py-0.5 rounded-full ${area.published ? "bg-teal-500/15 text-teal-400" : "bg-white/8 text-white/35"}`}>
                {area.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/practice-areas/${area.id}/edit`}
                className="shrink-0 p-2 rounded-xl hover:bg-white/8 text-white/50 hover:text-white transition-colors"
                title="Edit"
              >
                <Pencil size={15} />
              </Link>
              <button
                onClick={() => setConfirmDeleteId(area.id)}
                disabled={deletingId === area.id}
                className="shrink-0 p-2 rounded-xl hover:bg-coral-500/10 text-white/50 hover:text-coral-500 transition-colors disabled:opacity-40"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmDeleteId}
        title="Delete Capability"
        message="This capability will be permanently removed from the website. This action cannot be undone."
        loading={!!deletingId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </>
  );
}
