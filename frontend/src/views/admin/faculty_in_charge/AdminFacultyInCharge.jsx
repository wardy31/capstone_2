import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import FacultyInChargeTable from "../../../components/admin/faculty_in_charge/FacultyInChargeTable";
import Header from "../../../components/Header/Header";
import FacultyInChargeSearch from "../../../components/admin/faculty_in_charge/FacultyInChargeSearch";
import store from "../../../store/store";
import { getFaculty } from "../../../store/actions/facultyInChargeAction";

function AdminFacultyInCharge() {
  const [query, setQuery] = useState({
    search: "",
    isValidate: "all",
  });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getFaculty({ ...query, [key]: value }));
    console.log(key +""+ value);
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getFaculty({ search: "", isValidate: "all" }));
  };

  return (
    <Box sx={{ mx: 4 }}>
      <Header
        primary={"Faculty In Charge"}
        secondary={"this is an admin's faculty in charge page."}
      ></Header>
      <Box mt={4}></Box>

      <FacultyInChargeSearch
        query={query}
        handleChange={handleChange}
        handleReset={handleReset}
      />
      <FacultyInChargeTable />
    </Box>
  );
}

export default AdminFacultyInCharge;
