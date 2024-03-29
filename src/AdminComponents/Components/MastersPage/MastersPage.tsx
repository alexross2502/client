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
import { setModalAddMasters } from "../../../redux/mastersReducer";
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

const MastersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>();
  const [townsList, setTownsList] = useState<InstanceResponse | []>([]);
  const [itemForRemove, setItemForRemove] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let towns = await Api.getAll("towns");
      setTownsList(towns);
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
      <DeleteModal props={itemForRemove} />
      <MasterSave />
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

                <TableCell align="right">
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(setModalAddMasters());
                    }}
                  >
                    {t("table.add")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
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
                    visible={true}
                  />
                </Grid>
              )}
              {mastersList?.length === 0 ? (
                <Typography>Нет записей</Typography>
              ) : (
                mastersList?.map((row) => (
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
                    <TableCell align="left">
                      {row.name} {row.surname}
                    </TableCell>

                    <TableCell align="left">
                      {townsIdToName[row.townId]}
                    </TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove([row.id, "masters"]);
                          dispatch(setModalDelete());
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

export default MastersPage;
