import { request } from "../../axios-utils";
import style from "../../../scale.module.css";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { setModalAddReservations } from "../../../redux/reservationsReducer";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 25,
    width: 200,
  },
}));
function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export async function reservationSave(atr) {
  let data = {};
  let day = atr.date.split("-");
  let time = `${atr.time.split(":")[0]}:00:00`;
  data.day = toTimestamp(`${day[0]} ${day[1]} ${day[2]} ${time}`);

  data.hours = atr.size * 3600;
  data.master_id = atr.master;
  data.towns_id = atr.town;
  data.clientId = atr.client;
  console.log(data);

  return await request({ url: `/reservation`, method: "post", data: data });
}

const ReservationSave = () => {
  const classes = useStyles();
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
  const isActive = useSelector((state) => state.addReservation.isActive);
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState([]);
  const [mastersList, setMastersList] = useState([]);
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let towns = [...(await Api.getAll("towns"))];
      setTownsList(towns);
      let clients = [...(await Api.getAll("clients"))];
      setClientsList(clients);
      let masters = [...(await Api.getAll("masters"))];
      setMastersList(masters);
    };
    asyncFunc();
  }, [rerender]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
      <form onSubmit={handleSubmit(reservationSave)}>
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
                Добавить резерв
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon onClick={() => dispatch(setModalAddReservations())} />
            </Grid>
          </Grid>
          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="town">
              Город
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "town",
                id: "town",
              }}
              style={{ width: 200 }}
              {...register("town", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              {townsList.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </NativeSelect>
          </Grid>
          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="town">
              Клиент
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "client",
                id: "client",
              }}
              style={{ width: 200 }}
              {...register("client", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              {clientsList.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </NativeSelect>
          </Grid>

          <Grid item marginTop={3}>
            <TextField
              id="date"
              label="Дата"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("date", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          <Grid item marginTop={3}>
            <TextField
              id="time"
              label="Время"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 3600,
              }}
              {...register("time", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Размер часов
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              style={{ width: 200 }}
              {...register("size", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </NativeSelect>
          </Grid>

          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="town">
              Мастер
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "master",
                id: "master",
              }}
              style={{ width: 200 }}
              {...register("master", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              {mastersList.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
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
            onClick={() => {
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

export default ReservationSave;
