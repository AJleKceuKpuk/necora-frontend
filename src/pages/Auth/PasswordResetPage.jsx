import { useState, useEffect } from "react";
import icons from "../../assets/images/images";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "./styles/auth.css";

const PasswordReset = () => {
    const { t } = useTranslation(['auth', 'error']);
    
    useEffect(() => {
        document.querySelector(".auth-input")?.focus();
    }, []);

    return (
        <div className="auth-container">
            <form className="auth-form" >
                <img src={icons.logo} alt={t('?.logo-alt')} className="auth-logo" />
                <h2 className="auth-title no-select">Сброс пароля</h2>

    
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
