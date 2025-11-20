// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import {
  loginUsuario,
  cadastrarUsuario,
  getUser,
  deleteUser,
  updateUser,
} from "../services/api";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //email, setEmail, senha, setSenha, lembrar, setLembrar

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
    if(!token){
      toast.error("Você não está autenticado, por favor faça login.");
    }
  }
  //  Sempre que o token mudar, atualiza Axios e busca o usuário
  useEffect(() => {
    //tela de perfil
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      
      setToken(savedToken); // dispara o useEffect que depende de token
    } else {
      const rotasPublicas = ["/", "/login", "/register"];
    
    // Pega a rota atual (ex: "/" ou "/dashboard")
    const rotaAtual = location.pathname;
    // Verifica se a rota atual É uma das públicas OU se começa com uma delas
    const RotasPublicas = rotasPublicas.some(rota => 
      rotaAtual === rota || (rota !== "/" && rotaAtual.startsWith(rota))
    );
    if (!RotasPublicas) // Se não for rota pública, desloga
      logout();
    }
  }, []);

  //  Sempre que o token mudar, atualiza Axios e busca o usuário
  useEffect(() => {
    if (token) {
      //localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);
      //  Decodifica o token e extrai o ID do usuário
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      //  Carrega o usuário com base no ID decodificado
      loadUser(userId);
    } else {
      //  Se não houver token, limpa tudo
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);
  
  //  Busca o usuário autenticado no backend
  const loadUser = async (id) => {
    try {
      const response = await getUser(id);
      setUser(response.data.users); //response retorna algo como:
      /*{
        data: { users: { id: 15, nome: "Fulano", email: "..." } },
      status: 200,
      ...
      }*/
      //
    } catch (error) {
      toast.error(`Erro ao carregar usuário: ${error.message}`);
    }
  };

  // Atualiza o perfil do usuário
  const handleUpdate = async (data) => {
    try {
      const response = await updateUser(user.id, data);
      setUser(response.data);

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        setToken(savedToken); // dispara o useEffect que depende de token
      } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      loadUser(userId);
    } catch (error) {
      
      toast.error(`Erro ao atualizar: ${error.message}`);
    }
  };

  // Deleta o usuário e limpa os dados locais
  const handleDelete = async () => {
    await deleteUser(user.id);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  //logar usuario
  const loginUser = async () => {
    const response = await loginUsuario(email, senha);

    setToken(response.data.token);

    return response;
  };

  const CriarUsuario = async () => {
    try {
      await cadastrarUsuario(nome, email, password);

      toast.success("usuario cadastrado com sucesso!");
    } catch (err) {
      
      toast.error(`Erro ao cadastrar ${err.message}`);
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
        CriarUsuario,
        email,
        senha,
        setEmail,
        password,
        setPassword,
        password2,
        setPassword2,
        nome,
        setNome,
        setSenha,
        setLembrar,
        lembrar,
        getUser,
        loadUser,
        handleUpdate,
        handleDelete,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
