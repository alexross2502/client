import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { LeftSideMenu } from "../../LeftSideMenu";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TownSave from "./townSave";
import { useForm } from "react-hook-form";
import Api from "../api";
import { Box } from "@mui/system";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableBody,
  IconButton,
  Typography,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Watch } from "react-loader-spinner";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import { InstanceResponse } from "../../axios-utils";
import { priceFormatterToFloat } from "../../../utils/priceFormatterToFloat";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import { redAddButtonStyle } from "../../../styles/styles";
import { TOWNS_SORTED_FIELDS, SORTING_ORDER } from "../../../utils/constants";

const TownsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState<InstanceResponse | []>();
  const [totalTowns, setTotalTowns] = useState<number>();
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
  const [isTownSaveModalActive, setTownSaveModalActive] =
    useState<boolean>(false);
  const [sortedField, setSortedField] = useState<string>("id");
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (field) => {
    const isAsc = sortedField === field && sortingOrder === SORTING_ORDER.ASC;
    setSortingOrder(isAsc ? SORTING_ORDER.DESC : SORTING_ORDER.ASC);
    setSortedField(field);
  };

  function townSaveModalHandler() {
    setTownSaveModalActive(!isTownSaveModalActive);
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
      let towns: any = await Api.getAll("towns", {
        offset: rowsPerPage * page,
        limit: rowsPerPage,
        sortedField,
        sortingOrder,
      });
      setTownsList(towns.data);
      setTotalTowns(towns.total);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender, page, rowsPerPage, totalTowns, sortedField, sortingOrder]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

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

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"towns"} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Номер города</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === TOWNS_SORTED_FIELDS.NAME}
                    direction={
                      sortedField === TOWNS_SORTED_FIELDS.NAME
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(TOWNS_SORTED_FIELDS.NAME);
                    }}>
                    Имя
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortedField === TOWNS_SORTED_FIELDS.TARIFF}
                    direction={
                      sortedField === TOWNS_SORTED_FIELDS.TARIFF
                        ? sortingOrder
                        : SORTING_ORDER.ASC
                    }
                    onClick={(e) => {
                      handleRequestSort(TOWNS_SORTED_FIELDS.TARIFF);
                    }}>
                    Тариф
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={redAddButtonStyle}
                    variant="contained"
                    onClick={() => {
                      dispatch(townSaveModalHandler);
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
              {townsList?.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Typography>Таблица пуста</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                townsList?.map((row) => (
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
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      {priceFormatterToFloat(row.tariff)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove({ id: row.id, url: "towns" });
                          deleteModalHandler();
                        }}>
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {townsList?.length !== 0 && !isLoading ? (
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  colSpan={3}
                  count={totalTowns}
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
              </TableFooter>
            ) : null}
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
      {isErrorAndSuccessModalActive && (
        <ErrorAndSuccessModal
          onClose={errorAndSuccessModalHandler}
          type={ErrorAndSuccessModalData?.type}
          message={ErrorAndSuccessModalData?.message}
        />
      )}
      {isTownSaveModalActive && (
        <TownSave
          onClose={townSaveModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
    </>
  );
};

export default TownsPage;
