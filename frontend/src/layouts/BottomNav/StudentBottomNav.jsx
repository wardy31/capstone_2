import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from "@mui/material";
import React from "react";
import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Link, useLocation } from "react-router-dom";
import checkNavigation from "../../utils/checkNavigation";
function StudentBottomNav() {
  const { pathname } = useLocation();
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        mt:8
      }}
      elevation={6}
    >
      <BottomNavigation
        showLabels
        sx={{ bgcolor: "primary.main", transition: theme.transitions.create() }}
      >
        <BottomNavigationAction
          sx={{
            transition: theme.transitions.create(),
            color: checkNavigation(/home/, pathname) ? "primary.main" : "white",
            bgcolor: checkNavigation(/home/, pathname) ? "white" : "",
          }}
          LinkComponent={Link}
          to="home"
          label="Home"
          icon={<CottageTwoToneIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          sx={{
            transition: theme.transitions.create(),
            color: checkNavigation(/my-research/, pathname)
              ? "primary.main"
              : "white",
            bgcolor: checkNavigation(/my-research/, pathname) ? "white" : "",
          }}
          LinkComponent={Link}
          to="my-research"
          label="My Research"
          icon={<AutoStoriesTwoToneIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          sx={{
            transition: theme.transitions.create(),
            color: checkNavigation(/saved-research/, pathname)
              ? "primary.main"
              : "white",
            bgcolor: checkNavigation(/saved-research/, pathname) ? "white" : "",
          }}
          LinkComponent={Link}
          to="saved-research"
          label="Favorites"
          icon={<FavoriteTwoToneIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </Paper>
  );
}

export default StudentBottomNav;
