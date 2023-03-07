import { request } from "../../axios-utils";
import style from "../../../scale.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { setModalAddClients } from "../../../redux/clientsReducer";
import { setPageRerender } from "../../../redux/rerenderReducer";
import axios from "axios";
import { setRemoveAndAddModal } from "../../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../../redux/RemoveAndAddModalErrorReducer";

const ClientSave = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.addClient.isActive);

  ////Сохранение нового клиента
  async function clientSave(atr) {
    let data = { ...atr };

    await request({ url: `/clients`, method: "post", data: data }).then(
      (res) => {
        if (res?.status) {
          dispatch(setRemoveAndAddModalError(true));
          dispatch(setModalAddClients());
          setTimeout(() => {
            dispatch(setRemoveAndAddModalError(false));
          }, 1000);
          console.log(res.status, res.statusText);
        } else {
          dispatch(setPageRerender());
          dispatch(setRemoveAndAddModal(true));
          dispatch(setModalAddClients());
          setTimeout(() => {
            dispatch(setRemoveAndAddModal(false));
          }, 1000);
        }
      }
    );
  }
  ////////

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
      <form onSubmit={handleSubmit(clientSave)}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            backgroundColor: "#696969",

            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" padding={3} textAlign="center">
                Добавить клиента
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon onClick={() => dispatch(setModalAddClients())} />
            </Grid>
          </Grid>
          {
            <Typography color={"red"}>
              {errors?.name && errors?.name.message}
            </Typography>
          }
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Имя"
            sx={{ backgroundColor: "white" }}
            name="name"
            {...register("name", {
              required: `${t("adminPopup.emptyField")}`,
              pattern: {
                value: /^[А-я]{2,20}$/,
                message: `${t("adminPopup.onlyCyrillic")}`,
              },
            })}
          />
          {
            <Typography color={"red"}>
              {errors?.email && errors?.email.message}
            </Typography>
          }
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Почта"
            sx={{ backgroundColor: "white" }}
            name="email"
            {...register("email", {
              required: `${t("adminPopup.emptyField")}`,
              pattern: {
                value:
                  /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                message: `${t("adminPopup.vrongFormat")}`,
              },
            })}
          />
          <Button
            sx={{
              background: "rgba(180,58,58,1)",
              marginTop: 3,
              borderRadius: 3,
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            variant="contained"
            color="warning"
            type="submit"
            onClick={async () => {
              dispatch(setPageRerender());
            }}
          >
            Добавить
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ClientSave;
