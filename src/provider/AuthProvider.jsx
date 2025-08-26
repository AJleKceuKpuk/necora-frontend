import { useState, useEffect, useCallback, useMemo, } from 'react';
import { loginRequest, registrationRequest, recoveryRequest, activationRequest, logoutRequest, activationCodeRequest, recoveryCodeRequest } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { useToken } from '../hooks/useToken';
import { useProfile } from './ProfileProvider';

export const AuthProvider = ({ children }) => {
    const [isInitializing, setIsInitializing] = useState(true);
    const [authPhase, setAuthPhase] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { language } = useLanguage();
    const { setAccessToken, accessToken, validateToken } = useToken();
    const { getProfile, setProfile, profile } = useProfile();

    // Функция входа!
    const login = useCallback(async ({ email, password }) => {
        const token = await loginRequest({ email, password });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setAuthPhase("login");
    }, [setAccessToken]);

    // Функция регистрации
    const registration = useCallback(async ({ username, email, password }) => {
        const token = await registrationRequest({ username, email, password, language });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setAuthPhase("login");
        sendCodeActivation();
    }, [setAccessToken, language]);

    // Функция востановления доступа
    const recovery = useCallback(async ({ email, code }) => {
        const { data } = await recoveryRequest({ email, code, language });
        const token = data.tokens.accessToken;
        const recoveryCode = data.recoveryCode;
        sessionStorage.setItem('recoveryCode', recoveryCode);
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setAuthPhase("recovery");
        await getProfile();
        return recoveryCode;
    }, [setAccessToken, language, getProfile]);

    // Функция выхода
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
        setIsAuthenticated(false);
        setAccessToken(null);
        setProfile(null);
    }, [setAccessToken, setProfile]);

    // Функция активации аккаунта
    const activation = useCallback(async ({ code }) => {
        const username = profile?.username;
        await activationRequest({ username, code });
        await getProfile();
    }, [profile, getProfile]);

    // Функция отправки кода активации
    const sendCodeActivation = useCallback(async () => {
        await activationCodeRequest({ language });
    }, [language]);

    // Функция отправки кода востановления доступа
    const sendCodeRecovery = useCallback(async ({ email }) => {
        await recoveryCodeRequest({ email, language });
    }, [language]);

    // Валидация сессии
    const validateSession = useCallback(
        async (overrideToken) => {
            const tokenToCheck = overrideToken ?? accessToken;
            const isValid = await validateToken(tokenToCheck);
            if (isValid && tokenToCheck) {
                setIsAuthenticated(true);
                try {
                    await getProfile();
                } catch (e) {
                    await logout();
                }
            } else {
                await logout();
            }
        },
        [validateToken, logout, getProfile, accessToken]
    );

    //Инициализация сессии
    const initSession = useCallback(async () => {
        try {
            await validateSession();
        } catch (e) {
            console.error(e?.response?.data?.error || e.message);
            await logout();
        } finally {
            setIsInitializing(false);
        }
    }, [validateSession, logout]);

    // Инициализация сессии при монтировании
    useEffect(() => {
        initSession();
    }, [initSession]);

    // Мемоизация
    const contextValue = useMemo(() => ({
        isInitializing, isAuthenticated, authPhase,

        login, registration, recovery, activation, logout,
        setIsAuthenticated, setAuthPhase,
        sendCodeActivation, sendCodeRecovery,
    }), [
        isInitializing, isAuthenticated, authPhase,

        login, registration, recovery, activation, logout,
        setIsAuthenticated, setAuthPhase,
        sendCodeActivation, sendCodeRecovery,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
