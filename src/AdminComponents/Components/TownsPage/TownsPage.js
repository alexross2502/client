import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import { FormButton } from "../FormButton";
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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setModalAddTowns } from "../../../redux/townsReducer";

const TownsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [townsList, setTownsList] = useState([]);

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
      <TownSave />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <LeftSideMenu name={"towns"} />
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
                  {t("table.townName")}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fintSize: "18px" }}
                >
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
              {townsList.map((el) => (
                <TableRow sx={{ borderBottom: "solid 2px black" }}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        Api.delete("towns", el.id);
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

export default TownsPage;
