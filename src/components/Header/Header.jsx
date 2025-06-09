// src/components/Header.jsx
import './header.css';
import useDateTime from '../../services/useDateTime';
import * as icons from '../../images/images';


const UserMenu = () => (
  <div className="header-right">
    <div className="header-user-buttons">
      <div className="img-container img-36 header-button"><img src={icons.notifications} alt="notifications" /></div>
      <div className="img-container img-36 header-button"><img src={icons.messages} alt="messages" /></div>
      <div className="img-container img-36 header-button"><img src={icons.friends} alt="friends" /></div>
    </div>
    <div className="profile-account header-button pd-5">Kpuk</div>
  </div>
);

const GuestMenu = () => (
  <div className="header-right">
    <div className="header-button pd-5 br-5">Вход</div>
    <div className="header-button pd-5 br-5">Регистрация</div>
  </div>
  
);


const Header = ({ page = "", isAuthenticated = false}) => {

  const dateTime = useDateTime();

  const menu = isAuthenticated ? <UserMenu /> : <GuestMenu />;


  if (page === 'game' && isAuthenticated === true) {
    return (
      <header className="header header-game-page">
        <div className="header-left">
            <div className="img-container img-36 br-5 header-button"><img src={icons.home} alt="home" /></div>
            <div className='header-time'>
              {dateTime.toLocaleDateString()} <br /> 
              {dateTime.toLocaleTimeString()}
            </div>
            <div className="img-container img-36 br-5 header-button"><img src={icons.chat} alt="chat" /></div> 
        </div>
        <div className="header-center">
          center
        </div>

        {menu}
        
      </header>
    );
  }

  return (
    <header className="header header-start-page">
      <div className="header-start-left">
        <ul className="header-start-buttons">
          <li className="header-button pd-5 br-5">Главная</li>
          <li className="header-button pd-5 br-5">Форум</li>
          <li className="header-button pd-5 br-5">Правила</li>
          <li className="header-button pd-5 br-5">Техподдержка</li>
        </ul>
      </div>
      {menu}
    </header>
  );
};

export default Header;
