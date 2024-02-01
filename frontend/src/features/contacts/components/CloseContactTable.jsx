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
import RowCollapse from "./table/RowCollapse";

function CloseContactTable({ data, handleAdd, checkProfile }) {

  console.log("dd",data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Logs</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Role </TableCell>
            <TableCell align="right" sx={{ color: "text.secondary" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <RowCollapse
              key={user.id}
              data={user}
              handleAdd={handleAdd}
              checkProfile={checkProfile}
            ></RowCollapse>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CloseContactTable;
