import "./start.css"
import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";

const Start = () => {
  const { t } = useTranslation('auth');
  const { isAuthenticated } = useAuth();

  return (
    <div className='start-page'>
      <img className='start-logo' src={icons.logo} alt="logo" />
      {isAuthenticated
        ? <Link to="/game" className="btn-play no-select" >{t('start.play')}</Link>
        : <Link to="/signin" className="btn-play no-select" >{t('start.signin')}</Link>}
    </div>
  );
};

export default Start;
