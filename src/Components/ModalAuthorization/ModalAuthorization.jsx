import React from "react";
import style from "./ModalAuthorization.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalActive } from "../../redux/modalWindowReducer";
import { setAuthorized } from "../../redux/authorizationReducer";
import { useTranslation } from "react-i18next";
import { authCheck } from "./authCheck";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ModalAuthorization = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.modalWindow.isActive);
  const [isAuthData, setAuthData] = useState("");

  function onActiveClick() {
    dispatch(setModalActive());
  }

  async function authController(data) {
    let response = await authCheck(data);
    if (response.availability == true) {
      dispatch(setAuthorized());
      navigate("/clients");
    } else {
      reset();
      setAuthData(`${t("adminPopup.vrongAuth")}`);
    }
  }

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => onActiveClick()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
          <h1 className={style.modal_h1}>{t("adminPopup.description")}</h1>
          <span className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => onActiveClick()}
            ></img>
          </span>

          <form
            className={style.modal_form}
            onSubmit={handleSubmit(authController)}
          >
            <input
              name="email"
              placeholder="E-mail"
              className={style.modal_input}
              {...register("email", {
                required: `${t("adminPopup.emptyField")}`,
                pattern: {
                  value:
                    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                  message: `${t("adminPopup.vrongFormat")}`,
                },
              })}
            ></input>
            {
              <p className={style.errorMessage}>
                {errors?.email && errors?.email.message}
              </p>
            }
            <input
              name="password"
              placeholder="Пароль"
              className={style.modal_input}
              {...register("password", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
            <p className={style.errorMessage}>
              {errors?.password && errors?.password?.message}
            </p>
            <p className={style.errorMessage}>{isAuthData}</p>
            <button type="submit" className={style.modal_a}>
              {t("adminPopup.button")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAuthorization;
