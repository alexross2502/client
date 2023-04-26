import React from "react";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import css from "../../Components/Modals/ModalWrapper.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { statusVariant } from "../../utils/constants";
import { instance } from "../../AdminComponents/axios-utils";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "#c9c9cc",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 10000,
};

const ChangeStatusModal = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(`${props.props.status}`);
  const handleChange = async (event) => {
    setValue((event.target as HTMLInputElement).value);
    await instance({
      url: "/masters/changestatus",
      data: {
        id: props.props.id,
        status: event.target.value,
      },
      method: "PUT",
    })
      .then((res) => {
        props.result({ type: "success", message: "Успешно" });
      })
      .catch((e) => {
        props.result({ type: "error", message: "Ошибка" });
      })
      .finally(props.onClose);
  };

  function statusList() {
    return Object.values(statusVariant).map((el) => {
      return (
        <FormControlLabel
          key={el}
          value={el}
          control={<Radio />}
          label={t(`status.${el}`)}
        />
      );
    });
  }

  return (
    <>
      <div className={css.modalWrapper} onClick={props.onClose}>
        <Box
          sx={style}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Grid container>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Выберите статус
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onClick={handleChange}>
                {statusList()}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ChangeStatusModal;
