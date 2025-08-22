import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8443',
  withCredentials: true,
});

const authExcludedRoutes = ['/login', '/registration'];

// ✅ Кеш активных запросов (без типов)
const inflightRequests = new Map();

function getRequestKey(config) {
  const { method, url, data } = config;
  return `${method}:${url}:${JSON.stringify(data || {})}`;
}

// ✅ Request interceptor
api.interceptors.request.use(config => {
  const key = getRequestKey(config);

  if (!authExcludedRoutes.includes(config.url)) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (inflightRequests.has(key)) {
    config.adapter = () => inflightRequests.get(key);
  }

  return config;
});

// ✅ Response interceptor
api.interceptors.response.use(
  response => {
    const key = getRequestKey(response.config);
    inflightRequests.set(key, Promise.resolve(response));
    setTimeout(() => inflightRequests.delete(key), 1000); // TTL 1 сек
    return response;
  },
  error => {
    const key = getRequestKey(error.config || {});
    inflightRequests.delete(key);
    return Promise.reject(error); // ← важно вернуть ошибку!
  }
);

export default api;
