import React, { useEffect, useState } from "react";
import style from "../../scale.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Api from "../../AdminComponents/Components/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setModalMasters } from "../../redux/modalMastersReducer";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import { dateToTimestamp } from "../../AdminComponents/Components/dateConverter";
import repairTime from "../../AdminComponents/Components/repairTime.json";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
  const userData = useSelector((state) => state.orderData.data);
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
  const isActive = useSelector((state) => state.order.isActive);

  const [townsList, setTownsList] = useState([]);
  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns);
    };
    asyncFunc();
  }, [isActive]);

  const [value, setValue] = React.useState(null);

  function submitFunction(atr) {
    let data = { ...atr };

    data.day = dateToTimestamp(atr.day, atr.hours.split(":")[0]);
    ////Это пока не работает
    console.log(data);
  }

  ///////Опции отображения даты
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  };
  //////////////////

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
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
          }}
        >
          <Grid container>
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
          <Grid item marginTop={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                views={["year", "month", "day", "hours"]}
                name="DateTimePicker"
                disablePast={true}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                inputFormat="dd-MM-yyyy"
                ampm={false}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
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
            Заказать
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalOrder;
