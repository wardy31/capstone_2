import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useSelector } from "react-redux";

function UserBar({ role = "clinic" }) {
  const { data } = useSelector((state) => state.auth.getUser);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {role == "clinic" && (
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {role == "clinic" ? (
          <Typography
            color={"primary"}
            fontSize={14}
            fontWeight={"bold"}
            letterSpacing={1.2}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Welcome, {`${data?.firstName} ${data?.lastName}`}
          </Typography>
        ) : (
          <Typography
            color={"primary"}
            fontWeight={"bold"}
            letterSpacing={1.2}
            component="div"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            UniTrace.
          </Typography>
        )}
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", borderRadius: 4 }}
          variant="contained"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default UserBar;
