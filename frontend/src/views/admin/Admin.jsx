import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../layouts/Dashboard/AdminDashboard";
import AdminAppbar from "../../layouts/Appbar/AdminAppbar";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import store from "../../store/store";
import { getUser } from "../../store/actions/userAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../../layouts/splash_screen/Index";
function Admin() {
  const [isUser, setIsUser] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      }
      try {
        const res = await store.dispatch(getUser());
        setIsUser(true);
        console.log(res);

        if (!res.isValidate) {
          navigate("/");
          setIsUser(false);
        }

        if (res.role != "admin") {
          navigate("/");
          setIsUser(false);
        }
      } catch (error) {
        navigate("/");
      }
    })();
  }, []);

  if (!isUser) {
    return (
      <>
        <SplashScreen />
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", transition: theme.transitions.create() }}>
      <AdminDashboard handleOpen={() => handleOpen()} open={open} />
      <Box sx={{ flex: 1 }}>
        <AdminAppbar handleOpen={() => handleOpen()}></AdminAppbar>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Admin;
