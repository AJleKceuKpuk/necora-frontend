import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icons from "../../images/images";
import "./auth.css";

const AccountActivation = () => {
  const { activation } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [errors, setErrors] = useState({
    code: false,
  });

  // Валидация перед отправкой
  const validate = () => {
    const newErrors = {
      code: code.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    try {
      await activation({ code });
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
        <h2 className="auth-title no-select">Активация аккаунта</h2>

        <div className="auth-message no-select">На ваш емейл отправлено письмо</div>

        <input
          type="text"
          placeholder="Код активации"
          className={`auth-input ${errors.code ? "error" : ""}`}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (errors.code && e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, code: false }));
            }
          }}
        />

        <button
          type="submit"
          className="auth-button"
        >
          Активировать
        </button>
      </form>
    </div>
  );
};

export default AccountActivation;
