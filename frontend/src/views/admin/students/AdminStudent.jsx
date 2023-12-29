import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import StudentTable from "../../../components/admin/student/StudentTable";
import Header from "../../../components/Header/Header";
import StudentSearch from "../../../components/admin/student/StudentSearch";
import store from "../../../store/store";
import { getStudent } from "../../../store/actions/studentAction";
function AdminStudent() {
  const [query, setQuery] = useState({ search: "", isValidate: "all" });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getStudent({ ...query, [key]: value }));
    console.log(value);
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getStudent({ search: "", isValidate: "all" }));
  };

  return (
    <Box sx={{ mx: 4 }}>
      <Header
        primary={"Students Management"}
        secondary={"this is an student page."}
      />
      <Box mt={4}></Box>

      <StudentSearch
        query={query}
        handleChange={handleChange}
        handleReset={handleReset}
      />
      <StudentTable query={query} />
    </Box>
  );
}

export default AdminStudent;
