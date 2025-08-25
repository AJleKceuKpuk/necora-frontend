import { useEffect, useState } from "react";

import icons from "../../assets/images/images";
import "./styles/auth.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useCountdown } from "../../hooks/useTimer";
import AuthInputCode from "./components/AuthInputCode";

const Activation = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { activation, sendCodeActivation } = useAuth();

  const { secondsLeft, isRunning, start } = useCountdown(60);

  const [codeArray, setCodeArray] = useState(Array(6).fill(""));
  const [buttonError, setButtonError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const defaultErrors = {
    code: false,
    backend: false,
  };

  const [errors, setErrors] = useState(defaultErrors);

  // Валидация перед отправкой
  const code = codeArray.join("");

  const validate = () => {
    const clientErrors = { code: false };
    if (code.length !== 6) {
      clientErrors.code = true;
    }
    setErrors({ code: clientErrors.code });
    return clientErrors.code;
  };

  useEffect(() => {
    document.querySelector(".auth-input")?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonError("");
    const validationError = validate();
    if (validationError) {
      setButtonError(t('activate.error.incorrect_data'));
      return;
    }
    setIsLoading(true);
    try {
      await activation({ code });
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_INVALID_CODE") {
        setErrors({ code: true });
        setButtonError(t(`error:${error}`));
      } else {
        setButtonError(t('activate.error.server-off'));
        setTimeout(() => {
          setButtonError("");
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSendCode = async (e) => {
    e.preventDefault();
    start();
    setErrors(defaultErrors);
    setButtonError("");
    await sendCodeActivation()
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src={icons.logo} alt="signin logo" className="auth-logo" />
        <h2 className="auth-title no-select">{t('activate.title')}</h2>

        <div className="auth-message no-select">
          {t('activate.email-sent-start')}
          <b className="auth-description__span">{t('activate.email-word')}</b>
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
          onComplete={() => {
            setTimeout(() => {
              handleSubmit(new Event("submit"));
            }, 100);
          }}
        />

        <button
          type='submit'
          className={`auth-button ${buttonError ? "error" : ""} ${isLoading ? "loading" : ""}`}
          disabled={!!buttonError || isLoading}
        >
          {buttonError || t('activate.submit')}
        </button>

        <div className="auth-footer">
          <div className="auth-footer__option">
            <span className="auth-footer__label">
              {t('activate.have-account-label')}
            </span>
            <button
              className="auth-footer__button"
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
    </div>
  );
};

export default Activation;
