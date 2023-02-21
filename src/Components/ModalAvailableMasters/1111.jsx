import React, { useEffect, useState } from "react";
import style from "./ModalAvailableMasters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { useTranslation } from "react-i18next";
import Api from "../../AdminComponents/Components/api";
import { AvailableMastersForm } from "./AvailableMastersForm";
import { setModalOrder } from "../../redux/orderReducer";

const ModalAvailableMasters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [finaleMasters, setFinaleMasters] = useState([]);
  const orderData = useSelector((state) => state.availableMasters.masters);

  useEffect(() => {
    let asyncFunc = async () => {
      if(orderData.length != 0) {
        setFinaleMasters(await Api.mastersCheck(orderData[0][0], orderData[0][1], orderData[0][2])) 
      }
    };
    asyncFunc();
  }, [orderData]);
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.modalMasters.isActive);

  const windowClose = () => {
    dispatch(setModalMasters());
  };
  //
  const masterListItem = finaleMasters.map((item) => {
    return <AvailableMastersForm data={item} key={item.id} />;
  });

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => windowClose()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
        <div className={style.backBtn}>
        <img
      src="https://cdn4.iconfinder.com/data/icons/essential-app-2/16/back-left-arrow-botton-256.png"
      className={style.modal_img}
      onClick={() => {
        windowClose();
        dispatch(setModalOrder());
      }}
      ></img>
      </div>
          {finaleMasters.length !== 0 ? (
            <h1 className={style.modal_h1}>{t("available.header")}</h1>
          ) : (
            <h1 className={style.modal_h1}>{t("available.emptyHeader")}</h1>
          )}
          <div className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => windowClose()}
            ></img>
          </div>
          {masterListItem}
        </div>
      </div>
    </div>
  );
};

export default ModalAvailableMasters;
