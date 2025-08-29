import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";

const Start = () => {
  const { t } = useTranslation('auth');
  const { isAuthenticated } = useAuth();

  return (
    <div className='start-page'>
      <img className='start-page__logo' src={icons.logo} alt="logo" />
      {isAuthenticated
        ? <Link to="/game" className="start-page__button no-select" >{t('start.play')}</Link>
        : <Link to="/signin" className="start-page__button no-select" >{t('start.signin')}</Link>}
    </div>
  );
};

export default Start;
