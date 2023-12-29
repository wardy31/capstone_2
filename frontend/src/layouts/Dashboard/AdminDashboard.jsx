import {
  Avatar,
  Box,
  Button,
  Collapse,
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
import React, { createRef, useEffect, useState } from "react";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import AddHomeTwoToneIcon from "@mui/icons-material/AddHomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DvrTwoToneIcon from "@mui/icons-material/DvrTwoTone";

import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";

import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";

import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

import Logo from "../../../public/title.png";

function AdminDashboard({ open, handleOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(pathname);
  const theme = useTheme();
  const [collapse, setCollapse] = useState(false);

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
          display: {
            xs: "flex",
            md: "block",
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            bgcolor: "primary.main",
          },
          transition: theme.transitions.create(),
        }}
        elevation={8}
      >
        <Box sx={{ mx: 3 }}></Box>
        {/* <Box sx={{ my: 4, mx: 3 }}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", letterSpacing: 1.5 }}
            variant="body1"
          >
            Eduardo Macabacyao
          </Typography>
          <Typography
            sx={{ color: "white", letterSpacing: 1.5 }}
            variant="body2"
          >
            Admin
          </Typography>
        </Box> */}
        <Box display={"flex"} justifyContent={"center"} my={3}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box>
        <List sx={{ mx: 1.5 }} dense>
          <ListItem sx={{}}>
            <ListItemText
              primary="Admin Side"
              primaryTypographyProps={{
                textTransform: "uppercase",
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
              bgcolor: selected == "/admin/dashboard" ? "white" : "",
              color: selected == "/admin/dashboard" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/dashboard"}
              onClick={() => setSelected("/admin/dashboard")}
            >
              <ListItemIcon>
                <DashboardTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/dashboard" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/course" ? "white" : "primary.main",
              color: selected == "/admin/course" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("course")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/course"}
              onClick={() => setSelected("/admin/course")}
              sx={{}}
            >
              <ListItemIcon>
                <MenuBookIcon
                  sx={{
                    color:
                      selected == "/admin/course" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Course"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor:
                selected == "/admin/department" ? "white" : "primary.main",
              color: selected == "/admin/department" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("department")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/department"}
              onClick={() => setSelected("/admin/department")}
              sx={{}}
            >
              <ListItemIcon>
                <AddHomeTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/department"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Department"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/college" ? "white" : "primary.main",
              color: selected == "/admin/college" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("college")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/college"}
              onClick={() => setSelected("/admin/college")}
              sx={{}}
            >
              <ListItemIcon>
                <SchoolTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/college" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="College"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => setCollapse(!collapse)}
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              color: "white",
              borderRadius: 1.5,
              mt: 1.5,
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="User Management"></ListItemText>
              {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={collapse} timeout={"auto"} unmountOnExit>
            <List dense>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/student" ? "white" : "primary.main",
                  color:
                    selected == "/admin/student" ? "primary.main" : "white",
                  borderRadius: 1.5,
                  mb: 1,
                }}
                onClick={() => handleNavigate("student")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/student"}
                  onClick={() => setSelected("/admin/student")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <PeopleAltTwoToneIcon
                      sx={{
                        color:
                          selected == "/admin/student"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Student"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/faculty" ? "white" : "primary.main",
                  color:
                    selected == "/admin/faculty" ? "primary.main" : "white",
                  borderRadius: 1.5,
                  my: 1,
                }}
                onClick={() => handleNavigate("faculty")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/faculty"}
                  onClick={() => setSelected("/admin/faculty")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <BadgeTwoToneIcon
                      sx={{
                        color:
                          selected == "/admin/faculty"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Faculty"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/faculty-in-charge"
                      ? "white"
                      : "primary.main",
                  color:
                    selected == "/admin/faculty-in-charge"
                      ? "primary.main"
                      : "white",
                  borderRadius: 1.5,
                  my: 1,
                }}
                onClick={() => handleNavigate("faculty-in-charge")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/faculty-in-charge"}
                  onClick={() => setSelected("/admin/faculty-in-charge")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <Diversity3Icon
                      sx={{
                        color:
                          selected == "/admin/faculty-in-charge"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Faculty In Charge"></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/logs" ? "white" : "primary.main",
              color: selected == "/admin/logs" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("logs")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/logs"}
              onClick={() => setSelected("/admin/logs")}
              sx={{}}
            >
              <ListItemIcon>
                <DvrTwoToneIcon
                  sx={{
                    color: selected == "/admin/logs" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Admin Logs"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mt: 2 }}>
            <ListItemText
              primary="Users Side"
              primaryTypographyProps={{
                textTransform: "uppercase",
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
              bgcolor: selected == "/admin/home" ? "white" : "",
              color: selected == "/admin/home" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("home")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/home"}
              onClick={() => setSelected("/admin/home")}
            >
              <ListItemIcon>
                <CottageTwoToneIcon
                  sx={{
                    color: selected == "/admin/home" ? "primary.main" : "white",
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
              bgcolor: selected == "/admin/my-research" ? "white" : "",
              color:
                selected == "/admin/my-research" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("my-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/my-research"}
              onClick={() => setSelected("/admin/my-research")}
            >
              <ListItemIcon>
                <AutoStoriesTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/my-research"
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
              bgcolor: selected == "/admin/saved-research" ? "white" : "",
              color:
                selected == "/admin/saved-research" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("saved-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/saved-research"}
              onClick={() => setSelected("/admin/saved-research")}
            >
              <ListItemIcon>
                <FavoriteTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/saved-research"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Saved Research"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/researches" ? "white" : "",
              color: selected == "/admin/researches" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("researches")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/researches"}
              onClick={() => setSelected("/admin/researches")}
            >
              <ListItemIcon>
                <TaskTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/researches"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Researches"></ListItemText>
            </ListItemButton>
          </ListItem>
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
            md: 280,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "primary.main",
          },
          transition: theme.transitions.create(),
        }}
        elevation={8}
      >
        <Box sx={{ mx: 3 }}></Box>
        {/* <Box sx={{ my: 4, mx: 3 }}>
          <Typography
            sx={{ color: "white", fontWeight: "bold", letterSpacing: 1.5 }}
            variant="body1"
          >
            Eduardo Macabacyao
          </Typography>
          <Typography
            sx={{ color: "white", letterSpacing: 1.5 }}
            variant="body2"
          >
            Admin
          </Typography>
        </Box> */}
        <Box display={"flex"} justifyContent={"center"} my={3}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box>
        <List sx={{ mx: 1.5 }} dense>
          <ListItem sx={{}}>
            <ListItemText
              primary="Admin Side"
              primaryTypographyProps={{
                textTransform: "uppercase",
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
              bgcolor: selected == "/admin/dashboard" ? "white" : "",
              color: selected == "/admin/dashboard" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/dashboard"}
              onClick={() => setSelected("/admin/dashboard")}
            >
              <ListItemIcon>
                <DashboardTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/dashboard" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/course" ? "white" : "primary.main",
              color: selected == "/admin/course" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("course")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/course"}
              onClick={() => setSelected("/admin/course")}
              sx={{}}
            >
              <ListItemIcon>
                <MenuBookIcon
                  sx={{
                    color:
                      selected == "/admin/course" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Course"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor:
                selected == "/admin/department" ? "white" : "primary.main",
              color: selected == "/admin/department" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("department")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/department"}
              onClick={() => setSelected("/admin/department")}
              sx={{}}
            >
              <ListItemIcon>
                <AddHomeTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/department"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Department"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/college" ? "white" : "primary.main",
              color: selected == "/admin/college" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("college")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/college"}
              onClick={() => setSelected("/admin/college")}
              sx={{}}
            >
              <ListItemIcon>
                <SchoolTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/college" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="College"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => setCollapse(!collapse)}
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              color: "white",
              borderRadius: 1.5,
              mt: 1.5,
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="User Management"></ListItemText>
              {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={collapse} timeout={"auto"} unmountOnExit>
            <List dense>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/student" ? "white" : "primary.main",
                  color:
                    selected == "/admin/student" ? "primary.main" : "white",
                  borderRadius: 1.5,
                  mb: 1.5,
                }}
                onClick={() => handleNavigate("student")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/student"}
                  onClick={() => setSelected("/admin/student")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <PeopleAltTwoToneIcon
                      sx={{
                        color:
                          selected == "/admin/student"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Student"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/faculty" ? "white" : "primary.main",
                  color:
                    selected == "/admin/faculty" ? "primary.main" : "white",
                  borderRadius: 1.5,
                  my: 1,
                }}
                onClick={() => handleNavigate("faculty")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/faculty"}
                  onClick={() => setSelected("/admin/faculty")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <BadgeTwoToneIcon
                      sx={{
                        color:
                          selected == "/admin/faculty"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Faculty"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  transition: theme.transitions.create(),
                  bgcolor:
                    selected == "/admin/faculty-in-charge"
                      ? "white"
                      : "primary.main",
                  color:
                    selected == "/admin/faculty-in-charge"
                      ? "primary.main"
                      : "white",
                  borderRadius: 1.5,
                  my: 1,
                }}
                onClick={() => handleNavigate("faculty-in-charge")}
              >
                {/* <ListItemButton onClick={() => setOpen(false)}> */}
                <ListItemButton
                  selected={selected == "/admin/faculty-in-charge"}
                  onClick={() => setSelected("/admin/faculty-in-charge")}
                  sx={{}}
                >
                  <ListItemIcon>
                    <Diversity3Icon
                      sx={{
                        color:
                          selected == "/admin/faculty-in-charge"
                            ? "primary.main"
                            : "white",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Faculty In Charge"></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/logs" ? "white" : "primary.main",
              color: selected == "/admin/logs" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("logs")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/logs"}
              onClick={() => setSelected("/admin/logs")}
              sx={{}}
            >
              <ListItemIcon>
                <DvrTwoToneIcon
                  sx={{
                    color: selected == "/admin/logs" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Admin Logs"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mt: collapse ? null : 1.5 }}>
            <ListItemText
              primary="User's  Side"
              primaryTypographyProps={{
                textTransform: "uppercase",
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
              bgcolor: selected == "/admin/home" ? "white" : "",
              color: selected == "/admin/home" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("home")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/home"}
              onClick={() => setSelected("/admin/home")}
            >
              <ListItemIcon>
                <CottageTwoToneIcon
                  sx={{
                    color: selected == "/admin/home" ? "primary.main" : "white",
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
              bgcolor: selected == "/admin/my-research" ? "white" : "",
              color:
                selected == "/admin/my-research" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("my-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/my-research"}
              onClick={() => setSelected("/admin/my-research")}
            >
              <ListItemIcon>
                <AutoStoriesTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/my-research"
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
              bgcolor: selected == "/admin/saved-research" ? "white" : "",
              color:
                selected == "/admin/saved-research" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("saved-research")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/saved-research"}
              onClick={() => setSelected("/admin/saved-research")}
            >
              <ListItemIcon>
                <FavoriteTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/saved-research"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Saved Research"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: selected == "/admin/researches" ? "white" : "",
              color: selected == "/admin/researches" ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 1,
            }}
            onClick={() => handleNavigate("researches")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={selected == "/admin/researches"}
              onClick={() => setSelected("/admin/researches")}
            >
              <ListItemIcon>
                <TaskTwoToneIcon
                  sx={{
                    color:
                      selected == "/admin/researches"
                        ? "primary.main"
                        : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Researches"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default AdminDashboard;
