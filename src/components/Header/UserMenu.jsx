import { useState, useRef, useEffect, useCallback } from "react";
import "./css/header.css";
import icons from "../../assets/images/images";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import MenuItem from "./MenuItem";
import HeaderButton from "./HeaderButton";


const UserMenu = () => {
  const { t } = useTranslation('header');

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useAuth();

  const menuItems = [
    { to: "/profile", icon: icons.profile, label: t('profile') },
    { to: "/friends", icon: icons.friends, label: t('friends') },
    { to: "/chats", icon: icons.message, label: t('messages') },
    { to: "/notifications", icon: icons.notification, label: t('notifications') },
    { to: "/settings", icon: icons.message, label: t('settings') },
    { to: "/logout", icon: icons.exit, label: t('logout') },
  ];

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  //Закрытие меню   
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  return (
    <div className={`header-right ${isOpen ? "hide-left" : ""}`}>
      <div className="left-column">
        <div className="header-user-buttons">
          <HeaderButton icon={icons.notification} alt="notifications" />
          <HeaderButton icon={icons.message} alt="messages" />
          <HeaderButton icon={icons.friends} alt="friends" />
        </div>
      </div>
      <div className="right-column">
        <div className="profile-account dropdown" ref={dropdownRef}>
          <div className="pd-6 profile-button no-select" onClick={toggleMenu}>
            {username}
          </div>
          <div className={`dropdown-content ${isOpen ? "" : "hide"}`}>
            {menuItems.map(({ to, icon, label }) => (
              <MenuItem
                key={to}
                to={to}
                icon={icon}
                label={label}
                onClick={toggleMenu}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
