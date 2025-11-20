import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUsuario = (email, senha) =>
  api.post(`/login`, { email, senha });

export const cadastrarUsuario = async (nome, email, senha) => {
  return api.post(`/criar/usuario`, { nome, email, senha });
};

export const getUser = async (id) => {
  return api.get(`/ver/usuario/${id}`)
};

export const updateUser = (id, data) => api.patch(`/atualizar/usuario/${id}`, data);

export const deleteUser = (id) => api.delete(`/deletar/usuario/${id}`);

export const getTodasTransacoes = (userId) => {
  return api.get(`/read/all-transactions/${userId}`); 
};

export const backendURL = apiUrl;
export default api;