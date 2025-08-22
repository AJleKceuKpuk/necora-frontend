import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import icons from "../../assets/images/images";
import "./auth.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { login } = useAuth();
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonError, setButtonError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const hasErrors = errors.email || errors.password;

  const validate = () => {
    const clientErrors = { email: false, password: false };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      clientErrors.email = true;
    }
    if (password.length < 4) {
      clientErrors.password = true;
    }

    setErrors({
      email: clientErrors.email,
      password: clientErrors.password,
    });
    return clientErrors.email || clientErrors.password;
  };


  useEffect(() => {
    document.querySelector(".auth-input")?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonError("");

    const validationError = validate();
        if (validationError) {
            setButtonError(t('signin.error.void-input'));
            return;
        }
    setIsLoading(true);
    try {
      const user = await login({ email, password });
      if (!user.activate) {
        navigate("/activate");
      } else {
        navigate("/");
      }
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_AUTH") {
        setErrors({ email: true, password: true });
        setButtonError(t(`error:${error}`));
      } else {
        console.log("error", err);
        setButtonError(t('signin.error.server-off'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src={icons.logo} alt={t('signin.logo-alt')} className="auth-logo" />
        <h2 className="auth-title no-select">{t('signin.title')}</h2>

        <input
          type="text"
          placeholder={t('signin.email-input')}
          className={`auth-input ${errors.email ? "error" : ""}`}
          value={email}
          autoComplete="current-email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ email: false, password: false });
            setButtonError("");
          }}
        />

        <input
          type="password"
          placeholder={t('signin.password-input')}
          className={`auth-input ${errors.password ? "error" : ""}`}
          value={password}
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ email: false, password: false });
            setButtonError("");
          }}
        />

        <button
          type="submit"
          className={`auth-button ${hasErrors ? "error" : ""} ${isLoading ? "loading" : ""}`}
          disabled={hasErrors || isLoading}
        >
          {buttonError || t('signin.submit')}
        </button>


        <div className="auth-footer">
          <div className="auth-footer__option">
            <Link to="/recovery" className="auth-footer__link">
              {t('signin.forgot-password')}
            </Link>
          </div>
          <div className="auth-footer__option">
            <span className="auth-footer__label">{t('signin.no-account-label')}</span>
            <Link to="/signup" className="auth-footer__link">
              {t('signin.no-account-link')}
            </Link>
          </div>
        </div>
      </form>
    </div >
  );
};

export default Signin;
