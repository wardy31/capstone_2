import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";
import UserNav from "./BottomNav/UserNav";

function UserLayout() {
  return (
    <Box display={"flex"}>
      <Box flexGrow={1}>
        <UserBar role="user"></UserBar>
        <Box mx={4}>
          <Outlet></Outlet>
        </Box>
        <UserNav></UserNav>
      </Box>
    </Box>
  );
}

export default UserLayout;
