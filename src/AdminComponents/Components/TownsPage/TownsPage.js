import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TownSave, { townSave } from "./townSave";
import { useForm } from "react-hook-form";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
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
import { setModalAddTowns } from "../../../redux/townsReducer";
import { DataGrid } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useClipboard } from "use-clipboard-copy";
import DoneIcon from "@mui/icons-material/Done";
import DeleteModal from "../DeleteModal";
import { setModalDelete } from "../../../redux/deleteReducer";

const TownsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState([]);
  const clipboard = useClipboard();
  const [copyDone, setCopyDone] = useState(false);
  const [itemForRemove, setItemForRemove] = useState([]);

  useEffect(() => {
    let asyncFunc = async () => {
      let towns = [...(await Api.getAll("towns"))];
      setTownsList(towns);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <DeleteModal props={itemForRemove} />
      <TownSave />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"towns"} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Номер города</TableCell>
                <TableCell align="left">Имя</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(setModalAddTowns());
                    }}
                  >
                    {t("table.add")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {townsList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography className={style.clue} data-clue={`${row.id}`}>
                      {row.id.slice(0, 15) + "..."}
                    </Typography>
                    {!copyDone ? (
                      <ContentCopyIcon
                        onClick={() => {
                          clipboard.copy(row.id);
                          setCopyDone(true);
                          setTimeout(() => {
                            setCopyDone(false);
                          }, 1500);
                        }}
                      ></ContentCopyIcon>
                    ) : (
                      <DoneIcon />
                    )}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setItemForRemove([row.id, "towns"]);
                        dispatch(setModalDelete());
                        dispatch(setPageRerender());
                      }}
                    >
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TownsPage;
