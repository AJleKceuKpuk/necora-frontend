import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link, replace, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./components/AuthInput";
import { useTransition } from "../../components/Overlay/OverlayContext";

const Signup = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { registration } = useAuth();
    const navigate = useNavigate();
    const { showOverlay } = useTransition();

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
            await showOverlay(`${username}, добро пожаловать!`, "Вы успешно зарегестрировались.");
            setTimeout(() => {
                navigate("/activate", replace)
                setIsLoading(false);
            }, 3000);
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_USERNAME_EXISTS") {
                setErrors({ username: true, email: false, password: false, backend: true });
                setButtonError(t(`error:${error}`));
            } else if (error == "ERROR_EMAIL_EXISTS") {
                setErrors({ username: false, email: true, password: false, backend: true });
                setButtonError(t(`error:${error}`));
            } else {
                setButtonError(t('signup.error.server-off'));
                setTimeout(() => {
                    setButtonError("");
                }, 3000);
            }
            setIsLoading(false);
        }
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            <img src={icons.logo} alt={t('signup.logo-alt')} className="auth__form-logo" />
            <h2 className="auth__form-title no-select">{t('signup.title')}</h2>
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
                className={`auth__button ${buttonError ? "auth__button--error" : ""} ${isLoading ? "auth__button--loading" : ""}`}
                disabled={!!buttonError || isLoading}
            >
                {buttonError || t('signup.submit')}
            </button>
            <div className="auth__footer">
                <div className="auth__footer-option">
                    <span className="auth__footer-label">{t('signup.have-account-label')}</span>
                    <Link to="/signin" className="auth__footer-link">{t('signup.have-account-link')}</Link>
                </div>
            </div>
        </form>
    );
};

export default Signup;
