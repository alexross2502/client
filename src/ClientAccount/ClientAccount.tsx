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
  Button,
  ListItemIcon,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Watch } from "react-loader-spinner";
import { instance, InstanceResponse } from "../AdminComponents/axios-utils";
import { RootState } from "../redux/rootReducer";
import { CustomAppBar } from "../AdminComponents/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { dateConverter } from "../AdminComponents/Components/dateConverter";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { DrawerHeader } from "../AdminComponents/DrawerHeader";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";

const ClientAccount = () => {
  const { t } = useTranslation();
  const drawerWidth = 240;
  const navigate = useNavigate();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [clientsList, setClientsList] = useState<InstanceResponse | []>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let tableData = await instance({ url: `/clients/data`, method: "GET" });
      tableData.data.forEach((el) => {
        dateConverter(el);
        el.price /= 100;
      });
      setClientsList(tableData.data);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

  return (
    <>
      <Box height={70} />
      <Box>
        <CssBaseline />
        <CustomAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap marginLeft={"235px"}>
              Личный кабинет
            </Typography>
          </Toolbar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={true}>
            <DrawerHeader></DrawerHeader>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("persist:main-root");
                  navigate("/");
                }}>
                <ListItemIcon>
                  <LogoutIcon></LogoutIcon>
                </ListItemIcon>
                <ListItemText primary={t("adminPage.logout")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                }}>
                <ListItemIcon>
                  <HomeIcon></HomeIcon>
                </ListItemIcon>
                <ListItemText primary={"На главную страницу"} />
              </ListItemButton>
            </ListItem>
          </Drawer>
        </CustomAppBar>
      </Box>
      <Box sx={{ width: "calc(100vw - 240px)" }}>
        <TableContainer component={Paper} sx={{ marginLeft: "240px" }}>
          <Table aria-label="simple table">
            <TableHead sx={{ background: "#a1a1a1" }}>
              <TableRow>
                <TableCell>Имя мастера</TableCell>
                <TableCell align="left">Тип услуги</TableCell>
                <TableCell align="left">День</TableCell>
                <TableCell align="left">Время</TableCell>
                <TableCell align="left">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <Grid
                  sx={{
                    position: "absolute",
                    left: "50%",
                    marginTop: "20px",
                  }}>
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
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell align="left">{row.master.name}</TableCell>
                    <TableCell align="left">{t(`size.${row.size}`)}</TableCell>
                    <TableCell align="left">{row.day}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
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
