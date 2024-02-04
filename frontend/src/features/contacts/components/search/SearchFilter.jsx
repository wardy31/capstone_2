import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

function SearchFilter({ textField, selectField, onFilter, loading }) {
  return (
    <Box display={"flex"} alignItems={"center"} columnGap={2}>
      <TextField
        size="small"
        fullWidth
        label="Search name here"
        value={textField.value}
        onChange={textField.onChange}
        sx={{ bgcolor: "primary.light" }}
      ></TextField>

      <FormControl fullWidth size="small">
        <InputLabel>User Status</InputLabel>
        <Select
          sx={{ bgcolor: "primary.light" }}
          label="User Status"
          value={selectField.value}
          onChange={selectField.onChange}
        >
          <MenuItem value={""}>-----</MenuItem>
          <MenuItem value={"infected"}>Infected</MenuItem>
          <MenuItem value={"recovered"}>Recovered</MenuItem>
        </Select>
      </FormControl>
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

export default SearchFilter;
