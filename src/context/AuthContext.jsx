// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginRequest, registrationRequest, logoutRequest, activationRequest, getProfile, refreshAccessToken, } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  // Вход в систему 
  const login = async ({ username, password }) => {
    console.log("LOG");
    
    const token = await loginRequest({ username, password });
    localStorage.setItem('accessToken', token);
    const user = await getProfile();
    setAccessToken(token);
    setIsAuthenticated(true);
    setProfile(user);
    return user;
  };

  // Регистрация
  const registration = async ({ username, email, password }) => {
    await registrationRequest({ username, email, password });
    setUsername(username);
    return username;
  };

  // Выход из системы
  const logout = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await logoutRequest();
      } catch (e) {
      }
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      setIsAuthenticated(false);
      setUsername(null);
      setProfile(null);
    }
  };


  const activation = async ({ code }) => {

    console.log(username);

    const response = await activationRequest({ username, code });
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
      profile,
      validateToken,
      login,
      registration,
      activation,
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
