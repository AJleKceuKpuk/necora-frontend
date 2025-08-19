import { Link } from 'react-router-dom';
import "./css/header.css";
import { useTranslation } from 'react-i18next';

const GuestMenu = () => {
  const { t } = useTranslation('header');

  return (
    <div className="header-right start">
      <Link to="/signin" className="header-button pd-5 br-5">{t('signin')}</Link>
      <Link to="/signup" className="header-button pd-5 br-5">{t('signup')}</Link>
    </div>
  );
};

export default GuestMenu;
