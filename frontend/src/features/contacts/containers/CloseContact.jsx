import React from "react";
import CloseContactTable from "../components/CloseContactTable";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import { getUserById } from "../../user/userThunks";
import { useParams } from "react-router-dom";
import store from "../../../store/store";
import CloseContactProfile from "../components/CloseContactProfile";
import { Box } from "@mui/material";

function CloseContact() {
  const { userById } = useSelector((state) => state.user);
  const { id } = useParams();

  useFetch(() => store.dispatch(getUserById(id)));

  return (
    <>
      <Box mt={4}>
        <CloseContactProfile {...userById}></CloseContactProfile>
      </Box>

      <Box>
        <CloseContactTable></CloseContactTable>
      </Box>
    </>
  );
}

export default CloseContact;
