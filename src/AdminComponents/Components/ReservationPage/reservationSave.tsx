import style from "../../../scale.module.css";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { setModalAddReservations } from "../../../redux/reservationsReducer";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { makeStyles } from "@material-ui/core/styles";
import repairTime from "../repairTime.json";
import { setRemoveAndAddModal } from "../../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../../redux/RemoveAndAddModalErrorReducer";
import { instance, InstanceResponse } from "../../axios-utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RootState } from "../../../redux/rootReducer";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";

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
  const isActive = useSelector(
    (state: RootState) => state.addReservation.isActive
  );
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>([]);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [isDateDone, setDateDone] = useState<boolean>(false);
  let [currentDate, setCurrentDate] = useState(new Date());
  const [isErrorAndSuccessModalActive, setErrorAndSuccessModalActive] =
    useState<boolean>(false);
  const [ErrorAndSuccessModalData, setErrorAndSuccessModalData] = useState({
    type: "",
    message: "",
  });

  function ErrorAndSuccessModalHandler() {
    setErrorAndSuccessModalActive(!isErrorAndSuccessModalActive);
  }

  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns);
      let clients = await Api.getAll("clients", { mailConfirmation: true });
      setClientsList(clients);
      let masters = await Api.getAll("masters", {
        mailConfirmation: true,
        adminApprove: true,
      });
      setMastersList(masters);
    };
    asyncFunc();
  }, [rerender]);

  ////Сохранение нового резерва

  async function reservationSave(atr) {
    if (new Date() > currentDate) {
      throw new Error("error");
    } else {
      atr.day = currentDate.getTime();
      let data = { ...atr };
      setPending(true);
      await instance({ url: `/reservation`, method: "post", data: data })
        .then(() => {
          dispatch(setPageRerender());
          dispatch(setModalAddReservations());
          setErrorAndSuccessModalData({ type: "success", message: "Успешно" });
          ErrorAndSuccessModalHandler();
        })
        .catch(() => {
          dispatch(setModalAddReservations());
          setErrorAndSuccessModalData({ type: "error", message: "Ошибка" });
          ErrorAndSuccessModalHandler();
        })
        .finally(() => setPending(false));
    }
  }

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={isActive ? `${style.active}` : `${style.inactive}`}>
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
            }}>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography variant="h4" padding={3} textAlign="center">
                  Добавить резерв
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <CloseIcon
                  onClick={() => dispatch(setModalAddReservations())}
                />
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
                })}>
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
                })}>
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
                })}>
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
              disabled={pending}>
              Добавить
            </Button>
          </Box>
        </form>
      </div>
      {isErrorAndSuccessModalActive && (
        <ErrorAndSuccessModal
          onClose={ErrorAndSuccessModalHandler}
          type={ErrorAndSuccessModalData.type}
          message={ErrorAndSuccessModalData.message}
        />
      )}
    </>
  );
};

export default ReservationSave;
