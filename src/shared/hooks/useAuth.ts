import { useState, useCallback } from "react";
import { authService } from "../../api/auth/AuthService";
import type { UserProfile } from "../../api/auth/AuthService";
import { useNavigate } from "react-router";
import { tokenStore } from "../../services/TokenStore";

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setLoading(true);
      const data = await authService.login(username, password);
      setError(null);
    } catch (error) {
      // setError(error || "Login failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await authService.getProfile();
      setProfile(data);
      setError(null);
    } catch (error) {
      // setError(data.error || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    //   const result = await authService.logout();
    //   if (result.success) {
    //     setProfile(null);
    //     setError(null);
    //   } else {
    //     setError(result.error ?? null);
    // }
  }, []);

  return {
    profile,
    error,
    loading,
    login,
    logout,
    fetchProfile,
  };
}
