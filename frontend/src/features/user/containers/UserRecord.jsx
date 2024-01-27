import React from "react";
import UserRecordTable from "../components/UserRecordTable";
import Header from "../../../components/header/Header";
import { useFetch } from "../../../hooks/useFetch";
import { getUserLocations } from "../userThunks";
import store from "../../../store/store";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";

function UserRecord() {
  const {
    data: { id },
  } = useSelector((state) => state.auth.getUser);
  const { data, loading } = useSelector((state) => state.user.userLocation);

  useFetch(() => store.dispatch(getUserLocations(id)));

  return (
    <Container>
      <Header title={"Visited Location Logs"} hideButton={true}></Header>
      <Box mt={4}></Box>
      <UserRecordTable data={data}></UserRecordTable>
    </Container>
  );
}

export default UserRecord;
