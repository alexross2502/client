import { Grid, Typography } from "@mui/material";

const AvailableMastersForm = (props) => {
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
