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
  
  function CollegeSearch({ query, handleChange, handleReset }) {
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
          <Grid item xs={12} sm={12} lg={12}>
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
              placeholder="Search College Name"
              size="small"
              value={query.search}
              onChange={(e) => handleChange("search", e.target.value)}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default CollegeSearch;
  