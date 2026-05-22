"use client";
import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        onChange(url);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block font-body text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}
      </label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden bg-white/4 border border-white/10">
          <div className="relative h-40">
            <Image src={value} alt="Uploaded image" fill className="object-cover" unoptimized />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-black/60 hover:bg-coral-500/80 text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-xl border-2 border-dashed border-white/15 hover:border-coral-500/40 flex flex-col items-center justify-center gap-2 text-white/30 hover:text-white/60 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <Upload size={20} />
              <span className="font-body text-xs">Click to upload image</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
