import { Grid, Typography } from "@mui/material";
import React from "react";
import { instance } from "../../AdminComponents/axios-utils";

const AvailableMastersForm = (props) => {
  const [master, orderData] = [props.data, props.orderData];
  let data = {
    day: orderData.day,
    size: orderData.size,
    master_id: master.id,
    towns_id: orderData.towns_id,
    recipient: orderData.recipient,
    name: master.name,
    surname: master.surname,
    rating: master.rating,
    clientName: orderData.clientName,
  };

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
          .then((res) => {
            props.result({
              type: "success",
              message: "Заказ создан, письмо отправленно",
            });
          })
          .catch((err) => {
            props.result({ type: "error", message: "Ошибка" });
          })
          .finally(props.onClose);
      }}>
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
