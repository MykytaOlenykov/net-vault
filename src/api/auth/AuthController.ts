import AuthService from "./AuthService";
import type { LoginResponse, UserProfile } from "./AuthService";
import { withMiddleware } from "../../shared/utils/middleware";
import type { MiddlewareResult } from "../../shared/utils/middleware";

class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  login(
    username: string,
    password: string,
  ): Promise<MiddlewareResult<LoginResponse>> {
    return withMiddleware(() => this.service.login(username, password));
  }
  async logout() {
    return withMiddleware(() => this.service.logout());
  }

  getProfile(): Promise<MiddlewareResult<UserProfile>> {
    return withMiddleware(() => this.service.getProfile());
  }
}

export default AuthController;
