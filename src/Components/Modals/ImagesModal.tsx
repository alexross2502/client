import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Api from "../../AdminComponents/Components/api";
import { setPageRerender } from "../../redux/rerenderReducer";
import css from "../../Components/Modals/ModalWrapper.module.css";
import { useDispatch } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#c9c9cc",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 999,
};



const ImagesModal = ({
  onClose,
  url
}) => {
    console.log(url)
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  return (
    <div className={css.modalWrapper} onClick={onClose}>
       <Box
          sx={style}
          onClick={(e) => {
            e.stopPropagation();
          }}>
        <Grid container>
        <ImageList sx={{ width: 550, height: 450 }} cols={1}>
      {url?.map((item) => (
        <ImageListItem
          key={item.url}
          sx={{ border: "2px solid black", position: "relative" }}>
          <img
            src={`${item.url}`}
            srcSet={`${item.url}`}
            alt=""
            loading="lazy"
          />
         
        </ImageListItem>
      ))}
    </ImageList>
        </Grid>
      </Box>
    </div>
  );
};

export default ImagesModal;
