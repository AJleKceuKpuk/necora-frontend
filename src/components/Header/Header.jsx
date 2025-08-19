import { Link } from 'react-router-dom';
import "./css/header.css";
import useDateTime from "../../services/useDateTime";
import icons from "../../assets/images/images";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import PlanetMenu from './PlanetMenu';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Header = ({ game }) => {
  const { t } = useTranslation('header');

  const { isAuthenticated } = useAuth();
  const dateTime = useDateTime();
  const menu = isAuthenticated ? (<UserMenu />) : (<GuestMenu />);
  const planet = <PlanetMenu />;
console.log('t(home):', t('home'));


  if (game && isAuthenticated) {
    return (
      <header className="header header-game-page">
        <div className="header-left">

          <Link to="/" className="img-container img-36 br-5 header-button">
            <img src={icons.home} alt="home" />
          </Link>

          <div className="fs-20">
            {dateTime.toLocaleDateString()} <br />
            {dateTime.toLocaleTimeString()}
          </div>

          <Link to="/about" className="img-container img-36 br-5 header-button">
            <img src={icons.chat} alt="chat" />
          </Link>


        </div>
        <div className="header-center">

          <div className="tm-container">
            <div className="tm-counter">99.999.999</div>
            <div className="img-container img-36 br-5">
              <img src={icons.TM} alt="dark materia" />
            </div>
          </div>

          <div className='planet-control'>

            <div className="img-container img-25 br-5 header-button">
              <img src={icons.arrow} alt="left-arrow" />
            </div>

            {planet}

            <div className="img-container img-25 br-5 header-button rotate-180">
              <img src={icons.arrow} alt="right-arrow" />
            </div>

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
