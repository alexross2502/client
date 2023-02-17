import React from "react";
import style from "../AdminPage.module.css";
import { useTranslation } from "react-i18next";
import Api from "./api";
import { setPageRerender } from "../../redux/rerenderReducer";
import { useDispatch } from "react-redux";

export const DeleteButton = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={style[props.buttonType]}
      onClick={async () => {
        await Api.delete(props.url, props.id);
        dispatch(setPageRerender());
      }}
    >
      {t(`adminPage.${props.buttonType}`)}
    </button>
  );
};
