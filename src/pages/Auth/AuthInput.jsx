import React from "react";
import { useTranslation } from "react-i18next";
import icons from "../../assets/images/images";
import "./auth.css";

const AuthInput = ({
  type = "text",
  value,
  onChange,
  placeholderKey,
  hasError = false,
  errorKey,
  backendErrorKey,
  showError = false,
  autoComplete,
}) => {
  const { t } = useTranslation(["auth", "error"]);

  return (
    <div className="auth-wrapper">
      <input
        type={type}
        placeholder={t(placeholderKey)}
        className={`auth-input ${hasError ? "error" : ""}`}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
      {showError && (
        <div
          data-tooltip={backendErrorKey ? t(`error:${backendErrorKey}`) : t(errorKey)}
          className="auth-input__error img-container img-36"
        >
          <img src={icons.error} alt={t("signup.error.error-alt")} />
        </div>
      )}
    </div>
  );
};

export default AuthInput;
