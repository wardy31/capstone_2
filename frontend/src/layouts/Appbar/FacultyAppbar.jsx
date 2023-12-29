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
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteStorage } from "../../utils/storage";

import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import PDFHelp from "../../components/attachments/PDFHelp";

function AdminAppbar({ handleOpen }) {
  const { data } = useSelector((state) => state.user.auth);
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
        <PDFHelp
          modal={modal}
          handleModal={handleModal}
          role={data.role == "faculty" ?"faculty" : "faculty_in_charge"}
        ></PDFHelp>
        ;
        <IconButton
          color="primary"
          onClick={() => handleOpen()}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography
          sx={{
            mr: 1,
            fontSize: 13,
            letterSpacing: 1.5,
            color: "text.primary",
          }}
        >
          {data?.firstName + " " + data?.lastName}
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
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ width: 240 }}
          >
            <MenuItem
              onClick={() => setModal(true)}
              sx={{ display: "flex", columnGap: 2 }}
            >
              <HelpOutlineTwoToneIcon sx={{ fontSize: 22 }} />
              Help
            </MenuItem>
            <MenuItem
              sx={{ display: "flex", columnGap: 2 }}
              onClick={() => {
                deleteStorage();
                navigate("/");
              }}
            >
              <LogoutIcon sx={{ fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminAppbar;
