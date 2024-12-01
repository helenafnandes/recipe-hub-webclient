"use client";

import React from "react";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";

const HeaderWrapper: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const handleRecipeAdded = () => {
     window.location.reload();
  };

  if (!isLoggedIn) {
    return null;
  }

  return <Header onRecipeAdded={handleRecipeAdded} />;
};

export default HeaderWrapper;
