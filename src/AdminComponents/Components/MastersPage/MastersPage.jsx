import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MasterSave from "./masterSave";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import { useForm } from "react-hook-form";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setModalAddMasters } from "../../../redux/mastersReducer";

const MastersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState([]);

  const isActive = useSelector((state) => state.addMaster.isActive);

  useEffect(() => {
    let asyncFunc = async () => {
      let masters = [...(await Api.getAll("masters"))];
      setMastersList(masters);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <MasterSave />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"masters"} />
        <Box sx={{ height: 520, width: "100%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ background: "black", height: "40px" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.id")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  ФИО
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  Город
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
                  {t("table.rating")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
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
              {mastersList.map((el) => (
                <TableRow sx={{ borderBottom: "solid 2px black" }}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>
                    {el.name} {el.surname}
                  </TableCell>
                  <TableCell>{el.townId}</TableCell>
                  <TableCell>{el.rating}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        Api.delete("masters", el.id);
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
        </Box>
      </Box>
    </>
  );
};

export default MastersPage;
