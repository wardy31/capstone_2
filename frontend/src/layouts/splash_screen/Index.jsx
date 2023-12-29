import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function Index() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        variant={"h5"}
        sx={{ fontWeight: "bold", letterSpacing: 1.2, mb: 2 }}
      >
        Loading Please Wait
      </Typography>
      <LinearProgress
        sx={{ height: 14, width: "30%", borderRadius: 5 }}
      ></LinearProgress>
    </Box>
  );
}

export default Index;
