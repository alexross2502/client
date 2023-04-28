import { instance, InstanceResponse } from "../../axios-utils";
import style from "../../../scale.module.css";
import modalWrapperStyle from "../../../Components/Modals/ModalWrapper.module.css";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { RootState } from "../../../redux/rootReducer";
import { rating, Validator } from "../../../utils/constants";
import { modalBoxStyle, redSaveButtonStyle } from "../../../styles/styles";

const MasterSave = (props) => {
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
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns.data);
    };
    asyncFunc();
  }, [rerender]);

  /////Сохранение нового мастера
  const [pending, setPending] = useState(false);
  async function masterSave(atr) {
    let data = { ...atr };
    setPending(true);
    await instance({ url: `/masters`, method: "post", data: data })
      .then(() => {
        dispatch(setPageRerender());
        props.result({ type: "success", message: "Новый мастер добавлен" });
      })
      .catch(() => {
        props.result({
          type: "error",
          message: "Невозможно добавить такого мастера",
        });
      })
      .finally(() => {
        setPending(false);
        props.onClose();
      });
  }
  ///////////
  return (
    <>
      <div className={modalWrapperStyle.modalWrapper}>
        <div className={style.active}>
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
              sx={modalBoxStyle}>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Typography variant="h4" padding={3} textAlign="center">
                    Добавить мастера
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <CloseIcon onClick={props.onClose} />
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
                placeholder="Имя"
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
                {...register("surname", {
                  required: `${t("adminPopup.emptyField")}`,
                  minLength: Validator.minLength(3),
                  maxLength: Validator.maxLength(12),
                  pattern: Validator.name,
                })}
              />
              {
                <Typography color={"red"}>
                  {errors?.email && errors?.email.message}
                </Typography>
              }
              <TextField
                margin="normal"
                type={"text"}
                variant="outlined"
                placeholder="Почта"
                sx={{ backgroundColor: "white" }}
                name="email"
                {...register("email", {
                  required: `${t("adminPopup.emptyField")}`,
                  minLength: Validator.minLength(10),
                  maxLength: Validator.maxLength(30),
                  pattern: Validator.email,
                })}
              />
              {
                <Typography color={"red"}>
                  {errors?.password && errors?.password.message}
                </Typography>
              }
              <TextField
                margin="normal"
                type={"text"}
                variant="outlined"
                placeholder="Пароль"
                sx={{ backgroundColor: "white" }}
                name="password"
                {...register("password", {
                  required: `${t("adminPopup.emptyField")}`,
                  minLength: Validator.minLength(5),
                  maxLength: Validator.maxLength(15),
                  pattern: Validator.password,
                })}
              />
              <Grid item marginTop={3}>
                <InputLabel variant="standard" htmlFor="rating">
                  Рейтинг
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "rating",
                    id: "rating",
                  }}
                  style={{ width: 200 }}
                  {...register("rating", {
                    required: `${t("adminPopup.emptyField")}`,
                  })}>
                  {rating.map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
                </NativeSelect>
              </Grid>
              <Grid item marginTop={3}>
                <InputLabel variant="standard" htmlFor="townId">
                  Город
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "townId",
                    id: "townId",
                  }}
                  style={{ width: 200 }}
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
              <Button
                sx={redSaveButtonStyle}
                variant="contained"
                color="warning"
                type="submit"
                disabled={pending}>
                Добавить
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default MasterSave;
