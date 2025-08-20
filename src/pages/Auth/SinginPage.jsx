import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../context/AuthContext";
import icons from "../../assets/images/images";
import "./auth.css";

const Signin = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { login, redirect, getProfile } = useAuth();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [buttonError, setButtonError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const hasErrors = errors.username || errors.password;

  const validate = () => {
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  useEffect(() => {
    document.querySelector(".auth-input")?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonError("");
    if (!validate()) {
      setButtonError(t('signin.error.void-input'));
      return;
    }
    setIsLoading(true);
    try {
      await login({ username, password });
      const user = await getProfile();
      if (!user.activate) {
        redirect("/activate-account");
      } else {
        redirect("/");
      }
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_AUTH") {
        setErrors({ username: true, password: true });
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
          placeholder={t('signin.username-input')}
          className={`auth-input ${errors.username ? "error" : ""}`}
          value={username}
          autoComplete="username"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors({ username: false, password: false });
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
            setErrors({ username: false, password: false });
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
            <Link to="/sendcode" className="auth-footer__link">
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
