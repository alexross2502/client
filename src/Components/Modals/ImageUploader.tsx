import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ClearIcon from "@mui/icons-material/Clear";

export default function ImageUploader(props) {
  const { itemData, handleFileInputDelete } = props;
  return (
    <ImageList sx={{ width: 300, height: 450 }} cols={1}>
      {itemData?.map((item) => (
        <ImageListItem
          key={item.id}
          sx={{ border: "2px solid black", position: "relative" }}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt=""
            loading="lazy"
          />
          <ClearIcon
            sx={{ position: "absolute", cursor: "pointer" }}
            id={item.id}
            onClick={() => {
              handleFileInputDelete(item.id);
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
