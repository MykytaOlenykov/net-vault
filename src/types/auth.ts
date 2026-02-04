export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface LoginResponse {
  userId: string;
  otpSent: boolean;
}

export interface VerifyOtpResponse {
  token: string;
}

export type LoginStep = "login" | "otp" | "reset";
