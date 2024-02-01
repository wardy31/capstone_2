import React from "react";
import { Chart } from "react-google-charts";

function ColumnCharts({ data }) {
  return (
    <Chart
      chartType="ColumnChart"
      options={{ colors: ["#13005A"] }}
      width="100%"
      height="300px"
      data={data()}
    />
  );
}

export default ColumnCharts;
