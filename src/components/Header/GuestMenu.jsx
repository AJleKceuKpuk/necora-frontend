import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GuestMenu = () => {
  const { t } = useTranslation('header');

  return (
    <div className="header__right header__right--start">
      <Link to="/signin" className="header__button pd-5 br-5">{t('signin')}</Link>
      <Link to="/signup" className="header__button pd-5 br-5">{t('signup')}</Link>
    </div>
  );
};

export default GuestMenu;
