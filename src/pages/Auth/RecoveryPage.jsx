// src/pages/RecoveryPage.jsx
import icons from '../../assets/images/images'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { recoveryCodeRequest, recoveryRequest } from '../../api/authApi'
import { useLanguage } from '../../hooks/useLanguage'
import { useTranslation } from 'react-i18next'
import { useToken } from '../../hooks/useToken'
import { useAuth } from '../../hooks/useAuth'

export default function Recovery() {
    const { t } = useTranslation(['auth', 'error']);
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const { language } = useLanguage();
    const { setAccessToken } = useToken();
    const { validateSession, isAuthenticated } = useAuth();

    const [username, setUsername] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordApply, setNewPasswordApply] = useState('')

    const [errors, setErrors] = useState({
        username: false,
        code: false,
        newPassword: false,
        newPasswordApply: false,
        backend: false
    });
    const [buttonError, setButtonError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validate = (key) => {
        const clientErrors = {
            username: false,
            code: false,
            newPassword: false,
            newPasswordApply: false,
        };
        if (key.includes("username")) {

            if (!username || username.trim().length < 3) {
                clientErrors.username = true;
            }
        }
        if (key.includes("code")) {
            if (!code || code.trim() === "") {
                clientErrors.code = true;
            }
        }
        if (key.includes("password")) {
            if (!newPassword || newPassword.length < 6 || !/[A-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
                clientErrors.newPassword = true;
            }
            if (newPasswordApply !== newPassword) {
                clientErrors.newPasswordApply = true;
            }
        }

        setErrors({
            username: clientErrors.username,
            code: clientErrors.code,
            newPassword: clientErrors.newPassword,
            newPasswordApply: clientErrors.newPasswordApply,
            backend: false
        });
        return clientErrors.username || clientErrors.code || clientErrors.newPassword || clientErrors.newPasswordApply;
    };

    async function handelBack() {
        setStep(1)
        setErrors({
            username: false,
            code: false,
            newPassword: false,
            newPasswordApply: false,
            backend: true
        });
        setButtonError("")
        setCode("")
    }


    // 1. Отправляем код на email
    async function handleRequest(e) {
        e.preventDefault()
        setButtonError("");
        const validationError = validate("username");
        if (validationError) {
            setButtonError(t('signup.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        try {
            await recoveryCodeRequest({ username, language });
            setStep(2)
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_USER_NOT_FOUND") {
                setErrors({
                    username: true,
                    code: false,
                    newPassword: false,
                    newPasswordApply: false,
                    backend: true
                });
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
    }

    // 2. Подтверждаем код и сразу получаем токены
    async function handleConfirm(e) {
        e.preventDefault()
        setButtonError("");
        const validationError = validate("code");
        if (validationError) {
            setButtonError(t('signup.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        try {
            const token = await recoveryRequest({ username, code, language });
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
            await validateSession(token);
            setStep(3);
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === "ERROR_INVALID_CODE") {
                setErrors({
                    username: false,
                    code: true,
                    newPassword: false,
                    newPasswordApply: false,
                    backend: true
                });
                setButtonError(t(`error:${error}`));
            } else {
                setButtonError(t('signup.error.server-off'));
                setTimeout(() => {
                    setButtonError("");
                }, 3000);
            }
        } finally {
            setIsLoading(false);
            setCode("");
        }
    }

    // 3a. Меняем пароль
    async function handleReset(e) {
        e.preventDefault()
        try {

            setStep(4)
        } catch (err) {
            console.error('Сброс пароля не удался', err)

        }
    }

    // 3b. Пропустить смену пароля
    function handleSkipReset() {
        setStep(4)
    }

    // 4. Подтверждаем вход и сохраняем токены в AuthContext
    function handleSignIn() {
        navigate('/', { replace: true })
    }

    return (
        <div className="auth-container">

            {step === 1 &&
                (<form className="auth-form" onSubmit={handleRequest}>
                    <img src={icons.logo} alt={t('recovery.logo-alt')} className="auth-logo" />
                    <h2 className="auth-title no-select"> {t('recovery.title')} </h2>
                    <div className="auth-wrapper">
                        <input
                            type="text"
                            placeholder={t('recovery.username-input')}
                            className={`auth-input ${errors.username ? "error" : ""}`}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors({ username: false, code: false, newPassword: false, newPasswordApply: false, backend: false });
                                setButtonError("");
                            }}
                        />
                        {errors.username && (
                            <div
                                data-tooltip={
                                    errors.backend
                                        ? t("error:ERROR_USER_NOT_FOUND")
                                        : t("recovery.error.username_too_short")
                                }
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
                        {buttonError || t('recovery.submit-request')}
                    </button>
                    <div className="auth-footer">
                        <div className="auth-footer__option">
                            <span className="auth-footer__label">{t('recovery.remember-password-label')}</span>
                            <Link to="/signin" className="auth-footer__link">{t('recovery.signin-link')}</Link>
                        </div>
                    </div>

                </form>
                )}

            {step === 2 &&
                (<form className="auth-form" onSubmit={handleConfirm}>
                    <img src={icons.logo} alt={t('recovery.logo-alt')} className="auth-logo" />
                    <h2 className="auth-title no-select"> {t('recovery.title')} </h2>
                    <span className='auth-description no-select'>На ваш <b className='auth-description__span'>E-mail</b> отправлен код для востановления доступа к аккаунту</span>
                    <div className="auth-wrapper">
                        <input
                            type="text"
                            placeholder={t('recovery.code-input')}
                            className={`auth-input ${errors.code ? "error" : ""}`}
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setErrors({ username: false, code: false, newPassword: false, newPasswordApply: false, backend: false });
                                setButtonError("");
                            }}
                        />
                        {errors.code && (
                            <div
                                data-tooltip={
                                    errors.backend
                                        ? t("error:ERROR_INVALID_CODE")
                                        : t("recovery.error.code_invalid")
                                }
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
                        {buttonError || t('recovery.submit-confirm')}
                    </button>
                    <div className="auth-footer">
                        <div className="auth-footer__option">
                            <Link onClick={handelBack} className="auth-footer__link">Не получили код?</Link>
                        </div>
                        <div className="auth-footer__option">
                            <span className="auth-footer__label">{t('recovery.remember-password-label')}</span>
                            <Link to="/signin" className="auth-footer__link">{t('recovery.signin-link')}</Link>
                        </div>
                    </div>

                </form>
                )}

            {step === 3 &&
                (<form className="auth-form" onSubmit={handleReset}>
                    <img src={icons.logo} alt={t('recovery.logo-alt')} className="auth-logo" />
                    <h2 className="auth-title no-select"> {t('recovery.title')} </h2>
                    <span className='auth-description no-select'>Изменение пароля</span>
                    <div className="auth-wrapper">
                        <input
                            type="text"
                            placeholder={t('recovery.password-input')}
                            className={`auth-input ${errors.newPassword ? "error" : ""}`}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setErrors({ username: false, code: false, newPassword: false, newPasswordApply: false, backend: false });
                                setButtonError("");
                            }}
                        />
                        {errors.newPassword && (
                            <div
                                data-tooltip={
                                    errors.backend
                                        ? t("error:?")
                                        : t("recovery.client?")
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
                            placeholder={t('recovery.password-apply-input')}
                            className={`auth-input ${errors.newPasswordApply ? "error" : ""}`}
                            value={newPasswordApply}
                            onChange={(e) => {
                                setNewPasswordApply(e.target.value);
                                setErrors({ username: false, code: false, newPassword: false, newPasswordApply: false, backend: false });
                                setButtonError("");
                            }}
                        />
                        {errors.newPasswordApply && (
                            <div
                                data-tooltip={
                                    errors.backend
                                        ? t("error:?")
                                        : t("recovery.client?")
                                }
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
                        {buttonError || t('recovery.submit-confirm')}
                    </button>
                    <div className="auth-footer">
                        <div className="auth-footer__option">
                            <Link className="auth-footer__link">Пропустить</Link>
                        </div>
                        <div className="auth-footer__option">
                            <span className="auth-footer__label">{t('recovery.remember-password-label')}</span>
                            <Link to="/signin" className="auth-footer__link">{t('recovery.signin-link')}</Link>
                        </div>
                    </div>
                </form>
                )}
        </div>
    )
}

