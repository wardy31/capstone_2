import React, { createRef, useRef, useState } from "react";
import ValidationTable from "../../../components/admin/dashboard/ValidationTable";
import FacultyInChargeTable from "../../../components/admin/dashboard/FacultyInChargeTable";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import AdminCards from "../../../components/admin/dashboard/AdminCards";
import AuditLogs from "../../../components/admin/dashboard/ AuditLogs";
import Header from "../../../components/Header/Header";
import Approval from "../../../components/user_approval/Approval";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function AdminDashboard() {
  const [value, setValue] = useState("student");

  const handleChange = (event, newValue) => {
    if (newValue != null) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Box sx={{ mx: 2 }}>
        <Header
          primary={"Dashboard"}
          secondary={"this is an admin's dashboard"}
        />

        <Grid container spacing={2} mt={4}>
          <Grid item  xs={12} lg={9}>
            <AdminCards />

            <Tabs
              textColor="primary"
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <Tab value="student" label="Student's Approval"></Tab>
              <Tab value="faculty" label="Faculty Approval"></Tab>
            </Tabs>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Approval role={value}></Approval>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <AuditLogs></AuditLogs>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AdminDashboard;
