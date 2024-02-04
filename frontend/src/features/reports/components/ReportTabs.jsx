import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import FormResponsePanel from "./tabs/FormResponsePanel";
import usePDF from "../../../hooks/usePDF";
import StationsPanel from "./tabs/StationsPanel";
import useData from "../../../hooks/useData";
import ContactsPanel from "./tabs/ContactsPanel";

function ReportTabs({ declarationData, stationData, infectedUserData }) {
  const { state, handleChange } = useData(1);
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={state}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(e, newVal) => handleChange(newVal)}>
            <Tab label="Declaration Response" value={1}></Tab>
            <Tab label="Stations Entry" value={2}></Tab>
            <Tab label="User's  Contact" value={3}></Tab>
          </TabList>
        </Box>
        <FormResponsePanel {...declarationData}></FormResponsePanel>
        <StationsPanel {...stationData}></StationsPanel>
        <ContactsPanel {...infectedUserData}></ContactsPanel>
      </TabContext>
    </Box>
  );
}

export default ReportTabs;
