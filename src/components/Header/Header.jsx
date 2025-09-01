import { Link } from 'react-router-dom';
import useDateTime from '../../hooks/useDateTime';
import icons from "../../assets/images/images";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import PlanetMenu from './PlanetMenu';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import HeaderButton from './HeaderButton';
import { useCallback, useState } from 'react';

const Header = ({ game }) => {
  const { t } = useTranslation('header');

  const { isAuthenticated } = useAuth();
  const dateTime = useDateTime();
  const menu = isAuthenticated ? (<UserMenu />) : (<GuestMenu />);
  const planet = <PlanetMenu />;



  const [isLeftExpanded, setIsLeftExpanded] = useState(false);

  const toggleLeftSpoiler = useCallback(() => {
    setIsLeftExpanded(prev => !prev);
  }, []);


  if (game && isAuthenticated) {
    return (
      <header className={`header header--game ${isLeftExpanded ? 'header--game--expanded-left' : ''}`}>

        <div className={`header__left ${isLeftExpanded ? 'header__left--expanded' : ''}`}>
          <HeaderButton
            onClick={toggleLeftSpoiler}
            className={`header__left-spoiler ${isLeftExpanded ? 'header__left-spoiler--expanded' : ''}`}
            icon={icons.spoiler}
            alt="left spoiler"
          />
          <HeaderButton className={`header__left-button ${isLeftExpanded ? 'header__left-button--expanded' : ''}`} icon={icons.home} alt="home" />
          <div className="header__left-time">
            {dateTime.toLocaleDateString()} <br />
            {dateTime.toLocaleTimeString()}
          </div>
          <HeaderButton className={`header__left-button ${isLeftExpanded ? 'header__left-button--expanded' : ''}`} icon={icons.chat} alt="chat" />
        </div>

        <div className="header__center">

          <div className="header__center-tm">
            <div>99.999.999</div>
            <div className="img-container img-36 br-5">
              <img src={icons.TM} alt="dark materia" />
            </div>
          </div>

          <div className='header__center-planet-toggle'>
            <HeaderButton icon={icons.arrow} alt="left-arrow" size={25} />
            {planet}
            <HeaderButton icon={icons.arrow} alt="right-arrow" size={25} className="rotate-180" />
          </div>

          <div className="header__center-am">
            <div className="img-container img-36 br-5">
              <img src={icons.AM} alt="anti materia" />
            </div>
            <div>99.999.000</div>
          </div>

        </div>
        {menu}
      </header>
    );
  }

  return (
    <header className="header header--start">
      <div className="header__left--start">
        <ul className="header__left-nav">
          <Link to="/" className="header__button pd-5 br-5">{t('home')}</Link>
          <Link to="/forum" className="header__button pd-5 br-5">{t('forum')}</Link>
          <Link to="/rules" className="header__button pd-5 br-5">{t('rules')}</Link>
          <Link to="/support" className="header__button pd-5 br-5">{t('support')}</Link>
        </ul>
      </div>
      {menu}
    </header>
  );
};

export default Header;
