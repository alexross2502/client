import "../../scale.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Api from "./api";
import { setPageRerender } from "../../redux/rerenderReducer";
import { setModalDelete } from "../../redux/deleteReducer";
import { setRemoveAndAddModal } from "../../redux/RemoveAndAddModalReducer";
import { setRemoveAndAddModalError } from "../../redux/RemoveAndAddModalErrorReducer";
import React = require("react");
import { RootState } from "../../redux/rootReducer";

const DeleteModal = (props) => {
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
  const [pending, setPending] = useState<boolean>(false);
  //Открытие\закрытие модального окна
  const isActive = useSelector((state: RootState) => state.delete.isActive);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${"active"}` : `${"inactive"}`}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
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
              Точно удалить?
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <CloseIcon onClick={() => dispatch(setModalDelete())} />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Grid item sx={{ width: 6 }} margin={"auto"}>
            <Button
              sx={{
                background: "#82c434",
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
                setPending(true);
                let [id, url] = props.props;
                Api.delete(url, id)
                  .then((res) => {
                    dispatch(setPageRerender());
                    dispatch(setRemoveAndAddModal(true));
                    setTimeout(() => {
                      dispatch(setRemoveAndAddModal(false));
                    }, 1000);
                    setPending(false);
                    dispatch(setModalDelete());
                  })
                  .catch(() => {
                    dispatch(setRemoveAndAddModalError(true));
                    setTimeout(() => {
                      dispatch(setRemoveAndAddModalError(false));
                    }, 1000);
                    setPending(false);
                    dispatch(setModalDelete());
                  });
              }}
            >
              Да
            </Button>
          </Grid>
          <Grid item sx={{ width: 6 }} margin={"auto"}>
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
                dispatch(setModalDelete());
              }}
            >
              Нет
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DeleteModal;
