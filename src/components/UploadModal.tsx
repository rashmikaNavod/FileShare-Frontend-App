"use client";

import { useState, useRef } from "react";
import { HiOutlineX, HiOutlineCloudUpload } from "react-icons/hi";
import type { FileUploadRequest } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FileUploadRequest) => Promise<void>;
  initial?: { title: string; description: string };
  mode?: "upload" | "edit";
}

export default function UploadModal({
  open,
  onClose,
  onSubmit,
  initial,
  mode = "upload",
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, description, file });
      setTitle("");
      setDescription("");
      setFile(null);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* content */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md mx-4 bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-2xl animate-scale-in"
      >
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            {mode === "edit" ? "Update File" : "Upload File"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* title */}
        <label className="block mb-4">
          <span className="text-sm text-zinc-400 mb-1.5 block">Title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#91b2dd] transition"
            placeholder="My awesome file"
          />
        </label>

        {/* description */}
        <label className="block mb-4">
          <span className="text-sm text-zinc-400 mb-1.5 block">Description</span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#91b2dd] transition resize-none"
            placeholder="A short description…"
          />
        </label>

        {/* file picker */}
        <div className="mb-6">
          <span className="text-sm text-zinc-400 mb-1.5 block">File</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/10 hover:border-[#91b2dd] rounded-lg py-6 text-zinc-500 hover:text-[#91b2dd] transition-colors cursor-pointer"
          >
            <HiOutlineCloudUpload className="w-8 h-8" />
            <span className="text-sm">
              {file ? file.name : "Click to browse…"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={submitting || !file}
          className="w-full py-2.5 rounded-lg  bg-[#91b2dd] text-black text-sm font-medium transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting
            ? "Processing…"
            : mode === "edit"
              ? "Update"
              : "Upload"}
        </button>
      </form>
    </div>
  );
}
