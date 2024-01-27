import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";

function ClinicLayout() {
  return (
    <Box display={"flex"}>
      <ClinicDashboard open={true}></ClinicDashboard>
      <Box flexGrow={1}>
        <UserBar></UserBar>
        <Box mx={4}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>
  );
}

export default ClinicLayout;
