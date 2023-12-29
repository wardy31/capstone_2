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
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import { useSelector } from "react-redux";
import Logo from "../../../public/title.png";

function FacultyDashboard({ open, handleOpen }) {
  const { data } = useSelector((state) => state.user.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(pathname);
  const theme = useTheme();

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
        onClose={() => handleOpen()}
        variant="temporary"
        anchor="left"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 248,
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
            Faculty
          </Typography> */}
        </Box>
        <Box display={"flex"} justifyContent={"center"} my={3}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box>

        <List sx={{ mx: 1.5, fontWeight: "bold" }} dense>
          <ListItem>
            <ListItemText
              primary="Navigation"
              primaryTypographyProps={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
              }}
            ></ListItemText>
          </ListItem>
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
              onClick={() => setSelected("/faculty/my-research")}
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
              onClick={() => setSelected("/faculty/saved-research")}
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

          {data?.role == "faculty_in_charge" && (
            <>
              <ListItem sx={{ mt: 4 }}>
                <ListItemText
                  primary="Faculty In Charge"
                  primaryTypographyProps={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                ></ListItemText>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor: checkNavigation(/students/, pathname)
                    ? "white"
                    : "primary.main",
                  color: checkNavigation(/students/, pathname)
                    ? "primary.main"
                    : "white",
                  borderRadius: 1.5,
                  my: 1.5,
                }}
                onClick={() => handleNavigate("students")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={checkNavigation(/students/, pathname)}
                  sx={{}}
                >
                  <ListItemIcon>
                    <PersonOutlineTwoToneIcon
                      sx={{
                        color: checkNavigation(/students/, pathname)
                          ? "primary.main"
                          : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Students"></ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor: checkNavigation(/researches/, pathname)
                    ? "white"
                    : "primary.main",
                  color: checkNavigation(/researches/, pathname)
                    ? "primary.main"
                    : "white",
                  borderRadius: 1.5,
                  my: 1.5,
                }}
                onClick={() => handleNavigate("researches")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={checkNavigation(/researches/, pathname)}
                  sx={{}}
                >
                  <ListItemIcon>
                    <TaskTwoToneIcon
                      sx={{
                        color: checkNavigation(/researches/, pathname)
                          ? "primary.main"
                          : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Researches"></ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      <Drawer
        open={true}
        variant="persistent"
        anchor="left"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: {
            xs: 0,
            md: 248,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 248,
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
            Faculty
          </Typography> */}
        </Box>
        <Box display={"flex"} justifyContent={"center"} my={3}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box>

        <List sx={{ mx: 1.5, fontWeight: "bold" }} dense>
          <ListItem>
            <ListItemText
              primary="Navigation"
              primaryTypographyProps={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
              }}
            ></ListItemText>
          </ListItem>
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
              onClick={() => setSelected("/faculty/my-research")}
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
              onClick={() => setSelected("/faculty/saved-research")}
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

          {data?.role == "faculty_in_charge" && (
            <>
              <ListItem sx={{ mt: 4 }}>
                <ListItemText
                  primary="Faculty In Charge"
                  primaryTypographyProps={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                ></ListItemText>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor: checkNavigation(/students/, pathname)
                    ? "white"
                    : "primary.main",
                  color: checkNavigation(/students/, pathname)
                    ? "primary.main"
                    : "white",
                  borderRadius: 1.5,
                  my: 1.5,
                }}
                onClick={() => handleNavigate("students")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={checkNavigation(/students/, pathname)}
                  sx={{}}
                >
                  <ListItemIcon>
                    <PersonOutlineTwoToneIcon
                      sx={{
                        color: checkNavigation(/students/, pathname)
                          ? "primary.main"
                          : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Students"></ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor: checkNavigation(/researches/, pathname)
                    ? "white"
                    : "primary.main",
                  color: checkNavigation(/researches/, pathname)
                    ? "primary.main"
                    : "white",
                  borderRadius: 1.5,
                  my: 1.5,
                }}
                onClick={() => handleNavigate("researches")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={checkNavigation(/researches/, pathname)}
                  sx={{}}
                >
                  <ListItemIcon>
                    <TaskTwoToneIcon
                      sx={{
                        color: checkNavigation(/researches/, pathname)
                          ? "primary.main"
                          : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Researches"></ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default FacultyDashboard;
