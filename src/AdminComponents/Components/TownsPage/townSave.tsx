import { instance } from "../../axios-utils";
import style from "../../../scale.module.css";
import modalWrapperStyle from "../../../Components/Modals/ModalWrapper.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { RootState } from "../../../redux/rootReducer";
import { Validator } from "../../../utils/constants";
import { modalBoxStyle, redSaveButtonStyle } from "../../../styles/styles";

const TownSave = (props) => {
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

  ////Сохранение города
  const [pending, setPending] = useState<boolean>(false);

  async function townSave(atr) {
    atr.tariff *= 100;
    let data = { ...atr };
    setPending(true);
    await instance({ url: `/towns`, method: "post", data: data })
      .then(() => {
        dispatch(setPageRerender());
        props.result({ type: "success", message: "Город успешно добавлен" });
      })
      .catch(() => {
        props.result({
          type: "error",
          message: "Невозможно добавить єтот город",
        });
      })
      .finally(() => {
        setPending(false);
        props.onClose();
      });
  }
  /////////

  return (
    <>
      <div className={modalWrapperStyle.modalWrapper}>
        <div className={style.active}>
          <form onSubmit={handleSubmit(townSave)}>
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
                    Добавить город
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <CloseIcon onClick={props.onClose} />
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
                placeholder="Город"
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
                  {errors?.tariff && errors?.tariff.message}
                </Typography>
              }
              <TextField
                margin="normal"
                type={"number"}
                variant="outlined"
                placeholder="Тариф"
                sx={{ backgroundColor: "white", width: "209px" }}
                name="tariff"
                inputProps={{
                  step: 0.01,
                  min: 100,
                  max: 999999,
                }}
                {...register("tariff", {
                  required: `${t("adminPopup.emptyField")}`,
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

export default TownSave;
