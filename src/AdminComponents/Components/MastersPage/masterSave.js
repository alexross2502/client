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
import { setModalAddMasters } from "../../../redux/mastersReducer";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

async function masterSave(name, surname, rating, town) {
  let data = {};
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.townName = town;
  data.createdAt = Date.now();
  data.updatedAt = Date.now();
  return await request({ url: `/masters`, method: "post", data: data });
}

const MasterSave = () => {
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
  const isActive = useSelector((state) => state.addMaster.isActive);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
      <form onSubmit={handleSubmit(masterSave)}>
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
                Добавить мастера
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon />
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
              pattern: {
                value:
                  /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                message: `${t("adminPopup.vrongFormat")}`,
              },
            })}
          />
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Фамилия"
            sx={{ backgroundColor: "white" }}
            name="surname"
            {...register("surname", {
              required: `${t("adminPopup.emptyField")}`,
            })}
          />
          <Grid item>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Рейтинг
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "rating",
                id: "uncontrolled-native",
              }}
              style={{ width: 200 }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </NativeSelect>
          </Grid>
          <Grid item>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Город
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "town",
                id: "uncontrolled-native",
              }}
              style={{ width: 200 }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </NativeSelect>
          </Grid>
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
            Добавить
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default MasterSave;
