// src/components/Header.jsx
import React from 'react';
import './header.css';




const UserMenu = () => (
  <div className="user-menu">
    Привет, Алексей!
  </div>
);

const GuestMenu = () => (
  <div className="guest-menu">
    <button>Войти</button>
    <button>Регистрация</button>
  </div>
);

const Header = ({ variant = 'start', isAuthenticated = false }) => {

  const menu = isAuthenticated ? <UserMenu /> : <GuestMenu />;

  if (variant === 'game') {
    return (
      <header className="header header-game-page">
        <div className="header-left">
          Игровой Логотип
        </div>
        <div className="header-center">
          Информация об игре
        </div>
        <div className="header-right">
          {menu}
        </div>
      </header>
    );
  }

  return (
    <header className="header header-start-page">
      <div className="header-left">
        <ul className="header-list-buttons">
          <li><button className="header-button">Главная</button></li>
          <li><button className="header-button">Форум</button></li>
          <li><button className="header-button">Правила</button></li>
        </ul>
      </div>
  
      <div className="header-right">
        {menu}
      </div>
    </header>
  );
};

export default Header;
