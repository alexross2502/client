import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MasterSave from "./masterSave";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import Api from "../api";
import { Box } from "@mui/system";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
  TableRow,
  TableBody,
  IconButton,
  Typography,
  TablePagination,
  TableFooter,
  TableSortLabel,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import { Watch } from "react-loader-spinner";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import { instance, InstanceResponse } from "../../axios-utils";
import CachedIcon from "@mui/icons-material/Cached";
import UpdatePasswordModal from "../../../Components/Modals/UpdatePasswordModal";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";
import { redAddButtonStyle } from "../../../styles/styles";
import { MASTERS_SORTED_FIELDS, SORTING_ORDER } from "../../../utils/constants";

const MastersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>();
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [totalMasters, setTotalMasters] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [itemForRemove, setItemForRemove] = useState<{
    id: string;
    url: string;
  }>();
  const [itemForUpdatePassword, setItemForUpdatePassword] = useState<{
    email: string;
    url: string;
  }>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleteModalActive, setDeleteModalActive] = useState<boolean>(false);
  const [isUpdatePasswordModalActive, setUpdatePasswordModalActive] =
    useState<boolean>(false);
  const [isErrorAndSuccessModalActive, setErrorAndSuccessModalActive] =
    useState<boolean>(false);
  const [ErrorAndSuccessModalData, setErrorAndSuccessModalData] = useState({
    type: "",
    message: "",
  });
  const [isMasterSaveModalActive, setMasterSaveModalActive] =
    useState<boolean>(false);

  const [sortedField, setSortedField] = useState<string>("id");
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (field) => {
    const isAsc = sortedField === field && sortingOrder === SORTING_ORDER.ASC;
    setSortingOrder(isAsc ? SORTING_ORDER.DESC : SORTING_ORDER.ASC);
    setSortedField(field);
  };

  function masterSaveModalHandler() {
    setMasterSaveModalActive(!isMasterSaveModalActive);
  }

  function deleteModalHandler() {
    setDeleteModalActive(!isDeleteModalActive);
  }

  function errorAndSuccessModalHandler(data) {
    setErrorAndSuccessModalData(data);
    setErrorAndSuccessModalActive(!isErrorAndSuccessModalActive);
  }

  function updatePasswordModalHandler() {
    setUpdatePasswordModalActive(!isUpdatePasswordModalActive);
  }

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let towns = await Api.getAll("towns");
      setTownsList(towns.data);
      let masters: any = await Api.getAll("masters", {
        offset: rowsPerPage * page,
        limit: rowsPerPage,
        sortedField,
        sortingOrder,
      });
      setMastersList(masters.data);
      setTotalMasters(masters.total);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender, page, rowsPerPage, totalMasters, sortedField, sortingOrder]);

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

  //Объект для отображения имен городов, а не айдишников
  let townsIdToName = {};
  townsList.forEach((el) => {
    townsIdToName[el.id] = el?.name;
  });
  ////////////////////////////////////////

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"masters"} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Номер мастера</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === MASTERS_SORTED_FIELDS.NAME}
                    direction={
                      sortedField === MASTERS_SORTED_FIELDS.NAME
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(MASTERS_SORTED_FIELDS.NAME);
                    }}>
                    ФИО
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === MASTERS_SORTED_FIELDS.TOWN}
                    direction={
                      sortedField === MASTERS_SORTED_FIELDS.TOWN
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(MASTERS_SORTED_FIELDS.TOWN);
                    }}>
                    Город
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === MASTERS_SORTED_FIELDS.RATING}
                    direction={
                      sortedField === MASTERS_SORTED_FIELDS.RATING
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(MASTERS_SORTED_FIELDS.RATING);
                    }}>
                    Рейтинг
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Сбросить пароль</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === MASTERS_SORTED_FIELDS.ADMIN_APPROVE}
                    direction={
                      sortedField === MASTERS_SORTED_FIELDS.ADMIN_APPROVE
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(MASTERS_SORTED_FIELDS.ADMIN_APPROVE);
                    }}>
                    Подтвердить
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={redAddButtonStyle}
                    variant="contained"
                    onClick={masterSaveModalHandler}>
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
              {mastersList?.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Typography>Таблица пуста</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                mastersList?.map((row) => (
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
                    <TableCell align="left">
                      {row.name} {row.surname}
                    </TableCell>

                    <TableCell align="left">
                      {townsIdToName[row.townId]}
                    </TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                    <TableCell align="left">
                      <CachedIcon
                        cursor={"pointer"}
                        onClick={() => {
                          setItemForUpdatePassword({
                            email: row.email,
                            url: "masters",
                          });
                          updatePasswordModalHandler();
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      {!row.adminApprove && (
                        <ThumbUpIcon
                          cursor={"pointer"}
                          onClick={() => {
                            instance({
                              url: "masters/approveaccount",
                              method: "PUT",
                              data: { id: row.id },
                            })
                              .then(() => {
                                errorAndSuccessModalHandler({
                                  type: "success",
                                  message: "Мастер успешно подтвержден",
                                });
                              })
                              .catch(() => {
                                errorAndSuccessModalHandler({
                                  type: "error",
                                  message: "Невозможно совершить подтверждение",
                                });
                              })
                              .finally(async () =>
                                setMastersList(await Api.getAll("masters"))
                              );
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove({ id: row.id, url: "masters" });
                          deleteModalHandler();
                        }}>
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              {mastersList?.length !== 0 && !isLoading ? (
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  colSpan={5}
                  count={totalMasters}
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
              ) : null}
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      {isDeleteModalActive && (
        <DeleteModal
          props={itemForRemove}
          onClose={deleteModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
      {isUpdatePasswordModalActive && (
        <UpdatePasswordModal
          props={itemForUpdatePassword}
          onClose={updatePasswordModalHandler}
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
      {isMasterSaveModalActive && (
        <MasterSave
          onClose={masterSaveModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
    </>
  );
};

export default MastersPage;
