import { Box } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ClinicDashboard from "../components/sidebar/ClinicDashboard";
import UserBar from "../components/appbar/UserBar";
import UserNav from "./BottomNav/UserNav";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

function UserLayout() {
  const { data, loading } = useSelector((state) => state.auth.getUser);
  const navigate = useNavigate();

  console.log(data);
  const isAuth = useAuth();

  useFetch(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!loading) {
      if (!(data?.role != "clinic")) {
        navigate("/");
        return;
      }
    }
  });

  if (!isAuth) {
    return <></>;
  }

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
