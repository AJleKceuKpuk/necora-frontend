import React, { createContext, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate()
    const [pathname, setPathname] = useState(null)

    const redirect = useCallback(path => {
        console.log("path: " + path);
        
            setPathname(path)
            navigate(path, { replace: true })
        },
        [navigate]
    )

    const value = useMemo(
        () => ({ pathname, redirect }),
        [pathname, redirect]
    )

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}

