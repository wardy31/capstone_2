import { Box, Typography } from "@mui/material";
import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import AppBarUser from "./Appbar/Appbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (  
    <>
      <Box display={"flex"}>
        <Dashboard open={true}></Dashboard>
        <Box flexGrow={1}>
          <AppBarUser></AppBarUser>
          <Outlet></Outlet>
        </Box>  
      </Box>
    </>
  );
}

export default Layout;
