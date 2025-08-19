// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // если хочешь стили отдельно

const LanguageSwitcher = ({ compact = false }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <div className={`lang-switcher ${compact ? 'compact' : ''}`}>
      <button
        className={i18n.language === 'ru' ? 'active' : ''}
        onClick={() => changeLanguage('ru')}
      >
        🇷🇺 RU
      </button>
      <button
        className={i18n.language === 'en' ? 'active' : ''}
        onClick={() => changeLanguage('en')}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
