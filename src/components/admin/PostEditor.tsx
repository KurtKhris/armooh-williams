"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Trash2, ArrowLeft } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface PostEditorProps {
  post?: Post;
  mode: "create" | "edit";
  categories?: string[];
}

export default function PostEditor({ post, mode, categories = [] }: PostEditorProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Category management
  const [localCategories, setLocalCategories] = useState<string[]>(categories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategoryLoader, setAddingCategoryLoader] = useState(false);

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    category: post?.category ?? "General",
    imageUrl: post?.imageUrl ?? "",
    published: post?.published ?? false,
    authorName: post?.authorName ?? "Armooh-Williams, PLLC",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && mode === "create" ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.content) {
      dispatch(showToast({ message: "Title, slug, and content are required.", type: "error" }));
      return;
    }
    setSaving(true);
    try {
      const url = mode === "edit" ? `/api/posts/${post!.id}` : "/api/posts";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        dispatch(showToast({ message: mode === "edit" ? "Article saved." : "Article created.", type: "success" }));
        router.push("/admin/news");
        router.refresh();
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Failed to save article.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setAddingCategoryLoader(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      
      if (res.ok) {
        const newCat = await res.json();
        setLocalCategories((prev) => [...prev, newCat.name]);
        setForm((prev) => ({ ...prev, category: newCat.name }));
        setNewCategoryName("");
        setIsAddingCategory(false);
        dispatch(showToast({ message: "Category added", type: "success" }));
      } else {
        const data = await res.json();
        // If it already exists, just use it
        if (data.error === "Category already exists") {
          if (!localCategories.includes(newCategoryName.trim())) {
             setLocalCategories((prev) => [...prev, newCategoryName.trim()]);
          }
          setForm((prev) => ({ ...prev, category: newCategoryName.trim() }));
          setNewCategoryName("");
          setIsAddingCategory(false);
        } else {
          dispatch(showToast({ message: data.error || "Failed to create category", type: "error" }));
        }
      }
    } catch {
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setAddingCategoryLoader(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/posts/${post!.id}`, { method: "DELETE" });
      dispatch(showToast({ message: "Article deleted.", type: "success" }));
      router.push("/admin/news");
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
            <Link href="/admin/news" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors">
              <ArrowLeft size={16} />
              News
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <h1 className="font-heading text-white text-lg font-semibold">
              {mode === "create" ? "New Article" : "Edit Article"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body text-sm text-white/60">Publish</span>
              <div
                onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.published ? "bg-emerald-500" : "bg-white/20"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </label>

            {mode === "edit" && (
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-body text-sm transition-colors"
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

        {/* Editor */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Article Title..."
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 text-white font-heading text-3xl font-semibold placeholder:text-white/25 focus:outline-none focus:border-coral-500/50 transition-colors"
              />

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Brief summary shown in article listings..."
                  className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-white/25 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Content</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                  placeholder="Write your article content here..."
                />
              </div>
            </div>

            {/* Sidebar settings */}
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <h3 className="font-heading text-white text-base font-semibold mb-4">Publishing</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-sm text-white/60">
                    {form.published ? <Eye size={14} className="text-emerald-400" /> : <EyeOff size={14} className="text-amber-400" />}
                    {form.published ? "Published" : "Draft"}
                  </div>
                  <div
                    onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                    className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ${form.published ? "bg-emerald-500" : "bg-white/20"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">URL Slug</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="article-url-slug"
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/20 font-body text-xs focus:outline-none focus:border-coral-500/40 transition-colors"
                />
                <p className="font-body text-white/30 text-xs mt-2">/news/{form.slug || "article-slug"}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest">Category</label>
                  {!isAddingCategory && (
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(true)}
                      className="text-coral-500 hover:text-coral-400 font-body text-xs font-semibold"
                    >
                      + New Category
                    </button>
                  )}
                </div>

                {isAddingCategory ? (
                  <div className="space-y-2">
                    <input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category name..."
                      className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCategory();
                        }
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        disabled={addingCategoryLoader || !newCategoryName.trim()}
                        className="flex-1 px-4 py-2.5 bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-body text-sm font-semibold rounded-xl transition-colors shrink-0"
                      >
                        {addingCategoryLoader ? "..." : "Add"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingCategory(false)}
                        className="flex-1 px-3 py-2.5 bg-white/8 hover:bg-white/12 text-white/70 font-body text-sm font-semibold rounded-xl transition-colors shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                    style={{ colorScheme: "dark" }}
                  >
                    {!localCategories.includes(form.category) && (
                      <option value={form.category} className="bg-[#071a1f] text-white">
                        {form.category}
                      </option>
                    )}
                    {localCategories.map((c) => (
                      <option key={c} value={c} className="bg-[#071a1f] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Author</label>
                <input
                  name="authorName"
                  value={form.authorName}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/20 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                />
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <ImageUpload
                  label="Featured Image"
                  value={form.imageUrl}
                  onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Article"
        message="This article will be permanently deleted and removed from the website. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
