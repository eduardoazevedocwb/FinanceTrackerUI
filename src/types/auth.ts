export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  expiresAt?: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}
