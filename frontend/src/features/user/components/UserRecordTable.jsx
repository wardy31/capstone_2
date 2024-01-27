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
import dateFormat, { time } from "../../../utils/moment";

function UserRecordTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Location</TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="center">
              Time Log
            </TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="center">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((u) => (
            <TableRow>
              <TableCell sx={{fontWeight:"bold",letterSpacing:1.2}}>{u?.station?.name}</TableCell>
              <TableCell align="center">{time(u.createdAt)}</TableCell>
              <TableCell align="center">{dateFormat(u.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserRecordTable;
