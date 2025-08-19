// src/pages/Home.jsx
import { useState } from "react";
import "./auth.css";
import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';
import Recovery from "./Recovery";

const RecoveryCode = () => {
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({ username: false });

    const validate = () => {
        const newErrors = {
            username: username.trim() === ""
        };
        setErrors(newErrors);
        return !newErrors.username;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("log!");
        if (!validate()) {
            return;
        }
        try {

        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_AUTH") {
                console.warn("⛔️ Доступ запрещён: неверные данные");
                setErrors({ username: true, password: true });
            } else {
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <img src={icons.logo} alt="singin logo" className="auth-logo" />
                <h2 className="auth-title no-select">Востановление допуста</h2>
                <input
                    type="text"
                    placeholder="Введите имя пользователя для отправки кода"
                    className={`auth-input ${errors.username ? "error" : ""}`}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username && e.target.value.trim() !== "") {
                            setErrors((prev) => ({ ...prev, username: false }));
                        }
                    }}
                />

                <button
                    type="submit"
                    className="auth-button"
                >
                    Отправить код подтверждения
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">Вспомнили пароль?</span>
                        <Link to="/signin" className="auth-footer__link">Войти</Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default RecoveryCode;
