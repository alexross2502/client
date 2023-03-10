import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import { useForm } from "react-hook-form";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReservationSave, { reservationSave } from "./reservationSave";
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
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setModalAddReservations } from "../../../redux/reservationsReducer";
import { DataGrid } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../DeleteModal";
import { setModalDelete } from "../../../redux/deleteReducer";
import { Watch } from "react-loader-spinner";
import RemoveAndAddModal from "../../RemoveAndAddModal";
import { timestampToDate } from "../dateConverter";
import RemoveAndAddModalError from "../../RemoveAndAddModalError";
import CopyIcon from "../CopyIcon";
import repairTime from "../repairTime.json";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState([]);
  const [mastersList, setMastersList] = useState([]);
  const [townsList, setTownsList] = useState([]);
  const [reservationList, setReservationList] = useState();
  const [itemForRemove, setItemForRemove] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let clients = await Api.getAll("clients");
      setClientsList(clients);
      let masters = await Api.getAll("masters");
      setMastersList(masters);
      let towns = await Api.getAll("towns");
      setTownsList(towns);
      let reservation = await Api.getAll("reservation");
      reservation.forEach((el) => {
        el.end = `${new Date(el.day).getHours()}-${
          new Date(el.day).getHours() + repairTime[el.size]
        }`;
        el.day = new Date(el.day).toLocaleString("ru", options);
      });

      setReservationList(reservation);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  //???????????? ?????? ?????????????????????? ???????? ??????????????, ????????????????, ????????????????, ?? ???? ????????????????????
  let IdToName = {};
  townsList.forEach((el) => {
    IdToName[el.id] = el?.name;
  });
  clientsList.forEach((el) => {
    IdToName[el.id] = el?.name;
  });
  mastersList.forEach((el) => {
    IdToName[el.id] = el?.name;
  });
  ////////////////////////////////////////
  ///////?????????? ?????????????????????? ????????
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  };
  //////////////////

  return (
    <>
      <DeleteModal props={itemForRemove} />
      <ReservationSave />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"reservation"} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>?????????? ??????????????</TableCell>
                <TableCell align="left">????????</TableCell>
                <TableCell align="left">????????????</TableCell>
                <TableCell align="left">??????????</TableCell>
                <TableCell align="left">????????????</TableCell>
                <TableCell align="left">??????????</TableCell>
                <TableCell align="left">????????????</TableCell>
                <TableCell align="right">
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
              {reservationList == undefined ? (
                <Grid
                  sx={{ position: "absolute", left: "50%", marginTop: "20px" }}
                >
                  <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </Grid>
              ) : (
                reservationList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        className={style.clue}
                        data-clue={`${row.id}`}
                      >
                        {row.id.slice(0, 15) + "..."}
                      </Typography>
                      <CopyIcon data={row.id} />
                    </TableCell>
                    <TableCell align="left">{row.day}</TableCell>
                    <TableCell align="left">{row.size}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                    <TableCell align="left">
                      {IdToName[row.master_id]}
                    </TableCell>
                    <TableCell align="left">{IdToName[row.towns_id]}</TableCell>
                    <TableCell align="left">{IdToName[row.clientId]}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove([row.id, "reservation"]);
                          dispatch(setModalDelete());
                          dispatch(setPageRerender());
                        }}
                      >
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <RemoveAndAddModal />
      <RemoveAndAddModalError />
    </>
  );
};

export default ReservationPage;
