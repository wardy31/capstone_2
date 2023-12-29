import React, { useState } from "react";
import CollegeTable from "../../../components/admin/college/CollegeTable";
import { Box, Typography } from "@mui/material/";
import Header from "../../../components/Header/Header";
import AddModal from "../../../components/admin/college/modal/AddModal";
import CollegeSearch from "../../../components/admin/college/CollegeSearch";
import store from "../../../store/store";
import { getCollege } from "../../../store/actions/collegeAction";

function AdminCollege() {
  const [query, setQuery] = useState({
    search: "",
    isValidate: "all",
  });

  const handleChange = (key, value) => {
    setQuery({ ...query, [key]: value });
    store.dispatch(getCollege(value));
  };

  const handleReset = () => {
    setQuery({ search: "", isValidate: "all" });
    store.dispatch(getCollege(value));
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
          primary={"College"}
          secondary={" this is an admin's college page."}
        ></Header>

        <AddModal />
      </Box>

      <Box mt={4}></Box>
      <CollegeSearch
        query={query}
        handleChange={handleChange}
        handleReset={handleReset}
      />

      <CollegeTable />
    </Box>
  );
}

export default AdminCollege;
