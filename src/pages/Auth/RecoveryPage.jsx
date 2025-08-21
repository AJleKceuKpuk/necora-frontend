// src/pages/Home.jsx
import { useState } from "react";
import icons from "../../assets/images/images";

const Recovery = () => {
    const [recovery_code, setRecoveryCode] = useState('');
    const [password, setPassword] = useState('');
    const [password_two, setPasswordTwo] = useState('');
    const [errors, setErrors] = useState({ recovery_code: false, password: true, password_two: false });

    const handleInputChange = (fieldSetter, fieldName) => (e) => {
        const value = e.target.value;
        fieldSetter(value);

        if (errors[fieldName] && value.trim() !== '') {
            setErrors(prev => ({ ...prev, [fieldName]: false }));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <img src={icons.logo} alt="singin logo" className="auth-logo" />
                <h2 className="auth-title no-select">Востановление доступа</h2>
                <input
                    type="text"
                    placeholder="Верификационный код"
                    className={`auth-input ${errors.recovery_code ? 'error' : ''}`}
                    value={recovery_code}
                    onChange={handleInputChange(setRecoveryCode, 'recovery_code')}
                />
                <input
                    type="password"
                    placeholder="Новый пароль"
                    className={`auth-input ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={handleInputChange(setPassword, 'password')}
                />
                <input
                    type="password"
                    placeholder="Подтверждение нового пароля"
                    className={`auth-input ${errors.password_two ? 'error' : ''}`}
                    value={password_two}
                    onChange={handleInputChange(setPasswordTwo, 'password')}
                />
                <button className="auth-button" >
                    Изменить пароль
                </button>
            </div>
        </div>
    );
};

export default Recovery;
