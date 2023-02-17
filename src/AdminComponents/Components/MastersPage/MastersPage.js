import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { masterSave } from "./masterSave";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import { MasterForm } from "./MasterForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";

const MastersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState([]);
  const [townsList, setTownsList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
    let clients = [...(await Api.getAll("masters"))];
    setMastersList(clients);
    let towns = [...(await Api.getAll("towns"))];
    setTownsList(towns);
    }
    asyncFunc()
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });
  async function newMaster(data) {
    await masterSave(data.name, data.surname, data.rating, data.town);
    dispatch(setPageRerender());
  }

  const masterListItem = mastersList.map((item) => {
    return <MasterForm data={item} key={item.id} />;
  });
  const townListItem = townsList.map((item) => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <div className={style.container} onSubmit={handleSubmit(newMaster)}>
      <LeftSideMenu />
      <div className={style.rightSide}>
        <p className={style.header}>{t("mastersPage.header")}</p>
        <form className={style.addContainer}>
          <p className={style.subtitle}>{t("adminPage.addMaster")}</p>
          <div className={style.inputContainer}>
            <input
              className={style.inputText}
              type="text"
              placeholder="Имя"
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
          </div>
          <div className={style.inputContainer}>
            <input
              className={style.inputText}
              type="text"
              placeholder="Фамилия"
              {...register("surname", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
          </div>
          <select {...register("rating")} className={style.select}>
            <option selected value="1">
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            {...register("town", {
              required: `${t("adminPopup.emptyField")}`,
            })}
            className={style.select}
            required
          >
            <option disabled selected value="">
              Выберите город
            </option>
            {townListItem}
          </select>
          <FormButton buttonType="saveButton" />
        </form>
        <div>
          <p className={style.subtitle}>{t("adminPage.list")}</p>
          <div className={style.listContainer}></div>
          {masterListItem}
        </div>
      </div>
    </div>
  );
};

export default MastersPage;
