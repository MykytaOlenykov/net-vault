class TokenStore {
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

export const tokenStore = new TokenStore();
