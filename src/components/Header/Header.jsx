// src/components/Header.jsx
import './header.css';
import notifications from '../../images/notification.png'
import messages from '../../images/message.png'
import friends from '../../images/friends.png'


const UserMenu = () => (
  <div className="header-right">
    <div className="header-user-buttons">
      <div className="img-container img-36 header-button"><img src={notifications} alt="notifications" /></div>
      <div className="img-container img-36 header-button"><img src={messages} alt="messages" /></div>
      <div className="img-container img-36 header-button"><img src={friends} alt="friends" /></div>
    </div>
    <div className="header-button profile-account pd-5">Username</div>
  </div>
);

const GuestMenu = () => (
  <div className="header-right">
    <div className="header-button pd-5 br-5">Вход</div>
    <div className="header-button pd-5 br-5">Регистрация</div>
  </div>
  
);

const Header = ({ variant = "game", isAuthenticated = true}) => {

  const menu = isAuthenticated ? <UserMenu /> : <GuestMenu />;

  if (variant === 'game') {
    return (
      <header className="header header-game-page">
        <div>left</div>
        <div className="header-center">
          center
        </div>
        {menu}
        
      </header>
    );
  }

  return (
    <header className="header header-start-page">
      <div className="header-left">
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
