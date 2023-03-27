import { useTranslation } from "react-i18next";
import "../../AdminPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import ClientSave from "./clientSave";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setModalAddClients } from "../../../redux/clientsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteModal from "../DeleteModal";
import { setModalDelete } from "../../../redux/deleteReducer";
import { Watch } from "react-loader-spinner";
import RemoveAndAddModal from "../../RemoveAndAddModal";
import { instance } from "../../axios-utils";
import RemoveAndAddModalError from "../../RemoveAndAddModalError";
import CopyIcon from "../CopyIcon";
import { useState, useEffect } from "react";
import React = require("react");
import { RootState } from "../../../redux/rootReducer";

const ClientPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<any>();
  const [itemForRemove, setItemForRemove] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let clients = await instance({ url: `/clients`, method: "GET" });
      setClientsList(clients);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <DeleteModal props={itemForRemove} />
      <ClientSave />
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

                <TableCell align="right">
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(setModalAddClients());
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
              {clientsList?.length === 0 ? (
                <Typography>Нет записей</Typography>
              ) : (
                clientsList?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography className={"clue"} data-clue={`${row.id}`}>
                        {row.id.slice(0, 15) + "..."}
                      </Typography>
                      <CopyIcon data={row.id} />
                    </TableCell>

                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setItemForRemove([row.id, "clients"]);
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

export default ClientPage;
