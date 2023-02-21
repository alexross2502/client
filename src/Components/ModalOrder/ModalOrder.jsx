import React, { useEffect, useState } from "react";
import style from "../../scale.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Api from "../../AdminComponents/Components/api";
import { FormButton } from "../../AdminComponents/Components/FormButton";
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  function onActiveClick() {
    dispatch(setModalOrder());
  }

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [townsList, setTownsList] = useState([]);
  useEffect(() => {
    let asyncFunc = async () => {
      let towns = [...(await Api.getAll("towns"))];
      setTownsList(towns);
    };
    asyncFunc();
  }, [isActive]);

  const townListItem = townsList.map((item) => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
      <form>
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
              <Typography variant="h2" padding={3} textAlign="center">
                Заказать ремонт
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
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Город
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            style={{ width: 200 }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Размер часов
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            style={{ width: 200 }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </NativeSelect>
          <TextField
            id="date"
            label="Дата"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="5px"
          />
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
              step: 300, // 5 min
            }}
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
            Заказать
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalOrder;
