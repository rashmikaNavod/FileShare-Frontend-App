"use client";

import { HiOutlineTrash, HiOutlinePencil, HiOutlineClipboardCopy, HiOutlineExternalLink } from "react-icons/hi";
import type { FileDetailsDTO } from "@/types";
import { useToast } from "@/components/Toast";

interface Props {
  file: FileDetailsDTO;
  onDelete: (shareId: string) => void;
  onEdit: (shareId: string) => void;
}

export default function FileCard({ file, onDelete, onEdit }: Props) {
  const { title, shareId, fileSize, fileType } = file;
  const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  const { toast } = useToast();

  // Share URL එක මෙතනදී හදාගන්නවා
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/share/${shareId}`
    : "";

  // Clipboard එකට copy කරන function එක
  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      // 1. මුලින්ම modern navigator API එක උත්සාහ කරන්න (HTTPS අවශ්‍යයි)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        toast("Link copied!", "success"); // Alert එක වෙනුවට toast
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      // 2. Fallback: API එක වැඩ නොකරන විට (HTTP/Old browsers) භාවිතා කරන ක්‍රමය
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;

        // පේජ් එකේ පේන්නේ නැති වෙන්න style කරනවා
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          toast("Link copied!", "success"); // Fallback success toast
        } else {
          toast("Failed to copy link.", "error"); // Fallback error toast
        }
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
        toast("Could not copy link.", "error"); // Final error toast
      }
    }
  };

  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium truncate pr-2">{title}</h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(shareId)} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-violet-400 transition-colors cursor-pointer">
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(shareId)} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer">
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-zinc-500 mb-2 font-mono">ID: {shareId}</p>
      <p className="text-xs text-zinc-500 mb-2 font-mono">SIZE: {sizeInMB}</p>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">TYPE: {fileType.includes('/') ? fileType.split('/')[1] : fileType}</p>

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