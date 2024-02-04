import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteStorage } from "../../utils/storage";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import { deleteAuth, getAuth } from "../../features/auth/authThunks";
import store from "../../store/store";

function AppBarUser({ handleOpen }) {
  //   const { data } = useSelector((state) => state.user.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modal, setModal] = useState(false);
  const handleModal = (data) => {
    setModal(data);
  };
  const openModal = () => {
    setModal(true);
  };

  return (
    <AppBar
      sx={{
        boxShadow: 3,
        mb: 4,
        bgcolor: "#F3F0FF",
      }}
      position="static"
    >
      <Toolbar variant="dense">
        <IconButton
          color="primary"
          sx={{ display: { xs: "none", md: "block" } }}
          onClick={() => handleOpen()}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography
          sx={{
            mr: 1,
            fontSize: 13,
            textTransform: "capitalize",
            color: "text.primary",
          }}
          // variant="subtitle2"
        >
          {/* {data.firstName + " " + data.lastName} */}
        </Typography>
        <Box sx={{}}>
          <IconButton
            // size="120"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
          >
            <AccountCircle sx={{ fontSize: 32 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ width: 240 }}
          >
            <MenuItem
              onClick={() => setModal(true)}
              sx={{ display: "flex", columnGap: 2 }}
            >
              <HelpOutlineTwoToneIcon sx={{ fontSize: 22 }} />
              <Typography sx={{ fontSize: 14 }}>Help</Typography>
            </MenuItem>
            <MenuItem
              sx={{ display: "flex", columnGap: 2 }}
              onClick={async () => {
                const res = await store.dispatch(deleteAuth());
                if (res) {
                  // console.log(res);
                  navigate("/login");
                }
              }}
            >
              <LogoutIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: 14 }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarUser;
