import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
      }
    }, [isLoggedIn, router]);

    return <Component {...props} />;
  };
};
