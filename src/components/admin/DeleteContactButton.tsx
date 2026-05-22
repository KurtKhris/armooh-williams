"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function DeleteContactButton({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        dispatch(showToast({ message: "Contact inquiry deleted.", type: "success" }));
        router.refresh();
      } else {
        dispatch(showToast({ message: "Failed to delete.", type: "error" }));
      }
    } catch {
      dispatch(showToast({ message: "Network error", type: "error" }));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setDeleting(true)}
        className="p-2 text-white/40 hover:text-coral-500 hover:bg-coral-500/10 rounded-lg transition-colors"
        title="Delete Inquiry"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmModal
        open={deleting}
        onCancel={() => setDeleting(false)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message="Are you sure you want to delete this contact inquiry? This action cannot be undone."
        confirmLabel="Delete"
      />
    </>
  );
}
