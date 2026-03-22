"use client";

import { HiOutlineTrash, HiOutlinePencil, HiOutlineClipboardCopy, HiOutlineExternalLink } from "react-icons/hi";
import type { FileDetailsDTO } from "@/types";

interface Props {
  file: FileDetailsDTO;
  onDelete: (shareId: string) => void;
  onEdit: (shareId: string) => void;
}

export default function FileCard({ file, onDelete, onEdit }: Props) {
  const { title, shareId, fileSize, fileType } = file;
  const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2) + " M";
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share/${shareId}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300">
      {/* top */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium truncate pr-2">{title}</h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(shareId)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-violet-400 transition-colors cursor-pointer"
            title="Edit"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(shareId)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* share id */}
      <p className="text-xs text-zinc-500 mb-2 font-mono">ID: {shareId}</p>
      <p className="text-xs text-zinc-500 mb-2 font-mono">SIZE: {sizeInMB}</p>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">TYPE: {fileType.split('/')[1]}</p>


      {/* actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
        >
          <HiOutlineClipboardCopy className="w-3.5 h-3.5" />
          Copy Link
        </button>
        <a
          href={`/share/${shareId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
        >
          <HiOutlineExternalLink className="w-3.5 h-3.5" />
          Preview
        </a>
      </div>
    </div>
  );
}
