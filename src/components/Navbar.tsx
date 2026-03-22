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
          <span className="text-lg font-semibold text-white tracking-light">
            <span className="font-semibold">File</span><span className="font-light"> Share</span>
          </span>
        </Link>

        {/* right */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm uppercase text-[#8ab4f8]">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-sm bg-[#91b2dd] text-black cursor-pointer"
              >
                <HiOutlineLogout className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[#8ab4f8] hover:text-white py-2 px-4 rounded-sm hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-4 py-2 rounded-sm bg-[#91b2dd] text-black transition-colors"
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
