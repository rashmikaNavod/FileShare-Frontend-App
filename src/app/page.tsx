"use client";

import Link from "next/link";
import { HiOutlineShare, HiOutlineLockClosed, HiOutlineCloudUpload } from "react-icons/hi";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* hero */}
      <div className="relative mb-8">
        <div className=" rounded-full" />
        <div className="relative w-20 h-20 rounded-2xl bg-[#91b2dd] flex items-center justify-center">
          <HiOutlineShare className="w-10 h-10 text-black" />
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-center leading-tight mb-4">
        Share files{" "}
        <span className=" bg-clip-text text-[#8ab4f8]">
          effortlessly
        </span>
      </h1>

      <p className="text-zinc-400 text-center max-w-md mb-10 text-lg">
        Upload, manage and share your files with a simple link. Fast, secure,
        and minimal.
      </p>

      <div className="flex gap-4">
        <Link
          href="/register"
          className="px-6 py-3 rounded-xl bg-[#91b2dd] text-black font-medium transition-all"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white font-medium transition-all"
        >
          Sign In
        </Link>
      </div>

      {/* feature cards */}
      <div className="grid sm:grid-cols-3 gap-6 mt-20 max-w-3xl w-full">
        {[
          {
            icon: HiOutlineCloudUpload,
            title: "Upload",
            desc: "Drag & drop or browse to upload any file up to 5 MB.",
          },
          {
            icon: HiOutlineShare,
            title: "Share",
            desc: "Get a unique share link to send to anyone instantly.",
          },
          {
            icon: HiOutlineLockClosed,
            title: "Secure",
            desc: "JWT-authenticated sessions keep your files safe.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#8ab4f8] transition-colors"
          >
            <f.icon className="w-8 h-8 text-[#8ab4f8] mb-3" />
            <h3 className="text-white font-semibold mb-1">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
