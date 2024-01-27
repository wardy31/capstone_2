import React from "react";
import UserTable from "../../components/UserTable";
import { useFetch } from "../../../../hooks/useFetch";
import { getUsers } from "../../userThunks";
import store from "../../../../store/store";
import { useSelector } from "react-redux";
import Header from "../../../../components/header/Header";
import { Box, Container } from "@mui/material";

function User() {
  const { data, loading } = useSelector((state) => state.user.getUser);

  useFetch(() => store.dispatch(getUsers()));

  return (
    <Container>
      <Header title={"Users"} hideButton={true}></Header>
      <Box mb={4}></Box>
      <UserTable data={data}></UserTable>
    </Container>
  );
}

export default User;
