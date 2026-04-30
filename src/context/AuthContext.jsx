import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  /** false dok traje inicijalna provera tokena (/auth/me), da refresh ne prebaci na login pre učitavanja */
  const [authReady, setAuthReady] = useState(() => !localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthReady(true);
      return;
    }
    setAuthReady(false);
    api.get('/auth/me')
      .then((r) => setUser(r.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setAuthReady(true));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data);
    setAuthReady(true);
  };

  const register = async (payload) => {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    const { data } = await api.post('/auth/register-multipart', form);
    localStorage.setItem('token', data.token);
    setUser(data);
    setAuthReady(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthReady(true);
  };

  return (
    <AuthContext.Provider value={{ user, authReady, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
