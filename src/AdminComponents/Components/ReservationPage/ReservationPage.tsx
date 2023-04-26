import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import Api from "../api";
import "react-datepicker/dist/react-datepicker.css";
import ReservationSave from "./reservationSave";
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
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import { Watch } from "react-loader-spinner";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import { InstanceResponse } from "../../axios-utils";
import { dateConverter } from "../dateConverter";
import { priceFormatterToFloat } from "../../../utils/priceFormatterToFloat";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";
import EditIcon from "@mui/icons-material/Edit";
import ChangeStatusModal from "../../../Components/Modals/ChangeStatusModal";

const ReservationPage = () => {
  const { t } = useTranslation();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>([]);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>([]);
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [reservationList, setReservationList] = useState<
    InstanceResponse | []
  >();
  const [itemForRemove, setItemForRemove] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleteModalActive, setDeleteModalActive] = useState<boolean>(false);
  const [isErrorAndSuccessModalActive, setErrorAndSuccessModalActive] =
    useState<boolean>(false);
  const [ErrorAndSuccessModalData, setErrorAndSuccessModalData] = useState({
    type: "",
    message: "",
  });
  const [isReservationSaveModalActive, setReservationSaveModalActive] =
    useState<boolean>(false);
  const [isChangeStatusModalActive, setChangeStatusModalActive] =
    useState<boolean>(false);
  const [changeStatusData, setChangeStatusData] = useState({
    id: "",
    status: "",
  });

  function changeStatusModalHandler() {
    setChangeStatusModalActive(!isChangeStatusModalActive);
  }

  function reservationSaveModalHandler() {
    setReservationSaveModalActive(!isReservationSaveModalActive);
  }

  function deleteModalHandler() {
    setDeleteModalActive(!isDeleteModalActive);
  }

  function errorAndSuccessModalHandler(data) {
    setErrorAndSuccessModalData(data);
    setErrorAndSuccessModalActive(!isErrorAndSuccessModalActive);
  }

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let clients = await Api.getAll("clients");
      setClientsList(clients);
      let masters = await Api.getAll("masters");
      setMastersList(masters);
      let towns = await Api.getAll("towns");
      setTownsList(towns);
      let reservation: any = await Api.getAll("reservation");
      reservation.forEach((el) => {
        new Date(el.day) > new Date()
          ? (el.editStatus = true)
          : (el.editStatus = false);
        dateConverter(el);
      });
      setReservationList(reservation);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  //Объект для отображения имен городов, клиентов, мастеров, а не айдишников
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

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"reservation"} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Номер резерва</TableCell>
                <TableCell align="left">День</TableCell>
                <TableCell align="left">Размер</TableCell>
                <TableCell align="left">Время</TableCell>
                <TableCell align="left">Мастер</TableCell>
                <TableCell align="left">Город</TableCell>
                <TableCell align="left">Клиент</TableCell>
                <TableCell align="left">Цена</TableCell>
                <TableCell align="left" sx={{ minWidth: 140 }}>
                  Статус
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      reservationSaveModalHandler();
                    }}>
                    {t("table.add")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <Grid
                  sx={{ position: "absolute", left: "50%", marginTop: "20px" }}>
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
              )}
              {reservationList?.length === 0 ? (
                <TableCell>
                  <Typography>Таблица пуста</Typography>
                </TableCell>
              ) : (
                reservationList?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography
                        className={style.clue}
                        data-clue={`${row.id}`}>
                        {row.id.slice(0, 15) + "..."}
                      </Typography>
                      <CopyIcon data={row.id} />
                    </TableCell>
                    <TableCell align="left">{row.day}</TableCell>
                    <TableCell align="left">{t(`size.${row.size}`)}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                    <TableCell align="left">
                      {IdToName[row.master_id]}
                    </TableCell>
                    <TableCell align="left">{IdToName[row.towns_id]}</TableCell>
                    <TableCell align="left">{IdToName[row.clientId]}</TableCell>
                    <TableCell align="left">
                      {priceFormatterToFloat(row.price)}
                    </TableCell>
                    <TableCell align="left">
                      {t(`status.${row.status}`)}
                      {row.editStatus && (
                        <EditIcon
                          onClick={() => {
                            changeStatusModalHandler();
                            setChangeStatusData({
                              id: row.id,
                              status: row.status,
                            });
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove([row.id, "reservation"]);
                          deleteModalHandler();
                        }}>
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
      {isChangeStatusModalActive && (
        <ChangeStatusModal
          props={changeStatusData}
          onClose={changeStatusModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
      {isDeleteModalActive && (
        <DeleteModal
          props={itemForRemove}
          onClose={deleteModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
      {isErrorAndSuccessModalActive && (
        <ErrorAndSuccessModal
          onClose={errorAndSuccessModalHandler}
          type={ErrorAndSuccessModalData?.type}
          message={ErrorAndSuccessModalData?.message}
        />
      )}
      {isReservationSaveModalActive && (
        <ReservationSave
          onClose={reservationSaveModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
    </>
  );
};

export default ReservationPage;
