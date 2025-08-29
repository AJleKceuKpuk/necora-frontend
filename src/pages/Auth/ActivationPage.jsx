import { useEffect, useState } from "react";

import icons from "../../assets/images/images";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useCountdown } from "../../hooks/useTimer";
import AuthInputCode from "./components/AuthInputCode";

const Activation = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { activation, sendCodeActivation } = useAuth();

  const { secondsLeft, isRunning, start } = useCountdown(60);

  const [codeArray, setCodeArray] = useState(Array(6).fill(""));
  const code = codeArray.join("");
  const [buttonError, setButtonError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const defaultErrors = { code: false, backend: false, };
  const [errors, setErrors] = useState(defaultErrors);

  const validate = (value) => {
    const codeToCheck = value ?? code;
    const hasError = codeToCheck.length !== 6;
    setErrors({ code: hasError });
    return hasError;
  };

  //Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    submitCode(code);
  };

  // Повторная отрпавка кода на почту
  const handleSendCode = async (e) => {
    e.preventDefault();
    start();
    setErrors(defaultErrors);
    setButtonError("");
    await sendCodeActivation()
  };

  const submitCode = async (finalCode) => {
    setButtonError("")
    const validationError = validate?.(finalCode) ?? validate?.();
    if (validationError) {
      setButtonError(t("activate.error.incorrect_data"));
      return;
    }
    setIsLoading(true);
    try {
      await activation({ code: finalCode });
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_INVALID_CODE") {
        setErrors({ code: true });
        setButtonError(t(`error:${error}`));
      } else {
        setButtonError(t("activate.error.server-off"));
        setTimeout(() => setButtonError(""), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    document.querySelector(".auth-input")?.focus();
  }, []);

  return (

    <form className="auth__form" onSubmit={handleSubmit}>
      <img src={icons.logo} alt="signin logo" className="auth__form-logo" />
      <h2 className="auth__form-title no-select">{t('activate.title')}</h2>

      <div className="auth__form-description no-select">
        {t('activate.email-sent-start')}
        <b className="auth__form-span">{t('activate.email-word')}</b>
        {t('activate.email-sent-end')}
      </div>

      <AuthInputCode
        valueArray={codeArray}
        setValueArray={setCodeArray}
        error={errors.code}
        resetError={() => {
          setErrors(defaultErrors);
          setButtonError("");
        }}
        onComplete={(final) => submitCode(final)}
      />

      <button
        type='submit'
        className={`auth__button ${buttonError
          ? "auth__button--error"
          : ""} ${isLoading
            ? "auth__button--loading"
            : ""}`}
        disabled={!!buttonError || isLoading}
      >
        {buttonError || t('activate.submit')}
      </button>

      <div className="auth__footer">
        <div className="auth__footer-option">
          <span className="auth__footer-label">
            {t('activate.have-account-label')}
          </span>
          <button
            className="auth__footer-button"
            disabled={isRunning}
            onClick={handleSendCode}
            data-seconds-label={t('activate.time')}
            data-seconds={secondsLeft}
          >
            {t('activate.have-account-link')}
          </button>
        </div>
      </div>
    </form>

  );
};

export default Activation;
