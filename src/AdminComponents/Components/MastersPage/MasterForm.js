import React from "react";
import style from "../../AdminPage.module.css";
import { useForm } from "react-hook-form";
import { DeleteButton } from "../DeleteButton";
import { Grid } from "@mui/material";

export function MasterForm(props) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <form>
      <Grid container>
        <Grid item>dsasd</Grid>
      </Grid>
    </form>
  );
}
