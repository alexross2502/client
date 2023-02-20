import React from "react";
import style from "../../AdminPage.module.css";
import { useForm } from "react-hook-form";
import { DeleteButton } from "../DeleteButton";
import { Grid } from "@mui/material";

export function TownForm(props) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <Grid>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          defaultValue={props.data.name}
        ></input>
      </div>
      <DeleteButton buttonType="deleteButton" id={props.data.id} url="towns" />
    </Grid>
  );
}
