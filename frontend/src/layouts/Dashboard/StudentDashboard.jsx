import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import checkNavigation from "../../utils/checkNavigation";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Logo from "../../../public/title.png";

function StudentDashboard({ open, handleOpen }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(pathname);

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth < 900) {
  //       setOpen(false);
  //     } else {
  //       setOpen(true);
  //     }
  //   });
  // }, []);

  const handleNavigate = (nav) => {
    navigate(nav);
  };
  return (
    <>
      <Drawer
        open={open}
        variant="persistent"
        anchor="left"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: {
            xs: 0,
            md: open ? 240 : 0,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "primary.main",
          },
          transition: theme.transitions.create(),
        }}
        elevation={8}
      >
        <Box sx={{ mx: 3 }}>
          {/* <Typography
            sx={{ color: "white", fontWeight: "bold", letterSpacing: 1.5 }}
            variant="body1"
          >
            Eduardo Macabacyao
          </Typography>
          <Typography
            sx={{ color: "white", letterSpacing: 1.5 }}
            variant="body2"
          >
            Student
          </Typography> */}
        </Box>

        <Box display={"flex"} justifyContent={"center"} my={3}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box>

        <List sx={{ mx: 1.5 }} dense>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/home/, pathname) ? "white" : "",
              color: checkNavigation(/home/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 1.5,
            }}
            onClick={() => handleNavigate("home")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/home/, pathname)}
              onClick={() => setSelected(/home/, pathname)}
            >
              <ListItemIcon>
                <CottageTwoToneIcon
                  sx={{
                    color: checkNavigation(/home/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Home"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/my-research/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/my-research/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 1.5,
            }}
            onClick={() => handleNavigate("my-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/my-research/, pathname)}
              onClick={() => setSelected("/student/my-research")}
              sx={{}}
            >
              <ListItemIcon>
                <AutoStoriesTwoToneIcon
                  sx={{
                    color: checkNavigation(/my-research/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="My Research"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/saved-research/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/saved-research/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 1.5,
            }}
            onClick={() => handleNavigate("saved-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/saved-research/, pathname)}
              onClick={() => setSelected("/student/saved-research")}
              sx={{}}
            >
              <ListItemIcon>
                <FavoriteTwoToneIcon
                  sx={{
                    color: checkNavigation(/saved-research/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Favorites"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default StudentDashboard;
