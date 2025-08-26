import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./components/AuthInput";
import "./styles/auth.css";

const Signup = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { registration } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [buttonError, setButtonError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const defaultErrors = {
        username: false,
        email: false,
        password: false,
        backend: false,
    };

    const [errors, setErrors] = useState(defaultErrors);

    const validate = () => {
        const clientErrors = { username: false, email: false, password: false };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (username.trim().length < 3) {
            clientErrors.username = true;
        }
        if (!emailRegex.test(email)) {
            clientErrors.email = true;
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
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
            await registration({ username, email, password });
            
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
                <AuthInput
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors(defaultErrors);
                        setButtonError("");
                    }}
                    placeholderKey="username-input"
                    hasError={errors.username}
                    errorKey="signup.error.username_too_short"
                    backendErrorKey={errors.backend ? "ERROR_USERNAME_EXISTS" : ""}
                    showError={errors.username}
                />

                <AuthInput
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(defaultErrors);
                        setButtonError("");
                    }}
                    placeholderKey="email-input"
                    hasError={errors.email}
                    errorKey="signup.error.email_invalid_format"
                    backendErrorKey={errors.backend ? "ERROR_EMAIL_EXISTS" : ""}
                    showError={errors.email}
                    autoComplete="current-email"
                />

                <AuthInput
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(defaultErrors);
                        setButtonError("");
                    }}
                    placeholderKey="password-input"
                    hasError={errors.password}
                    errorKey="signup.error.password_invalid_format"
                    showError={errors.password}
                    autoComplete="current-password"
                />

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
