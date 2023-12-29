import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Box,
  Typography,
  IconButton,
  TableContainer,
  Paper,
  Tooltip,
} from "@mui/material";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";

import {
  getStudentNotValidate,
  validateRequestStudent,
  deleteStudent,
} from "../../../store/actions/studentAction";
import {
  getFacultyNotValidate,
  validateRequestFaculty,
  deleteFaculty,
} from "../../../store/actions/facultyAction";
import { useSelector } from "react-redux";
import store from "../../../store/store";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";

function ValidationTable({ status }) {
  const { data, loading } = useSelector((state) => state[status].notValidated);
  useEffect(() => {
    switch (status) {
      case "student":
        store.dispatch(getStudentNotValidate());
        break;
      case "faculty":
        store.dispatch(getFacultyNotValidate());
        break;
      default:
    }
  }, []);

  const handleRemoval = (id) => {
    switch (status) {
      case "student":
        store.dispatch(validateRequestStudent(id, type));
        break;
      case "faculty":
        store.dispatch(validateRequestFaculty(id, type));
        break;
      default:
    }
  };

  const handleValidation = (id, type) => {
    switch (status) {
      case "student":
        store.dispatch(validateRequestStudent(id, type));
        break;
      case "faculty":
        store.dispatch(validateRequestFaculty(id, type));
        break;
      default:
    }
  };

  if (loading && !data.length) {
    return (
      <Box>
        <Typography
          variant="body1"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            letterSpacing: 1.5,
            mb: 2,
            color: "primary.light",
          }}
        >
          Validate {status}
        </Typography>

        <Skeletonloading></Skeletonloading>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          textTransform: "capitalize",
          fontWeight: "bold",
          letterSpacing: 1.5,
          mb: 2,
          color: "primary.light",
        }}
      >
        Validate {status}
      </Typography>
      {data.length ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                  College
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Department
                </TableCell>
                <TableCell
                  Role
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((m) => (
                <TableRow>
                  <TableCell>{m.firstName}</TableCell>
                  <TableCell>{m.college.name}</TableCell>
                  <TableCell>{m.department.name}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Approve">
                        <IconButton
                          color={"success"}
                          size="small"
                          onClick={() => handleValidation(m.id, true)}
                        >
                          <ThumbUpAltTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Decline">
                        <IconButton
                          color={"error"}
                          size="small"
                          onClick={() => handleRemoval(m.id)}
                        >
                          <ThumbDownAltTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoRecord />
      )}
    </Box>
  );
}

export default ValidationTable;
