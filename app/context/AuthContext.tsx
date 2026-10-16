"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type User = {
  name: string;
  email: string;
  isGuest?: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  authTriggerCallback: (() => void) | null;
  setAuthTriggerCallback: (cb: (() => void) | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTriggerCallback, setAuthTriggerCallback] = useState<(() => void) | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("brewcraft_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Simulated login — in production, call your API here
    await new Promise((res) => setTimeout(res, 800));
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const u: User = { name, email };
    setUser(u);
    localStorage.setItem("brewcraft_user", JSON.stringify(u));
    setShowAuthModal(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // Simulated signup — in production, call your API here
    await new Promise((res) => setTimeout(res, 1000));
    const u: User = { name, email };
    setUser(u);
    localStorage.setItem("brewcraft_user", JSON.stringify(u));
    setShowAuthModal(false);
  }, []);

  const loginAsGuest = useCallback(() => {
    const u: User = { name: "Guest", email: "guest@brewcraft.com", isGuest: true };
    setUser(u);
    localStorage.setItem("brewcraft_user", JSON.stringify(u));
    setShowAuthModal(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("brewcraft_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginAsGuest,
        logout,
        showAuthModal,
        setShowAuthModal,
        authTriggerCallback,
        setAuthTriggerCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
