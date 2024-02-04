import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  Collapse,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import store from "../../store/store";
import { getNotifications, notifyClinic } from "../../features/user/userThunks";
import { useFetch } from "../../hooks/useFetch";
import { deleteAuth } from "../../features/auth/authThunks";

function UserBar({ role = "clinic" }) {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth.getUser);
  const {
    notify,
    data: notificationsData,
    loading,
  } = useSelector((state) => state.user.notification);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(notificationsData);

  useFetch(() => store.dispatch(getNotifications()));

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

        <Box display={"flex"} alignItems={"center"} columnGap={3}>
          {role == "clinic" && (
            <>
              <Fade in={notify}>
                <Alert
                  icon={<CampaignTwoToneIcon></CampaignTwoToneIcon>}
                  severity="error"
                  variant="filled"
                >
                  Infected/Contact user was entered.
                </Alert>
              </Fade>
              <Badge
                color="error"
                variant="dot"
                overlap="circular"
                invisible={!notify}
              >
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  size="large"
                  color="primary"
                  onClick={(e) => {
                    store.dispatch(notifyClinic(false));
                    setAnchorEl(e.currentTarget);
                  }}
                >
                  {notify ? (
                    <NotificationsActiveTwoToneIcon
                      color="error"
                      size="large"
                    ></NotificationsActiveTwoToneIcon>
                  ) : (
                    <NotificationsNoneTwoToneIcon size="large"></NotificationsNoneTwoToneIcon>
                  )}
                </IconButton>
              </Badge>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <List disablePadding>
                  {!loading &&
                    notificationsData.map((m) => (
                      <ListItem>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                fontSize={12}
                                fontWeight={"bold"}
                                display={"inline"}
                                color="error"
                              >
                                {`${m.user.firstName} ${m.user.lastName} `}
                              </Typography>
                              <Typography
                                fontSize={12}
                                display={"inline"}
                              >{`entered at `}</Typography>
                              <Typography
                                display={"inline"}
                                fontSize={12}
                                fontWeight={"bold"}
                                textTransform={"uppercase"}
                              >
                                {`${m.station.name}  `}
                              </Typography>
                            </>
                          }
                        ></ListItemText>
                      </ListItem>
                    ))}
                </List>
              </Menu>
            </>
          )}

          <Button
            LinkComponent={Link}
            to="/login"
            color="primary"
            sx={{ textTransform: "capitalize", borderRadius: 4 }}
            variant="contained"
            onClick={async () => {
              const res = await store.dispatch(deleteAuth());
              if (res) {
                navigate("/login");
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UserBar;
