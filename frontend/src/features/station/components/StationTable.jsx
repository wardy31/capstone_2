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

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";

import React from "react";

function StationTable({
  data,
  loading,
  error,
  handleForm,
  handleUpdate,
  handleDelete,
  handleViewUser,
}) {

  if (loading) {
    return <></>;
  }
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontSize={14}>Username </Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize={14}>Name </Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize={14}>Status</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontSize={14}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow>
              <TableCell>
                <Typography
                  fontSize={14}
                  fontWeight={"bold"}
                  letterSpacing={1.5}
                >
                  {d.username}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={14} letterSpacing={1.5}>
                  {d.name}
                </Typography>
              </TableCell>
              <TableCell>
                {d.isActive ? (
                  <Typography color="green" fontSize={14} letterSpacing={1.5}>
                    Active
                  </Typography>
                ) : (
                  <Typography color="error" fontSize={14} letterSpacing={1.5}>
                    Not Active
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Logs" arrow>
                  <IconButton
                    color="primary"
                    size=""
                    onClick={() => handleViewUser(d)}
                  >
                    <FormatListBulletedTwoToneIcon></FormatListBulletedTwoToneIcon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit" arrow>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleForm(d);
                      handleUpdate();
                    }}
                  >
                    <EditTwoToneIcon></EditTwoToneIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    color="primary"
                    size=""
                    onClick={() => {
                      handleForm(d);
                      handleDelete();
                    }}
                  >
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
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

export default StationTable;
