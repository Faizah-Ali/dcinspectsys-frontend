export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  group: string;
  fullName?: string;
  message?: string;
}
