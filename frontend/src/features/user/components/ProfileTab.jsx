import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import { getUserHealthRecords } from "../userThunks";
import { useSelector } from "react-redux";
import dateFormat, { time } from "../../../utils/moment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

function ProfileTab({ userHealthRecord, userLocation, handleView }) {
  const [tab, setTab] = useState(1);
  return (
    <TabContext value={tab}>
      <TabList onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Health Declarations" value={1}></Tab>
        <Tab label="Stations Visited" value={2}></Tab>
      </TabList>
      <TabPanel value={1} sx={{ px: 0, py: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.secondary" }}>
                  Date Submitted
                </TableCell>
                <TableCell align="right" sx={{ color: "text.secondary" }}>
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userHealthRecord.map((m) => (
                <TableRow>
                  <TableCell>{dateFormat(m.createdAt)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleView(m.UserAnswer)}
                    >
                      <TextSnippetIcon></TextSnippetIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={2} sx={{ px: 0, py: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.secondary" }}>Station</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>Time</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userLocation.map((m) => (
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {m.station.name}
                  </TableCell>
                  <TableCell>{dateFormat(m.createdAt)}</TableCell>
                  <TableCell>{time(m.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </TabContext>
  );
}

export default ProfileTab;
