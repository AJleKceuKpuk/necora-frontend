import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
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
        const clientErrors = { username: false, email: false, password: false };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (username.trim().length < 3) {
            clientErrors.username = true;
        }
        if (!emailRegex.test(email)) {
            clientErrors.email = true;
        }
        if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            clientErrors.password = true;
        }

        setErrors({
            username: clientErrors.username,
            email: clientErrors.email,
            password: clientErrors.password,
        });
        return clientErrors.username || clientErrors.email || clientErrors.password;
    };

    useEffect(() => {
        document.querySelector(".auth-input")?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonError("");

        const validationError = validate();
        if (validationError) {
            setButtonError(t('signup.error.incorrect_data'));
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
                setButtonError(t(`error:${error}`));
            } else {
                setButtonError(t('signup.error.server-off'));
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
                <img src={icons.logo} alt={t('signup.logo-alt')} className="auth-logo" />
                <h2 className="auth-title no-select">{t('signup.title')}</h2>
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
                                    ? t("error:ERROR_USERNAME_EXISTS")
                                    : t("signup.error.username_too_short")
                            }
                            className="auth-input__error img-container img-36"
                        >
                            <img src={icons.error} alt={t('signup.error.error-alt')} />
                        </div>
                    )}
                </div>

                <div className="auth-wrapper">
                    <input
                        type="text"
                        placeholder={t('signup.email-input')}
                        className={`auth-input ${errors.email ? 'error' : ''}`}
                        value={email}
                        autoComplete="username"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ username: false, email: false, password: false, backend: false });
                            setButtonError("");
                        }}
                    />
                    {errors.email && (
                        <div
                            data-tooltip={
                                errors.backend
                                    ? t("error:ERROR_EMAIL_EXISTS")
                                    : t("signup.error.email_invalid_format")
                            }
                            className="auth-input__error img-container img-36"
                        >
                            <img src={icons.error} alt={t('signup.error.error-alt')} />
                        </div>
                    )}
                </div>

                <div className="auth-wrapper">
                    <input
                        type="password"
                        placeholder={t('signup.password-input')}
                        className={`auth-input ${errors.password ? "error" : ""}`}
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ username: false, email: false, password: false, backend: false });
                            setButtonError("");
                        }}
                    />
                    {errors.password && (
                        <div
                            data-tooltip={t('signup.error.password_invalid_format')}
                            className="auth-input__error img-container img-36"
                        >
                            <img src={icons.error} alt={t('signup.error.error-alt')} />
                        </div>
                    )}
                </div>

                <button
                    type='submit'
                    className={`auth-button ${buttonError ? "error" : ""} ${isLoading ? "loading" : ""}`}
                    disabled={!!buttonError || isLoading}
                >
                    {buttonError || t('signup.submit')}
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <span className="auth-footer__label">{t('signup.have-account-label')}</span>
                        <Link to="/signin" className="auth-footer__link">{t('signup.have-account-link')}</Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Signup;
