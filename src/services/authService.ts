import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "financetrack_token";
const USER_KEY = "financetrack_user";

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body?.message ?? body?.title ?? "Request failed";
  } catch {
    return res.status === 401 ? "Invalid credentials" : "Request failed";
  }
}

export async function login(payload: LoginPayload): Promise<User> {
  console.log(API_URL)
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const data: AuthResponse = await res.json();
  persistSession(data);
  return data.user;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const data: AuthResponse = await res.json();
  persistSession(data);
  return data.user;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

function persistSession(data: AuthResponse): void {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}
