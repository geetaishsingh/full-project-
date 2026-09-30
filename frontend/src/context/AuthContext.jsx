import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API = "http://localhost:3000/api/auth";
const ADMIN_EMAIL = "geetaishsinghrajput@gmail.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking session

  // Check session on mount (and after any auth change)
  const checkSession = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/home`, { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const logout = async () => {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true });
    } catch {
      // ignore
    }
    setUser(null);
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, isAdmin, checkSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
