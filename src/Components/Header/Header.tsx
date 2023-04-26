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
import { MouseEventHandler, useState } from "react";
import { Box } from "@mui/system";
import { DrawerComp } from "./DrawerComp";
import { getToken } from "../../AdminComponents/token";
import { useNavigate } from "react-router-dom";
import React from "react";
import { loginSwitchCase } from "../../utils/loginSwitchCase";
import { headerAppBarStyle } from "../../styles/styles";

type IProps = {
  authorization: () => void;
  order: () => void;
  registration: () => void;
};

const Header = (props: IProps) => {
  const { authorization, order, registration } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <AppBar sx={headerAppBarStyle}>
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
                centered={true}>
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("header.portfolio")}></Tab>
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("header.about us")}></Tab>
                <Tab
                  sx={{ marginLeft: "40px", fontSize: "15px" }}
                  label={t("order.header")}
                  onClick={order}></Tab>
              </Tabs>
            </Grid>
            <Grid item xs={2}>
              <Box display={"flex"}>
                <Button
                  sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                  variant="contained"
                  onClick={registration}>
                  {t("header.registration")}
                </Button>
                {getToken() !== null ? (
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={() => {
                      navigate(loginSwitchCase(getToken()));
                    }}>
                    {t("header.authorized")}
                  </Button>
                ) : (
                  <Button
                    sx={{ marginLeft: "auto", background: "rgba(180,58,58,1)" }}
                    variant="contained"
                    onClick={authorization}>
                    {t("header.login")}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
