import { useState, useRef, useEffect, useCallback } from "react";
import icons from "../../assets/images/images";
import { useTranslation } from 'react-i18next';
import MenuItem from "./MenuItem";
import HeaderButton from "./HeaderButton";
import { useProfile } from "../../provider/ProfileProvider";


const UserMenu = () => {
  const { t } = useTranslation('header');

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile();

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
    <div className={`header__right ${isOpen ? "header__right--hide-left" : ""}`}>
      <div className="header__right-left">
        <div className="header__right-options">
          <HeaderButton icon={icons.notification} alt="notifications" />
          <HeaderButton icon={icons.message} alt="messages" />
          <HeaderButton icon={icons.friends} alt="friends" />
        </div>
      </div>
      <div className="header__right-right">
        <div className="header__right-profile" ref={dropdownRef}>
          <div className="header__button-profile no-select" onClick={toggleMenu}>
            {profile?.username}
          </div>
          <div className={`header__right-dropdown ${isOpen ? "" : "header__right-dropdown--hide"}`}>
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
