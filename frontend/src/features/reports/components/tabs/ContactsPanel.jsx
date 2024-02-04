import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DownloadButton from "./button/DownloadButton";
import usePDF from "../../../../hooks/usePDF";
import dateFormat from "../../../../utils/moment";

function ContactsPanel({
  infectedRecords: { data, loading },
  onUser,
  onClear,
}) {
  const { toPDF, targetRef } = usePDF({ filename: "users-close-contacts.pdf" });
  console.log(data);
  return (
    <TabPanel value={3}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="caption" display={"block"}>
            Select Station
          </Typography>
          <Box>
            <FormControl sx={{ width: 320 }}>
              <Select size="small" sx={{ bgcolor: "white" }} onChange={onUser}>
                <MenuItem value="infected">Infected</MenuItem>
                <MenuItem value="recovered">Recovered</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={onClear}
              variant="outlined"
              sx={{ py: 0.8, ml: 1, textTransform: "capitalize" }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <DownloadButton onClick={toPDF}></DownloadButton>
      </Box>
      <Box mb={4}></Box>
      <Box ref={targetRef}>
        <Typography variant="h6" fontWeight={"bold"} mb={2}>
          User's Close Contacts
        </Typography>
        {!loading &&
          data.map((m, i) => (
            <TableContainer
              key={m.id}
              sx={{ mt: i == 0 ? 0 : 4 }}
              component={Paper}
            >
              <Box
                my={2}
                px={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Typography
                  fontWeight={"bold"}
                >{`${m.user.firstName}  ${m.user.lastName}`}</Typography>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mr: 1, fontWeight: "bold" }}
                  >
                    Status:{" "}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    textTransform={"capitalize"}
                  >
                    {m.status}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mr: 1, fontWeight: "bold" }}
                  >
                    Date Infected:{" "}
                  </Typography>
                  <Typography variant="caption" fontWeight={"bold"}>
                    {dateFormat(m.dateInfected)}
                  </Typography>
                </Box>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      Contact No.
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      Address
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {m.ExposedUser.length != 0 &&
                    m.ExposedUser.map((e) => (
                      <TableRow key={e.id}>
                        <TableCell>{`${e.user.firstName} ${e.user.lastName}`}</TableCell>
                        <TableCell>{e.user.contactNumber}</TableCell>
                        <TableCell>{e.user.email}</TableCell>
                        <TableCell>{e.user.address}</TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {e.status}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
      </Box>
    </TabPanel>
  );
}

export default ContactsPanel;
