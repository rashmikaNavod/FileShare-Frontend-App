import axios from "axios";
import type {
  AuthResponseDTO,
  FileDetailsDTO,
  FileResponseDTO,
  FileUploadRequest,
  UserRequestDTO,
  UserResponseDTO,
} from "@/types";
import { LocalFile } from "@/store/file-store";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

const api = axios.create({
  baseURL: API_BASE,
});

// ─── helpers ─────────────────────────────────────────────────
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function getUsername(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("username");
}

function authHeaders() {
  const token = getToken();
  const username = getUsername();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (username) headers["X-Logged-In-User"] = username;
  return headers;
}

// ─── Auth ────────────────────────────────────────────────────
export async function registerUser(
  data: UserRequestDTO
): Promise<UserResponseDTO> {
  const res = await api.post<UserResponseDTO>("/api/v1/users", data);
  return res.data;
}

export async function loginUser(
  data: Pick<UserRequestDTO, "username" | "password">
): Promise<AuthResponseDTO> {
  const res = await api.post<AuthResponseDTO>("/api/v1/users/login", data);
  return res.data;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


// ─── Files ───────────────────────────────────────────────────
export async function uploadFile(
  data: FileUploadRequest
): Promise<FileResponseDTO> {
  const form = new FormData();
  form.append("title", data.title);
  form.append("description", data.description);
  form.append("file", data.file);

  const res = await api.post<FileResponseDTO>("/api/v1/files/upload", form, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateFile(
  shareId: string,
  data: FileUploadRequest
): Promise<FileResponseDTO> {
  const form = new FormData();
  form.append("title", data.title);
  form.append("description", data.description);
  form.append("file", data.file);

  const res = await api.put<FileResponseDTO>(
    `/api/v1/files/${shareId}`,
    form,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}

export async function deleteFile(shareId: string): Promise<FileResponseDTO> {
  const res = await api.delete<FileResponseDTO>(`/api/v1/files/${shareId}`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function getFileDetails(
  shareId: string
): Promise<FileDetailsDTO> {
  const res = await api.get<FileDetailsDTO>(
    `/api/v1/files/details/${shareId}`
  );
  return res.data;
}

export function getPreviewUrl(shareId: string, download = false): string {
  return `${API_BASE}/api/v1/files/preview/${shareId}${download ? "?download=true" : ""
    }`;
}

export async function getMyFiles(): Promise<FileDetailsDTO[]> {
  const res = await api.get<FileDetailsDTO[]>("/api/v1/files", {
    headers: authHeaders(),
  });
  return res.data;
}


api.interceptors.response.use(
  (response) => response, 
  (error) => {
    
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or invalid. Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);