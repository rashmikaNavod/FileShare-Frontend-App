// ─── User DTOs ───────────────────────────────────────────────
export interface UserRequestDTO {
  username: string;
  email?: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponseDTO {
  token: string;
}

// ─── File DTOs ───────────────────────────────────────────────
export interface FileResponseDTO {
  message: string;
  shareId: string;
  title: string;
}

export interface FileDetailsDTO {
  shareId: string;
  title: string;
  description: string;
  fileType: string;
  owner: string;
  previewUrl: string;
  fileSize: number;
}

export interface FileUploadRequest {
  title: string;
  description: string;
  file: File;
}

// ─── Error ───────────────────────────────────────────────────
export interface ProblemDetail {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  timestamp?: string;
}
