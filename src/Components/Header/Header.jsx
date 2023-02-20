import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/modalWindowReducer";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useState } from "react";
import { Box } from "@mui/system";
import { DrawerComp } from "./DrawerComp";

const Header = () => {
  const dispatch = useDispatch();
  function onActiveClick() {
    dispatch(setModalActive());
  }

  const { t } = useTranslation();
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(180,58,58,1) 2%, rgba(49,49,116,1) 36%, rgba(105,0,161,1) 73%, rgba(166,69,252,1) 100%)",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
              <AccessAlarmsIcon></AccessAlarmsIcon>
            </Typography>
            <DrawerComp />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <AccessAlarmsIcon></AccessAlarmsIcon>
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Tabs
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, val) => {
                  setValue(val);
                }}
                centered={true}
              >
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("header.portfolio")}
                ></Tab>
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("header.contacts")}
                ></Tab>
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("header.about us")}
                ></Tab>
              </Tabs>
            </Grid>
            <Grid item xs={2}>
              <Box display={"flex"}>
                <Button
                  sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                  variant="contained"
                >
                  {t("header.login")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
