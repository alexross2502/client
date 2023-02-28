import style from "../scale.module.css";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setRemoveAndAddModal } from "../redux/RemoveAndAddModalReducer";

const RemoveAndAddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.removeAndAdd.isActive);

  return (
    <Box
      className={isActive ? `${style.active}` : `${style.inactive}`}
      width={120}
      height={80}
      justifyContent={"center"}
      margin="auto"
      borderRadius={5}
      sx={{
        backgroundColor: "#f3f7c8",
      }}
      position="absolute"
    >
      <Grid container>
        <Typography variant="h6" padding={3} textAlign="center">
          Готово
        </Typography>
      </Grid>
    </Box>
  );
};

export default RemoveAndAddModal;
