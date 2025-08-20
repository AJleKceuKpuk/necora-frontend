import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icons from "../../assets/images/images";
import "./auth.css";
import { useTranslation } from "react-i18next";

const Activation = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { activation, redirect, isAuthenticated, profile, getProfile, username } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [buttonError, setButtonError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    code: false,
    backend: false
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
      await activation({ code, username });
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

  useEffect(() => {
    console.log(isAuthenticated);
    
    // if (!isAuthenticated) {
    //   console.log("not auth");
    //   if (!username){
    //     redirect("/signin")
    //   }
    // }
    // else if(!profile.activation){
    //   console.log("not activated");
      
    // }
  }, [profile, isAuthenticated]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src={icons.logo} alt="signin logo" className="auth-logo" />
        <h2 className="auth-title no-select">Активация</h2>

        <div className="auth-message no-select">На ваш <b>E-mail</b> было отправлено письмо с кодом активации</div>

        <input
          type="text"
          placeholder="Код"
          className={`auth-input ${errors.code ? "error" : ""}`}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErrors({ code: false, backend: false });
            setButtonError("");
          }}
        />
        {errors.code && (
          <div
            data-tooltip={
              errors.backend
                ? t("error:ERROR_USERNAME_EXISTS")
                : t("signup.error.username_too_short")
            }
            className="auth-input__error img-container img-36"
          >
            <img src={icons.error} alt={t('signup.error.error-alt')} />
          </div>
        )}

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

export default Activation;
