import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Header({ primary, secondary }) {
  return (
    <Box>
      <Typography
        variant={"h5"}
        sx={{ fontWeight: "bold", color: "primary.main", letterSpacing: 2 }}
      >
        {primary}
      </Typography>
      <Typography
        variant={"caption"}
        sx={{
          fontSize:12,
          textTransform:"capitalize",
          color: "text.secondary",
          letterSpacing: 2,
        }}
      >
        {secondary}
      </Typography>
    </Box>
  );
}

export default Header;
