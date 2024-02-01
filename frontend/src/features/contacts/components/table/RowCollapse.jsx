import {
  Box,
  Collapse,
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
import useData from "../../../../hooks/useData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dateFormat, { time } from "../../../../utils/moment";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

function RowCollapse({ data, handleAdd, checkProfile }) {
  const { state: open, handleChange } = useData(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            color="primary"
            onClick={() => handleChange(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >{`${data.firstName} ${data.lastName}`}</TableCell>
        <TableCell sx={{ textTransform: "capitalize" }}>{data.role}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleAdd(data.id)}>
            <PersonAddAltTwoToneIcon color="primary"></PersonAddAltTwoToneIcon>
          </IconButton>
          <IconButton onClick={() => checkProfile(data.id)}>
            <VisibilityTwoToneIcon color="primary"></VisibilityTwoToneIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                py={2}
                fontWeight={"bold"}
                sx={{ color: "text.secondary" }}
              >
                Visited Location
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Location</TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Date
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Time
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.UserLocationHistory.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.station.name}</TableCell>
                        <TableCell align="center">
                          {dateFormat(m.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {time(m.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowCollapse;
