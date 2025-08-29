// src/pages/RecoveryPage.jsx

import { useEffect, useState } from 'react'
import { Link, replace, useNavigate } from 'react-router-dom'
import icons from '../../assets/images/images';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import AuthInputCode from './components/AuthInputCode';

import { useCountdown } from '../../hooks/useTimer';
import { useTransition } from '../../components/Overlay/OverlayContext';



export default function Recovery() {
    const { t } = useTranslation(['auth', 'error']);
    const { isRunning, start } = useCountdown(60);
    const navigate = useNavigate();
    const { showOverlay } = useTransition();

    const [step, setStep] = useState(1);

    const { recovery, sendCodeRecovery } = useAuth();

    const [email, setEmail] = useState('');
    const [codeArray, setCodeArray] = useState(Array(6).fill(''));
    const code = codeArray.join("");

    const [buttonError, setButtonError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const defaultErrors = { email: false, code: false, backend: false };
    const [errors, setErrors] = useState(defaultErrors);

    const validate = (key) => {
        const clientErrors = { email: false, code: false };
        if (key.includes('email')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) clientErrors.email = true;
        }
        if (key.includes('code')) {
            if (codeArray.some((c) => c.trim() === '')) clientErrors.code = true;
        }
        setErrors({ email: clientErrors.email, code: clientErrors.code, backend: false });
        return clientErrors.email || clientErrors.code;
    };



    const handleRequest = async (e) => {
        e.preventDefault();
        setButtonError('');
        if (validate('email')) {
            setButtonError(t('recovery.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        try {
            const delay = new Promise(resolve => setTimeout(resolve, 1500));
            sendCodeRecovery({ email }).catch(() => { });
            await delay;
            setStep(2);
        } catch (err) {
            if (err.response?.data?.error === "ERROR_RATE_LIMIT_EXCEEDED") {
                console.log(err.response.data.error);
                setButtonError(t('ERROR_RATE_LIMIT_EXCEEDED'))
            } else {
                setButtonError(t('recovery.error.server-off'));
                setTimeout(() => setButtonError(''), 3000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async (e) => {
        e?.preventDefault(); // вызов только если e есть
        submitCode(code);
    };

    const submitCode = async () => {
        setButtonError("");
        const validationError = validate('code'); // всегда проверяем код
        if (validationError) {
            setButtonError(t("activate.error.incorrect_data"));
            return;
        }
        setIsLoading(true);
        const code = codeArray.join('');
        try {
            await recovery({ email, code });
            showOverlay(`Код принят!`, "Вы успешно вошли в систему.");
            setTimeout(() => {
                navigate("/reset-password", replace)
            }, 3000);
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === 'ERROR_INVALID_CODE') {
                console.log("Invalid code");
                setErrors({ email: false, code: true, backend: true });
                setButtonError(t(`error:${error}`));
            } else if (error === 'ERROR_RATE_LIMIT_EXCEEDED') {
                start();
                setButtonError(t(`error:${error}`));
                return;
            }
            else {
                setButtonError(t('recovery.error.server-off'));
                setTimeout(() => setButtonError(''), 3000);
            }
        } finally {
            setIsLoading(false);
        }
    };



    const handleBack = () => {
        setStep(1);
        setErrors(defaultErrors);
        setButtonError('');
        setCodeArray(Array(6).fill(''));
    };

    useEffect(() => {
        if (codeArray.every((c) => c.trim() !== "")) {
            submitCode();
        }
    }, [codeArray]);

    return (
        <div>
            {step === 1 && (
                <form className="auth__form" onSubmit={handleRequest}>
                    <img
                        src={icons.logo}
                        alt={t('recovery.logo-alt')}
                        className="auth__form-logo"
                    />
                    <h2 className="auth__form-title no-select">{t('recovery.title')}</h2>
                    <div className="auth__form-wrapper">
                        <input
                            type="text"
                            placeholder={t('email-input')}
                            className={`auth__form-input ${errors.email ? 'auth__form-input--error' : ''}`}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(defaultErrors);
                                setButtonError('');
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`auth__button ${buttonError ? "auth__button--error" : ""} ${isLoading ? "auth__button--loading" : ""}`}
                        disabled={!!buttonError || isLoading}
                    >
                        {buttonError || t('recovery.submit-request')}
                    </button>
                    <div className="auth__footer">
                        <div className="auth__footer-option">
                            <span className="auth__footer-label">
                                {t('recovery.remember-password-label')}
                            </span>
                            <Link to="/signin" className="auth__footer-link">
                                {t('recovery.signin-link')}
                            </Link>
                        </div>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form className="auth__form" onSubmit={handleConfirm}>
                    <img
                        src={icons.logo}
                        alt={t('recovery.logo-alt')}
                        className="auth__form-logo"
                    />
                    <h2 className="auth__form-title no-select">{t('recovery.title')}</h2>
                    <span className="auth__form-description no-select">
                        {t('recovery.email-sent-start')}
                        <b className="auth__form-span">{t('recovery.email-word')}</b>
                        {t('recovery.email-sent-end')}
                    </span>

                    <AuthInputCode
                        valueArray={codeArray}
                        setValueArray={isRunning ? () => { } : setCodeArray}
                        error={errors.code}
                        resetError={() => {
                            setErrors(defaultErrors);
                            setButtonError('');
                        }}
                        onComplete={(final) => !isRunning && submitCode(final)}
                        disabled={isRunning}
                    />


                    <button
                        type="submit"
                        className={`auth__button ${buttonError ? "auth__button--error" : ""} ${isLoading ? "auth__button--loading" : ""}`}
                        disabled={!!buttonError || isLoading || isRunning}
                    >
                        {buttonError || t('recovery.submit-confirm')}
                    </button>

                    <div className="auth__footer">
                        <div className="auth__footer-option">
                            <Link onClick={handleBack} className="auth__footer-link">
                                Не получили код?
                            </Link>
                        </div>
                        <div className="auth__footer-option">
                            <span className="auth__footer-label">
                                {t('recovery.remember-password-label')}
                            </span>
                            <Link to="/signin" className="auth__footer-link">
                                {t('recovery.signin-link')}
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
