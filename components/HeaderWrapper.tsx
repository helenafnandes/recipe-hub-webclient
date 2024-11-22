"use client";

import React from "react";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";

const HeaderWrapper: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return <Header />;
};

export default HeaderWrapper;
