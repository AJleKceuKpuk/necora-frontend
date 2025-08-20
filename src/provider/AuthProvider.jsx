import { useState, useEffect, useCallback, useMemo, } from 'react';
import { jwtDecode } from 'jwt-decode';
import i18n from 'i18next';
import {    loginRequest,    registrationRequest,    logoutRequest,    activationRequest,    refreshAccessToken,} from '../api/authApi';
import { getProfileRequest } from '../api/profileApi';
import { AuthContext } from '../context/AuthContext';


export const AuthProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [isInitializing, setIsInitializing] = useState(true);

    const [accessToken, setAccessToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const changeLanguage = useCallback((lang) => {
        const normalized = lang.toLowerCase();
        i18n.changeLanguage(normalized);
        localStorage.setItem('lang', normalized);
        setLanguage(normalized);
    }, []);

    const initLanguage = useCallback(() => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            const normalized = storedLang.toLowerCase();
            i18n.changeLanguage(normalized);
            setLanguage(normalized);
        }
    }, []);

    const getProfile = useCallback(async () => {
        const user = await getProfileRequest();
        setProfile(user);
        return user;
    }, []);

    const login = useCallback(async ({ username, password }) => {
        const token = await loginRequest({ username, password });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setIsAuthenticated(true);
        getProfile();
    }, [getProfile]);

    const registration = useCallback(async ({ username, email, password }) => {
        const localisation = localStorage.getItem('lang')?.toLowerCase() || 'en';
        await registrationRequest({ username, email, password, localisation });
        setUsername(username);
        return username;
    }, []);

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

    const activation = useCallback(async ({ code, username }) => {
        await activationRequest({ username, code });
    }, []);

    const refresh = useCallback(async () => {
        try {
            const token = await refreshAccessToken();
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
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

    const initAuth = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        const isValid = await validateToken(token);
        try {
            if (isValid && token) {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUsername(decoded.sub);
                await getProfile();
            } else {
                await logout();
            }
        } catch (e) {
            console.error(e?.response?.data?.error || e.message);
            await logout();
        } finally {
            setIsInitializing(false);
        }
    }, [validateToken, logout, getProfile]);

    useEffect(() => {
        const init = async () => {
            initLanguage();
            await initAuth();
        };
        init();
    }, [initLanguage, initAuth]);

    const contextValue = useMemo(() => ({
        language,
        isInitializing,
        accessToken,
        profile,
        username,
        isAuthenticated,
        changeLanguage,
        getProfile,
        login,
        registration,
        logout,
        activation,
        validateToken,
        refresh,
        setUsername,
        setIsAuthenticated,
    }), [
        language,
        isInitializing,
        accessToken,
        profile,
        username,
        isAuthenticated,
        changeLanguage,
        getProfile,
        login,
        registration,
        logout,
        activation,
        validateToken,
        refresh,
        setUsername,
        setIsAuthenticated,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
