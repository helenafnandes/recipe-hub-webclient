"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (accessToken: string) => void;  // Alterando para aceitar o token real
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Verificar o token no localStorage na primeira renderização
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // Monitorar mudanças no isLoggedIn
  useEffect(() => {
    console.log("isLoggedIn mudou:", isLoggedIn);
  }, [isLoggedIn]);

  const login = (accessToken: string) => {
    // Salva o token real no localStorage
    localStorage.setItem("accessToken", accessToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remover token do localStorage e atualizar o estado
    console.log("Logout");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
