// src/pages/Auth/Signin.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icons from "../../images/images";
import "./auth.css";

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  // Валидация перед отправкой
  const validate = () => {
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    try {
      await login({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      const error = err.response?.data?.error;
      if (error === "ERROR_AUTH") {
        console.warn("⛔️ Доступ запрещён: неверные данные");
        setErrors({ username: true, password: true });
      } else {
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src={icons.logo} alt="signin logo" className="auth-logo" />
        <h2 className="auth-title no-select">Вход в игру</h2>

        <input
          type="text"
          placeholder="Имя пользователя"
          className={`auth-input ${errors.username ? "error" : ""}`}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username && e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, username: false }));
            }
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          className={`auth-input ${errors.password ? "error" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password && e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, password: false }));
            }
          }}
        />

        <button
          type="submit"
          className="auth-button"
        >
          ВОЙТИ
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
    </div>
  );
};

export default Signin;
