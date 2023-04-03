import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import style from "../../scale.module.css";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setRegistrationModalReducer } from "../../redux/registrationModalReducer";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import { InstanceResponse } from "../../AdminComponents/axios-utils";
import Api from "../../AdminComponents/Components/api";
import registrationVariant from "./registrationVariant";
import { rating } from "../../utils/constants";

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

  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns);
    };
    asyncFunc();
  }, []);

  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [isMaster, setMaster] = useState<boolean>(false);
  const [isAgree, setAgree] = useState<boolean>(false);

  async function submitFunction(atr) {
    
    (isMaster
      ? registrationVariant.master(
          atr.name,
          atr.surname,
          atr.post,
          Number(atr.rating),
          atr.password,
          atr.townId
        )
      : registrationVariant.client(atr.name, atr.post, atr.password)).then(()=>{
        console.log('1111')
      }).catch((e)=>console.log(atr))
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
          maxHeight={1000}
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
          <Grid item marginTop={3} sx={{ width: 300 }}>
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Имя"
              sx={{ backgroundColor: "white" }}
              name="name"
              fullWidth={true}
              {...register("name", {
                //required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          {isMaster && (
            <>
            <Grid item marginTop={3} sx={{ width: 300 }}>
              <TextField
                margin="normal"
                type={"text"}
                variant="outlined"
                placeholder="Фамилия"
                sx={{ backgroundColor: "white" }}
                name="surname"
                fullWidth={true}
                {...register("surname", {
                  //required: `${t("adminPopup.emptyField")}`,
                })}
              />
            </Grid>
            <Grid item marginTop={3} sx={{ width: 300 }}>
            <InputLabel variant="standard" htmlFor="rating">
              Рейтинг
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "rating",
                id: "rating",
              }}
              fullWidth={true}
              {...register("rating", {
                required: `${t("adminPopup.emptyField")}`,
              })}
            >
              {rating.map((el)=>{
                return <option value={el}>{el}</option>
              })}
              
            </NativeSelect>
          </Grid>
          </>
          )}
          <Grid item marginTop={3} sx={{ width: 300, alignContent: "center" }}>
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Email"
              sx={{ backgroundColor: "white" }}
              name="email"
              fullWidth={true}
              {...register("email", {
                //required: `${t("adminPopup.emptyField")}`,
                pattern: {
                  value:
                    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                  message: `${t("adminPopup.vrongFormat")}`,
                },
              })}
            />
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300, alignContent: "center" }}>
            <TextField
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Пароль"
              sx={{ backgroundColor: "white" }}
              name="password"
              fullWidth={true}
              {...register("password", {
                //required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300, alignContent: "center" }}>
            <TextField
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Повторите пароль"
              sx={{ backgroundColor: "white" }}
              fullWidth={true}
              {...register("rePassword", {
                //required: `${t("adminPopup.emptyField")}`,
              })}
            />
          </Grid>
          {isMaster && (
            <Grid
              item
              marginTop={3}
              sx={{ width: 300, alignContent: "center" }}>
              <InputLabel variant="standard" htmlFor="towns_id">
                Город
              </InputLabel>
              <NativeSelect
                inputProps={{
                  name: "towns_id",
                  id: "towns_id",
                }}
                style={{ width: 300 }}
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
          )}
          <Grid item marginTop={3} sx={{ width: 300 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Со всем согласен"
              checked={isAgree}
              onChange={() => {
                setAgree(!isAgree);
              }}
            />
          </Grid>
          <Grid item marginTop={3} sx={{ width: 300 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Зарегистрироваться как мастер"
              checked={isMaster}
              onChange={() => {
                setMaster(!isMaster);
              }}
            />
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
            disabled={!(isAgree && !pending)}>
            Зарегистрироваться
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalRegistration;
