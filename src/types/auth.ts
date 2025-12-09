// API REQUESTS
export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

// API RESPONSES
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  userId: string;
  otpSent: boolean;
}

export interface VerifyOtpResponse {
  token: string;
}

export type LoginStep = "login" | "otp";

// PAGE STATE
