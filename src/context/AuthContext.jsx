// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosInstance';
import { refreshAccessToken, loginRequest } from '../api/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Вход в систему 
  const login = async ({ username, password }) => {
    const token = await loginRequest({ username, password });
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
    const decoded = jwtDecode(token);
    setUsername(decoded.sub);
    return token;
  };

  // Проверяет токен и возвращает true/false
  const validateToken = async (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        const success = await refresh();
        return success;
      }
      return true;
    } catch (e) {
      console.error("❌ Ошибка при декодировании токена:", e);
      return false;
    }
  };

  // Обновление токена
  const refresh = async () => {

    try {
      const token = await refreshAccessToken();
      localStorage.setItem('accessToken', token);
      setAccessToken(token);
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setUsername(decoded.sub);
      return true;
    } catch (e) {
      const status = e.response?.status;
      if (status === 403) {
        logout();
      }
      return false;
    }
  };

  // Выход из системы
  const logout = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await api.post('/logout')
      } catch (e) {
        console.log(e);
      }
      console.log('🚪 logout called');
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  // При монтировании проверяем/обновляем токен
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      const isValid = await validateToken(token);
      if (isValid) {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setUsername(decoded.sub);
      } else {
        logout();
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      accessToken,
      username,
      isAuthenticated,
      validateToken,
      login,
      refresh,
      logout,
      setIsAuthenticated,
      setUsername,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
