import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StudentAppBar from "../../layouts/Appbar/StudentAppBar";
import StudentDashboard from "../../layouts/Dashboard/StudentDashboard";
import { Outlet, useNavigate } from "react-router-dom";
import StudentBottomNav from "../../layouts/BottomNav/StudentBottomNav";
import store from "../../store/store";
import { getUser } from "../../store/actions/userAction";
import SplashScreen from "../../layouts/splash_screen/Index";

function Student() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [open, setOpen] = useState(true);
  const handleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("token")) navigate("/");
      try {
        const res = await store.dispatch(getUser());
        setIsUser(true);

        if (!res.isValidate) {
          navigate("/");
          setIsUser(false);
        }

        if (res.role != "student") {
          setIsUser(false);
          navigate("/");
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
    <>
      <Box sx={{ display: "flex" }}>
        <StudentDashboard
          open={open}
          handleOpen={() => handleModal()}
        ></StudentDashboard>
        <Box sx={{ flex: 1 }}>
          <StudentAppBar
            open={open}
            handleOpen={() => handleModal()}
          ></StudentAppBar>
          <Outlet></Outlet>
          <StudentBottomNav />
        </Box>
      </Box>
    </>
  );
}

export default Student;
