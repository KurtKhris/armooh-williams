"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Trash2, ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Event } from "@/types";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface EventEditorProps {
  event?: Event;
  mode: "create" | "edit";
}

export default function EventEditor({ event, mode }: EventEditorProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({
    title: event?.title ?? "",
    slug: event?.slug ?? "",
    description: event?.description ?? "",
    eventDate: event?.eventDate ?? "",
    eventTime: event?.eventTime ?? "",
    location: event?.location ?? "",
    imageUrl: event?.imageUrl ?? "",
    published: event?.published ?? false,
  });

  // Parse existing eventTime range into start / end for the pickers
  const parseTimeRange = (range: string) => {
    const parts = range.split("\u2013").map((s) => s.trim());
    return { start: parts[0] ?? "", end: parts[1] ?? "" };
  };
  const [timeStart, setTimeStart] = useState(() => parseTimeRange(event?.eventTime ?? "").start);
  const [timeEnd, setTimeEnd] = useState(() => parseTimeRange(event?.eventTime ?? "").end);

  const updateEventTime = (start: string, end: string) => {
    const range = start && end ? `${start} \u2013 ${end}` : start || end;
    setForm((prev) => ({ ...prev, eventTime: range }));
  };

  const handleTimeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTimeStart(v);
    updateEventTime(v, timeEnd);
  };

  const handleTimeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTimeEnd(v);
    updateEventTime(timeStart, v);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && mode === "create" ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.description || !form.eventDate) {
      dispatch(showToast({ message: "Title, slug, description, and event date are required.", type: "error" }));
      return;
    }
    setSaving(true);
    try {
      const url = mode === "edit" ? `/api/events/${event!.id}` : "/api/events";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        dispatch(showToast({ message: mode === "edit" ? "Event saved." : "Event created.", type: "success" }));
        router.push("/admin/events");
        router.refresh();
      } else {
        const data = await res.json();
        dispatch(showToast({ message: data.error ?? "Failed to save event.", type: "error" }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/events/${event!.id}`, { method: "DELETE" });
      dispatch(showToast({ message: "Event deleted.", type: "success" }));
      router.push("/admin/events");
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
            <Link href="/admin/events" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors">
              <ArrowLeft size={16} />
              Events
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <h1 className="font-heading text-white text-lg font-semibold">
              {mode === "create" ? "New Event" : "Edit Event"}
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

        {/* Editor */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title..."
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/15 text-white font-heading text-3xl font-semibold placeholder:text-white/25 focus:outline-none focus:border-coral-500/50 transition-colors"
              />

              <div>
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Description</label>
                <RichTextEditor
                  value={form.description}
                  onChange={(html) => setForm((prev) => ({ ...prev, description: html }))}
                  placeholder="Describe the event, agenda, speakers, and what attendees can expect..."
                />
              </div>
            </div>

            {/* Sidebar settings */}
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <h3 className="font-heading text-white text-base font-semibold mb-4">Publishing</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-sm text-white/60">
                    {form.published ? <Eye size={14} className="text-teal-400" /> : <EyeOff size={14} className="text-brand-gold" />}
                    {form.published ? "Published" : "Draft"}
                  </div>
                  <div
                    onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                    className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ${form.published ? "bg-teal-500" : "bg-white/20"}`}
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
                  placeholder="event-url-slug"
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/20 font-body text-xs focus:outline-none focus:border-coral-500/40 transition-colors"
                />
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8 space-y-4">
                <h3 className="font-heading text-white text-base font-semibold">Date &amp; Time</h3>
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Event Date *</label>
                  <div className="relative">
                    <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Event Time</label>
                  <div className="space-y-2">
                    {/* Start time */}
                    <div>
                      <span className="block font-body text-[10px] text-white/30 uppercase tracking-widest mb-1 pl-1">Starts</span>
                      <div className="relative">
                        <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                        <input
                          type="time"
                          value={timeStart}
                          onChange={handleTimeStart}
                          className="w-full pl-8 pr-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                    </div>
                    {/* End time */}
                    <div>
                      <span className="block font-body text-[10px] text-white/30 uppercase tracking-widest mb-1 pl-1">Ends</span>
                      <div className="relative">
                        <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                        <input
                          type="time"
                          value={timeEnd}
                          onChange={handleTimeEnd}
                          className="w-full pl-8 pr-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                    </div>
                    {/* Composed range preview */}
                    {form.eventTime && (
                      <p className="font-body text-[11px] text-white/35 pl-1 pt-0.5">
                        Range: <span className="text-teal-300">{form.eventTime}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Location</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Arlington, VA / Virtual"
                    className="w-full pl-8 pr-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white placeholder:text-white/20 font-body text-sm focus:outline-none focus:border-coral-500/40 transition-colors"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                <ImageUpload
                  label="Event Image"
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
        title="Delete Event"
        message="This event will be permanently deleted and removed from the website. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
