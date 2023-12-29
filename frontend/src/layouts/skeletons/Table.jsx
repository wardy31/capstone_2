import { Box, Skeleton } from "@mui/material";
import React from "react";

function Table() {
  return (
    <Box sx={{ height: 200,mt:6 }}>
      <Skeleton variant="rounded" height={"140%"}></Skeleton>
    </Box>
  );
}

export default Table;
