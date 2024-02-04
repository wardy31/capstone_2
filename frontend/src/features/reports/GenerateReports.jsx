import React from "react";
import Header from "../../components/header/Header";
import ReportTabs from "./components/ReportTabs";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getHealthRecords } from "../health_form/healthThunks";
import store from "../../store/store";
import { useFetch } from "../../hooks/useFetch";

function GenerateReports() {
  const healthRecords = useSelector((state) => state.healthForm.getRecords);
  const onResponse = async (e) => {
    await store.dispatch(getHealthRecords(e.target.value));
  };

  useFetch(() => store.dispatch(getHealthRecords()));

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
      ></ReportTabs>
    </>
  );
}

export default GenerateReports;
