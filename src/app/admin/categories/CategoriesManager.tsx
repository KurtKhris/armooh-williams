"use client";
import { useState, useEffect } from "react";
import { Plus, Tag, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export default function CategoriesManager() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      dispatch(showToast({ message: "Failed to load categories", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setAdding(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });

      if (res.ok) {
        const newCat = await res.json();
        setCategories([newCat, ...categories]);
        setNewName("");
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

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/categories/${deletingId}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== deletingId));
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

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setSavingEdit(true);

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (res.ok) {
        const updated = await res.json();
        setCategories(categories.map((c) => (c.id === id ? updated : c)));
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

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-4 bg-[#071a1f] border-b border-white/8">
        <div className="flex items-center gap-4">
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
      </div>

      <div className="p-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Add Form */}
          <div className="md:col-span-1">
            <div className="p-5 bg-white/5 border border-white/8 rounded-2xl sticky top-28">
              <h2 className="font-heading text-white font-semibold mb-4">Add Category</h2>
              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Corporate Law"
                    className="w-full px-4 py-3 bg-white/8 border border-white/12 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={adding || !newName.trim()}
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

          {/* List */}
          <div className="md:col-span-2 space-y-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="text-white/30 animate-spin" />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-16 bg-white/5 border border-white/8 rounded-2xl">
                <Tag size={32} className="text-white/20 mx-auto mb-3" />
                <p className="font-body text-white/50">No categories found.</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl transition-colors">
                  {editingId === cat.id ? (
                    <div className="flex-1 flex items-center gap-2 mr-4">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/8 border border-white/12 rounded-lg text-white font-body text-sm focus:outline-none focus:border-coral-500/40"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(cat.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        disabled={savingEdit || !editName.trim()}
                        className="px-3 py-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-body text-xs font-semibold rounded-lg transition-colors"
                      >
                        {savingEdit ? "..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-2 bg-white/8 hover:bg-white/12 text-white/70 font-body text-xs font-semibold rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-body text-white font-medium">{cat.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditing(cat)}
                          className="p-2 text-white/40 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <button
                          onClick={() => setDeletingId(cat.id)}
                          className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
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
