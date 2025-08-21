import { useState, useEffect, useCallback, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '../api/token';
import { TokenContext } from '../context/TokenContext';

export const TokenProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(() =>
        localStorage.getItem('accessToken')
    );

    // Попытка обновить токен
    const refresh = useCallback(async () => {
        const token = await refreshToken();
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        return token;
    }, []);

    // Проверка срока жизни
    const validateToken = useCallback(async (token) => {
        
        if (!token) return false;
        try {
            const { exp } = jwtDecode(token);
            if (exp * 1000 < Date.now()) {
                console.log("Истек");
                
                await refresh();
            }
            return true;
        } catch {
            return false;
        }
    }, [refresh]);

    // Инициализация при старте
    useEffect(() => {
        (async () => {
            const token = accessToken;
            const valid = await validateToken(token);
            if (!valid) {
                localStorage.removeItem('accessToken');
                setAccessToken(null);
            }
        })();
    }, [accessToken, validateToken]);

    const value = useMemo(() => ({
        accessToken,
        setAccessToken,
        validateToken,
        refresh,
    }), [accessToken, setAccessToken, validateToken, refresh]);

    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
};
