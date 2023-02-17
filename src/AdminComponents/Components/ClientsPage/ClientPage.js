import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clientSave } from "./clientSave";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import { ClientForm } from "./ClientForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";

const ClientPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let clients = [...(await Api.getAll("clients"))];
      setClientsList(clients);
    }
    asyncFunc()
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });
  async function newClient(data) {
    await clientSave(data.firstName, data.email);
    dispatch(setPageRerender());
  }

  const clientListItem = clientsList.map((item) => {
    return <ClientForm data={item} key={item.id} />;
  });

 


  return (
    <div className={style.container} onSubmit={handleSubmit(newClient)}>
      <LeftSideMenu />
      <div className={style.rightSide}>
        <p className={style.header}>{t("clientsPage.header")}</p>
        <form className={style.addContainer}>
          <p className={style.subtitle}>{t("adminPage.addClient")}</p>
          <div className={style.inputContainer}>
            <input
              className={style.inputText}
              type="text"
              placeholder="Имя"
              {...register("firstName", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            ></input>
          </div>
          <div className={style.inputContainer}>
            <input
              className={style.inputText}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: `${t("adminPopup.emptyField")}`,
                pattern: {
                  value:
                    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                  message: `${t("adminPopup.vrongFormat")}`,
                },
              })}
            ></input>
          </div>
          <FormButton buttonType="saveButton" />
        </form>
        <div>
          <p className={style.subtitle}>{t("adminPage.list")}</p>
          <div className={style.listContainer}></div>
          {clientListItem}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
