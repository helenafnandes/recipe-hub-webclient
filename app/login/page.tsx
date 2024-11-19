"use client";
import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { ROUTES } from "../../utils/constants";

const LoginPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const body = { username: data.get("username"), password: data.get("password") };

    fetch(ROUTES.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => console.log(response));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
