"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(101, 85, 143, 1)", // Primary color
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
