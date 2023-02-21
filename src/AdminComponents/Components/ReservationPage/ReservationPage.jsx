import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import { useForm } from "react-hook-form";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reservationSave } from "./reservationSave";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Box } from "@mui/system";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let reservation = [...(await Api.getAll("reservation"))];
      setReservationList(reservation);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"reservation"} />
        <Box sx={{ height: 520, width: "100%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ background: "black", height: "40px" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.id")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.day")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.hours")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.master_id")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.towns_id")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.clientId")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                  >
                    {t("table.add")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservationList.map((el) => (
                <TableRow sx={{ borderBottom: "solid 2px black" }}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.day}</TableCell>
                  <TableCell>{el.hours}</TableCell>
                  <TableCell>{el.master_id}</TableCell>
                  <TableCell>{el.towns_id}</TableCell>
                  <TableCell>{el.clientId}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        Api.delete("reservation", el.props.data.id);
                        dispatch(setPageRerender());
                      }}
                    >
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default ReservationPage;
