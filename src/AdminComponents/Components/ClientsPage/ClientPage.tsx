import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientSave from "./clientSave";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import { Watch } from "react-loader-spinner";
import { InstanceResponse } from "../../axios-utils";
import CopyIcon from "../CopyIcon";
import { RootState } from "../../../redux/rootReducer";
import CachedIcon from "@mui/icons-material/Cached";
import UpdatePasswordModal from "../../../Components/Modals/UpdatePasswordModal";
import ErrorAndSuccessModal from "../../../Components/Modals/ErrorAndSuccessModal";
import { redAddButtonStyle } from "../../../styles/styles";
import Api from "../api";

const ClientPage = () => {
  const { t } = useTranslation();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>();
  const [totalClients, setTotalClients] = useState<number>();
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
  const [isClientSaveModalActive, setClientSaveModalActive] =
    useState<boolean>(false);

  function clientSaveModalHandler() {
    setClientSaveModalActive(!isClientSaveModalActive);
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
      let clients: any = await Api.getAll(`clients`, {
        offset: rowsPerPage * page,
        limit: rowsPerPage,
      });
      setClientsList(clients.data);
      setTotalClients(clients.total);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender, page, rowsPerPage, totalClients]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  //////////////////////////

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
        <LeftSideMenu name={"clients"} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Номер клиента</TableCell>
                <TableCell align="left">Имя</TableCell>
                <TableCell align="left">Почта</TableCell>
                <TableCell>Сбросить пароль</TableCell>
                <TableCell align="right">
                  <Button
                    sx={redAddButtonStyle}
                    variant="contained"
                    onClick={() => {
                      clientSaveModalHandler();
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
              {clientsList?.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Typography>Таблица пуста</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                clientsList?.map((row) => (
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

                    <TableCell align="left">{row.email}</TableCell>

                    <TableCell align="left">
                      <CachedIcon
                        cursor={"pointer"}
                        onClick={() => {
                          setItemForUpdatePassword({
                            email: row.email,
                            url: "clients",
                          });
                          updatePasswordModalHandler();
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove({ id: row.id, url: "clients" });
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
              {clientsList?.length !== 0 && !isLoading ? (
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  colSpan={3}
                  count={totalClients}
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
      {isClientSaveModalActive && (
        <ClientSave
          onClose={clientSaveModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
    </>
  );
};

export default ClientPage;
