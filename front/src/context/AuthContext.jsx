import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. O token é carregado do localStorage no estado
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // 2. O ID é carregado e usado para criar um objeto 'user' minimalista
  const initialUserId = localStorage.getItem("user_id");
  const [user, setUser] = useState(
    (token && initialUserId) ? { id: parseInt(initialUserId, 10) } : null
  );

  // O loadingInitial é simplificado, pois o estado inicial já é definido acima.
  // Manteremos apenas 'loading' se for usado em outro lugar, mas o DashHome usará o próprio.

  // Efeito: Persistir o token no localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    // 🎯 CRÍTICO: Salva o ID do usuário
    if (userData && userData.id) {
      localStorage.setItem("user_id", userData.id);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id"); // Limpa o ID
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);