import { api } from "./client";
export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  user: { id: string; name: string; email: string };
}
export const authApi = {
  login: (payload: LoginRequest) =>
    api<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload: { name: string; email: string; password: string }) =>
    api<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  forgotPassword: (email: string) =>
    api<void>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  resetPassword: (payload: { token: string; password: string }) =>
    api<void>("/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
};
