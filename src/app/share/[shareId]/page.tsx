"use client";

import { use, useEffect, useState } from "react";
import { getFileDetails, getPreviewUrl } from "@/lib/api";
import type { FileDetailsDTO } from "@/types";
import {
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineDatabase
} from "react-icons/hi";

export default function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = use(params);
  const [details, setDetails] = useState<FileDetailsDTO | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFileDetails(shareId)
      .then(setDetails)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [shareId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <HiOutlineDocumentText className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-bold mb-2">File not found</h1>
        <p className="text-zinc-500 text-sm">
          This link may be invalid or the file has been removed.
        </p>
      </div>
    );
  }

  const isImage = details.fileType?.startsWith("image/");
  const isPdf = details.fileType === "application/pdf";
  const isVideo = details.fileType?.startsWith("video/");
  const previewUrl = getPreviewUrl(shareId);
  const downloadUrl = getPreviewUrl(shareId, true);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* preview area */}
        {isImage && (
          <div className="bg-black/30 flex items-center justify-center p-4 max-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={details.title}
              className="max-h-[380px] object-contain rounded-lg"
            />
          </div>
        )}
        {isPdf && (
          <div className="h-[400px]">
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title={details.title}
            />
          </div>
        )}
        {isVideo && (
          <div className="bg-black/30 flex items-center justify-center p-4">
            <video
              src={previewUrl}
              controls
              className="max-h-[380px] rounded-lg"
            />
          </div>
        )}

        {/* info */}
        <div className="p-6">
          <h1 className="text-xl font-bold mb-2">{details.title}</h1>
          <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
            {details.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm uppercase text-zinc-500">
              <HiOutlineUser className="w-4 h-4" />
              <span>{details.owner}</span>
            </div>
            <div className="flex items-center gap-2 text-sm uppercase text-zinc-500">
              <HiOutlineDocumentText className="w-4 h-4" />
              <span>{details.fileType.split("/")[1]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <HiOutlineDatabase className="w-4 h-4" />
              <span>{(details.fileSize / (1024 * 1024)).toFixed(2)} M</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-colors"
            >
              <HiOutlineEye className="w-4 h-4" />
              View
            </a>
            <a
              href={downloadUrl}
              download={details.title}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm bg-[#91b2dd] text-black text-sm font-medium transition-all"
            >
              <HiOutlineDownload className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
