import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function FacultySearch({ query, handleChange, handleReset }) {
  return (
    <Box
      bgcolor={"white"}
      px={1.2}
      py={1.2}
      borderRadius={1}
      boxShadow={2}
      mb={2}
    >
      <Grid container columnSpacing={1} rowSpacing={0.8}>
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: "primary.light" }}
            placeholder="Search Faculty ID or Name"
            size="small"
            value={query.search}
            onChange={(e) => handleChange("search", e.target.value)}
          ></TextField>
        </Grid>
        <Grid
          item
          lg={3}
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        ></Grid>
        <Grid item xs={12} sm={12} lg={2}>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   label="status"
              value={query.isValidate}
              inputProps={{
                placeholder: "Status",
              }}
              fullWidth
              onChange={(e) => {
                handleChange("isValidate", e.target.value);
                // setQuery({ ...query, status: e.target.value });
                // const qr = { ...query, status: e.target.value };
                // handleQuery(qr);
              }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"approve"}>Approve</MenuItem>
              <MenuItem value={"pending_approval"}>Pending Approval</MenuItem>
              <MenuItem value={"decline"}>Declined</MenuItem>
              <MenuItem value={"disabled"}>Disabled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} lg={1}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            color="primary"
            onClick={handleReset}
          >
            <RestartAltIcon></RestartAltIcon>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FacultySearch;
