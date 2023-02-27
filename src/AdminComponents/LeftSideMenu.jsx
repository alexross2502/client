import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAuthorized } from "../redux/authorizationReducer";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { DrawerHeader } from "./DrawerHeader";
import { AppBar } from "./AppBar";

const drawerWidth = 240;

export function LeftSideMenu(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={true}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {t("adminPage.header")} {t(`adminPage.${props.name}`)}
          </Typography>
        </Toolbar>
      </AppBar>
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
        open={true}
      >
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/clients")}>
              <ListItemIcon>
                <AccessibilityNewIcon></AccessibilityNewIcon>
              </ListItemIcon>
              <ListItemText primary={t("adminPage.clients")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/masters")}>
              <ListItemIcon>
                <ManageAccountsIcon></ManageAccountsIcon>
              </ListItemIcon>
              <ListItemText primary={t("adminPage.masters")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/towns")}>
              <ListItemIcon>
                <ApartmentIcon></ApartmentIcon>
              </ListItemIcon>
              <ListItemText primary={t("adminPage.towns")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/reservation")}>
              <ListItemIcon>
                <HourglassBottomIcon></HourglassBottomIcon>
              </ListItemIcon>
              <ListItemText primary={t("adminPage.reservation")} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("persist:main-root");
              dispatch(setAuthorized("false"));
              navigate("/");
            }}
          >
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
            }}
          >
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText primary={"На главную страницу"} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}
