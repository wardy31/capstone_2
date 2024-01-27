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
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import dateFormat from "../../../utils/moment";

function RecordTable({ data, handleView, handleData }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date Submitted</TableCell>
            <TableCell align="right">Action</TableCell>
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
                <Typography
                  textTransform={"Capitalize"}
                  fontSize={12}
                  sx={{ color: "text.secondary" }}
                >{`${user.role} `}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={14}>{dateFormat(createdAt)}</Typography>
              </TableCell>
              <TableCell align="right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecordTable;
