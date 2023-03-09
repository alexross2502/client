import { instance } from "../../axios-utils";
import style from "../../../scale.module.css";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { setModalAddMasters } from "../../../redux/mastersReducer";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { setRemoveAndAddModal } from "../../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../../redux/RemoveAndAddModalErrorReducer";

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
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let towns = await Api.getAll("towns");
      setTownsList(towns);
    };
    asyncFunc();
  }, [rerender]);

  /////Сохранение нового мастера
  async function masterSave(atr) {
    let data = { ...atr };

    await instance({ url: `/masters`, method: "post", data: data })
      .then(() => {
        dispatch(setModalAddMasters());
        dispatch(setPageRerender());
        dispatch(setRemoveAndAddModal(true));
        setTimeout(() => {
          dispatch(setRemoveAndAddModal(false));
        }, 1000);
      })
      .catch(() => {
        dispatch(setRemoveAndAddModalError(true));
        dispatch(setModalAddMasters());
        setTimeout(() => {
          dispatch(setRemoveAndAddModalError(false));
        }, 1000);
      });
  }
  ///////////

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
                Добавить мастера
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon onClick={() => dispatch(setModalAddMasters())} />
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
              pattern: {
                value: /^[А-я]{2,20}$/,
                message: `${t("adminPopup.onlyCyrillic")}`,
              },
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
              pattern: {
                value: /^[А-я]{2,20}$/,
                message: `${t("adminPopup.onlyCyrillic")}`,
              },
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
              })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
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

export default MasterSave;
