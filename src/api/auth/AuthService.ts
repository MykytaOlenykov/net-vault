import ApiClient from "../ApiClient";

export interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  data: {
    user: UserProfile;
    token: string;
  };
}

class AuthService extends ApiClient {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  async logout(): Promise<void> {}

  async getProfile(): Promise<UserProfile> {
    const response = await this.get<UserProfile>("/auth/current");
    return response.data;
  }
}

export const authService = new AuthService();
