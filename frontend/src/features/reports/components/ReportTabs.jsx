import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import FormResponsePanel from "./tabs/FormResponsePanel";
import usePDF from "../../../hooks/usePDF";

function ReportTabs({ declarationData }) {
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList>
            <Tab label="Declaration Response" value={1}></Tab>
          </TabList>
        </Box>
        <FormResponsePanel
          {...declarationData}
        ></FormResponsePanel>
      </TabContext>
    </Box>
  );
}

export default ReportTabs;
