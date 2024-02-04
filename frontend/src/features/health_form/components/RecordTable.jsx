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
  Typography,
} from "@mui/material";
import React from "react";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import dateFormat from "../../../utils/moment";

function RecordTable({ data, handleView, handleData }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="left">
              Role
            </TableCell>
            <TableCell sx={{ color: "text.secondary" }} align="center">
              Date Submitted
            </TableCell>
            <TableCell align="right" sx={{ color: "text.secondary" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, createdAt, user, UserAnswer }) => (
            <TableRow key={id}>
              <TableCell>
                <Typography
                  color={"primary"}
                  fontSize={14}
                  fontWeight={"bold"}
                >{`${user.firstName} ${user.lastName} `}</Typography>
              </TableCell>
              <TableCell
                sx={{ textTransform: "capitalize" }}
                align="left"
              >{`${user.role} `}</TableCell>
              <TableCell align="center">
                <Typography fontSize={14}>{dateFormat(createdAt)}</Typography>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="View Profile" arrow>
                  <IconButton
                    size="large"
                    color="primary"
                    onClick={() => {
                      handleView();
                      handleData(UserAnswer);
                    }}
                  >
                    <VisibilityTwoToneIcon fontSize="inherit"></VisibilityTwoToneIcon>
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

export default RecordTable;
