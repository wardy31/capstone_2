import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

function InfectedUserContactsTable({ data, handleStatus, handleView }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Role</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((m) => (
            <TableRow key={m.id}>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${m.user.firstName} ${m.user.lastName}`}</TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${m.user.role}`}</TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${m.status}`}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleStatus(m)} color="primary">
                  <EditTwoToneIcon></EditTwoToneIcon>
                </IconButton>
                <IconButton
                  onClick={() => handleView(m.user.id)}
                  color="primary"
                >
                  <VisibilityTwoToneIcon></VisibilityTwoToneIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InfectedUserContactsTable;
