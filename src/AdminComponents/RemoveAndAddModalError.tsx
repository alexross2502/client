import "../scale.module.css";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import React = require("react");
import { RootState } from "../redux/rootReducer";

const RemoveAndAddModalError = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Открытие\закрытие модального окна
  const isActive = useSelector(
    (state: RootState) => state.removeAndAddError.isActive
  );

  return (
    <Box
      className={isActive ? `${"active"}` : `${"inactive"}`}
      width={120}
      height={80}
      justifyContent={"center"}
      margin="auto"
      borderRadius={5}
      sx={{
        backgroundColor: "#FF0000",
      }}
      position="absolute"
    >
      <Grid container>
        <Typography variant="h6" padding={3} textAlign="center">
          Ошибка
        </Typography>
      </Grid>
    </Box>
  );
};

export default RemoveAndAddModalError;
