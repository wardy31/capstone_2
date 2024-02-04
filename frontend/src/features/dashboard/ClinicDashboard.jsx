import React from "react";
import Header from "../../components/header/Header";
import UserChart from "./components/UserChart";
import { useFetch } from "../../hooks/useFetch";
import store from "../../store/store";
import { getAllUsers } from "../user/userThunks";
import { useSelector } from "react-redux";
import StationChart from "./components/StationChart";
import { getStation } from "../station/stationThunk";
import { Box, Grid } from "@mui/material";
import CountList from "./components/CountCard";
import { getHealthRecords } from "../health_form/healthThunks";
import { getInfectedUsers } from "../contacts/contactThunks";
import DataList from "./components/DataList";
import { getNotifications } from "../auth/authThunks";

function ClinicDashboard() {
  const { allUsers } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.auth);
  const { getStation: stationsData } = useSelector((state) => state.station);
  const { getRecords } = useSelector((state) => state.healthForm);
  const { infectedUsers } = useSelector((state) => state.contact);

  useFetch(() => store.dispatch(getInfectedUsers()));
  useFetch(() => store.dispatch(getHealthRecords()));
  useFetch(() => store.dispatch(getStation()));
  useFetch(() => store.dispatch(getAllUsers()));
  useFetch(() => store.dispatch(getNotifications()));
  return (
    <>
      <Header title={"Dashboard"} hideButton={true}></Header>

      <Box mt={2}></Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Grid
            container
            direction={"row"}
            spacing={1}
            alignItems="stretch"
            mb={2}
          >
            <Grid xs={3} item>
              <CountList
                {...allUsers}
                title="Users"
                count={allUsers.data.length}
              ></CountList>
            </Grid>
            <Grid xs={3} item>
              <CountList
                {...stationsData}
                title="Stations"
                count={stationsData.data.length}
              ></CountList>
            </Grid>
            <Grid xs={3} item>
              <CountList
                {...infectedUsers}
                title={"Active Infected Users"}
                count={
                  infectedUsers.data.filter((f) => f.status === "infected")
                    .length
                }
              ></CountList>
            </Grid>
            <Grid xs={3} item>
              <CountList
                {...getRecords}
                title="Declaration Responses"
                count={getRecords.data.length}
              ></CountList>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <UserChart
                loading={allUsers.loading}
                data={allUsers.data}
              ></UserChart>
            </Grid>
            <Grid item xs={6}>
              <StationChart
                loading={stationsData.loading}
                data={stationsData.data}
              ></StationChart>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <DataList {...notifications}></DataList>
        </Grid>
      </Grid>
    </>
  );
}

export default ClinicDashboard;
