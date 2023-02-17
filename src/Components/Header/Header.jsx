import style from "./Header.module.css";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/modalWindowReducer";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useDispatch();
  function onActiveClick() {
    dispatch(setModalActive());
  }

  const { t } = useTranslation();

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <h1>{t("header.company name")}</h1>
      </div>
      <div className={style.container}>
        <ul>
          <li>
            <a href="#" className={style.link}>
              {t("header.portfolio")}
            </a>
          </li>
          <li>
            <a href="#" className={style.link}>
              {t("header.contacts")}
            </a>
          </li>
          <li>
            <a href="#" className={style.link}>
              {t("header.about us")}
            </a>
          </li>
          <li>
            <a href="#" className={style.link} onClick={() => onActiveClick()}>
              {t("header.login")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
