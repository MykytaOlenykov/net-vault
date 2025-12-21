import { useState, useCallback } from "react";
import api from "../../api";
import AuthService from "../../api//auth/AuthService";
import type { UserProfile, LoginResponse } from "../../api//auth/AuthService";
import AuthController from "../../api/auth/AuthController";
import { useNavigate } from "react-router";
const authService = new AuthService(api);
const authController = new AuthController(authService);

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    const result = await authController.login(username, password);
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    } else {
      navigate("/");
      setLoading(false);
    }

    if (result.success && result.data) {
      setError(null);
      return result.data as LoginResponse;
    } else {
      setError(result.error || "Login failed");
      return null;
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const result = await authController.getProfile();
    setLoading(false);

    if (result.success && result.data) {
      setProfile(result.data);
      setError(null);
    } else {
      setError(result.error || "Failed to fetch profile");
    }
  }, []);
  const logout = useCallback(async () => {
    const result = await authController.logout();
    if (result.success) {
      setProfile(null);
      setError(null);
    } else {
      setError(result.error ?? null);
    }
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
