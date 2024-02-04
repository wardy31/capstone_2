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

import { useNavigate, useLocation, Link } from "react-router-dom";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import checkNavigation from "../../utils/checkNavigation";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Logo from "../../../public/title.png";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
import MonitorHeartTwoToneIcon from "@mui/icons-material/MonitorHeartTwoTone";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import ContentPasteSearchTwoToneIcon from "@mui/icons-material/ContentPasteSearchTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";

function ClinicDashboard({ open, handleOpen }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(pathname);

  const handleNavigate = (nav) => {
    navigate(nav);
  };
  return (
    <>
      {/* Hide on Mobile */}
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
            md: open ? 248 : 0,
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
        {/* <Box display={"flex"} justifyContent={"center"} my={2}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box> */}

        <Typography
          color="white"
          variant="h5"
          letterSpacing={1.2}
          fontWeight={"bold"}
          my={2}
          textAlign={"center"}
        >
          UniTrace.
        </Typography>
        <List sx={{ mx: 1.5 }} dense>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Navigation"
            ></ListItemText>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/dashboard/, pathname) ? "white" : "",
              color: checkNavigation(/dashboard/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/dashboard/, pathname)}
              onClick={() => setSelected(/dashboard/, pathname)}
            >
              <ListItemIcon>
                <DashboardTwoToneIcon
                  sx={{
                    color: checkNavigation(/dashboard/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Manage Contacts"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/monitor-contacts/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/monitor-contacts/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("monitor-contacts")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/monitor-contacts/, pathname)}
              onClick={() => setSelected("/clinic/monitor-contacts")}
              sx={{}}
            >
              <ListItemIcon>
                <MonitorHeartTwoToneIcon
                  sx={{
                    color: checkNavigation(/monitor-contacts/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Monitor Contacts"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/users/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/users/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("users")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/users/, pathname)}
              onClick={() => setSelected("/clinic/users")}
              sx={{}}
            >
              <ListItemIcon>
                <PeopleAltTwoToneIcon
                  sx={{
                    color: checkNavigation(/users/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Users"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Manage Form"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/manage-form/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/manage-form/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("manage-form")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/manage-form/, pathname)}
              onClick={() => setSelected("/clinic/manage-form")}
              sx={{}}
            >
              <ListItemIcon>
                <DescriptionTwoToneIcon
                  sx={{
                    color: checkNavigation(/manage-form/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Declaration Form"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/health-records/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/health-records/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("health-records")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/health-records/, pathname)}
              onClick={() => setSelected("/clinic/health-records")}
              sx={{}}
            >
              <ListItemIcon>
                <ContentPasteSearchTwoToneIcon
                  sx={{
                    color: checkNavigation(/health-records/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Declaration Logs"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Settings"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor:
                "/clinic/stations" == pathname ? "white" : "primary.main",
              color: "/clinic/stations" == pathname ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
          >
            <ListItemButton LinkComponent={Link} to="/clinic/stations" sx={{}}>
              <ListItemIcon>
                <MeetingRoomTwoToneIcon
                  sx={{
                    color:
                      "/clinic/stations" == pathname ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Stations"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/generate-reports/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/generate-reports/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("generate-reports")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/generate-reports/, pathname)}
              onClick={() => setSelected("/clinic/generate-reports")}
              sx={{}}
            >
              <ListItemIcon>
                <PrintTwoToneIcon
                  sx={{
                    color: checkNavigation(/generate-reports/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Generate Reports"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Not hide  on mobile */}

      <Drawer
        onClose={handleOpen}
        open={open}
        anchor="left"
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          width: {
            xs: 0,
            md: open ? 248 : 0,
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
        {/* <Box display={"flex"} justifyContent={"center"} my={2}>
          <Avatar src={Logo} sx={{ height: "auto", width: 120 }}></Avatar>
        </Box> */}

        <Typography
          color="white"
          variant="h5"
          letterSpacing={1.2}
          fontWeight={"bold"}
          my={2}
          textAlign={"center"}
        >
          UniTrace.
        </Typography>
        <List sx={{ mx: 1.5 }} dense>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Navigation"
            ></ListItemText>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/dashboard/, pathname) ? "white" : "",
              color: checkNavigation(/dashboard/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/dashboard/, pathname)}
              onClick={() => setSelected(/dashboard/, pathname)}
            >
              <ListItemIcon>
                <DashboardTwoToneIcon
                  sx={{
                    color: checkNavigation(/dashboard/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Manage Contacts"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/monitor-contacts/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/monitor-contacts/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("monitor-contacts")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/monitor-contacts/, pathname)}
              onClick={() => setSelected("/clinic/monitor-contacts")}
              sx={{}}
            >
              <ListItemIcon>
                <MonitorHeartTwoToneIcon
                  sx={{
                    color: checkNavigation(/monitor-contacts/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Monitor Contacts"></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/users/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/users/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("users")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/users/, pathname)}
              onClick={() => setSelected("/clinic/users")}
              sx={{}}
            >
              <ListItemIcon>
                <PeopleAltTwoToneIcon
                  sx={{
                    color: checkNavigation(/users/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Users"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Manage Form"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/manage-form/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/manage-form/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("manage-form")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/manage-form/, pathname)}
              onClick={() => setSelected("/clinic/manage-form")}
              sx={{}}
            >
              <ListItemIcon>
                <DescriptionTwoToneIcon
                  sx={{
                    color: checkNavigation(/manage-form/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Declaration Form"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/health-records/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/health-records/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("health-records")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/health-records/, pathname)}
              onClick={() => setSelected("/clinic/health-records")}
              sx={{}}
            >
              <ListItemIcon>
                <ContentPasteSearchTwoToneIcon
                  sx={{
                    color: checkNavigation(/health-records/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Declaration Logs"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText
              primaryTypographyProps={{ typography: "caption", color: "white" }}
              primary="Settings"
            ></ListItemText>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor:
                "/clinic/stations" == pathname ? "white" : "primary.main",
              color: "/clinic/stations" == pathname ? "primary.main" : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
          >
            <ListItemButton LinkComponent={Link} to="/clinic/stations" sx={{}}>
              <ListItemIcon>
                <MeetingRoomTwoToneIcon
                  sx={{
                    color:
                      "/clinic/stations" == pathname ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Stations"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              transition: theme.transitions.create(),
              bgcolor: checkNavigation(/generate-reports/, pathname)
                ? "white"
                : "primary.main",
              color: checkNavigation(/generate-reports/, pathname)
                ? "primary.main"
                : "white",
              borderRadius: 1.5,
              my: 0.8,
            }}
            onClick={() => handleNavigate("generate-reports")}
          >
            {/* <ListItemButton onClick={() => setOpen(false)}> */}
            <ListItemButton
              selected={checkNavigation(/generate-reports/, pathname)}
              onClick={() => setSelected("/clinic/generate-reports")}
              sx={{}}
            >
              <ListItemIcon>
                <PrintTwoToneIcon
                  sx={{
                    color: checkNavigation(/generate-reports/, pathname)
                      ? "primary.main"
                      : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Generate Reports"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default ClinicDashboard;
