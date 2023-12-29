import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  getDashboard as studentDashboard,
  getStudent,
} from "../../../store/actions/studentAction";
import {
  getDashboard as facultyDasboard,
  getFaculty,
} from "../../../store/actions/facultyAction";
import {
  getDashboard as facultyICDasboard,
  getFaculty as getFacultyInCharge,
} from "../../../store/actions/facultyInChargeAction";
import store from "../../../store/store";
import { useSelector } from "react-redux";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { Link } from "react-router-dom";

function AdminCards() {
  const { data: dataStudent, loading: loadingStudent } = useSelector(
    (state) => state.student.dashboard
  );
  const { data: dataFaculty, loading: loadingFaculty } = useSelector(
    (state) => state.faculty.dashboard
  );
  const { data: dataFacultyInCharge, loading: loadingFacultyInCharge } =
    useSelector((state) => state.facultyInCharge.dashboard);

  useEffect(() => {
    store.dispatch(studentDashboard());
    store.dispatch(facultyDasboard());
    store.dispatch(facultyICDasboard());
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card variant="elevation" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardActionArea LinkComponent={Link} to="/admin/student">
              <CardContent>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: 1.5,
                  }}
                  variant="subtitle1"
                >
                  Student
                </Typography>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  variant="h5"
                >
                  {dataStudent.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="elevation" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardActionArea LinkComponent={Link} to="/admin/faculty">
              <CardContent>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: 1.5,
                  }}
                  variant="subtitle1"
                >
                  Faculty
                </Typography>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  variant="h5"
                >
                  {dataFaculty.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="elevation" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardActionArea LinkComponent={Link} to="/admin/faculty-in-charge">
              <CardContent>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: 1.5,
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                  }}
                  variant="subtitle1"
                >
                  Faculty In Charge
                </Typography>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  variant="h5"
                >
                  {dataFacultyInCharge.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminCards;
