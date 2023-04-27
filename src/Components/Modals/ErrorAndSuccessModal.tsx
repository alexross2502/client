import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorAndSuccessModal = (props) => {
  const { message, onClose, type } = props;
  const style = {
    position: "fixed",
    top: "100%",
    left: "100%",
    transform: "translate(-100%, -100%)",
    bgcolor: type === "success" ? "#f3f7c8" : "#FF0000",
    zIndex: 1999,
  };

  setTimeout(() => {
    onClose();
  }, 2500);

  return (
    <Box sx={style}>
      <Typography
        padding={3}
        textAlign="center"
        sx={{ fontSize: "15px", padding: "10px" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorAndSuccessModal;
