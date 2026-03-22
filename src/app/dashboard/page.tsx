"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useFileStore } from "@/store/file-store";
import { useToast } from "@/components/Toast";
import FileCard from "@/components/FileCard";
import UploadModal from "@/components/UploadModal";
import { HiOutlinePlus, HiOutlineCloudUpload } from "react-icons/hi";
import type { FileUploadRequest } from "@/types";


export default function DashboardPage() {
  const { isAuthenticated, isHydrated } = useAuthStore();

  const { files, upload, update, remove, fetchFiles } = useFileStore();
  const { toast } = useToast();
  const router = useRouter();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      fetchFiles();
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router, fetchFiles, isHydrated]);

  if (!isAuthenticated) return null;

  const handleUpload = async (data: FileUploadRequest) => {
    try {
      const res = await upload(data);
      toast(`"${res.title}" uploaded!`, "success");
    } catch {
      toast("Upload failed", "error");
    }
  };

  const handleUpdate = async (data: FileUploadRequest) => {
    if (!editId) return;
    try {
      const res = await update(editId, data);
      toast(`"${res.title}" updated!`, "success");
      setEditId(null);
    } catch {
      toast("Update failed", "error");
    }
  };

  const handleDelete = async (shareId: string) => {
    try {
      await remove(shareId);
      toast("File deleted", "success");
    } catch {
      toast("Delete failed", "error");
    }
  };

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Files</h1>
          <p className="text-zinc-500 text-sm">
            {files.length} file{files.length !== 1 && "s"} uploaded
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#91b2dd] text-black text-sm font-medium cursor-pointer"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* empty state */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            <HiOutlineCloudUpload className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-400 mb-2">
            No files yet
          </h2>
          <p className="text-zinc-600 text-sm max-w-xs">
            Upload your first file to get a shareable link you can send to
            anyone.
          </p>
        </div>
      )}

      {/* grid */}
      {/* grid container එක */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((f) => (
          <FileCard
            key={f.shareId}
            file={f}
            onDelete={handleDelete}
            onEdit={(id) => setEditId(id)}
          />
        ))}
      </div>

      {/* modals */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handleUpload}
        mode="upload"
      />

      <UploadModal
        open={!!editId}
        onClose={() => setEditId(null)}
        onSubmit={handleUpdate}
        mode="edit"
      />
    </div>
  );
}
