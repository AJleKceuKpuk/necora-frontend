// context/LanguageContext.js
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import i18n from 'i18next'

export const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en')

    const changeLanguage = useCallback(lang => {
        const normalized = lang.toLowerCase()
        i18n.changeLanguage(normalized)
        localStorage.setItem('lang', normalized)
        setLanguage(normalized)
    }, [])

    const initLanguage = useCallback(() => {
        const stored = localStorage.getItem('lang')
        if (stored) {
            const normalized = stored.toLowerCase()
            i18n.changeLanguage(normalized)
            setLanguage(normalized)
        }
    }, [])

    useEffect(() => {
        initLanguage()
    }, [initLanguage])

    const value = useMemo(() => ({ language, changeLanguage }), [
        language,
        changeLanguage,
    ])

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => React.useContext(LanguageContext)
