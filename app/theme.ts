"use client";

import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e"
    },
    secondary: {
      main: "#ea580c"
    },
    background: {
      default: "#f8fafc"
    }
  },
  shape: {
    borderRadius: 12
  }
});
