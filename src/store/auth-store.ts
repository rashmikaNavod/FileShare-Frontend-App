import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "@/lib/api";
import type { UserRequestDTO } from "@/types";

interface JwtPayload {
  sub: string;
  exp: number;
}

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isHydrated: boolean;

  login: (username: string, password: string) => Promise<void>;
  register: (data: UserRequestDTO) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isHydrated: false,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser({ username, password });
      const decoded = jwtDecode<JwtPayload>(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", decoded.sub);
      set({
        token: res.token,
        username: decoded.sub,
        isAuthenticated: true,
        loading: false,
        isHydrated: true,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed";
      set({ error: message, loading: false });
      throw err;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      await registerUser(data);
      set({ loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      set({ error: message, loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ token: null, username: null, isAuthenticated: false });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      set({ isHydrated: true });
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp * 1000 > Date.now()) {
        set({ token, username, isAuthenticated: true, isHydrated: true });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        set({ isHydrated: true });
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      set({ isHydrated: true });
    }

  },
}));
