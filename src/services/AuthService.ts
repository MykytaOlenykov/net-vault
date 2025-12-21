class AuthService {
  setToken(token: string) {
    sessionStorage.setItem("accessToken", token);
  }

  getToken() {
    return sessionStorage.getItem("accessToken");
  }

  clearToken() {
    sessionStorage.removeItem("accessToken");
  }
}

export default new AuthService();
