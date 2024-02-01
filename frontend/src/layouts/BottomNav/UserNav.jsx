import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useData from "../../hooks/useData";
import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import PersonPinTwoToneIcon from "@mui/icons-material/PersonPinTwoTone";
import FeedTwoToneIcon from "@mui/icons-material/FeedTwoTone";
import { useTheme } from "@emotion/react";

function UserNav() {
  const theme = useTheme();
  const location = useLocation();

  const { state, handleChange } = useData(location.pathname);

  useEffect(() => {
    handleChange(location.pathname);
  }, [location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ bgcolor: "primary.main" }}
        showLabels
        value={state}
        onChange={(e, newVal) => {
          handleChange(newVal);
        }}
      >
        <BottomNavigationAction
          sx={{
            bgcolor: state == "/user/home" ? "white" : "",
            color: state == "/user/home" ? "" : "white",
            transition: theme.transitions.create(),
          }}
          label="Home"
          icon={<CottageTwoToneIcon />}
          LinkComponent={Link}
          value={"/user/home"}
          to="home"
        />
        <BottomNavigationAction
          sx={{
            bgcolor: state == "/user/form" ? "white" : "",
            color: state == "/user/form" ? "" : "white",
            transition: theme.transitions.create(),
          }}
          label="Form"
          icon={<FeedTwoToneIcon />}
          LinkComponent={Link}
          value={"/user/form"}
          to="form"
        />
        <BottomNavigationAction
          sx={{
            bgcolor: state == "/user/visited-logs" ? "white" : "",
            color: state == "/user/visited-logs" ? "" : "white",
            transition: theme.transitions.create(),
          }}
          label="Logs"
          icon={<PersonPinTwoToneIcon />}
          LinkComponent={Link}
          value={"/user/visited-logs"}
          to="visited-logs"
        />
      </BottomNavigation>
    </Paper>
  );
}

export default UserNav;