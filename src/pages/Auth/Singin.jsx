import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../context/AuthContext";
import icons from "../../images/images";
import "./auth.css";

const Signin = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('common');
  const { login } = useAuth();
  const navigate = useNavigate();

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
      setButtonError("Введите данные!");
      return;
    }

    setIsLoading(true);

    try {
      const user = await login({ username, password });
      if (!user.activate) {
        navigate("/activate-account", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_AUTH") {
        setErrors({ username: true, password: true });
        setButtonError("Неверный логин или пароль");
      } else {
        console.log("error", err);
        setButtonError("Ошибка сервера");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src={icons.logo} alt="signin logo" className="auth-logo" />
        <h2 className="auth-title no-select">{t('titleLogin')}</h2>

        <input
          type="text"
          placeholder="Имя пользователя"
          className={`auth-input ${errors.username ? "error" : ""}`}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors({ username: false, password: false });
            setButtonError("");
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          className={`auth-input ${errors.password ? "error" : ""}`}
          value={password}
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
          {buttonError || "ВОЙТИ"}
        </button> 
         

        <div className="auth-footer">
          <div className="auth-footer__option">
            <Link to="/sendcode" className="auth-footer__link">
              Забыли пароль?
            </Link>
          </div>
          <div className="auth-footer__option">
            <span className="auth-footer__label">Нет аккаунта?</span>
            <Link to="/signup" className="auth-footer__link">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div >
  );
};

export default Signin;
