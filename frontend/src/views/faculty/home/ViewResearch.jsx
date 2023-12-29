import React, { useEffect, useState } from "react";
import ResearchView from "../../../components/research/ResearchView";
import ResearchFacultyInChargeView from "../../../components/research/ResearchFacultyInChargeView";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

function ViewResearch() {
  const { data } = useSelector((state) => state.user.auth);
  const [op, setop] = useState(true);

  useEffect(() => {
    if (data?.role != "faculty_in_charge") {
      setop(true);
      return;
    }
    setop(false);
  }, [data]);

  let renderComponent;
  if (op) {
    renderComponent = <ResearchView />;
  } else {
    renderComponent = <ResearchFacultyInChargeView />;
  }

  return <Container fluid maxWidth="xl">{renderComponent}</Container >;
}

export default ViewResearch;
