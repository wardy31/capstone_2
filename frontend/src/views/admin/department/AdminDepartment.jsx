import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DepartmentTable from "../../../components/admin/department/DepartmentTable";
import Header from "../../../components/Header/Header";
import AddModal from "../../../components/admin/department/modal/AddModal";
import DepartmentSearch from "../../../components/admin/department/DepartmentSearch";
import { getDepartment } from "../../../store/actions/departmentAction";
import store from "../../../store/store";

function AdminDepartment() {
  const [query, setQuery] = useState({
    search: "",
    isValidate: "all",
  });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getDepartment(value));
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getDepartment(value));
  };

  return (
    <Box
      sx={{
        mx: {
          xs: 2,
          lg: 4,
        },
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: {
            xs: "block",
            lg: "flex",
          },
          justifyContent: {
            xs: "flex-start",
            lg: "space-between",
          },
        }}
        alignItems={"center"}
      >
        <Header
          primary={"Department"}
          secondary={"   this is an admin's department page."}
        ></Header>
        <AddModal />
      </Box>

      <Box mt={4}></Box>
      <DepartmentSearch
        query={query}
        handleChange={handleChange}
        handleReset={handleReset}
      />
      <DepartmentTable />
    </Box>
  );
}

export default AdminDepartment;
