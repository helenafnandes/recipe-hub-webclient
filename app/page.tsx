"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const RedirectPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("Token válido, redirecionando para /recipes");
      router.push("/recipes");
    } else {
      console.log("Token ausente ou inválido, redirecionando para /auth/login");
      router.push("/auth/login");
    }
  }, [router]); 
  
  return null;
};

export default RedirectPage;
