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
import { dateToTimestamp, timestampToDate } from "../dateConverter";
import repairTime from "../repairTime.json";
import { setRemoveAndAddModal } from "../../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../../redux/RemoveAndAddModalErrorReducer";

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
      let towns = await Api.getAll("towns");
      setTownsList(towns.data);
      let clients = await Api.getAll("clients");
      setClientsList(clients.data);
      let masters = await Api.getAll("masters");
      setMastersList(masters.data);
    };
    asyncFunc();
  }, [rerender]);

  ////Сохранение нового резерва
  async function reservationSave(atr) {
    atr.day = dateToTimestamp(atr.day, atr.hours.split(":")[0]);
    let data = { ...atr };

    await request({ url: `/reservation`, method: "post", data: data }).then(
      (res) => {
        if (res.status == 200) {
          dispatch(setPageRerender());
          dispatch(setRemoveAndAddModal(true));
          dispatch(setModalAddReservations());
          setTimeout(() => {
            dispatch(setRemoveAndAddModal(false));
          }, 1000);
        } else {
          dispatch(setRemoveAndAddModalError(true));
          dispatch(setModalAddReservations());
          setTimeout(() => {
            dispatch(setRemoveAndAddModalError(false));
          }, 1000);
        }
      }
    );
  }
  //////////////

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
            <InputLabel variant="standard" htmlFor="towns_id">
              Город
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "towns_id",
                id: "towns_id",
              }}
              style={{ width: 200 }}
              {...register("towns_id", {
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
            <InputLabel variant="standard" htmlFor="clientId">
              Клиент
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "clientId",
                id: "clientId",
              }}
              style={{ width: 200 }}
              {...register("clientId", {
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
              id="day"
              label="Дата"
              type="date"
              required={true}
              defaultValue={new Date()}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("day", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          <Grid item marginTop={3}>
            <TextField
              id="hours"
              label="Время"
              type="hours"
              defaultValue="09:00"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 3600,
              }}
              {...register("hours", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="size">
              Размер часов
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "size",
                id: "size",
              }}
              style={{ width: 200 }}
              {...register("size", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              {Object.keys(repairTime).map((el) => {
                return <option value={el}>{t(`size.${el}`)}</option>;
              })}
            </NativeSelect>
          </Grid>

          <Grid item marginTop={3}>
            <InputLabel variant="standard" htmlFor="master_id">
              Мастер
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "master_id",
                id: "master_id",
              }}
              style={{ width: 200 }}
              {...register("master_id", {
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
