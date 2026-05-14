"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        dispatch(showToast({ message: "Event deleted.", type: "success" }));
        router.refresh();
      } else {
        dispatch(showToast({ message: "Failed to delete.", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "An error occurred.", type: "error" }));
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 p-2 rounded-xl hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors disabled:opacity-40"
        title="Delete Event"
      >
        <Trash2 size={15} />
      </button>
      <ConfirmModal
        open={open}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
