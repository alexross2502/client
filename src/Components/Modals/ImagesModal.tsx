import React, { useEffect } from "react";
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
import { InstanceResponse, instance } from "../../AdminComponents/axios-utils";
import { Watch } from "react-loader-spinner";

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
  reservationId
}) => {
    useEffect(()=>{
        fetchImages(reservationId)
      },[])
    
    const [imagesList, setImagesList] =
    useState<InstanceResponse | []>();
  const [pending, setPending] = useState(true);
  async function fetchImages(id) {
    setPending(true)
    await instance({url:'reservation/images', data:{id}, method: 'POST'})
    .then(res=>{
      setImagesList(res)
      setPending(false)
    })
  }

  
  
  return (
    <>
        {pending 
        ? (
            <Grid
                  sx={{ position: "fixed", left: "50%", marginTop: "45%" }}>
                  <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </Grid>
        )
    : (
        <div className={css.modalWrapper} onClick={onClose}>
        <Box
        sx={style}
        onClick={(e) => {
          e.stopPropagation();
        }}>
      <Grid container>
      <ImageList sx={{ width: 550, height: 450 }} cols={1}>
    {imagesList?.map((item) => (
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
    )
    }
      
      </>
  );
};

export default ImagesModal;
