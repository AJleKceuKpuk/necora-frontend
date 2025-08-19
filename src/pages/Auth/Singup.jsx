import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

const Singup = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { registration } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [buttonError, setButtonError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        backend: false
    });

    const validate = () => {
        const textErrors = { username: '', email: '', password: '' };

        if (username.trim().length < 3) {
            textErrors.username = t('signup.error.username_too_short');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            textErrors.email = 'Неверный формат email';
        }
        if (password.length < 6) {
            textErrors.password = 'Слабый пароль!';
        } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
            textErrors.password = 'Слабый пароль!';
        }
        setErrors({
            username: !!textErrors.username,
            email: !!textErrors.email,
            password: !!textErrors.password
        });
        return textErrors.username || textErrors.email || textErrors.password || '';
    };

    useEffect(() => {
        document.querySelector(".auth-input")?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonError("");

        const validationError = validate();
        if (validationError) {
            setButtonError(validationError);
            return;
        }

        setIsLoading(true);

        try {
            const user = await registration({ username, email, password });
            sessionStorage.setItem("username", username);
            navigate("/activate-account", { replace: true, state: { user } });
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_USERNAME_EXISTS") {
                setErrors({ username: true, email: false, password: false, backend: true });
                setButtonError("Имя пользователя занято");
            } else if (error === "ERROR_EMAIL_EXISTS") {
                setErrors({ username: false, email: true, password: false, backend: true });
                setButtonError("Email пользователя занят");
            } else {
                setButtonError("Ошибка регистрации");
                setTimeout(() => {
                    setButtonError("");
                }, 3000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <img src={icons.logo} alt="singin logo" className="auth-logo" />
                <h2 className="auth-title no-select">Регистрация</h2>

                <div className="auth-wrapper">
                    <input
                        type="text"
                        placeholder={t('signin.username-input')}
                        className={`auth-input ${errors.username ? "error" : ""}`}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({ username: false, email: false, password: false, backend: false });
                            setButtonError("");
                        }}
                    />
                    {errors.username && (
                        <div
                            data-tooltip={
                                errors.backend
                                    ? "ERROR_BACKEND"
                                    : "Имя пользователя должно содержать не менее 3 символов"
                            }
                            className="auth-input__error img-container img-36"
                        >
                            <img src={icons.error} alt="error" />
                        </div>
                    )}
                </div>

                <div className="auth-wrapper">
                    <input
                        type="text"
                        placeholder="E-mail пользователя"
                        className={`auth-input ${errors.email ? 'error' : ''}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ username: false, email: false, password: false, backend: false });
                            setButtonError("");
                        }}
                    />
                    {errors.email ? <div data-tooltip="Email" className="auth-input__error img-container img-36">
                        <img src={icons.error} alt="error" />
                    </div> : ""}
                </div>

                <div className="auth-wrapper">
                    <input
                        type="password"
                        placeholder="Пароль"
                        className={`auth-input ${errors.password ? "error" : ""}`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ username: false, email: false, password: false, backend: false });
                            setButtonError("");
                        }}
                    />
                    {errors.password ? <div data-tooltip="password" className="auth-input__error img-container img-36">
                        <img src={icons.error} alt="error" />
                    </div> : ""}
                </div>

                <button
                    type='submit'
                    className={`auth-button ${buttonError ? "error" : ""} ${isLoading ? "loading" : ""}`}
                    disabled={!!buttonError || isLoading}
                >
                    {buttonError || "Зарегистрироваться"}
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
