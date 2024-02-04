import React from "react";
import Header from "../../components/header/Header";
import ReportTabs from "./components/ReportTabs";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getHealthRecords } from "../health_form/healthThunks";
import store from "../../store/store";
import { useFetch } from "../../hooks/useFetch";
import { getLocations, getStation } from "../station/stationThunk";
import { getInfectedUsers } from "../contacts/contactThunks";

function GenerateReports() {
  const healthRecords = useSelector((state) => state.healthForm.getRecords);
  const stationRecords = useSelector((state) => state.station.getStation);
  const locationRecords = useSelector((state) => state.station.getLocations);
  const infectedRecords = useSelector((state) => state.contact.infectedUsers);

  const onResponse = async (e) => {
    await store.dispatch(getHealthRecords(e.target.value));
  };

  const onStation = async (e) => {
    await store.dispatch(getLocations(e.target.value));
  };

  const onUser = async (e) => {
    await store.dispatch(getInfectedUsers(e.target.value));
  };

  const onClear = async () => {
    await store.dispatch(getLocations(" "));
  };

  useFetch(() => store.dispatch(getHealthRecords()));
  useFetch(() => store.dispatch(getStation()));
  useFetch(() => store.dispatch(getLocations()));
  useFetch(() => store.dispatch(getInfectedUsers()));

  return (
    <>
      <Header
        title={"Generate Reports"}
        subTitle={"generate downloaded pdf files"}
        hideButton={true}
      ></Header>

      <Box mb={4}></Box>

      <ReportTabs
        declarationData={{
          healthRecords,
          onResponse,
        }}
        stationData={{
          stationRecords,
          locationRecords,
          onStation,
          onClear,
        }}
        infectedUserData={{
          infectedRecords,
          onUser,
        }}
      ></ReportTabs>
    </>
  );
}

export default GenerateReports;
