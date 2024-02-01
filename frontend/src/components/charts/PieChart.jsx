import React from "react";
import { Chart } from "react-google-charts";

function PieChart({ data, title }) {
  return (
    <Chart
      options={{
        title: title,
        pieHole:0.4
      }}
      data={data}
      chartType="PieChart"
      width={"100%"}
      height={"300px"}
    ></Chart>
  );
}

export default PieChart;
