import { Link } from 'react-router-dom';
import "./css/header.css";
import useDateTime from '../../hooks/useDateTime';
import icons from "../../assets/images/images";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import PlanetMenu from './PlanetMenu';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import HeaderButton from './HeaderButton';

const Header = ({ game }) => {
  const { t } = useTranslation('header');

  const { isAuthenticated } = useAuth();
  const dateTime = useDateTime();
  const menu = isAuthenticated ? (<UserMenu />) : (<GuestMenu />);
  const planet = <PlanetMenu />;


  if (game && isAuthenticated) {
    return (
      <header className="header header-game-page">
        <div className="header-left">

          <HeaderButton icon={icons.home} alt="home" />
          <div className="header-time">
            {dateTime.toLocaleDateString()} <br />
            {dateTime.toLocaleTimeString()}
          </div>
          <HeaderButton icon={icons.chat} alt="chat" />


        </div>
        <div className="header-center">

          <div className="tm-container">
            <div className="tm-counter">99.999.999</div>
            <div className="img-container img-36 br-5">
              <img src={icons.TM} alt="dark materia" />
            </div>
          </div>

          <div className='planet-control'>
            <HeaderButton icon={icons.arrow} alt="left-arrow" size={25} />
            {planet}
            <HeaderButton icon={icons.arrow} alt="right-arrow" size={25} className="rotate-180" />
          </div>

          <div className="am-container">
            <div className="img-container img-36 br-5">
              <img src={icons.AM} alt="anti materia" />
            </div>
            <div className="am-counter">99.999.000</div>
          </div>

        </div>
        {menu}
      </header>
    );
  }

  return (
    <header className="header header-start-page">
      <div className="header-left start">
        <ul className="header-left-buttons start">
          <Link to="/" className="header-button pd-5 br-5">{t('home')}</Link>
          <Link to="/forum" className="header-button pd-5 br-5">{t('forum')}</Link>
          <Link to="/rules" className="header-button pd-5 br-5">{t('rules')}</Link>
          <Link to="/support" className="header-button pd-5 br-5">{t('support')}</Link>
        </ul>
      </div>
      {menu}
    </header>
  );
};

export default Header;
