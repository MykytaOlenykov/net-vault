import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../../../api/auth/AuthService";
import { tokenStore } from "../../../services/TokenStore";
import { notify } from "../../../shared/helpers/notify";
import type { UserProfile } from "../../../api/auth/AuthService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await authService.getProfile();
      setProfile(data);
    } catch {
      tokenStore.clear();
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const data = await authService.login(email, password);
        tokenStore.set(data.data.token);
        await fetchProfile();
        notify.success("You logged in", "Success");
      } catch {
        notify.error("Wrong email or password", "Login error");
        setLoading(false);
      }
    },
    [fetchProfile],
  );

  const logout = useCallback(() => {
    tokenStore.clear();
    setProfile(null);
    notify.success("You logged out", "Exit");
  }, []);

  useEffect(() => {
    if (tokenStore.get()) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuthenticated: Boolean(profile),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
