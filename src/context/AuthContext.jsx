import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import i18n from 'i18next';
import {
  loginRequest,
  registrationRequest,
  logoutRequest,
  activationRequest,
  refreshAccessToken,
} from '../api/authApi';
import { getProfileRequest } from '../api/profileApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // === Состояния ===
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [pathname, setPathname] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(async ({ username, password }) => {
    const token = await loginRequest({ username, password });
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    setIsAuthenticated(true);
  }, []);

  const getProfile = useCallback(async () => {
    const user = await getProfileRequest();
    setProfile(user);
    return user;
  }, []);



  // === 1. Критические функции авторизации ===

  const logout = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await logoutRequest();
      } catch {
        console.warn('Logout failed silently');
      }
      localStorage.removeItem('accessToken');
    }
    setAccessToken(null);
    setIsAuthenticated(false);
    setUsername(null);
    setProfile(null);
  }, []);



  const refresh = useCallback(async () => {
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
  }, [logout]);

  const validateToken = useCallback(async (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        return await refresh();
      }
      return true;
    } catch (e) {
      console.error('❌ Ошибка при декодировании токена:', e);
      return false;
    }
  }, [refresh]);



  // === 2. Управление состоянием авторизации ===

  const registration = useCallback(async ({ username, email, password }) => {
    const localisation = localStorage.getItem('lang')?.toLowerCase() || 'en';
    await registrationRequest({ username, email, password, localisation });
    setUsername(username);
    return username;
  }, []);

  const activation = useCallback(async ({ code, username }) => {
    await activationRequest({ username, code });
  }, [username]);

  // Автоинициализация при монтировании
  useEffect(() => {
    const initAuthAndLang = async () => {
      const storedLang = localStorage.getItem('lang');
      if (storedLang) {
        const normalized = storedLang.toLowerCase();
        i18n.changeLanguage(normalized);
        setLanguage(normalized);
      }

      const token = localStorage.getItem('accessToken');
      const isValid = await validateToken(token);
      if (isValid && token) {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setUsername(decoded.sub);
        await getProfile();
      } else {
        await logout();
      }
    };
    initAuthAndLang();
  }, [validateToken, logout, getProfile]);

  // === 3. Вспомогательные ===

  const redirect = useCallback((path) => {
    console.log('Redirect to - ' + path);
    setPathname(path);
    navigate(path, { replace: true });
  }, [navigate]);

  const changeLanguage = useCallback((lang) => {
    const normalized = lang.toLowerCase();
    i18n.changeLanguage(normalized);
    localStorage.setItem('lang', normalized);
    setLanguage(normalized);
  }, []);

  // === Context Value ===
  const contextValue = useMemo(() => ({
    accessToken,
    username,
    isAuthenticated,
    profile,
    language,
    pathname,
    changeLanguage,
    validateToken,
    login,
    registration,
    activation,
    refresh,
    logout,
    setIsAuthenticated,
    setUsername,
    redirect,
    getProfile
  }), [
    accessToken, username, isAuthenticated, profile, language, pathname,
    changeLanguage, validateToken, login, registration, activation, refresh,
    logout, redirect, getProfile
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
