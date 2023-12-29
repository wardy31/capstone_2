import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import store from "../../store/store";

import { getStudent, validateStudent } from "../../store/actions/studentAction";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import { getFaculty, validateFaculty } from "../../store/actions/facultyAction";

function Approval({ role }) {
  const { data, loading } = useSelector((state) => state[role].get);

  const handleApproval = (id, status) => {
    switch (role) {
      case "student":
        if (status == "approve") {
          store.dispatch(
            validateStudent(id, "approve", {
              isValidate: "pending_approval",
              search: "",
            })
          );
        } else {
          store.dispatch(
            validateStudent(id, "decline", {
              isValidate: "pending_approval",
              search: "",
            })
          );
        }
        break;
      case "faculty":
        if (status == "approve") {
          store.dispatch(
            validateFaculty(id, "approve", {
              isValidate: "pending_approval",
              search: "",
            })
          );
        } else {
          store.dispatch(
            validateFaculty(id, "decline", {
              isValidate: "pending_approval",
              search: "",
            })
          );
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (role) {
      case "student":
        store.dispatch(
          getStudent({ isValidate: "pending_approval", search: "" })
        );
        break;
      case "faculty":
        store.dispatch(
          getFaculty({ isValidate: "pending_approval", search: "" })
        );
        break;

      default:
        break;
    }
  }, []);

  return (
    <Box sx={{ overflow: "auto", borderRadius: 2, boxShadow: 2 }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "primary.light" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,
                    letterSpacing: 1.5,
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,
                    letterSpacing: 1.5,
                  }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,

                    letterSpacing: 1.5,
                  }}
                >
                  Course
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,

                    letterSpacing: 1.5,
                  }}
                >
                  College
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,

                    letterSpacing: 1.5,
                  }}
                >
                  Department
                </TableCell>

                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: 12,

                    letterSpacing: 1.5,
                  }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((student) => (
                <TableRow sx={{ letterSpacing: 1.2 }}>
                  <TableCell
                    sx={{
                      color: "primary.main",
                      fontSize: 12,
                      fontWeight: "bold",
                      letterSpacing: 1.5,
                    }}
                  >
                    {student.roleID}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "text.primary",
                      fontSize: 12,
                      letterSpacing: 1.5,
                    }}
                  >{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell
                    sx={{
                      color: "text.primary",
                      fontSize: 12,
                      letterSpacing: 1.5,
                      // fontWeight:"bold"
                    }}
                  >{`${student?.course?.name}`}</TableCell>
                  <TableCell
                    sx={{
                      color: "text.primary",
                      fontSize: 12,
                      letterSpacing: 1.5,
                    }}
                  >{`${student?.college?.name}`}</TableCell>
                  <TableCell
                    sx={{
                      color: "text.primary",
                      fontSize: 12,
                      letterSpacing: 1.5,
                    }}
                  >{`${student?.department?.name}`}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems={"center"}>
                      <IconButton
                        color="primary"
                        size="medium"
                        onClick={() => handleApproval(student.id, "approve")}
                      >
                        <ThumbUpAltTwoToneIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="medium"
                        onClick={() => handleApproval(student.id, "decline")}
                      >
                        <ThumbDownOffAltTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Approval;
