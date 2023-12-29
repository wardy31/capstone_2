import {
  Box,
  Container,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ResearchCard from "../../../components/research/ResearchCard";
import store from "../../../store/store";
import { getApprovedResearch } from "../../../store/actions/researchAction";
import { useSelector, useDispatch } from "react-redux";

function Index() {
  const { loading, error, data } = useSelector(
    (state) => state.research.approve
  );

  useEffect(() => {
    store.dispatch(getApprovedResearch());
  }, []);
  return (
    <Box sx={{ mx: [2, 4] }}>
      <ResearchCard loading={loading} error={error} data={data} />
    </Box>
  );
}

export default Index;
