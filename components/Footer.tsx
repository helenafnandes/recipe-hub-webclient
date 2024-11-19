"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        marginTop: "2rem",
      }}
    >
      <Typography variant="body2">© 2024 RecipeHub. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
