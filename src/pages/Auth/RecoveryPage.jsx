// src/pages/RecoveryPage.jsx
<<<<<<< HEAD
import icons from '../../assets/images/images'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../assets/images/images';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import AuthInputCode from './components/AuthInputCode';
import "./styles/auth.css";
>>>>>>> e4ba7e8c24a3479404664fac695beb643fadae0a


export default function Recovery() {
    const { t } = useTranslation(['auth', 'error']);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const { recovery, sendCodeRecovery } = useAuth();

    const [email, setEmail] = useState('');
    const [codeArray, setCodeArray] = useState(Array(6).fill(''));

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
            await sendCodeRecovery({ email });
            setStep(2);
        } catch {
            setButtonError(t('recovery.error.server-off'));
            setTimeout(() => setButtonError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setButtonError('');
        if (validate('code')) {
            setButtonError(t('recovery.error.incorrect_data'));
            return;
        }
        setIsLoading(true);
        const code = codeArray.join('');
        try {
            await recovery({ email, code });
            navigate("/update-password")
        } catch (err) {
            const error = err.response?.data?.error;
            if (error === 'ERROR_INVALID_CODE') {
                setErrors({ email: false, code: true, backend: true });
                setButtonError(t(`error:${error}`));
            } else {
                setButtonError(t('recovery.error.server-off'));
                setTimeout(() => setButtonError(''), 3000);
            }
        } finally {
            setIsLoading(false);
            setCodeArray(Array(6).fill(''));
        }
    };

    const handleBack = () => {
        setStep(1);
        setErrors(defaultErrors);
        setButtonError('');
        setCodeArray(Array(6).fill(''));
    };

    return (
        <div className="auth-container">

            {step === 1 && (
                <form className="auth-form" onSubmit={handleRequest}>
                    <img
                        src={icons.logo}
                        alt={t('recovery.logo-alt')}
                        className="auth-logo"
                    />
                    <h2 className="auth-title no-select">{t('recovery.title')}</h2>
                    <div className="auth-wrapper">
                        <input
                            type="text"
                            placeholder={t('email-input')}
                            className={`auth-input ${errors.email ? 'error' : ''}`}
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
                        className={`auth-button ${buttonError ? 'error' : ''} ${isLoading ? 'loading' : ''
                            }`}
                        disabled={!!buttonError || isLoading}
                    >
                        {buttonError || t('recovery.submit-request')}
                    </button>
                    <div className="auth-footer">
                        <div className="auth-footer__option">
                            <span className="auth-footer__label">
                                {t('recovery.remember-password-label')}
                            </span>
                            <Link to="/signin" className="auth-footer__link">
                                {t('recovery.signin-link')}
                            </Link>
                        </div>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form className="auth-form" onSubmit={handleConfirm}>
                    <img
                        src={icons.logo}
                        alt={t('recovery.logo-alt')}
                        className="auth-logo"
                    />
                    <h2 className="auth-title no-select">{t('recovery.title')}</h2>
                    <span className="auth-description no-select">
                        {t('recovery.email-sent-start')}
                        <b className="auth-description__span">{t('recovery.email-word')}</b>
                        {t('recovery.email-sent-end')}
                    </span>

                    <AuthInputCode
                        valueArray={codeArray}
                        setValueArray={setCodeArray}
                        error={errors.code}
                        resetError={() => {
                            setErrors(defaultErrors);
                            setButtonError('');
                        }}
                        onComplete={() => {
                            setTimeout(() => {
                                handleConfirm(new Event("submit"));
                            }, 100);
                        }}
                    />

                    <button
                        type="submit"
                        className={`auth-button ${buttonError ? 'error' : ''} ${isLoading ? 'loading' : ''
                            }`}
                        disabled={!!buttonError || isLoading}
                    >
                        {buttonError || t('recovery.submit-confirm')}
                    </button>
                    <div className="auth-footer">
                        <div className="auth-footer__option">
                            <Link onClick={handleBack} className="auth-footer__link">
                                Не получили код?
                            </Link>
                        </div>
                        <div className="auth-footer__option">
                            <span className="auth-footer__label">
                                {t('recovery.remember-password-label')}
                            </span>
                            <Link to="/signin" className="auth-footer__link">
                                {t('recovery.signin-link')}
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
