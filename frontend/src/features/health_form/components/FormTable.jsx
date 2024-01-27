import {
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
import React from "react";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function FormTable({ data, handleUpdate, handleDelete }) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontSize={14}>Title</Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize={14}>Subtitle</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontSize={14}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((m) => (
            <TableRow>
              <TableCell>{m.title}</TableCell>
              <TableCell>{m.subtitle}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleUpdate(m)}>
                  <ModeEditTwoToneIcon></ModeEditTwoToneIcon>
                </IconButton>
                <IconButton color="primary" onClick={() => handleDelete(m)}>
                  <DeleteTwoToneIcon></DeleteTwoToneIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FormTable;
