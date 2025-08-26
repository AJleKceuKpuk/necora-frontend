import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./components/AuthInput";
import "./styles/auth.css";

const PasswordReset = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passwordApply, setPasswordApply] = useState('');

    const [buttonError, setButtonError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const defaultErrors = {
        password: false,
        passwordApply: false
    };

    const [errors, setErrors] = useState(defaultErrors);

    const validate = () => {
        const clientErrors = { password: false, passwordApply: false };

        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            clientErrors.password = true;
        }
        if (passwordApply !== password || passwordApply === "") {
            clientErrors.passwordApply = true;
        }
        setErrors({
            password: clientErrors.password,
            passwordApply: clientErrors.passwordApply
        });
        return clientErrors.password || clientErrors.passwordApply;
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
            await resetPassword({ password, passwordApply })
            sessionStorage.removeItem("recoveryCode");
            navigate("/");
        } catch (err) {
            setButtonError(t('?.error.server-off'));
            setTimeout(() => {
                setButtonError("");
            }, 3000);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <img src={icons.logo} alt={t('?.logo-alt')} className="auth-logo" />
                <h2 className="auth-title no-select">{t('?.title')}</h2>
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

                <AuthInput
                    type="password"
                    value={passwordApply}
                    onChange={(e) => {
                        setPasswordApply(e.target.value);
                        setErrors(defaultErrors);
                        setButtonError("");
                    }}
                    placeholderKey="password-input"
                    hasError={errors.passwordApply}
                    errorKey=".error.password_invalid_format"
                    showError={errors.passwordApply}
                    autoComplete="current-password"
                />

                <button
                    type='submit'
                    className={`auth-button ${buttonError ? "error" : ""} ${isLoading ? "loading" : ""}`}
                    disabled={!!buttonError || isLoading}
                >
                    {buttonError || t('?.submit')}
                </button>
                <div className="auth-footer">
                    <div className="auth-footer__option">
                        <Link to="/" className="auth-footer__link">{t('?.have-account-link')}</Link>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default PasswordReset;
