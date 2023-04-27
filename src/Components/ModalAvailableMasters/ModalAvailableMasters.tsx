import React from "react";
import style from "../../scale.module.css";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Typography } from "@mui/material";
import AvailableMastersForm from "./AvailableMastersForm";
import modalWrapperStyle from "../../Components/Modals/ModalWrapper.module.css";

const ModalAvailableMasters = ({ data, result, onClose }) => {
  const { t } = useTranslation();
  const masterListItem = data.masters.map((item) => {
    return (
      <AvailableMastersForm
        data={item}
        key={item.id}
        orderData={data}
        result={result}
        onClose={onClose}
      />
    );
  });
  return (
    <div className={modalWrapperStyle.modalWrapper}>
      <div className={style.active}>
        <form>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={800}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
              backgroundColor: "#a0a0a0",

              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography variant="h4" padding={3} textAlign="center">
                  Свободные мастера
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <CloseIcon onClick={onClose} />
              </Grid>
            </Grid>
            <Grid container>
              {masterListItem.length !== 0 ? (
                masterListItem
              ) : (
                <Typography>{t("available.emptyHeader")}</Typography>
              )}
            </Grid>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ModalAvailableMasters;
