import React, { useEffect, useState } from "react";
import Table from "../../../components/research_approval/Table";
import { Box, Container, Grid, Paper, Tab, Tabs } from "@mui/material";
import Header from "../../../components/Header/Header";
import store from "../../../store/store";
import {
  getPendingResearch,
  getRequestDeleteResearch,
} from "../../../store/actions/researchAction";
import { useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SearchApproval from "../../../components/research_approval/SearchApproval";

function Index() {
  const { data, loading, error } = useSelector((state) => state.research.get);
  const [query, setQuery] = useState(null);

  const handleQuery = (data) => {
    setQuery(data);
  };

  return (
    <Box sx={{ mx: [2, 4] }}>
      <Header
        primary={"Research Management"}
        secondary={" this is your Researches page."}
      ></Header>

      <Box mb={4}></Box>

      <SearchApproval handleQuery={handleQuery} />
      <Table data={data} error={error} loading={loading} query={query} />
    </Box>
  );
}

export default Index;
