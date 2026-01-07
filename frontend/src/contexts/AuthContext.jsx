import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const fetchMe = async (token) => {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Unauthorized");
    }
    return data.user;
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const token = getToken();
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setIsInitializing(false);
        }
        return;
      }

      try {
        const me = await fetchMe(token);
        if (!cancelled) {
          setUser({ ...me, token });
          setIsInitializing(false);
        }
      } catch {
        removeToken();
        if (!cancelled) {
          setUser(null);
          setIsInitializing(false);
        }
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = (token) => {
    setToken(token);
    setIsInitializing(true);

    fetchMe(token)
      .then((me) => {
        setUser({ ...me, token });
        setIsInitializing(false);
      })
      .catch(() => {
        removeToken();
        setUser(null);
        setIsInitializing(false);
      });
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsInitializing(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);