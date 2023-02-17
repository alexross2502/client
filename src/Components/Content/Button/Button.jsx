import style from "./Button.module.css";
import { useTranslation } from "react-i18next";

const Button = () => {
  const { t } = useTranslation();

  return (
    <a href="#" className={style.button}>
      {t("mainButton")}
    </a>
  );
};

export default Button;
