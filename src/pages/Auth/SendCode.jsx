// src/pages/Home.jsx
import { useState } from "react";
import "./auth.css";
import icons from "../../images/images";
import { Link } from 'react-router-dom';

const SendCode = () => {
    const [username, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: true});

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
                <h2 className="auth-title no-select">Востановление допуста</h2>
                <input
                    type="text"
                    placeholder="E-mail пользователя"
                    className={`auth-input ${errors.email ? 'error' : ''}`}
                    value={username}
                    onChange={handleInputChange(setEmail, 'email')}
                />
                <Link to="/recovery" className="auth-button" >
                    Отправить код подтверждения
                </Link>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">Вспомнили пароль?</span>
                        <Link to="/signin" className="auth-footer__link">Войти</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SendCode;
