import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Api from "../../AdminComponents/Components/api";
import { setPageRerender } from "../../redux/rerenderReducer";
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

const DeleteModal = (props) => {
  const {
    onClose,
    result,
    props: [id, url],
  } = props;
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  return (
    <>
      <div className={css.modalWrapper}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" padding={3} textAlign="center">
                Точно удалить?
              </Typography>
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
                    setPending(true);
                    Api.delete(url, id)
                      .then((res) => {
                        dispatch(setPageRerender());
                        result({
                          type: "success",
                          message: "Запись успешно удалена",
                        });
                      })
                      .catch((e) => {
                        result({
                          type: "error",
                          message: e.response.data.message.includes(
                            "Cannot delete or update a parent row"
                          )
                            ? "От этой записи зависят другие"
                            : "Невозможно удалить запись",
                        });
                      })
                      .finally(() => {
                        setPending(false);
                        onClose();
                      });
                  }}>
                  Да
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
                  onClick={onClose}>
                  Нет
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default DeleteModal;
