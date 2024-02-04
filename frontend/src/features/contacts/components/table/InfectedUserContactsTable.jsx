import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function InfectedUserContactsTable({
  data,
  handleStatus,
  handleDelete,
  handleView,
}) {
  if (!data.length) {
    return <></>;
  }
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
                <Tooltip title="Delete Contact">
                  <IconButton onClick={() => handleDelete(m)} color="primary">
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit Contact Status" arrow>
                  <IconButton onClick={() => handleStatus(m)} color="primary">
                    <EditTwoToneIcon></EditTwoToneIcon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="View Profile" arrow>
                  <IconButton
                    onClick={() => handleView(m.user.id)}
                    color="primary"
                  >
                    <VisibilityTwoToneIcon></VisibilityTwoToneIcon>
                  </IconButton>
                </Tooltip>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InfectedUserContactsTable;
