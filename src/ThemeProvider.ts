import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // dark green
    },
    secondary: {
      main: "#f9a825", // gold
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#2e7d32",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: { fontWeight: 700, color: "white" },
    body2: { color: "#616161" },
    button: { textTransform: "none" },
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
      defaultProps: {
        variant: "outlined", // ensure outlined style
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e7d32",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e7d32",
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: "#616161",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#616161", // default label color
          "&.Mui-focused": {
            color: "#2e7d32", // label color when focused
          },
        },
      },
    },
  },
});

export default theme;
