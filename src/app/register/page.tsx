"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/components/Toast";
import { HiOutlineUserAdd } from "react-icons/hi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      toast("Account created! Please sign in.", "success");
      router.push("/login");
    } catch {
      toast("Registration failed — username may already exist", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] px-6">
      <div className="w-full max-w-sm">
        {/* icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-sm bg-[#91b2dd] flex items-center justify-center">
            <HiOutlineUserAdd className="w-7 h-7 text-black" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Create account</h1>
        <p className="text-zinc-500 text-center text-sm mb-8">
          Join FileShare to start sharing files
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-400 mb-1.5 block">Username</span>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              pattern="^[a-zA-Z][a-zA-Z0-9_]{2,19}$"
              title="Start with a letter, 3-20 chars, letters/numbers/underscores"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#91b2dd] transition"
              placeholder="johndoe"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-400 mb-1.5 block">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#91b2dd] transition"
              placeholder="john@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-400 mb-1.5 block">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
              title="8-20 characters with uppercase, lowercase, number, and special character"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#91b2dd] transition"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#91b2dd] text-black text-sm font-medium transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#8ab4f8] hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
