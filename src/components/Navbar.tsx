"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { HiOutlineShare, HiOutlineLogout } from "react-icons/hi";

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        {/* logo */}
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <HiOutlineShare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight group-hover:text-violet-300 transition-colors">
            FileShare
          </span>
        </Link>

        {/* right */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm uppercase text-zinc-400">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <HiOutlineLogout className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
