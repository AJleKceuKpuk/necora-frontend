// src/pages/Home.jsx
import { useState } from "react";
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const Singup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: false, email: true, password: false });

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
                <h2 className="auth-title no-select">Регистрация</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className={`auth-input ${errors.username ? 'error' : ''}`}
                    value={username}
                    onChange={handleInputChange(setUsername, 'username')}
                />
                <input
                    type="text"
                    placeholder="E-mail пользователя"
                    className={`auth-input ${errors.email ? 'error' : ''}`}
                    value={username}
                    onChange={handleInputChange(setEmail, 'email')}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className={`auth-input ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={handleInputChange(setPassword, 'password')}
                />
                <button className="auth-button" >
                    Зарегестрироваться
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">Есть аккаунт?</span>
                        <Link to="/signin" className="auth-footer__link">Войти</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Singup;
