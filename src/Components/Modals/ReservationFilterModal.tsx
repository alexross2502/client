import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import css from "../../Components/Modals/ModalWrapper.module.css";
import { useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
//import useAutocomplete from "@material-ui/lab/useAutocomplete";
import NoSsr from "@material-ui/core/NoSsr";
//import CheckIcon from "@material-ui/icons-material/Check";
//import CloseIcon from "@material-ui/icons-material/Close";
import styled from "styled-components";
import { statusVariant } from "../../utils/constants";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#c9c9cc",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TProps = {
  onClose: () => void;
  towns: any;
  clients: any;
  masters: any;
};

const ReservationFilterModal = ({
  onClose,
  towns,
  clients,
  masters,
  filterStateHandler,
  initialState,
}) => {
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
  const [pending, setPending] = useState(false);
  const statusOptions = Object.values(statusVariant);

  function getValueFromState(field) {
    const value = filterStateHandler.get();
    console.log(value[field]);
    return value[field];
  }

  console.log(initialState.client, "initial");
  //console.log(initialState, 'initial');

  return (
    <div className={css.modalWrapper}>
      <Box sx={style}>
        <Grid container direction={"column"}>
          <Grid item>
            <Autocomplete
              id="master"
              options={masters}
              //defaultValue={`${initialState.master}`}
              getOptionLabel={(option: { name }) => {
                console.log(option, "ssss");
                return option.name;
              }}
              style={{ width: 300 }}
              value={getValueFromState("master")}
              blurOnSelect={false}
              freeSolo={true}
              onChange={(event, newValue) => {
                filterStateHandler.set("master", newValue.name);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Мастера" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="client"
              options={clients}
              getOptionLabel={(option: { name }) => {
                console.log(option, "ssss");
                return option.name;
              }}
              //defaultValue={initialState.client}
              style={{ width: 300 }}
              blurOnSelect={false}
              freeSolo={true}
              onChange={(event, newValue) => {
                console.log(newValue);
                //filterStateHandler.set("client", newValue.name);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Клиенты" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="town"
              options={towns}
              getOptionLabel={(option: { name: string }) => option.name}
              style={{ width: 300 }}
              value={getValueFromState("town")}
              blurOnSelect={false}
              freeSolo={true}
              onChange={(event, newValue) => {
                console.log(newValue);
                filterStateHandler.set("town", newValue.name);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Города" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="status"
              options={statusOptions}
              getOptionLabel={(option) => t(`status.${option}`)}
              style={{ width: 300 }}
              value={getValueFromState("status")}
              blurOnSelect={false}
              freeSolo={true}
              onChange={(event, newValue) => {
                filterStateHandler.set("status", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Статус" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justifyContent="center">
              <Button
                sx={{
                  background: "#82c434",
                  marginTop: 3,
                  borderRadius: 3,
                  padding: 1,
                  paddingLeft: 4,
                  paddingRight: 4,
                  display: "inline-block",
                }}
                variant="contained"
                color="warning"
                disabled={pending}
                onClick={() => {
                  console.log(filterStateHandler.get());
                }}
              >
                Применить
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center">
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
                disabled={pending}
                onClick={() => {
                  onClose();
                  console.log(filterStateHandler.get());
                }}
              >
                Отменить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ReservationFilterModal;
