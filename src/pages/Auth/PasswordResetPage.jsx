import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link, replace, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./components/AuthInput";
import { useProfile } from "../../provider/ProfileProvider";
import { useTransition } from "../../components/Overlay/OverlayContext";

const PasswordReset = () => {
    const { t } = useTranslation(['auth', 'error']);
    const { resetPassword } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();
    const { showOverlay } = useTransition();

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
            setButtonError(t('reset-password.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        try {
            await resetPassword({ password, passwordApply })
            sessionStorage.removeItem("recoveryCode");
            showOverlay(`Пароль успешно изменен!`, "");
            setTimeout(() => {
                navigate("/", replace)
                setIsLoading(false);
            }, 3000);
        } catch (err) {
            setButtonError(t('reset-password.error.server-off'));
            setIsLoading(false);
            setTimeout(() => {
                setButtonError("");
            }, 3000);
        }
    };

    return (

        <form className="auth__form" onSubmit={handleSubmit}>
            <img src={icons.logo} alt={t('reset-password.logo-alt')} className="auth__form-logo" />
            <h2 className="auth__form-title no-select">{t('reset-password.title')}</h2>
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
                errorKey="reset-password.error.password_invalid_format"
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
                placeholderKey="password-input-apply"
                hasError={errors.passwordApply}
                errorKey="reset-password.error.password_mismatch"
                showError={errors.passwordApply}
                autoComplete="current-password"
            />

            <button
                type='submit'
                className={`auth__button ${buttonError ? "auth__button--error" : ""} ${isLoading ? "auth__button--loading" : ""}`} disabled={!!buttonError || isLoading} >
                {buttonError || t('reset-password.submit')}
            </button>
            <div className="auth__footer">
                <div className="auth__footer-option">
                    <Link to="/" className="auth__footer-link">{t('reset-password.submit-pass')}</Link>
                </div>
            </div>

        </form>
    );
};

export default PasswordReset;
