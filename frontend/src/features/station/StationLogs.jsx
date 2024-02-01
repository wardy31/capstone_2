import React from "react";
import StationLogsList from "./components/StationLogsList";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import store from "../../store/store";
import { getStationLogsById } from "./stationThunk";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { Box, Container } from "@mui/material";

function StationLogs() {
  const { id } = useParams();
  const { data, loading } = useSelector((state) => state.station.getLogs);

  useFetch(() => store.dispatch(getStationLogsById(id)));
  return (
    <Container>
      <Header title={"Station Logs"} hideButton={true}></Header>
      <Box mb={4}></Box>
      <StationLogsList data={data}></StationLogsList>
    </Container>
  );
}

export default StationLogs;