import React, { useEffect, useState } from "react";
import style from "../../scale.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Api from "../../AdminComponents/Components/api";
import "react-datepicker/dist/react-datepicker.css";
import { setModalMasters } from "../../redux/modalMastersReducer";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import repairTime from "../../AdminComponents/Components/repairTime.json";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { instance, InstanceResponse } from "../../AdminComponents/axios-utils";
import { RootState } from "../../redux/rootReducer";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Validator } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 25,
    width: 200,
  },
}));

const ModalOrder = () => {
  const userData = useSelector((state: RootState) => state.orderData.data);
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
  const classes = useStyles();

  //Открытие\закрытие модального окна
  const isActive = useSelector((state: RootState) => state.order.isActive);

  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns);
    };
    asyncFunc();
  }, [isActive]);

  const [pending, setPending] = useState<boolean>(false);
  const [isDateDone, setDateDone] = useState<boolean>(false);
  let [currentDate, setCurrentDate] = useState(new Date());

  async function submitFunction(atr) {
    if (new Date() > currentDate) {
      throw new Error("error");
    }
    let data = { ...atr };
    data.day = currentDate.getTime();
    setPending(true);
    await instance({
      url: `/reservation/available`,
      method: "post",
      data: data,
    })
      .then((res: any) => {
        dispatch(setModalOrder());
        dispatch({ type: "setAvailableMasters", payload: [...res] });
        dispatch({
          type: "setOrderData",
          payload: {
            day: currentDate.getTime(),
            size: atr.size,
            recipient: atr.email,
            clientName: atr.name,
            towns_id: atr.towns_id,
          },
        });
        dispatch(setModalMasters());
        setPending(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
          <Grid container maxHeight={200}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h3" padding={3} textAlign="center">
                Заказать ремонт
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon
                onClick={() => {
                  dispatch(setModalOrder());
                }}
              />
            </Grid>
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300 }}>
            {
              <Typography color={"red"}>
                {errors?.name && errors?.name.message}
              </Typography>
            }
            <TextField
              type={"text"}
              variant="outlined"
              placeholder="Имя"
              sx={{ backgroundColor: "white" }}
              fullWidth={true}
              name="name"
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
                minLength: Validator.minLength(3),
                maxLength: Validator.maxLength(12),
                pattern: Validator.name,
              })}
            />
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300 }}>
            {
              <Typography color={"red"}>
                {errors?.email && errors?.email.message}
              </Typography>
            }
            <TextField
              type={"text"}
              variant="outlined"
              placeholder="Email"
              sx={{ backgroundColor: "white" }}
              name="email"
              fullWidth={true}
              {...register("email", {
                required: `${t("adminPopup.emptyField")}`,
                minLength: Validator.minLength(10),
                maxLength: Validator.maxLength(36),
                pattern: Validator.email,
              })}
            />
          </Grid>
          <Grid item marginTop={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {!isDateDone ? (
                <DateCalendar
                  defaultValue={new Date()}
                  disablePast={true}
                  onChange={(newValue) => {
                    setCurrentDate(newValue);
                    setDateDone(true);
                  }}
                />
              ) : (
                <Box sx={{ position: "relative" }}>
                  <ArrowBackIosNewIcon
                    onClick={() => setDateDone(false)}
                    sx={{ cursor: "pointer" }}
                  />
                  <TimeClock
                    defaultValue={new Date(currentDate)}
                    view="hours"
                    onChange={(newValue) => {
                      setCurrentDate(newValue);
                    }}
                    ampm={false}
                    minTime={new Date(0, 0, 0, 8)}
                    maxTime={new Date(0, 0, 0, 18)}
                  />
                </Box>
              )}
            </LocalizationProvider>
          </Grid>

          <Grid item marginTop={3} sx={{ width: 300 }}>
            <InputLabel variant="standard" htmlFor="towns_id">
              Город
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "towns_id",
                id: "towns_id",
              }}
              fullWidth={true}
              {...register("towns_id", {
                required: `${t("adminPopup.emptyField")}`,
              })}>
              {townsList.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </NativeSelect>
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300 }}>
            <InputLabel variant="standard" htmlFor="size">
              Размер часов
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "size",
                id: "size",
              }}
              fullWidth={true}
              {...register("size", {
                required: `${t("adminPopup.emptyField")}`,
              })}>
              {Object.keys(repairTime).map((el) => {
                return <option value={el}>{t(`size.${el}`)}</option>;
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
            disabled={pending}>
            Заказать
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalOrder;
