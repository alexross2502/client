import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import React = require("react");
export const DrawerComp = () => {
  const [open, setOpen] = useState<any>(false);
  const { t } = useTranslation();
  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "rgba(49,49,116,1)" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText sx={{ color: "white" }}>
                {t("header.portfolio")}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>{t("header.contacts")}</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>{t("header.about us")}</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};
