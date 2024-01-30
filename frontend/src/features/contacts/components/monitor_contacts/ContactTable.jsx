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
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import dateFormat from "../../../../utils/moment";

function ContactTable({
  data,
  handleView,
  handleRemove,
  handleUpdateStatus,
  handleTrace,
}) {
  const countActiveContact = (data) => {
    return data.filter((f) => f.status == "contact").length;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>
              Date Infected
            </TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="center">
              Active Contacts
            </TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="center">
              Total Contacts
            </TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{`${u.user.firstName} ${u.user.lastName}`}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>{`${dateFormat(
                u.dateInfected
              )} `}</TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${u.status} `}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }} align="center">
                {countActiveContact(u.ExposedUser)}
              </TableCell>
              <TableCell sx={{ textTransform: "capitalize" }} align="center">
                {u.ExposedUser.length}
              </TableCell>
              <TableCell sx={{ textTransform: "capitalize" }} align="right">
                <IconButton color="primary" onClick={() => handleTrace(u.id)}>
                  <PersonSearchTwoToneIcon></PersonSearchTwoToneIcon>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleUpdateStatus(u)}
                >
                  <EditTwoToneIcon></EditTwoToneIcon>
                </IconButton>
                <IconButton color="primary" onClick={() => handleRemove(u.id)}>
                  <DeleteForeverTwoToneIcon></DeleteForeverTwoToneIcon>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleView(u.user.id)}
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

export default ContactTable;
