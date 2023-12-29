import React, { useState } from "react";
import CollegeTable from "../../../components/admin/college/CollegeTable";
import { Box, Typography } from "@mui/material/";
import Header from "../../../components/Header/Header";
import CourseTable from "./CourseTable";
import CourseSearch from "./CourseSearch";

function Course() {
  const handleQuery = () => {};
  return (
    <Box sx={{ mx: 4 }}>
      <Header
        primary={"Courses"}
        secondary={" this is an admin's course page."}
      ></Header>
      
      <Box mt={4}></Box>
      <CourseSearch handleQuery={handleQuery} />
    </Box>
  );
}

export default Course;
