import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";
import UserNav from "./BottomNav/UserNav";

function UserLayout() {
  return (
    <>
      <UserBar role="user"></UserBar>
      <Box pb={10}>
        <Outlet></Outlet>
        <UserNav></UserNav>
      </Box>
    </>
  );
}

export default UserLayout;
