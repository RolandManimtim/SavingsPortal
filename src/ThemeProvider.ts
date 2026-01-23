import { createTheme } from "@mui/material/styles";

// Custom theme colors for Money & Savings
const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefeff", // deep green for savings/money
    },
    secondary: {
      main: "#f9a825", // gold/yellow for lending/money
    },
    background: {
      default: "#f5f5f5", // light grey background
      paper: "#ffffff",    // paper background
    },
    text: {
      primary: "#2e7d32", // dark green for text
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: {
      fontWeight: 700,
      color: "white",
    },
    body2: {
      color: "#616161",
    },
    button: {
      textTransform: "none", // keep button text normal case
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
          boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
