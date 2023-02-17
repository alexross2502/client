import React, { useEffect, useState } from "react";
import style from "./ModalAvailableMasters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setOrderSuccessReducer } from "../../redux/orderSuccessReducer";

const ModalOrderSuccess = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isActive = useSelector((state) => state.orderSuccess.isActive);

  const windowClose = () => {
    dispatch(setOrderSuccessReducer());
  };

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        windowClose();
      }, 2000);
    }
  }, [isActive]);

  return (
    <div
      className={
        isActive
          ? `${style.modal_popup} ${style.active}`
          : `${style.modal_popup}`
      }
    >
      <p className={style.h1}>{t("success.content")}</p>
    </div>
  );
};

export default ModalOrderSuccess;
