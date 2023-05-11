import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

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
  filterStateHandler: () => any;
  initialState: any;
};

const ReservationFilterModal = ({
  onClose,
  towns,
  clients,
  masters,
  filterStateHandler,
  initialState,
  sendRequestFunction,
}) => {
  // console.log(towns);
  // console.log(clients);

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
  const statusOptions = Object.values(statusVariant);
  const [state, setState] = useState(initialState);

  function getValueFromState(field) {
    const value = filterStateHandler.get();
    console.log(value[field]);
    return value[field];
  }

  return (
    <div className={css.modalWrapper}>
      <Box sx={style}>
        <Grid container direction={"column"}>
          <Grid item>
            <Autocomplete
              id="master"
              options={masters}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              value={state.master}
              blurOnSelect={false}
              onChange={(event, newValue) => {
                setState({ ...state, master: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Мастер" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              multiple
              id="town"
              options={towns}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              value={state.town}
              blurOnSelect={false}
              onChange={(event, newValue) => {
                setState({ ...state, town: newValue });
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
              value={state.status}
              blurOnSelect={false}
              onChange={(event, newValue) => {
                setState({ ...state, status: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Статус" variant="outlined" />
              )}
            />
          </Grid>
          <Grid container alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ width: 300 }}
                label="С:"
                value={state.start}
                onChange={(newValue) => {
                  setState({
                    ...state,
                    start: newValue.getTime(),
                  });
                }}
              />
            </LocalizationProvider>
            <RemoveCircleOutlineIcon
              onClick={() => {
                setState({
                  ...state,
                  start: null,
                });
              }}
            />
          </Grid>
          <Grid container alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ width: 300 }}
                value={state.end}
                label="По:"
                onChange={(newValue) => {
                  setState({
                    ...state,
                    end: newValue.getTime(),
                  });
                }}
              />
            </LocalizationProvider>
            <RemoveCircleOutlineIcon
              onClick={() => {
                setState({
                  ...state,
                  end: null,
                });
              }}
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
                onClick={() => {
                  filterStateHandler.setAll(state);
                  sendRequestFunction();
                  onClose();
                }}>
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
                onClick={() => {
                  filterStateHandler.reset();
                  sendRequestFunction();
                  onClose();
                }}>
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
