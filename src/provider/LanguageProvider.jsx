import { useState, useEffect, useCallback } from 'react';
import i18n from 'i18next';
import { LanguageContext } from '../context/LanguageContext';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

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

    useEffect(() => {
        initLanguage();
    }, [initLanguage]);

    const contextValue = {
        language,
        changeLanguage,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
