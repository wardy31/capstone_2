import React, { useEffect, useState } from "react";
import ResearchView from "../../../components/research/ResearchView";
import { Box, Container } from "@mui/material";

function ViewResearch() {
  return (
    <Container fluid maxWidth="xl" >
      <ResearchView />
    </Container >
  );
}

export default ViewResearch;
