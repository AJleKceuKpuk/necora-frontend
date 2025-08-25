import { useState, useEffect, useCallback, useMemo, } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginRequest, registrationRequest, logoutRequest, activationRequest, activationCodeRequest } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { useToken } from '../hooks/useToken';
import { useProfile } from './ProfileProvider';
import { useNavigate } from 'react-router-dom';


export const AuthProvider = ({ children }) => {
    const [isInitializing, setIsInitializing] = useState(true);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { language } = useLanguage();
    const { setAccessToken, accessToken, validateToken } = useToken();
    const { getProfile, setProfile, profile } = useProfile();

    const login = useCallback(async ({ email, password }) => {
        const token = await loginRequest({ email, password });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setJustLoggedIn(true);
    }, [setAccessToken]);

    const registration = useCallback(async ({ username, email, password }) => {
        const token = await registrationRequest({ username, email, password, language });
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setJustLoggedIn(true)
    }, [setAccessToken]);

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

    const activation = useCallback(async ({ code }) => {

        const username = profile?.username;
        console.log(username);
        await activationRequest({ username, code });
    }, []);



    const sendCodeActivation = useCallback(async () => {
        await activationCodeRequest({ language });
    }, []);





    const validateSession = useCallback(
        async (overrideToken) => {
            const tokenToCheck = overrideToken ?? accessToken;
            const isValid = await validateToken(tokenToCheck);
            if (isValid && tokenToCheck) {
                const decoded = jwtDecode(tokenToCheck);
                setIsAuthenticated(true);
                setUsername(decoded.sub);
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
        justLoggedIn,
        login,
        registration,
        logout,
        activation,
        setUsername,
        setIsAuthenticated,
        validateSession,
        setJustLoggedIn,
        sendCodeActivation
    }), [
        isInitializing,
        username,
        isAuthenticated,
        justLoggedIn,
        login,
        registration,
        logout,
        activation,
        setUsername,
        setIsAuthenticated,
        validateSession,
        setJustLoggedIn,
        sendCodeActivation
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
