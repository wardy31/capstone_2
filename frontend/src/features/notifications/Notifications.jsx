import React from "react";
import Header from "../../components/header/Header";
import { Box } from "@mui/material";
import NotificationList from "./components/NotificationList";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import store from "../../store/store";
import { getNotifications } from "../auth/authThunks";

function Notifications() {
  const { notifications } = useSelector((state) => state.auth);

  useFetch(() => store.dispatch(getNotifications()));

  return (
    <>
      <Header title={"Notifications"} hideButton={true}></Header>
      <Box mb={4}></Box>

      <NotificationList {...notifications}></NotificationList>
    </>
  );
}

export default Notifications;
