import React from "react";
import style from "../../AdminPage.module.css";

import { DeleteButton } from "../DeleteButton";

export function ReservationForm(props) {
  let busyHours;
  if (props.data.hours.split("-").length == 1) {
    busyHours = `${props.data.hours}:00-${+props.data.hours + 1}:00`;
  } else {
    busyHours = `${props.data.hours.split("-")[0]}:00-${
      +props.data.hours.split("-")[props.data.hours.split("-").length - 1] + 1
    }:00`;
  }
  return (
    <form>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          defaultValue={props.data.day}
          disabled
        ></input>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          defaultValue={busyHours}
          disabled
        ></input>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          disabled
          value={"Номер мастера : " + props.data.master_id}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          value={"Номер города : " + props.data.towns_id}
          disabled
        ></input>
      </div>
      <DeleteButton
        buttonType="deleteButton"
        id={props.data.id}
        url="reservation"
      />
    </form>
  );
}
