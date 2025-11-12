import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl, //colocar no .env
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cadastrarUsuario = async (nome, email, senha) => {
  console.log("no api.js");
  return api.post(`/criar/usuario`, { nome, email, senha });
};

export default api;
