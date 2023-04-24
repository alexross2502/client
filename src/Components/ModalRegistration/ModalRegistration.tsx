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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Validator } from "../../utils/constants";

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
  let [passwordType, setPasswordType] = useState("password");

  function changePasswordType() {
    dispatch(
      setPasswordType(passwordType === "password" ? "text" : "password")
    );
  }

  async function submitFunction(atr) {
    setPending(true);
    (isMaster
      ? registrationVariant.master(
          atr.name,
          atr.surname,
          atr.email,
          5,
          atr.password,
          atr.townId
        )
      : registrationVariant.client(atr.name, atr.email, atr.password)
    )
      .then(() => {
        setPending(false);
        dispatch(setRegistrationModalReducer());
        alert("done");
      })
      .catch((e) => {
        setPending(false);
        dispatch(setRegistrationModalReducer());
        alert("error");
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
            {
              <Typography color={"red"}>
                {errors?.name && errors?.name.message}
              </Typography>
            }
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Имя"
              sx={{ backgroundColor: "white" }}
              name="name"
              fullWidth={true}
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
                minLength: Validator.minLength(3),
                maxLength: Validator.maxLength(12),
                pattern: Validator.name,
              })}
            />
          </Grid>
          {isMaster && (
            <>
              <Grid item marginTop={3} sx={{ width: 300 }}>
                {
                  <Typography color={"red"}>
                    {errors?.surname && errors?.surname.message}
                  </Typography>
                }
                <TextField
                  margin="normal"
                  type={"text"}
                  variant="outlined"
                  placeholder="Фамилия"
                  sx={{ backgroundColor: "white" }}
                  name="surname"
                  fullWidth={true}
                  {...register("surname", {
                    required: `${t("adminPopup.emptyField")}`,
                    minLength: Validator.minLength(3),
                    maxLength: Validator.maxLength(12),
                    pattern: Validator.name,
                  })}
                />
              </Grid>
            </>
          )}
          <Grid item marginTop={3} sx={{ width: 300, alignContent: "center" }}>
            {
              <Typography color={"red"}>
                {errors?.email && errors?.email.message}
              </Typography>
            }
            <TextField
              margin="normal"
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
          <Grid item marginTop={3} sx={{ width: 300, alignContent: "center" }}>
            {
              <Typography color={"red"}>
                {errors?.password && errors?.password.message}
              </Typography>
            }
            <TextField
              margin="normal"
              type={passwordType}
              variant="outlined"
              placeholder="Пароль"
              sx={{ backgroundColor: "white" }}
              name="password"
              fullWidth={true}
              {...register("password", {
                required: `${t("adminPopup.emptyField")}`,
                minLength: Validator.minLength(5),
                maxLength: Validator.maxLength(15),
                pattern: Validator.password,
              })}
            />
            <VisibilityIcon
              sx={{ position: "absolute", marginTop: "30px" }}
              onClick={() => {
                changePasswordType();
              }}></VisibilityIcon>
          </Grid>
          {isMaster && (
            <Grid
              item
              marginTop={3}
              sx={{ width: 300, alignContent: "center" }}>
              <InputLabel variant="standard" htmlFor="townId">
                Город
              </InputLabel>
              <NativeSelect
                inputProps={{
                  name: "townId",
                  id: "townId",
                }}
                style={{ width: 300 }}
                {...register("townId", {
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
              sx={{ width: 200 }}
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
              sx={{ width: 200 }}
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
