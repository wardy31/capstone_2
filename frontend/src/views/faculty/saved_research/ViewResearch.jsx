import React, { useEffect, useState } from "react";
import ResearchView from "../../../components/research/ResearchView";
import ResearchFacultyInChargeView from "../../../components/research/ResearchFacultyInChargeView";
import { Container } from "@mui/material";
import ResearchSavedCard from "../../../components/research/ResearchSavedCard";
import store from "../../../store/store";
import { useSelector } from "react-redux";
import { getFavorite } from "../../../store/actions/favoriteAction";

function ViewResearch() {
  const { data, loading, error } = useSelector((state) => state.favorite.get);

  useEffect(() => {
    store.dispatch(getFavorite());
  }, []);

  const [op, setop] = useState(true);
  let renderComponent;
  if (op) {
    renderComponent = <ResearchView />;
  } else {
    renderComponent = <ResearchFacultyInChargeView />;
  }

  return <Container fluid maxWidth="xl">{renderComponent}</Container>;
}

export default ViewResearch;
