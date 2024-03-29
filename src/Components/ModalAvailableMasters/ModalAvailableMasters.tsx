import React from "react";
import style from "../../scale.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Typography } from "@mui/material";
import AvailableMastersForm from "./AvailableMastersForm";
import { RootState } from "../../redux/rootReducer";

const ModalAvailableMasters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //const [finaleMasters, setFinaleMasters] = useState();
  const orderData = useSelector(
    (state: RootState) => state.availableMasters.masters
  );

  //Открытие\закрытие модального окна
  const isActive = useSelector(
    (state: RootState) => state.modalMasters.isActive
  );

  const masterListItem = orderData?.flat().map((item) => {
    return <AvailableMastersForm data={item} key={item.id} />;
  });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={isActive ? `${style.active}` : `${style.inactive}`}
    >
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
          }}
        >
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" padding={3} textAlign="center">
                Свободные мастера
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon
                onClick={() => {
                  dispatch(setModalMasters());
                }}
              />
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
  );
};

export default ModalAvailableMasters;
