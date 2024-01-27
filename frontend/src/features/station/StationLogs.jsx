import React from "react";
import StationLogsList from "./components/StationLogsList";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import store from "../../store/store";
import { getStationLogsById } from "./stationThunk";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";

function StationLogs() {
  const { id } = useParams();
  const { data, loading } = useSelector((state) => state.station.getLogs);

  useFetch(() => store.dispatch(getStationLogsById(id)));
  return (
    <>
      <Header title={"Station Logs"} hideButton={true}></Header>
      <StationLogsList data={data}></StationLogsList>
    </>
  );
}

export default StationLogs;
