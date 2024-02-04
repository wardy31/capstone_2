import { Box } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

function ClinicLayout() {
  const { data, loading } = useSelector((state) => state.auth.getUser);
  const navigate = useNavigate();

  const isAuth = useAuth();
  useFetch(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!loading) {
      if (!data?.role == "clinic") {
        navigate("/");
        return;
      }
    }
  });

  if (!isAuth) {
    return <></>;
  }

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
