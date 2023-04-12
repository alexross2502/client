import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  CssBaseline,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Watch } from "react-loader-spinner";
import { instance, InstanceResponse } from "../AdminComponents/axios-utils";
import { RootState } from "../redux/rootReducer";
import { CustomAppBar } from "../AdminComponents/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { dateConverter } from "../AdminComponents/Components/dateConverter";

const ClientAccount = () => {
  const { t } = useTranslation();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let tableData = await instance({ url: `/clients/data`, method: "GET" });
      tableData.data.forEach((el) => {
        dateConverter(el);
      });
      setClientsList(tableData.data);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Личный кабинет
            </Typography>
          </Toolbar>
        </CustomAppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Имя мастера</TableCell>
                <TableCell align="left">Тип услуги</TableCell>
                <TableCell align="left">День</TableCell>
                <TableCell align="left">Время</TableCell>
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
                    <TableCell align="left">{row.master.name}</TableCell>
                    <TableCell align="left">{t(`size.${row.size}`)}</TableCell>
                    <TableCell align="left">{row.day}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ClientAccount;
