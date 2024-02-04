import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

function SearchText({onChange, value, onFilter, loading, label}) {
  return (
    <Box display={"flex"} alignItems={"center"} columnGap={2}>
      <TextField
        fullWidth
        label={label}
        sx={{ bgcolor: "primary.light" }}
        value={value}
        onChange={onChange}
        size="small"
      ></TextField>
      <LoadingButton
        loading={loading}
        onClick={onFilter}
        variant="outlined"
        sx={{ bgcolor: "primary.light",py:0.8 }}
      >
        Filter
      </LoadingButton>
    </Box>
  );
}

export default SearchText;
