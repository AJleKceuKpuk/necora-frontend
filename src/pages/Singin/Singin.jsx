// src/pages/Home.jsx
import "./singin.css"
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const Singin = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <img src={icons.logo1} alt="singin logo" className="login-logo" />
                <h2 className="login-title">Вход в игру</h2>
                <input type="text" placeholder="Имя пользователя" className="login-input" />
                <input type="password" placeholder="Пароль" className="login-input" />
                <button className="login-button">ВОЙТИ</button>
            </div>
        </div>
    );
};

export default Singin;
