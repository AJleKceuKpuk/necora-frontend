import axios from 'axios';
import { refreshAccessToken } from './auth';

const api = axios.create({
  baseURL: 'https://localhost:8443',
  withCredentials: true,
});

const authExcludedRoutes = ['/login', '/registration'];

api.interceptors.request.use(config => {
  if (!authExcludedRoutes.includes(config.url)) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// response-интерцептор: ловим 401 → обновляем → повторяем запрос
api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default api;
