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
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserTable({ data }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact No.</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{`${m.firstName} ${m.lastName}`}</TableCell>
              <TableCell>{`${m.email} `}</TableCell>
              <TableCell>{`${m.contactNumber} `}</TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${m.role} `}</TableCell>
              <TableCell align="center">
                <IconButton
                  color={"primary"}
                  onClick={() => navigate(`/clinic/users/${m?.id}`)}
                >
                  <RemoveRedEyeTwoToneIcon></RemoveRedEyeTwoToneIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
