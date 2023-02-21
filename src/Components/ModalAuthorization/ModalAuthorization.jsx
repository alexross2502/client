import style from "../../scale.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setModalActive } from "../../redux/modalWindowReducer";
import { setAuthorized } from "../../redux/authorizationReducer";
import { authCheck } from "./authCheck";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

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
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
      <form onSubmit={handleSubmit(authController)}>
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
            backgroundColor: "#a0a0a0",

            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" padding={3} textAlign="center">
                Вход
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Логин"
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
          <TextField
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Пароль"
            sx={{ backgroundColor: "white" }}
            name="password"
            {...register("password", {
              required: `${t("adminPopup.emptyField")}`,
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
          >
            Войти
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalAuthorization;
