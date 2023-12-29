import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";


function FacultyInChargeTable() {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          letterSpacing: 1.5,
          mb: 2,
          color: "primary.light",
        }}
      >
        Validate Users
      </Typography>
      <Table component={Card}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              College
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Department
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Role
            </TableCell>
            <TableCell
              Role
              sx={{ fontWeight: "bold", color: "primary.main" }}
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
            <TableCell align="center">
              <IconButton color={"success"} size="small">
                <ThumbUpAltTwoToneIcon />
              </IconButton>
              <IconButton color={"error"} size="small">
                <ThumbDownAltTwoToneIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
            <TableCell>dwadw</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default FacultyInChargeTable;
