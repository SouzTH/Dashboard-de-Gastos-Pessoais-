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

// Funções para acessar o backend
export const getUser = async (id) => {
  console.log(" Chamando GET /ver/usuario/" + id);
  console.log(
    " Cabeçalho Authorization:",
    api.defaults.headers.common["Authorization"]
  );

  return api.get(`/ver/usuario/${id}`);
};
export const updateUser = (id, data) =>
  api.put(`/atualiza/usuario/${id}`, data);
export const deleteUser = (id) => api.delete(`/deletar/usuario/${id}`);

export default api;
