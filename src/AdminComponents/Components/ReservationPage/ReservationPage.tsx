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
  TableFooter,
  TablePagination,
  TableSortLabel,
  Chip,
  Input,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import { Watch } from "react-loader-spinner";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import { InstanceResponse, instance } from "../../axios-utils";
import { dateConverter } from "../dateConverter";
import { priceFormatterToFloat } from "../../../utils/priceFormatterToFloat";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";
import EditIcon from "@mui/icons-material/Edit";
import ChangeStatusModal from "../../../Components/Modals/ChangeStatusModal";
import { redAddButtonStyle } from "../../../styles/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImagesModal from "../../../Components/Modals/ImagesModal";
import {
  RESERVATION_SORTED_FIELDS,
  SORTING_ORDER,
} from "../../../utils/constants";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReservationFilterModal from "../../../Components/Modals/ReservationFilterModal";

const ReservationPage = () => {
  const { t } = useTranslation();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>([]);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>([]);
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [reservationList, setReservationList] = useState<
    InstanceResponse | []
  >();
  const [totalReservations, setTotalReservations] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [itemForRemove, setItemForRemove] = useState<{
    id: string;
    url: string;
  }>();
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
  const [isImagesModalActive, setImagesModalActive] = useState<boolean>(false);

  const [reservationIdForImages, setReservationIdForImages] = useState();
  const [sortedField, setSortedField] = useState<string>("id");
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("asc");
  const [isFilterTabActive, setFilterTabActive] = useState<boolean>(false);

  const [filterState, setFilterState] = useState({
    day: null,
    master: null,
    size: null,
    time: null,
    town: null,
    client: null,
    price: null,
    status: null,
    image: null,
  });

  const handleRequestSort = (field) => {
    const isAsc = sortedField === field && sortingOrder === SORTING_ORDER.ASC;
    setSortingOrder(isAsc ? SORTING_ORDER.DESC : SORTING_ORDER.ASC);
    setSortedField(field);
  };

  const filterStateHandler = {
    get: function () {
      console.log();
      return filterState;
    },
    set: function (field, value) {
      setFilterState({ ...filterState, [field]: value });
    },
    // reset: function () {
    //   Object.keys(filterState).forEach((el) => (el = null));
    // },
  };

  function filterTabActiveHandler() {
    setFilterTabActive(!isFilterTabActive);
  }

  function changeStatusModalHandler() {
    setChangeStatusModalActive(!isChangeStatusModalActive);
  }

  function reservationSaveModalHandler() {
    setReservationSaveModalActive(!isReservationSaveModalActive);
  }

  function deleteModalHandler() {
    setDeleteModalActive(!isDeleteModalActive);
  }

  function imagesModalHandler() {
    setImagesModalActive(!isImagesModalActive);
  }

  function errorAndSuccessModalHandler(data) {
    setErrorAndSuccessModalData(data);
    setErrorAndSuccessModalActive(!isErrorAndSuccessModalActive);
  }

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let clients = await Api.getAll("clients");
      setClientsList(clients.data);
      let masters = await Api.getAll("masters");
      setMastersList(masters.data);
      let towns = await Api.getAll("towns");
      setTownsList(towns.data);
      let reservation: any = await Api.getAll("reservation", {
        offset: rowsPerPage * page,
        limit: rowsPerPage,
        sortedField,
        sortingOrder,
      });
      reservation?.data.forEach((el) => {
        new Date(el.day) > new Date()
          ? (el.editStatus = true)
          : (el.editStatus = false);
        dateConverter(el);
      });
      setReservationList(reservation.data);
      setTotalReservations(reservation.total);
      setLoading(false);
    };
    asyncFunc();
  }, [
    rerender,
    page,
    rowsPerPage,
    totalReservations,
    sortedField,
    sortingOrder,
  ]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  //Объект для отображения имен городов, клиентов, мастеров, а не айдишников
  let IdToName = {};
  townsList?.forEach((el) => {
    IdToName[el.id] = el?.name;
  });
  clientsList?.forEach((el) => {
    IdToName[el.id] = el?.name;
  });
  mastersList?.forEach((el) => {
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
                <TableCell sx={{ minWidth: "200px" }}>Номер резерва</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.DAY}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.DAY
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.DAY);
                    }}>
                    День
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.SIZE}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.SIZE
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.SIZE);
                    }}>
                    Размер
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Время</TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.MASTER}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.MASTER
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.MASTER);
                    }}>
                    Мастер
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.TOWN}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.TOWN
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.TOWN);
                    }}>
                    Город
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.CLIENT}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.CLIENT
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.CLIENT);
                    }}>
                    Клиент
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.PRICE}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.PRICE
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.PRICE);
                    }}>
                    Цена
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left" sx={{ minWidth: 140 }}>
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.STATUS}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.STATUS
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.STATUS);
                    }}>
                    Статус
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === RESERVATION_SORTED_FIELDS.IMAGES}
                    direction={
                      sortedField === RESERVATION_SORTED_FIELDS.IMAGES
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(RESERVATION_SORTED_FIELDS.IMAGES);
                    }}>
                    Изображения
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ width: "1500px" }}>
                  <FilterListIcon
                    color="primary"
                    cursor="pointer"
                    sx={{ fontSize: "30px" }}
                    onClick={filterTabActiveHandler}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={redAddButtonStyle}
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
                          cursor={"pointer"}
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
                    <TableCell align="center">
                      {row.images && (
                        <CameraAltIcon
                          cursor={"pointer"}
                          onClick={() => {
                            setReservationIdForImages(row.id);
                            imagesModalHandler();
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">
                      <IconButton
                        onClick={() => {
                          setItemForRemove({ id: row.id, url: "reservation" });
                          deleteModalHandler();
                        }}>
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {reservationList?.length !== 0 && !isLoading ? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    colSpan={7}
                    count={totalReservations}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "записей в строке",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </TableContainer>
      </Box>
      {isFilterTabActive && (
        <ReservationFilterModal
          onClose={filterTabActiveHandler}
          towns={townsList}
          masters={mastersList}
          clients={clientsList}
          filterStateHandler={filterStateHandler}
          initialState={filterState}
        />
      )}
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
      {isImagesModalActive && (
        <ImagesModal
          onClose={imagesModalHandler}
          reservationId={reservationIdForImages}
        />
      )}
    </>
  );
};

export default ReservationPage;
