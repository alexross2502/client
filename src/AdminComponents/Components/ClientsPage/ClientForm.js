import React, { useState } from "react";
import style from "../../AdminPage.module.css";
import { useForm } from "react-hook-form";
import { DeleteButton } from "../DeleteButton";

export function ClientForm(props) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [name, setName] = useState(props.data.name);
  const [email, setEmail] = useState(props.data.email);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <form>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          {...register("firstName", {
            value: name,
            onChange: () => handleNameChange,
          })}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.inputText}
          type="text"
          {...register("email", {
            value: email,
            onChange: () => handleEmailChange,
          })}
        ></input>
      </div>
      <DeleteButton
        buttonType="deleteButton"
        id={props.data.id}
        url="clients"
      />
    </form>
  );
}
