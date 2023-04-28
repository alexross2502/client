import React from "react";
import { Box, Typography } from "@mui/material";
import { errorModalColor, successModalColor } from "../../styles/styles";

type TProps = {
  message: string;
  onClose: (data?: any) => void;
  type: string;
};

const ErrorAndSuccessModal = ({ message, onClose, type }: TProps) => {
  const style = {
    position: "fixed",
    top: "100%",
    left: "100%",
    transform: "translate(-100%, -100%)",
    bgcolor: type === "success" ? successModalColor : errorModalColor,
    zIndex: 9999,
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
