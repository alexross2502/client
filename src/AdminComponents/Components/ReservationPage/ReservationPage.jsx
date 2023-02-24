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
import ReservationSave, { reservationSave } from "./reservationSave";
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
import { setModalAddReservations } from "../../../redux/reservationsReducer";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [reservationList, setReservationList] = useState([]);
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let myMap = new Map();
      let reservation = [...(await Api.getAll("reservation"))];
      setReservationList(reservation);
      let towns = [...(await Api.getAll("towns"))];
      towns.map((el) => {
        myMap.set(el.id, el.name);
      });
      let clients = [...(await Api.getAll("clients"))];
      clients.map((el) => {
        myMap.set(el.id, el.name);
      });
      let masters = [...(await Api.getAll("masters"))];
      masters.map((el) => {
        myMap.set(el.id, `${el.name} ${el.surname}`);
      });
      setIdList(myMap);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <ReservationSave />
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
                  Мастер
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  Город
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  Клиент
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(setModalAddReservations());
                    }}
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
                  <TableCell>{el.hours / 3600}</TableCell>
                  <TableCell>{idList[`${el.master_id}`]}</TableCell>
                  <TableCell>
                    {typeof idList == Map ? idList.get(el.towns_id) : "Loading"}
                  </TableCell>
                  <TableCell>
                    {typeof idList == Map ? idList.get(el.clientId) : "Loading"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        Api.delete("reservation", el.id);
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
