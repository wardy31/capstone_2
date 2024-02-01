import { Box, Card, Paper, Typography } from "@mui/material";
import React from "react";
import PieChart from "../../../components/charts/PieChart";

function UserChart({ loading, data }) {
  const mapData = () => {
    const visitorLength = data.filter((f) => f.role === "visitor").length;
    const studentLength = data.filter((f) => f.role === "student").length;
    const employeeLength = data.filter((f) => f.role === "employee").length;

    return [
      ["role", "length"],
      ["Student", studentLength],
      ["Employee", employeeLength],
      ["Visitor", visitorLength],
    ];
  };

  return (
    <Paper>
      <Typography pl={2} pt={3} fontWeight={"bold"}>
        No. of users 
      </Typography>

      {!loading && <PieChart data={mapData()}></PieChart>}
    </Paper>
  );
}

export default UserChart;
