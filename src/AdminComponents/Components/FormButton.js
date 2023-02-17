import React from "react";
import style from "../AdminPage.module.css";
import { useTranslation } from "react-i18next";

export const FormButton = (props) => {
  const { t } = useTranslation();

  return (
    <button className={style[props.buttonType]}>
      {t(`adminPage.${props.buttonType}`)}
    </button>
  );
};
