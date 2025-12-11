// resources/js/hooks/useAuth.js
import { useState, useCallback } from "react";
import { studentApi } from "../utils/api";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("student_data");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const saveUser = (userData) => {
    localStorage.setItem("student_data", JSON.stringify(userData));
    setUser(userData);
  };

  const login = useCallback(async (credentials) => {
    try {
      const response = await studentApi.login(credentials);

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        saveUser(response.student);
      }

      return response;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await studentApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("student_data");
      setUser(null);
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await studentApi.getCurrentUser();
      if (response) saveUser(response);
      return response;
    } catch (err) {
      console.error("Get user error:", err);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (data) => {
    try {
      const response = await studentApi.resetPassword(data);
      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        saveUser(response.student);
      }
      return response;
    } catch (err) {
      console.error("Reset password error:", err);
      throw err;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.warn("No token to refresh, forcing logout");
      await logout();
      return null;
    }
    try {
      const response = await studentApi.refreshToken();
      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }
      return response;
    } catch (err) {
      console.error("Refresh token failed:", err);
      await logout(); // fallback: force logout
      return null;
    }
  }, [logout]);

  return { user, login, logout, getCurrentUser, resetPassword, refreshToken };
};

export default useAuth;
