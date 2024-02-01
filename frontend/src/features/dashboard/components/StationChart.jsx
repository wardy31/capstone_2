import { Paper, Typography } from "@mui/material";
import React from "react";
import ColumnCharts from "../../../components/charts/ColumnCharts";

function StationChart({ loading, data }) {
  const mapData = () => {
    const stations = data.map((m) => {
      return [m.name, m.UserLocationHistory.length];
    });

    return [["Element", "User Visited"], ...stations];
  };

  return (
    <Paper>
      <Typography pl={2} pt={3} fontWeight={"bold"}>
        User Visited Stations
      </Typography>
      {!loading && <ColumnCharts data={mapData}></ColumnCharts>}
    </Paper>
  );
}

export default StationChart;
