// src/pages/RecoveryPage.jsx
import icons from '../../assets/images/images'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { recoveryCodeRequest } from '../../api/authApi'
import { useLanguage } from '../../hooks/useLanguage'
import { useTranslation } from 'react-i18next'

export default function Recovery() {
    const { t } = useTranslation(['auth', 'error']);
    const navigate = useNavigate()

    const { language } = useLanguage();

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
            console.log("username");

            if (!username || username.trim().length < 3) {
                console.log("error username");

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


    const [step, setStep] = useState(1)

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
        try {
            setStep(3)
        } catch (err) {
            console.error('Неверный код', err)
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


            {/* {step === 1 && (
                <form onSubmit={handleRequest}>
                    <label>
                        Логин или email
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Отправить код</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleConfirm}>
                    <p>Код был выслан на {username}. Введите его ниже:</p>
                    <label>
                        Код подтверждения
                        <input
                            type="text"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Подтвердить код</button>
                </form>
            )}

            {step === 3 && (
                <div>
                    <form onSubmit={handleReset}>
                        <p>Смените пароль (рекомендуется):</p>
                        <label>
                            Новый пароль
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Сменить пароль</button>
                    </form>

                    <button
                        className="skip-button"
                        type="button"
                        onClick={handleSkipReset}
                    >
                        Пропустить смену пароля
                    </button>
                </div>
            )}

            {step === 4 && (
                <div className="success-step">
                    <h2>Готово!</h2>
                    <p>Всё прошло успешно. Нажмите «Войти», чтобы продолжить.</p>
                    <button onClick={handleSignIn}>Войти</button>
                </div>
            )} */}
        </div>
    )
}

