// src/pages/Home.jsx
import { useState } from "react";
import "./auth.css";
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const Singin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: true, password: false });

    const handleInputChange = (fieldSetter, fieldName) => (e) => {
        const value = e.target.value;
        fieldSetter(value);

        if (errors[fieldName] && value.trim() !== '') {
            setErrors(prev => ({ ...prev, [fieldName]: false }));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <img src={icons.logo} alt="singin logo" className="auth-logo" />
                <h2 className="auth-title no-select">Вход в игру</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className={`auth-input ${errors.username ? 'error' : ''}`}
                    value={username}
                    onChange={handleInputChange(setUsername, 'username')}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    className={`auth-input ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={handleInputChange(setPassword, 'password')}
                />
                <button className="auth-button" >
                    ВОЙТИ
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <Link to="/sendcode" className="auth-footer__link">Забыли пароль?</Link>
                    </div>
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">Нет аккаунта?</span>
                        <Link to="/signup" className="auth-footer__link">Регистрация</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Singin;
