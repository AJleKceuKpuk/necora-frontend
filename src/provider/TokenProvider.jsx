// context/TokenContext.js
import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessToken } from '../api/authApi'

export const TokenContext = createContext(null)

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        () => localStorage.getItem('accessToken')
    )

    const saveToken = useCallback(token => {
        localStorage.setItem('accessToken', token)
        setAccessToken(token)
    }, [])

    const clearToken = useCallback(() => {
        localStorage.removeItem('accessToken')
        setAccessToken(null)
    }, [])

    const refreshToken = useCallback(async () => {
        try {
            const newToken = await refreshAccessToken()
            saveToken(newToken)
            return true
        } catch {
            clearToken()
            return false
        }
    }, [saveToken, clearToken])

    const validateToken = useCallback(
        async token => {
            if (!token) return false
            try {
                const { exp } = jwtDecode(token)
                if (exp * 1000 < Date.now()) {
                    return await refreshToken()
                }
                return true
            } catch {
                clearToken()
                return false
            }
        },
        [refreshToken, clearToken]
    )

    // при старте проверяем токен
    useEffect(() => {
        (async () => {
            await validateToken(accessToken)
        })()
    }, [accessToken, validateToken])

    const value = useMemo(
        () => ({
            accessToken,
            saveToken,
            clearToken,
            validateToken,
            refreshToken,
        }),
        [accessToken, saveToken, clearToken, validateToken, refreshToken]
    )

    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    )
}

// хук для удобства
export const useToken = () => React.useContext(TokenContext)
