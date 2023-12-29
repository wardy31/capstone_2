import {
  AppBar,
  Box,
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStorage } from "../../utils/storage";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import PDFHelp from "../../components/attachments/PDFHelp";

function AdminAppbar({ handleOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useSelector((state) => state.user.auth);
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
      <PDFHelp modal={modal} handleModal={handleModal} role={"admin"}></PDFHelp>
      <Toolbar variant="dense">
        <IconButton
          color="primary"
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
          onClick={() => handleOpen()}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography
          sx={{
            fontSize: 13,
            mr: 1,
            textTransform: "capitalize",
            color: "text.primary",
          }}
        >
          {data.firstName + " " + data.lastName}{" "}
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
            {/* <MenuItem onClick={() => console.log('gehe')}>Profile</MenuItem> */}
            <MenuItem
              sx={{
                display: "flex",
                columnGap: 1,
              }}
              onClick={() => {
                handleModal(true);
              }}
            >
              <HelpOutlineTwoToneIcon sx={{ fontSize: 20 }} />
              Help
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                columnGap: 1,
              }}
              onClick={() => {
                navigate("/");
                deleteStorage();
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
