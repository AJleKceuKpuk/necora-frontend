import { useState, useEffect, useCallback, useMemo, } from 'react';
import { loginRequest, registrationRequest, recoveryRequest, activationRequest, logoutRequest, activationCodeRequest, recoveryCodeRequest, resetPasswordRequest } from '../api/authApi';
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
    const { getProfile, setProfile, profile, isLoading } = useProfile();


    // Функция входа!
    const login = useCallback(async ({ email, password }) => {
        const token = await loginRequest({ email, password });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setAuthPhase("login");
        const user = await getProfile();
        return user;
    }, [setAccessToken, getProfile]);

    // Функция регистрации
    const registration = useCallback(async ({ username, email, password }) => {
        const token = await registrationRequest({ username, email, password, language });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setAuthPhase("registration");
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
    }, [setAccessToken, language, getProfile]);

    const resetPassword = useCallback(async ({ password, passwordApply }) => {
        const code = sessionStorage.getItem("recoveryCode");
        await resetPasswordRequest({ password, passwordApply, code })
    }, []);

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
    }, [profile, getProfile]);

    // Функция отправки кода активации
    const sendCodeActivation = useCallback(async () => {
        await activationCodeRequest({ language });
    }, [language]);

    // Функция отправки кода востановления доступа
    const sendCodeRecovery = useCallback(async ({ email }) => {
        await recoveryCodeRequest({ email, language });
    }, [language]);

    const initSession = useCallback(
        async (overrideToken) => {
            const tokenToCheck = overrideToken ?? accessToken;
            try {
                const isValid = await validateToken(tokenToCheck);
                if (tokenToCheck && isValid) {
                    try {
                        await getProfile();
                        setIsAuthenticated(true);
                    } catch (e) {
                        await logout();
                    }
                } else {
                    await logout();
                }
            } catch (e) {
                console.error(e?.response?.data?.error || e.message);
                await logout();
            } finally {
                setIsInitializing(false);
            }
        },
        [accessToken, isAuthenticated, isLoading, validateToken, getProfile, logout]
    );

    // Инициализация сессии при монтировании
    useEffect(() => {
        initSession();
    }, [initSession]);

    // Мемоизация
    const contextValue = useMemo(() => ({
        isInitializing, isAuthenticated, authPhase,

        login, registration, recovery, activation, logout, resetPassword,
        setIsAuthenticated, setAuthPhase,
        sendCodeActivation, sendCodeRecovery,
    }), [
        isInitializing, isAuthenticated, authPhase,

        login, registration, recovery, activation, logout, resetPassword,
        setIsAuthenticated, setAuthPhase,
        sendCodeActivation, sendCodeRecovery,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
