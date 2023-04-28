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

const MastersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>();
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
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
      let masters = await Api.getAll("masters");
      setMastersList(masters);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

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
                <TableCell align="left">ФИО</TableCell>
                <TableCell align="left">Город</TableCell>
                <TableCell align="left">Рейтинг</TableCell>
                <TableCell align="left">Сбросить пароль</TableCell>
                <TableCell align="left">Подтвердить</TableCell>
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
