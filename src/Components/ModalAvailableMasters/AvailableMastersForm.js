import React from "react";
import style from "./ModalAvailableMasters.module.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { setOrderSuccessReducer } from "../../redux/orderSuccessReducer";
import Api from "../../AdminComponents/Components/api";

export function AvailableMastersForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.orderData.data);
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form>
      <div
        className={style.modal_item}
        onClick={() => {
          let date = {
            date: userData[0][3],
            time: userData[0][6],
          };
          Api.makeOrder(
            userData[0][5], 
            props.data.id, 
            date,  
            userData[0][1],
            props.data.name,
            props.data.surname,
            props.data.rating,
            userData[0][0]
          );
          
          
          dispatch({
            type: "setOrderData",
            payload: ['', '', '', '', '', '', '', ''],
          });
          dispatch(setModalMasters());
          dispatch(setOrderSuccessReducer());
            
        }}
      >
        <span>
          {t("masterOrder.name")} : {props.data.name}
        </span>
        <span>
          {t("masterOrder.surname")} : {props.data.surname}
        </span>
        <span>
          {t("masterOrder.rating")} : {props.data.rating}
        </span>
      </div>
    </form>
  );
}
