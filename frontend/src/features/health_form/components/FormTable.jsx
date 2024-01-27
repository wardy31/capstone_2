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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color:"text.secondary"}}>Question</TableCell>
            {/* <TableCell>
              <Typography >Subtitle</Typography>
            </TableCell> */}
          <TableCell align="right" sx={{color:"text.secondary"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((m) => (
            <TableRow>
              <TableCell sx={{maxWidth:120,wordBreak:"break-all"}}>{m.title}</TableCell>
              {/* <TableCell>{m.subtitle}</TableCell> */}
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
