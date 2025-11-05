// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginUsuario } from "../services/api";
import api from "../services/api";
//import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  //email, setEmail, senha, setSenha, lembrar, setLembrar

  //  Sempre que o token mudar, atualiza Axios e busca o usuário
  useEffect(() => {
    if (token) {
      console.log(" Token encontrado:", token);

      //localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);
      console.log("Cheguei no final do effect");
    } else {
      //console.log(" Nenhum token encontrado no localStorage");
      //  Se não houver token, limpa tudo
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  //  Busca o usuário autenticado no backend

  //logar usuario
  const loginUser = async () => {
    try {
      const response = await loginUsuario(email, senha);

      setToken(response.data.token);
      console.log("Cheguei no final do loginUser");
      return response;
    } catch (err) {
      alert("Email ou senha incorretos!");
      console.log("Erro ao logal", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        loginUser,
        email,
        senha,
        setEmail,
        setSenha,
        setLembrar,
        lembrar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
