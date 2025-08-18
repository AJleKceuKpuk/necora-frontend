import { useState } from "react";
import icons from "../../images/images";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Singup = () => {
    const registration = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false
    });

    const validate = () => {
        const newErrors = { username: '', email: '', password: '' };
        if (username.trim().length < 3) {
            newErrors.username = 'Имя должно быть не менее 3 символов';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Неверный формат email';
        }
        if (password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
            newErrors.password = 'Пароль должен содержать хотя бы одну цифру и заглавную букву';
        }
        setErrors(newErrors);
        return Object.values(newErrors).every((msg) => msg === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const user = await registration({ username, email, password });
            sessionStorage.setItem("username", username);
            navigate("/activate-account", { replace: true, state: { user } });
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_USERNAME_EXISTS") {
                console.warn("⛔️ Данное имя пользователя уже используется");
                setErrors({ username: true, email: false, password: false });
            } else if (error === "ERROR_EMAIL_EXISTS") {
                console.warn("⛔️ Данное имя пользователя уже используется");
                setErrors({ username: false, email: true, password: false });
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <img src={icons.logo} alt="singin logo" className="auth-logo" />
                <h2 className="auth-title no-select">Регистрация</h2>

                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className={`auth-input ${errors.username ? 'error' : ''}`}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username && e.target.value.trim() !== "") {
                            setErrors((prev) => ({ ...prev, username: false }));
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="E-mail пользователя"
                    className={`auth-input ${errors.email ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email && e.target.value.trim() !== "") {
                            setErrors((prev) => ({ ...prev, email: false }));
                        }
                    }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className={`auth-input ${errors.password ? "error" : ""}`}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password && e.target.value.trim() !== "") {
                            setErrors((prev) => ({ ...prev, password: false }));
                        }
                    }}
                />
                <button
                    type='submit'
                    className="auth-button"
                >
                    Зарегестрироваться
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">Есть аккаунт?</span>
                        <Link to="/signin" className="auth-footer__link">Войти</Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Singup;
