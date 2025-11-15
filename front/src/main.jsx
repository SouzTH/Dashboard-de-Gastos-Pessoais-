import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// 🎯 Certifique-se de que o caminho está correto para o seu AuthContext
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. Envolve o App no Provedor de Autenticação */}
    <AuthProvider>
      {/* 2. Envolve nos outros provedores (UserProvider) */}
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);