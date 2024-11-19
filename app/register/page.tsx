"use client";
import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { ROUTES } from "../../utils/constants";

const RegisterPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const body = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    fetch(ROUTES.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User registered successfully");
          // Adicionar redirecionamento ou mensagens de sucesso aqui
        } else {
          console.error("Error during registration");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" fullWidth margin="normal" required />
        <TextField name="email" label="Email" type="email" fullWidth margin="normal" required />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
