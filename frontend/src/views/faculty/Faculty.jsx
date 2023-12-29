import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FacultyDashboard from "../../layouts/Dashboard/FacultyDashboard";
import FacultyAppbar from "../../layouts/Appbar/FacultyAppbar";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import store from "../../store/store";
import { getUser } from "../../store/actions/userAction";
import SplashScreen from "../../layouts/splash_screen/Index";
function Faculty() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      }

      try {
        const res = await store.dispatch(getUser());
        console.log(res);

        if (!res.isValidate) {
          navigate("/");
          setIsUser(false);
        }

        if (res.role == "faculty" || res.role == "faculty_in_charge") {
          setIsUser(true);
        } else {
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
        <SplashScreen></SplashScreen>
      </>
    );
  }
  return (
    <Box sx={{ display: "flex", transition: theme.transitions.create() }}>
      <FacultyDashboard open={open} handleOpen={() => handleModal()} />
      <Box sx={{ flex: 1 }}>
        <FacultyAppbar handleOpen={() => handleModal()}></FacultyAppbar>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Faculty;
