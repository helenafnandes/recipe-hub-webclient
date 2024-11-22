"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login"); // Redireciona para login se não estiver autenticado
      }
    }, [router]);

    return <Component {...props} />;
  };
};
