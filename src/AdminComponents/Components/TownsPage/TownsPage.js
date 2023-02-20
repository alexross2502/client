import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { LeftSideMenu } from "../../LeftSideMenu.jsx";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { townSave } from "./townSave";
import { useForm } from "react-hook-form";
import { TownForm } from "./TownForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import { Box } from "@mui/system";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  async function newTown(data) {
    await townSave(data.name);
    dispatch(setPageRerender());
  }
  const townsListItem = townsList.map((item) => {
    return <TownForm data={item} key={item.id} />;
  });

  return (
    <>
      <Box height={70} />
      <Box onSubmit={handleSubmit(newTown)} sx={{ display: "flex" }}>
        <LeftSideMenu />
        <Box sx={{ height: 520, width: "100%" }}>
          <Table sx={{ width: "100%", marginTop: "20px" }}>
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
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {townsListItem.map((el) => (
                <TableRow sx={{ borderBottom: "solid 2px black" }}>
                  <TableCell>{el.props.data.id}</TableCell>
                  <TableCell>{el.props.data.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        Api.delete("towns", el.props.data.id);
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

/**
 * 
 <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {townsListItem}
            </Grid>
          </Grid>
        </Box>
 */
