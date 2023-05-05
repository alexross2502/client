import { instance } from "../../axios-utils";
import style from "../../../scale.module.css";
import modalWrapperStyle from "../../../Components/Modals/ModalWrapper.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { Validator } from "../../../utils/constants";
import { modalBoxStyle, redSaveButtonStyle } from "../../../styles/styles";

const ClientSave = ({ onClose, result }) => {
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

  ////Сохранение нового клиента
  const [pending, setPending] = useState<boolean>(false);
  async function clientSave(atr) {
    let data = { ...atr };
    setPending(true);
    await instance({ url: `clients`, method: "post", data: data })
      .then(() => {
        dispatch(setPageRerender());
        result({ type: "success", message: "Новый клиент добавлен" });
      })
      .catch(() => {
        result({
          type: "error",
          message: "Невозможно добавить такого клиента",
        });
      })
      .finally(() => {
        setPending(false);
        onClose();
      });
  }

  return (
    <>
      <div className={modalWrapperStyle.modalWrapper}>
        <div className={style.active}>
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
              sx={modalBoxStyle}>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Typography variant="h4" padding={3} textAlign="center">
                    Добавить клиента
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <CloseIcon onClick={onClose} />
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
                  minLength: Validator.minLength(3),
                  maxLength: Validator.maxLength(12),
                  pattern: Validator.name,
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
                  minLength: Validator.minLength(10),
                  maxLength: Validator.maxLength(30),
                  pattern: Validator.email,
                })}
              />
              {
                <Typography color={"red"}>
                  {errors?.password && errors?.password.message}
                </Typography>
              }
              <TextField
                margin="normal"
                type={"text"}
                variant="outlined"
                placeholder="Пароль"
                sx={{ backgroundColor: "white" }}
                name="password"
                {...register("password", {
                  required: `${t("adminPopup.emptyField")}`,
                  minLength: Validator.minLength(5),
                  maxLength: Validator.maxLength(15),
                  pattern: Validator.password,
                })}
              />
              <Button
                sx={redSaveButtonStyle}
                variant="contained"
                color="warning"
                type="submit"
                disabled={pending}>
                Добавить
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientSave;
