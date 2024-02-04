import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Progress({ message, xs, md, size }) {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        sx={{
          typography: {
            xs: xs,
            md: md,
          },
          fontWeight: "bold",
        }}
        mb={2}
      >
        {message}
      </Typography>
      <CircularProgress
        color="primary"
        thickness={6}
        size={size}
      ></CircularProgress>
    </Box>
  );
}

export default Progress;
