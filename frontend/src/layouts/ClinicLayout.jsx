import { Box } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";

function ClinicLayout() {
  const { data, loading } = useSelector((state) => state.auth.getUser);
  const navigate = useNavigate();

  const { state: open, handleChange: handleOpen } = useData(
    innerWidth <= 900 ? false : true
  );
  console.log(open);

  const isAuth = useAuth();

  useFetch(() => {
    window.addEventListener("resize", () => {
      if (innerWidth <= 900) {
        console.log(false);
        handleOpen(false);
      } else {
        handleOpen(true);
        console.log(true);
      }
    });
  });

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
      <ClinicDashboard
        open={open}
        handleOpen={() => handleOpen(!open)}
      ></ClinicDashboard>
      <Box flexGrow={1}>
        <UserBar handleOpen={() => handleOpen(!open)}></UserBar>
        <Box mx={4}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>
  );
}

export default ClinicLayout;
