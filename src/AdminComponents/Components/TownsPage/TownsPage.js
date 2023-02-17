import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { LeftSideMenu } from "../../LeftSideMenu";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { townSave } from "./townSave";
import { useForm } from "react-hook-form";
import { TownForm } from "./TownForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";

const TownsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
    let towns = [...(await Api.getAll("towns"))];
    setTownsList(towns);
    }
    asyncFunc()
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });
  async function newTown(data) {
    await townSave(data.name);
    dispatch(setPageRerender());
  }
  const townsListItem = townsList.map((item) => {
    return <TownForm data={item} key={item.id} />;
  });

  return (
    <div className={style.container} onSubmit={handleSubmit(newTown)}>
      <LeftSideMenu />
      <div className={style.rightSide}>
        <p className={style.header}>{t("townsPage.header")}</p>
        <form className={style.addContainer}>
          <p className={style.subtitle}>{t("adminPage.addTown")}</p>
          <div className={style.inputContainer}>
            <input
              className={style.inputText}
              type="text"
              placeholder="Название"
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
          </div>
          <FormButton buttonType="saveButton" />
        </form>
        <div>
          <p className={style.subtitle}>{t("adminPage.list")}</p>
          <div className={style.listContainer}></div>
          {townsListItem}
        </div>
      </div>
    </div>
  );
};

export default TownsPage;
