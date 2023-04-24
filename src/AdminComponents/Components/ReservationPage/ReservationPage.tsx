import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setModalAddReservations } from "../../../redux/reservationsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../DeleteModal";
import { setModalDelete } from "../../../redux/deleteReducer";
import { Watch } from "react-loader-spinner";
import RemoveAndAddModal from "../../RemoveAndAddModal";
import RemoveAndAddModalError from "../../RemoveAndAddModalError";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import { InstanceResponse } from "../../axios-utils";
import { dateConverter } from "../dateConverter";
import { priceFormatterToFloat } from "../../../utils/priceFormatterToFloat";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>([]);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>([]);
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [reservationList, setReservationList] = useState<
    InstanceResponse | []
  >();
  const [itemForRemove, setItemForRemove] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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
      <DeleteModal props={itemForRemove} />
      <ReservationSave />
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
                <TableCell align="left">Статус</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(setModalAddReservations());
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
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove([row.id, "reservation"]);
                          dispatch(setModalDelete());
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
      <RemoveAndAddModal />
      <RemoveAndAddModalError />
    </>
  );
};

export default ReservationPage;
