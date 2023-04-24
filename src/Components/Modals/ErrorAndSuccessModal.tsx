import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Api from "../../AdminComponents/Components/api";
import { setPageRerender } from "../../redux/rerenderReducer";
import { setRemoveAndAddModal } from "../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../redux/RemoveAndAddModalErrorReducer";
import css from "../../Components/Modals/ModalWrapper.module.css";
import { useDispatch } from "react-redux";

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
  zIndex: 999,
};

const ErrorAndSuccessModal = (props) => {
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

  return (
    <Box sx={style}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h6" padding={3} textAlign="center">
            Точно удалить?
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ErrorAndSuccessModal;
