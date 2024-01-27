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
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import { useNavigate } from "react-router-dom";

function UserTable({ data }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Role</TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((u) => (
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold" }}
              >{`${u.firstName} ${u.lastName}`}</TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
              >{`${u.role} `}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => navigate(`${u.id}/close-contact`)}
                >
                  <GroupsTwoToneIcon></GroupsTwoToneIcon>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/clinic/users/${u.id}`)}
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

export default UserTable;
