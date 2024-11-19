"use client"; // Este componente é um Client Component

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../styles/theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta estilos padrão */}
      {children}
    </ThemeProvider>
  );
}
