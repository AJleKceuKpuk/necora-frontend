import { useState, useEffect, useRef } from 'react';

import './footer.css';
import icons from '../../assets/images/images';
import { useLanguage } from '../../hooks/useLanguage';

const Footer = () => {
    const [showList, setShowList] = useState(false);
    const listRef = useRef(null);

    const { language, changeLanguage } = useLanguage(); 

    const toggleList = () => {
        setShowList(prev => !prev);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setShowList(false);
            }
        };

        if (showList) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showList]);

    return (
        <div className="footer" ref={listRef}>
            <div className='footer-lang__button no-select' onClick={toggleList}>
                <div className="img-container img-36">
                    <img src={icons.language} alt="language" />
                </div>
                <div className='footer-lang'>{language.toUpperCase()}</div> {/* 👈 текущий язык */}
            </div>

            <div className={`footer-list no-select ${showList ? 'show' : ''}`}>
                {['RU', 'EN', 'FR', 'CH', 'LV'].map((lang) => (
                    <div
                        key={lang}
                        className={`footer-lang footer-button ${language.toUpperCase() === lang ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang)}
                        data-tooltip={getTooltip(lang)}
                    >
                        {lang}
                    </div>
                ))}
            </div>
        </div>
    );
};

const getTooltip = (lang) => {
    switch (lang) {
        case 'RU': return 'Русский';
        case 'EN': return 'English';
        case 'FR': return 'Français';
        case 'CH': return '中文';
        case 'LV': return 'Latviešu';
        default: return lang;
    }
};

export default Footer;
