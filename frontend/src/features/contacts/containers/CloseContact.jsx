import React from "react";
import CloseContactTable from "../components/CloseContactTable";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import { getUserById } from "../../user/userThunks";
import { useParams } from "react-router-dom";
import store from "../../../store/store";
import CloseContactProfile from "../components/CloseContactProfile";
import { Box, Container } from "@mui/material";
import FilterContacts from "../components/FilterContacts";

function CloseContact() {
  const { userById } = useSelector((state) => state.user);
  const { id } = useParams();

  useFetch(() => store.dispatch(getUserById(id)));

  return (
    <Container>
      <Box mt={4} mb={4}>
        <CloseContactProfile {...userById}></CloseContactProfile>
      </Box>

      <Box sx={{display:"flex",flexDirection:"column",rowGap:2}}>
        <FilterContacts ></FilterContacts>
        <CloseContactTable></CloseContactTable>
      </Box>
    </Container>
  );
}

export default CloseContact;
