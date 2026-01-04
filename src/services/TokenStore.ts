class TokenStore {
  private key = "accessToken";

  get(): string | null {
    return sessionStorage.getItem(this.key);
  }

  set(token: string) {
    sessionStorage.setItem(this.key, token);
  }

  clear() {
    sessionStorage.removeItem(this.key);
  }
}

export const tokenStore = new TokenStore();
