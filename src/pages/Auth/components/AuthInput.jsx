import { useTranslation } from "react-i18next";
import icons from "../../../assets/images/images";


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
    <div className="auth__form-wrapper">
      <input
        type={type}
        placeholder={t(placeholderKey)}
        className={`auth__form-input ${hasError ? "auth__form-input--error" : ""}`}

        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
      {showError && (
        <div
          data-tooltip={backendErrorKey ? t(`error:${backendErrorKey}`) : t(errorKey)}
          className="auth__form-input-error img-container img-36"
        >
          <img src={icons.error} alt={t("signup.error.error-alt")} />
        </div>
      )}
    </div>
  );
};

export default AuthInput;
