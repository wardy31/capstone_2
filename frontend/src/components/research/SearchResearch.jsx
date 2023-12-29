import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import { getResearches } from "../../store/actions/researchAction";

import store from "../../store/store";
import moment from "moment";

function SearchResearch({ handleQuery, page }) {
  const [query, setQuery] = useState({
    status: "published",
    search: "",
    year: "",
    month: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, search: e.target.value });
    const qr = { ...query, search: e.target.value };
    store.dispatch(getResearches(qr, "approve"));
  };

  const handleStatus = (e, val) => {
    if (val !== null) {
      setQuery({ ...query, status: val });
      const qr = { ...query, status: val };
      store.dispatch(getResearches(qr, "approve"));
    }
  };

  const handleFilter = () => {
    setQuery({ ...query, search: "", year: "", month: "" });
    const qr = { ...query, search: "", year: "", month: "" };
    store.dispatch(getResearches(qr, "approve"));
  };

  useEffect(() => {}, [query]);
  handleQuery(query);

  useEffect(() => {
    store.dispatch(getResearches(query, "approve"));
  }, []);

  return (
    <>
      <Paper sx={{ px: 1, py: 1, width: "auto" }}>
        {page != "home" && (
          <FormControl
            fullWidth
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              mb: 1,
            }}
          >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={query.status}
              label="Status"
              fullWidth
              onChange={(e) => {
                setQuery({ ...query, status: e.target.value });
                const qr = { ...query, status: e.target.value };
                store.dispatch(getResearches(qr, "approve"));
              }}
            >
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"request_delete"}>Request Deletion</MenuItem>
              <MenuItem value={"published"}>Published</MenuItem>
              <MenuItem value={"unpublished"}>Unpublished</MenuItem>
              <MenuItem value={"denied"}>Decline</MenuItem>
            </Select>
          </FormControl>
        )}
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={12} lg={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon></SearchTwoToneIcon>
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder="Search unique ID or Title"
              size="small"
              value={query.search}
              onChange={handleChange}
              sx={{ bgcolor: "primary.light" }}
            ></TextField>
          </Grid>

          <Grid item xs={12} lg={1} display={{xs:"none",lg:"block"}}></Grid>

          <Grid item xs={12} md={12} lg={5}>
            <Grid container spacing={1}>
              <Grid item lg={5} xs={6} sm={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        value: query.month
                          ? moment(`${query.month}-16-2023`).utc()
                          : null,
                        fullWidth: true,
                        placeholder: "Month",
                        size: "small",
                        onChange: (e) => {
                          e
                            ? setQuery({ ...query, month: e.month() + 1 })
                            : setQuery({ ...query, month: "" });

                          const qr = {
                            ...query,
                            month: e ? e.month() + 1 : "",
                          };
                          store.dispatch(getResearches(qr, "approve"));
                        },
                      },
                    }}
                    // sx={{ bgcolor: "#F5F5F5" }}
                    views={["month"]}
                    onChange={(e) => {
                      setQuery({ ...query, month: e.month() + 1 });
                      const qr = { ...query, month: e.month() + 1 };
                      store.dispatch(getResearches(qr, "approve"));
                    }}
                  ></DatePicker>
                </LocalizationProvider>
              </Grid>

              <Grid item lg={5} xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    // sx={{ bgcolor: "#F5F5F5" }}
                    slotProps={{
                      textField: {
                        value: query.year
                          ? moment(`1-15-${query.year}`).utc()
                          : null,
                        fullWidth: true,
                        placeholder: "Year",
                        size: "small",
                        onChange: (e) => {
                          e
                            ? setQuery({ ...query, year: e.year() })
                            : setQuery({ ...query, year: "" });

                          const qr = {
                            ...query,
                            year: e ? e.year() : "",
                          };
                          store.dispatch(getResearches(qr, "approve"));
                        },
                      },
                    }}
                    views={["year"]}
                    onChange={(e) => {
                      setQuery({ ...query, year: e.year() });
                      const qr = { ...query, year: e.year() };
                      store.dispatch(getResearches(qr, "approve"));
                    }}
                  ></DatePicker>
                </LocalizationProvider>
              </Grid>
              <Grid item lg={2} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={handleFilter}
                  size="large"
                >
                  <RestartAltIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default SearchResearch;
