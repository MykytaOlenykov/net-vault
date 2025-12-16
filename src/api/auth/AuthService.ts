import type ApiClient from "../ApiClient";

export interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface LoginResponse {
  user: UserProfile;
  token: string;
}

class AuthService {
  private api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    sessionStorage.setItem("accessToken", response.data.token);
    return response.data;
  }
  async logout(): Promise<void> {
    sessionStorage.removeItem("accessToken");
  }
  async getProfile(): Promise<UserProfile> {
    const response = await this.api.get<UserProfile>("/user/profile");
    return response.data;
  }
}

export default AuthService;
