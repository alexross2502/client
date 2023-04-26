import style from "../../scale.module.css";
import modalWrapperStyle from "../../Components/Modals/ModalWrapper.module.css";
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setAuthorized } from "../../redux/authorizationReducer";
import { authCheck } from "./authCheck";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { loginSwitchCase } from "../../utils/loginSwitchCase";
import { Validator } from "../../utils/constants";
import { modalBoxStyle } from "../../styles/styles";

type IProps = {
  onClose: () => void;
  result: (data) => void;
};

const ModalAuthorization = (props: IProps) => {
  const { onClose, result } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [pending, setPending] = useState<boolean>(false);

  async function authController(data) {
    setPending(true);
    await authCheck(data)
      .then((res) => {
        dispatch(setAuthorized(true));
        navigate(loginSwitchCase(res.token));
      })
      .catch(() => {
        reset();
        result({ type: "error", message: "Неверный логин или пароль" });
      })
      .finally(() => {
        setPending(false);
      });
  }
  ///Глазик в пароле
  let [passwordType, setPasswordType] = useState("password");
  function changePasswordType() {
    dispatch(
      setPasswordType(passwordType === "password" ? "text" : "password")
    );
  }

  return (
    <div className={modalWrapperStyle.modalWrapper}>
      <div className={style.active}>
        <form onSubmit={handleSubmit(authController)}>
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
                  Вход
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <CloseIcon onClick={onClose} />
              </Grid>
            </Grid>
            {
              <Typography color={"red"}>
                {errors?.email && errors?.email.message}
              </Typography>
            }
            <TextField
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="Логин"
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
            <Box>
              <TextField
                margin="normal"
                type={passwordType}
                variant="outlined"
                placeholder="Пароль"
                sx={{ backgroundColor: "white" }}
                name="password"
                {...register("password", {
                  required: `${t("adminPopup.emptyField")}`,
                  minLength: Validator.minLength(5),
                  maxLength: Validator.maxLength(15),
                  pattern: Validator.password,
                })}></TextField>

              <VisibilityIcon
                sx={{ position: "absolute", marginTop: "30px" }}
                onClick={() => {
                  changePasswordType();
                }}></VisibilityIcon>
            </Box>

            <Button
              sx={{
                background: "rgba(180,58,58,1)",
                marginTop: 3,
                borderRadius: 3,
                padding: 1,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              disabled={pending}
              variant="contained"
              color="warning"
              type="submit">
              Войти
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ModalAuthorization;
