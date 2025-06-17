import { Link } from 'react-router-dom';
import "./header.css";

const GuestMenu = () => (
  <div className="header-right start">
    <Link to="/singin" className="header-button pd-5 br-5">Вход</Link>
    <Link to="/singup" className="header-button pd-5 br-5">Регистрация</Link>
  </div>
);

export default GuestMenu;