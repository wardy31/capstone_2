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
import dateFormat, { time } from "../../../utils/moment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import { useNavigate } from "react-router-dom";

function ProfileTab({
  userHealthRecord,
  userLocation,
  userContacts,
  handleView,
}) {
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();

  console.log(userContacts);
  return (
    <TabContext value={tab}>
      <TabList onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Health Declarations" value={1}></Tab>
        <Tab label="Stations Visited" value={2}></Tab>
        <Tab label="User Active Contacts" value={3}></Tab>
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
                <TableRow key={m.id}>
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
                <TableRow key={m.id}>
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

      <TabPanel value={3} sx={{ px: 0, py: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.secondary" }}>
                  Infected User
                </TableCell>
                <TableCell sx={{ color: "text.secondary" }}>Status</TableCell>
                <TableCell sx={{ color: "text.secondary" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userContacts.map((m) => (
                <TableRow key={m.id}>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {`${m.infectedUser.user.firstName} ${m.infectedUser.user.lastName}`}
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {m.infectedUser.status}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/clinic/monitor-contacts/${m.infectedUserId}/check-contacts`
                        )
                      }
                    >
                      <GroupsTwoToneIcon></GroupsTwoToneIcon>
                    </IconButton>
                  </TableCell>
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
