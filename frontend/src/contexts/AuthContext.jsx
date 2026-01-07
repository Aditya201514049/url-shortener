import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On mount: check token and possibly fetch user details
    const token = getToken();
    if (token) setUser({ token }); // You may fetch user info if backend supports it
  }, []);

  const login = (token) => {
    setToken(token);
    setUser({ token });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);