import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
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
      <ResearchCard loading={loading} error={error} data={data} page={"home"} />
    </Box>
  );
}

export default Index;
