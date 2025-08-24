import { useState, useEffect, useCallback, useMemo, } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginRequest, registrationRequest, logoutRequest, activationRequest } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { useToken } from '../hooks/useToken';
import { useProfile } from './ProfileProvider';
import { useNavigate } from 'react-router-dom';


export const AuthProvider = ({ children }) => {
    const [isInitializing, setIsInitializing] = useState(true);

    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { language } = useLanguage();
    const { setAccessToken, accessToken, validateToken } = useToken();
    const { getProfile, setProfile } = useProfile();

    const navigate = useNavigate();

    const login = useCallback(async ({ email, password }) => {
        const token = await loginRequest({ email, password });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
    }, [setAccessToken]);

    const registration = useCallback(async ({ username, email, password }) => {
        console.log(language);
        await registrationRequest({ username, email, password, language });
        setUsername(username);
        return username;
    }, [language]);

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
        setUsername(null);
        setProfile(null);
    }, [setAccessToken, setProfile]);

    const activation = useCallback(async ({ code, username }) => {
        await activationRequest({ username, code });
    }, []);



    const validateSession = useCallback(
        async (overrideToken) => {
            const tokenToCheck = overrideToken ?? accessToken;
            const isValid = await validateToken(tokenToCheck);
            if (isValid && tokenToCheck) {
                const decoded = jwtDecode(tokenToCheck);
                setIsAuthenticated(true);
                setUsername(decoded.sub);
                await getProfile();
            } else {
                await logout();
            }
        },
        [validateToken, logout, getProfile, accessToken]
    );

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

    useEffect(() => {
        initSession();
    }, [initSession]);

    const contextValue = useMemo(() => ({
        isInitializing,
        username,
        isAuthenticated,
        login,
        registration,
        logout,
        activation,
        setUsername,
        setIsAuthenticated,
        validateSession
    }), [
        isInitializing,
        username,
        isAuthenticated,
        login,
        registration,
        logout,
        activation,
        setUsername,
        setIsAuthenticated,
        validateSession
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
