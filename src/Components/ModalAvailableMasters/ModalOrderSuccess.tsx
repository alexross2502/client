import "./ModalAvailableMasters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setOrderSuccessReducer } from "../../redux/orderSuccessReducer";
import { useEffect } from "react";
import React = require("react");
import { RootState } from "../../redux/rootReducer";

const ModalOrderSuccess = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isActive = useSelector(
    (state: RootState) => state.orderSuccess.isActive
  );

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
      className={isActive ? `${"modal_popup"} ${"active"}` : `${"modal_popup"}`}
    >
      <p className={"h1"}>{t("success.content")}</p>
    </div>
  );
};

export default ModalOrderSuccess;
