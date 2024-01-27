import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function CloseContactTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location </TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}

export default CloseContactTable;
