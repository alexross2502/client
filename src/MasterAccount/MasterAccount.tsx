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
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { priceFormatterToFloat } from "../utils/priceFormatterToFloat";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const MasterAccount = () => {
  const { t } = useTranslation();
  const drawerWidth = 240;
  const navigate = useNavigate();
  const rerender = useSelector((state: RootState) => state.rerender.isRerender);
  const [mastersList, setMastersList] = useState<InstanceResponse | []>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let asyncFunc = async () => {
      setLoading(true);
      let tableData = await instance({ url: `/masters/data`, method: "GET" });
      tableData.data.forEach((el) => {
        dateConverter(el);
      });
      setMastersList(tableData.data);
      setLoading(false);
    };
    asyncFunc();
  }, [rerender]);

  async function changeOrderStatus(id, checked) {
    const status = checked ? "executed" : "confirmed";
    instance({
      url: "/masters/changestatus",
      data: { id: id, status: status },
      method: "PUT",
    });
  }

  function checkStatus(status) {
    return status === "executed";
  }

  function hideCanceledStatus(status) {
    return status === "canceled";
  }

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
        <Box sx={{ width: "calc(100vw - 240px)" }}>
          <TableContainer component={Paper} sx={{ marginLeft: "240px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#a1a1a1" }}>
                <TableRow>
                  <TableCell>Имя клиента</TableCell>
                  <TableCell align="left">Тип услуги</TableCell>
                  <TableCell align="left">День</TableCell>
                  <TableCell align="left">Время</TableCell>
                  <TableCell align="left">Сумма</TableCell>
                  <TableCell align="left">Подтвержден/выполнен</TableCell>
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left">{row.client.name}</TableCell>
                      <TableCell align="left">
                        {t(`size.${row.size}`)}
                      </TableCell>
                      <TableCell align="left">{row.day}</TableCell>
                      <TableCell align="left">{row.end}</TableCell>
                      <TableCell align="left">
                        {priceFormatterToFloat(row.price)}
                      </TableCell>
                      <TableCell align="left">
                        {hideCanceledStatus(row.status) ? (
                          "отменен"
                        ) : (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            defaultChecked={checkStatus(row.status)}
                            value={row.id}
                            onChange={(event) => {
                              changeOrderStatus(
                                event.target.value,
                                event.target.checked
                              );
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default MasterAccount;
