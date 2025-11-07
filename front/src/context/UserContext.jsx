import { createContext, useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../services/api";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //  Sempre que o token mudar, atualiza Axios e busca o usuário
  useEffect(() => {
    //tela de perfil
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      //console.log(" Token encontrado no localStorage:", savedToken);
      setToken(savedToken); // dispara o useEffect que depende de token
    } else {
      //console.log(" Nenhum token encontrado no localStorage");
    }
  }, []);

  //  Sempre que o token mudar, atualiza Axios e busca o usuário
  useEffect(() => {
    if (token) {
      console.log(" Token encontrado:", token);

      //localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);
      //  Decodifica o token e extrai o ID do usuário
      const decoded = jwtDecode(token);
      //console.log("Decodificado:", decoded);
      const userId = decoded.id;

      //console.log(" Token carregado:", token);
      //console.log(" ID decodificado:", userId);

      //  Carrega o usuário com base no ID decodificado
      loadUser(userId);
    } else {
      //console.log(" Nenhum token encontrado no localStorage");
      //  Se não houver token, limpa tudo
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  //  Busca o usuário autenticado no backend
  const loadUser = async (id) => {
    try {
      //console.log(" Chamando backend em:", `/ver/usuario/${id}`);
      //console.log(" Cabeçalhos atuais do Axios:", api.defaults.headers.common);
      const response = await getUser(id);
      //console.log(" Resposta do backend:", response);
      setUser(response.data.users); //response retorna algo como:
      /*{
        data: { users: { id: 15, nome: "Fulano", email: "..." } },
      status: 200,
      ...
      }*/
      //
    } catch (error) {
      console.error(" Erro ao carregar usuário:", error);
    }
  };

  // Atualiza o perfil do usuário
  const handleUpdate = async (data) => {
    try {
      console.log("Id do usuario:", user.id);
      console.log("Informações: ", data);
      const response = await updateUser(user.id, data);
      setUser(response.data);

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        //console.log(" Token encontrado no localStorage:", savedToken);
        setToken(savedToken); // dispara o useEffect que depende de token
      } else {
        //console.log(" Nenhum token encontrado no localStorage");
      }

      const decoded = jwtDecode(token);
      //console.log("Decodificado:", decoded);
      const userId = decoded.id;

      loadUser(userId);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  // Deleta o usuário e limpa os dados locais
  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  //criar usuario

  //logar usuario

  //deslogar usuario

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loadUser,
        setUser,
        setToken,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
