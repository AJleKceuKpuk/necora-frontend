import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./components/AuthInput";
import "./styles/auth.css";

const PasswordReset = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { registration } = useAuth();


    const [password, setPassword] = useState('');
    const [passwordAply, setPasswordAply] = useState('');

    const [buttonError, setButtonError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const defaultErrors = {
        email: false,
        password: false,
        backend: false,
    };

    const [errors, setErrors] = useState(defaultErrors);

    const validate = () => {
        const clientErrors = { password: false, passwordAply: false };
        
        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            clientErrors.password = true;
        }
        if (passwordAply !== password) {
            clientErrors.password = true;
        }
        setErrors({

            password: clientErrors.email,
            passwordAply: clientErrors.passwordAply,
        });
        return clientErrors.password || clientErrors.passwordAply;
    };

    useEffect(() => {
        document.querySelector(".auth-input")?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonError("");
        const validationError = validate();
        if (validationError) {
            setButtonError(t('?.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        try {
            
        } catch (err) {
        
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <img src={icons.logo} alt={t('?.logo-alt')} className="auth-logo" />
                <h2 className="auth-title no-select">Сброс пароля</h2>

                
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
                    errorKey="?.error.password_invalid_format"
                    showError={errors.password}
                    autoComplete="current-password"
                />
                
                <AuthInput
                    type="password"
                    value={passwordAply}
                    onChange={(e) => {
                        setPasswordAply(e.target.value);
                        setErrors(defaultErrors);
                        setButtonError("");
                    }}
                    placeholderKey="password-input-aply"
                    hasError={errors.passwordAply}
                    errorKey="signup.error.password_invalid_format"
                    showError={errors.passwordAply}
                    autoComplete="current-password"
                />

                <button
                    type='submit'
                    className={`auth-button ${buttonError ? "error" : ""} ${isLoading ? "loading" : ""}`}
                    disabled={!!buttonError || isLoading}
                >
                    {buttonError || t('.submit')}
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <Link to="/" className="auth-footer__link">Пропустить</Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default PasswordReset;
