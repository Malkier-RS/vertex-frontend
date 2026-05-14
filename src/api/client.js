import axios from 'axios';

function apiOrigin() {
  const v = import.meta.env.VITE_API_BASE_URL;
  const s = v == null ? '' : String(v).trim();
  if (!s || s === 'undefined') return 'http://localhost:8080';
  return s.replace(/\/$/, '');
}

const api = axios.create({
  baseURL: `${apiOrigin()}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
