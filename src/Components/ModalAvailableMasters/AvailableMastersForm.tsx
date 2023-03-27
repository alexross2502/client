import { Grid, Typography } from "@mui/material";
import React = require("react");
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../AdminComponents/axios-utils";
import { setModalMasters } from "../../redux/modalMastersReducer";
import { RootState } from "../../redux/rootReducer";

const AvailableMastersForm = (props) => {
  let dispatch = useDispatch();
  let orderData = useSelector((state: RootState) => state.orderData.data);

  /////собираем нужные поля для запроса из разных мест
  let data = Object.assign(props.data, orderData[0]);
  data.master_id = data.id;

  return (
    <Grid
      container
      marginTop={2}
      sx={{
        backgroundColor: "#a1abaa",
        borderRadius: "20px",
        border: "1px solid green",

        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
      onClick={async () => {
        await instance({
          url: `/reservation/order`,
          method: "post",
          data: data,
        })
          .then(() => {
            dispatch(setModalMasters());
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          {props.data.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          {props.data.surname}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          Рейтинг: {props.data.rating}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AvailableMastersForm;
