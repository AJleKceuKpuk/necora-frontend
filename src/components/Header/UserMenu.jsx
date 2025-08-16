import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./css/header.css";
import icons from "../../images/images";
import { useAuth } from "../../context/AuthContext";

const UserMenu = () => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {username, logout} = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    toggleMenu(); // закрываем меню
    await logout(); // вызываем логаут
    navigate('/'); // редирект
  };

  //Закрытие меню   
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Если клик вне области dropdown, закрываем меню
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
        <div className="profile-account dropdown" ref={dropdownRef}>
          <div className="pd-6 profile-button no-select" onClick={toggleMenu}>
            {username}
          </div>
          <div className={`dropdown-content ${isOpen ? "" : "hide"}`}>
            <Link
              to="/profile"
              className="dropdown-item header-button no-select"
              onClick={toggleMenu}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.profile} alt="profile" />
              </div>
              <div>Профиль</div>
            </Link>

            <Link
              to="/friends"
              className="dropdown-item header-button no-select"
              onClick={toggleMenu}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.friends} alt="friends" />
              </div>
              <div>Друзья</div>
            </Link>

            <Link
              to="/chats"
              className="dropdown-item header-button no-select"
              onClick={toggleMenu}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.message} alt="messages" />
              </div>
              <div>Сообщения</div>
            </Link>

            <Link
              to="/notifications"
              className="dropdown-item header-button no-select"
              onClick={toggleMenu}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.notification} alt="notifications" />
              </div>
              <div>Уведомления</div>
            </Link>

            <Link
              to="/settings"
              className="dropdown-item header-button no-select"
              onClick={toggleMenu}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.message} alt="settings" />
              </div>
              <div>Настройки</div>
            </Link>

            <Link
              to="/logout"
              className="dropdown-item header-button no-select"
              onClick={handleLogout}
            >
              <div className="img-container img-36 header-button">
                <img src={icons.exit} alt="settings" />
              </div>
              <div>Выход</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
