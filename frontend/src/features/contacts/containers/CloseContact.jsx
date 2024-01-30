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
import { getInfectedUsersById } from "../contactThunks";

function CloseContact() {
  const { infectedUserById } = useSelector((state) => state.contact);
  const { id } = useParams();

  console.log(infectedUserById);
  useFetch(() => store.dispatch(getInfectedUsersById(id)));

  if (infectedUserById.loading) {
    return <></>;
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <CloseContactProfile {...infectedUserById}></CloseContactProfile>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
        <FilterContacts {...infectedUserById}></FilterContacts>
        <CloseContactTable></CloseContactTable>
      </Box>
    </Container>
  );
}

export default CloseContact;
