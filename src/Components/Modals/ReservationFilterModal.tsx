import React, { useMemo } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import css from "../../Components/Modals/ModalWrapper.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import { statusVariant } from "../../utils/constants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { isEqual } from "lodash";
import { greenAcceptButton, redSaveButtonStyle } from "../../styles/styles";

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

const ReservationFilterModal = ({
  onClose,
  towns,
  masters,
  filterStateHandler,
  initialState,
  sendRequestFunction,
}) => {
  const { t } = useTranslation();
  const statusOptions = Object.values(statusVariant);
  const [state, setState] = useState(initialState);
  const [isAddButtonActive, setAddButtonActive] = useState<boolean>();

  useMemo(() => {
    setAddButtonActive(isEqual(state, initialState));
  }, [state]);

  return (
    <div className={css.modalWrapper}>
      <Box sx={style}>
        <Grid container direction={"column"}>
          <Grid container marginBottom={2} marginLeft={"10px"}>
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <CloseIcon onClick={onClose} />
            </Grid>
          </Grid>
          <Grid item marginBottom={4}>
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
          <Grid item marginBottom={4}>
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
          <Grid item marginBottom={4}>
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
          <Grid container alignItems="center" marginBottom={4}>
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
              sx={{ color: "red" }}
              onClick={() => {
                setState({
                  ...state,
                  start: null,
                });
              }}
            />
          </Grid>
          <Grid container alignItems="center" marginBottom={4}>
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
              sx={{ color: "red" }}
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
                sx={greenAcceptButton}
                variant="contained"
                disabled={isAddButtonActive}
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
                sx={redSaveButtonStyle}
                variant="contained"
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
