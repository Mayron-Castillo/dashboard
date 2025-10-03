import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.js";
import { ThemeProvider } from "./auth/ThemeContext.js";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
