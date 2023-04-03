import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import style from "../../scale.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setRegistrationModalReducer } from "../../redux/registrationModalReducer";
import { useTranslation } from "react-i18next";

const ModalRegistration = () => {
  let isActive = useSelector(
    (state: RootState) => state.registrationModal.isActive
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function submitFunction(atr) {}

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}>
      <form onSubmit={handleSubmit(submitFunction)}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={500}
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
          }}>
            <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h3" padding={3} textAlign="center">
                {t("header.registration")}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon
                onClick={() => {
                  dispatch(setRegistrationModalReducer());
                }}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Имя"
            sx={{ backgroundColor: "white" }}
            name="name"
            {...register("name", {
              required: `${t("adminPopup.emptyField")}`,
            })}
          />
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Email"
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
        </Box>
      </form>
    </div>
  );
};

export default ModalRegistration;
