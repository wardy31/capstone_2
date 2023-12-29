import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import FacultyTable from "../../../components/admin/faculty/FacultyTable";
import Header from "../../../components/Header/Header";
import FacultySearch from "../../../components/admin/faculty/FacultySearch";
import store from "../../../store/store";
import { getFaculty } from "../../../store/actions/facultyAction";

function AdminFaculty() {
  const [query, setQuery] = useState({
    search: "",
    isValidate: "all",
  });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getFaculty({ ...query, [key]: value }));
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getFaculty({ search: "", isValidate: "all" }));
  };

  return (
    <Box sx={{ mx: 4 }}>
      <Header
        primary={"Faculty Management"}
        secondary={" this is an admin's faculty page."}
      ></Header>

      <Box mt={4}></Box>
      <FacultySearch
        query={query}
        handleChange={handleChange}
        handleReset={handleReset}
      ></FacultySearch>
      <FacultyTable query={query} />
    </Box>
  );
}

export default AdminFaculty;
