import "../scale.module.css";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import React = require("react");
import { RootState } from "../redux/rootReducer";

const RemoveAndAddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Открытие\закрытие модального окна
  const isActive = useSelector(
    (state: RootState) => state.removeAndAdd.isActive
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
