"use client";
import { useState, useEffect } from "react";
import { Plus, Tag, Trash2, Loader2, ArrowLeft, Pencil, X, Check, ChevronUp, ChevronDown } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  createdAt: string;
}

type FormState = { name: string; description: string; imageUrl: string };
const emptyForm = (): FormState => ({ name: "", description: "", imageUrl: "" });

export default function CategoriesManager() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm());
  const [savingEdit, setSavingEdit] = useState(false);
  const [reordering, setReordering] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) setCategories(await res.json());
    } catch {
      dispatch(showToast({ message: "Failed to load categories", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), description: form.description || null, imageUrl: form.imageUrl || null }),
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
        setForm(emptyForm());
        dispatch(showToast({ message: "Category created!", type: "success" }));
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error || "Failed to create", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, description: cat.description ?? "", imageUrl: cat.imageUrl ?? "" });
  };

  const handleUpdate = async (id: string) => {
    if (!editForm.name.trim()) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editForm.name.trim(), description: editForm.description || null, imageUrl: editForm.imageUrl || null }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
        setEditingId(null);
        dispatch(showToast({ message: "Category updated!", type: "success" }));
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error || "Failed to update", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/categories/${deletingId}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== deletingId));
        dispatch(showToast({ message: "Category deleted!", type: "success" }));
      } else {
        dispatch(showToast({ message: "Failed to delete", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setDeletingId(null);
    }
  };

  const moveCategory = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= categories.length) return;

    const newOrder = [...categories];
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    setCategories(newOrder);

    setReordering(true);
    try {
      const res = await fetch("/api/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder.map((c) => c.id) }),
      });
      if (!res.ok) {
        setCategories(categories);
        dispatch(showToast({ message: "Failed to save order", type: "error" }));
      }
    } catch {
      setCategories(categories);
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-4 px-8 py-4 bg-[#071a1f] border-b border-white/8">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
        <div className="w-px h-4 bg-white/15" />
        <h1 className="font-heading text-white text-lg font-semibold flex items-center gap-2">
          <Tag size={16} className="text-coral-500" />
          Categories
        </h1>
      </div>

      <div className="p-8 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Add form */}
          <div className="md:col-span-1">
            <div className="p-5 bg-white/5 border border-white/8 rounded-2xl sticky top-28">
              <h2 className="font-heading text-white font-semibold mb-4">Add Category</h2>
              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. The AW Review"
                    required
                    className="w-full px-4 py-3 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Short description shown on the insights page..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Cover Image</label>
                  <ImageUpload value={form.imageUrl} onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))} />
                </div>
                <motion.button
                  type="submit"
                  disabled={adding || !form.name.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-body font-semibold text-sm rounded-xl transition-colors"
                >
                  {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {adding ? "Adding..." : "Add Category"}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Category list */}
          <div className="md:col-span-2 space-y-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="text-white/30 animate-spin" />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-16 bg-white/5 border border-white/8 rounded-2xl">
                <Tag size={32} className="text-white/20 mx-auto mb-3" />
                <p className="font-body text-white/50">No categories yet.</p>
              </div>
            ) : (
              <>
                <p className="font-body text-xs text-white/30 mb-1">
                  Use the arrows to set the display order on the public site.
                </p>
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="bg-white/5 border border-white/8 hover:border-white/15 rounded-2xl overflow-hidden transition-colors"
                  >
                    {editingId === cat.id ? (
                      /* ── Edit mode ── */
                      <div className="p-5 space-y-3">
                        <div>
                          <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Name *</label>
                          <input
                            value={editForm.name}
                            onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                            className="w-full px-3 py-2.5 bg-white/8 border border-white/12 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                            autoFocus
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                            rows={3}
                            className="w-full px-3 py-2.5 bg-white/8 border border-white/12 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors resize-none"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5">Cover Image</label>
                          <ImageUpload value={editForm.imageUrl} onChange={(url) => setEditForm((p) => ({ ...p, imageUrl: url }))} />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => handleUpdate(cat.id)}
                            disabled={savingEdit || !editForm.name.trim()}
                            className="flex items-center gap-1.5 px-4 py-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-body text-sm font-semibold rounded-xl transition-colors"
                          >
                            {savingEdit ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white/8 hover:bg-white/12 text-white/70 font-body text-sm font-semibold rounded-xl transition-colors"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── View mode ── */
                      <div className="flex items-start gap-4 p-4">
                        {/* Reorder arrows */}
                        <div className="flex flex-col gap-0.5 shrink-0 mt-0.5">
                          <button
                            onClick={() => moveCategory(i, "up")}
                            disabled={i === 0 || reordering}
                            className="p-1 text-white/25 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed rounded transition-colors"
                            title="Move up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            onClick={() => moveCategory(i, "down")}
                            disabled={i === categories.length - 1 || reordering}
                            className="p-1 text-white/25 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed rounded transition-colors"
                            title="Move down"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>

                        {/* Image thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/8 border border-white/10">
                          {cat.imageUrl ? (
                            <Image src={cat.imageUrl} alt={cat.name} width={64} height={64} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Tag size={20} className="text-white/20" />
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-semibold text-white text-sm">{cat.name}</p>
                          {cat.description ? (
                            <p className="font-body text-white/45 text-xs mt-1 leading-relaxed line-clamp-2">{cat.description}</p>
                          ) : (
                            <p className="font-body text-white/25 text-xs mt-1 italic">No description</p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => startEditing(cat)}
                            className="p-2 text-white/40 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeletingId(cat.id)}
                            className="p-2 text-white/40 hover:text-coral-500 hover:bg-coral-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={!!deletingId}
        onCancel={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? News articles using this category will NOT be deleted, but the category will no longer appear in dropdowns."
        confirmLabel="Delete"
      />
    </div>
  );
}
