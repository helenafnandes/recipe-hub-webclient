"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../utils/constants";
import { useAuth } from "../../../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    try {
      const response = await fetch(ROUTES.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to register");
      }

      const data = await response.json();
      const accessToken = data.accessToken;

      login(accessToken);  // Realiza o login automaticamente após o registro
      router.push("/recipes");  // Redireciona para a página de receitas
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "2rem",
      }}
    >
      <Box sx={{ maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
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
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => router.push("/auth/login")}
          sx={{ marginTop: "1rem" }}
        >
          Already have an account? Login here
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
