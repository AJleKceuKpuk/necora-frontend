import { useState, useEffect } from "react";
import icons from "../../images/images";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Singup = () => {
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
        password: false
    });


    const textErrors = { username: '', email: '', password: '' };

    const hasErrors = textErrors.username ||
        textErrors.email ||
        textErrors.password ||
        '';;


    const validate = () => {
        const textErrors = { username: '', email: '', password: '' };

        if (username.trim().length < 3) {
            textErrors.username = 'Имя должно быть не менее 3 символов';
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

        // Вернуть первую ошибку
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
                setErrors({ username: true, email: false, password: false });
                setButtonError("Имя пользователя занято");
            } else if (error === "ERROR_EMAIL_EXISTS") {
                setErrors({ username: false, email: true, password: false });
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

                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className={`auth-input ${errors.username ? 'error' : ''}`}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors({ username: false, email: false, password: false });
                        setButtonError("");
                    }}
                />
                <input
                    type="text"
                    placeholder="E-mail пользователя"
                    className={`auth-input ${errors.email ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ username: false, email: false, password: false });
                        setButtonError("");
                    }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className={`auth-input ${errors.password ? "error" : ""}`}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ username: false, email: false, password: false });
                        setButtonError("");
                    }}
                />
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
