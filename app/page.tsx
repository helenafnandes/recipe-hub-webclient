"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const RedirectPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/recipes");
    } else {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  return null;
};

export default RedirectPage;
