import { createTheme } from "@mui/material/styles";
import '@fontsource/cormorant-garamond';
import '@fontsource/poppins';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#407948", // Branco
    },
    secondary: {
      main: "#C57D5D", // Verde
    },
    error: {
      main: "#d32f2f", // Vermelho
    },
    warning: {
      main: "#f57c00", // Laranja
    },
    info: {
      main: "#0288d1", // Azul
    },
    success: {
      main: "#388e3c", // Verde Escuro
    },
  },
  typography: {
    fontFamily: [
      "Cormorant Garamond", // Para títulos
      "Poppins", // Para o restante
      "sans-serif", // Fallback
    ].join(","),
    h1: {
      fontFamily: "Cormorant Garamond",
    },
    h2: {
      fontFamily: "Cormorant Garamond",
    },
    h3: {
      fontFamily: "Cormorant Garamond",
    },
    button: {
        fontFamily: "Poppins",
    },
  },
});
