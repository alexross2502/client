import { instance } from "../../axios-utils";
import style from "../../../scale.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { setModalAddTowns } from "../../../redux/townsReducer";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { setRemoveAndAddModal } from "../../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../../redux/RemoveAndAddModalErrorReducer";
import { RootState } from "../../../redux/rootReducer";
import { Validator } from "../../../utils/constants";

const TownSave = () => {
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
  const isActive = useSelector((state: RootState) => state.addTown.isActive);

  function onActiveClick() {
    dispatch(setModalAddTowns());
  }

  ////Сохранение города
  const [pending, setPending] = useState<boolean>(false);
  async function townSave(atr) {
    atr.tariff *= 100;
    let data = { ...atr };
    setPending(true);
    await instance({ url: `/towns`, method: "post", data: data })
      .then(() => {
        dispatch(setPageRerender());
        dispatch(setRemoveAndAddModal(true));
        dispatch(setModalAddTowns());
        setTimeout(() => {
          dispatch(setRemoveAndAddModal(false));
        }, 1000);
      })
      .catch(() => {
        dispatch(setRemoveAndAddModalError(true));
        dispatch(setModalAddTowns());
        setTimeout(() => {
          dispatch(setRemoveAndAddModalError(false));
        }, 1000);
      })
      .finally(() => setPending(false));
  }
  /////////

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}>
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
          sx={{
            backgroundColor: "#696969",

            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" padding={3} textAlign="center">
                Добавить город
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon onClick={() => dispatch(setModalAddTowns())} />
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
            disabled={pending}>
            Добавить
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default TownSave;
