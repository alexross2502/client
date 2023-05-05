import { Grid, Typography } from "@mui/material";
import React from "react";
import { instance } from "../../AdminComponents/axios-utils";

const AvailableMastersForm = ({ data: master, orderData, result, onClose }) => {
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
    images: orderData.images,
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
            result({
              type: "success",
              message: "Заказ создан, письмо отправленно",
            });
          })
          .catch((err) => {
            result({
              type: "error",
              message: "Невозможно создать данный заказ",
            });
          })
          .finally(onClose);
      }}
    >
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          {data.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          {data.surname}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" padding={3} textAlign="center">
          Рейтинг: {data.rating}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AvailableMastersForm;
