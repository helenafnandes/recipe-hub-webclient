"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../utils/constants";
import { useAuth } from "../../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await fetch(ROUTES.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      login(); // atualiza o estado de login
      router.push("/recipes");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={() => router.push("/auth/register")}
        sx={{ marginTop: "1rem" }}
      >
        Don’t have an account? Register here
      </Button>

    </Box>
  );
};

export default LoginPage;