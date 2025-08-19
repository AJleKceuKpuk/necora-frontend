import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import i18n from 'i18next';
import {
  loginRequest,
  registrationRequest,
  logoutRequest,
  activationRequest,
  getProfile,
  refreshAccessToken,
} from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState('en'); // дефолт

  // 🔄 Автозагрузка языка при старте
  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      i18n.changeLanguage(storedLang.toLowerCase());
      setLanguage(storedLang);
    }
  }, []);

  // 🌐 Смена языка
  const changeLanguage = (lang) => {
    const normalized = lang.toLowerCase();
    i18n.changeLanguage(normalized);
    localStorage.setItem('lang', normalized);
    setLanguage(normalized);
  };

  // 🔐 Вход
  const login = async ({ username, password }) => {
    const token = await loginRequest({ username, password });
    localStorage.setItem('accessToken', token);
    const user = await getProfile();
    setAccessToken(token);
    setIsAuthenticated(true);
    setProfile(user);
    return user;
  };

  // 🆕 Регистрация
  const registration = async ({ username, email, password }) => {
    await registrationRequest({ username, email, password });
    setUsername(username);
    return username;
  };

  // 🚪 Выход
  const logout = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await logoutRequest();
      } catch (e) {}
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      setIsAuthenticated(false);
      setUsername(null);
      setProfile(null);
    }
  };

  // ✅ Активация
  const activation = async ({ code }) => {
    await activationRequest({ username, code });
  };

  // 🔍 Проверка токена
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

  // 🔄 Обновление токена
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
      if (e.response?.status === 403) {
        logout();
      }
      return false;
    }
  };

  // 🧠 Проверка токена при монтировании
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
    <AuthContext.Provider
      value={{
        accessToken,
        username,
        isAuthenticated,
        profile,
        language,
        changeLanguage,
        validateToken,
        login,
        registration,
        activation,
        refresh,
        logout,
        setIsAuthenticated,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
