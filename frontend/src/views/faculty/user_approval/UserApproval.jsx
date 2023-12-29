import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { Box, Paper, TextField } from "@mui/material";
import Approval from "../../../components/user_approval/Approval";
import SearchApproval from "./SearchApproval";
import Student from "../../student/Student";
import StudentTable from "../../../components/admin/student/StudentTable";
import store from "../../../store/store";
import { getStudent } from "../../../store/actions/studentAction";

function UserApproval() {
  const [query, setQuery] = useState({
    search: "",
    isValidate: "all",
  });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getStudent({ ...query, [key]: value }));
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getStudent({ search: "", isValidate: "all" }));
  };

  return (
    <>
      <Box sx={{ mx: [2, 4] }}>
        <Header
          primary="Students Management"
          secondary={" this is your Users Approval page."}
        ></Header>

        <Box mb={4}></Box>

        <SearchApproval
          query={query}
          handleChange={handleChange}
          handleReset={handleReset}
        />

        <StudentTable query={query} />
      </Box>
    </>
  );
}

export default UserApproval;
