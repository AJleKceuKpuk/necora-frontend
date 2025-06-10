// src/components/Header.jsx
import { useState } from "react";
import "./header.css";
import useDateTime from "../../services/useDateTime";
import icons from "../../images/images";

const UserMenu = ({ isOpen, toggleMenu }) => (
  <div className={`header-right ${isOpen ? "hide-left" : ""}`}>
    <div className="left-column">

      <div className="header-user-buttons">
        <div className="img-container img-36 header-button">
          <img src={icons.notification} alt="notifications" />
        </div>
        <div className="img-container img-36 header-button">
          <img src={icons.message} alt="messages" />
        </div>
        <div className="img-container img-36 header-button">
          <img src={icons.friends} alt="friends" />
        </div>
      </div>
    </div>
    <div className="right-column">
      <div className="profile-account dropdown">
        <div className="pd-6 header-button no-select" onClick={toggleMenu}>
          Kpuk
        </div>
        <div className={`dropdown-content ${isOpen ? "" : "hide"}`}>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.profile} alt="profile" />
            </div>
            <div>Профиль</div>
          </div>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.friends} alt="friends" />
            </div>
            <div>Друзья</div>
          </div>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.message} alt="messages" />
            </div>
            <div>Сообщения</div>
          </div>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.notification} alt="notifications" />
            </div>
            <div>Уведомления</div>
          </div>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.message} alt="settings" />
            </div>
            <div>Настройки</div>
          </div>

          <div className="dropdown-item header-button">
            <div className="img-container img-36 header-button">
              <img src={icons.exit} alt="settings" />
            </div>
            <div>Выход</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GuestMenu = () => (
  <div className="header-right start">
    <div className="header-button pd-5 br-5">Вход</div>
    <div className="header-button pd-5 br-5">Регистрация</div>
  </div>
);




const Header = ({ game, isAuthenticated }) => {

  const dateTime = useDateTime();
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menu = isAuthenticated ? (
    <UserMenu isOpen={isOpen} toggleMenu={toggleMenu} />
  ) : (
    <GuestMenu/>
  );


  if (game && isAuthenticated) {
    return (
      <header className="header header-game-page">
        <div className="header-left">
          <div className="img-container img-36 br-5 header-button">
            <img src={icons.home} alt="home" />
          </div>
          <div className="fs-20">
            {dateTime.toLocaleDateString()} <br />
            {dateTime.toLocaleTimeString()}
          </div>
          <div className="img-container img-36 br-5 header-button">
            <img src={icons.chat} alt="chat" />
          </div>
        </div>
        <div className="header-center">
          <div className="tm-container">
            <div className="tm-counter">10.000.00</div>
            <div className="img-container img-36 br-5">
              <img src={icons.TM} alt="dark materia" />
            </div>
          </div>
          <div>Planet</div>
          <div className="am-container">
            <div className="img-container img-36 br-5">
              <img src={icons.AM} alt="anti materia" />
            </div>
            <div className="am-counter">10.000.00</div>
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
