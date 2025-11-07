import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl, //colocar no .env
});

export const backendURL = apiUrl; //usado no front tela Settings

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções para acessar o backend
export const getUser = async (id) => {
  return api.get(`/ver/usuario/${id}`);
};
export const updateUser = (id, data) =>
  api.patch(`/atualizar/usuario/${id}`, data);
export const deleteUser = (id) => api.delete(`/deletar/usuario/${id}`);

export default api;
