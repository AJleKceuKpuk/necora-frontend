import { useState, useCallback } from 'react';
import i18n from 'i18next';
import { LanguageContext } from '../context/LanguageContext';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const stored = localStorage.getItem('lang');
        const initial = stored || i18n.language || 'ru';
        const norm = initial.toLowerCase();

        i18n.changeLanguage(norm);

        return norm;
    });

    const changeLanguage = useCallback((lang) => {
        const norm = lang.toLowerCase();
        i18n.changeLanguage(norm);
        localStorage.setItem('lang', norm);
        setLanguage(norm);
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
