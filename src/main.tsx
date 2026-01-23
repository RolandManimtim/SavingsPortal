import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./ThemeProvider";
import {  HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
      <App />
   </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
