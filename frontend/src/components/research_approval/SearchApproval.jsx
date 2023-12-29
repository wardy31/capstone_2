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
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getResearches } from "../../store/actions/researchAction";

import store from "../../store/store";
import moment from "moment";

function SearchApproval({ handleQuery }) {
  const [query, setQuery] = useState({
    status: "processing",
    search: "",
    year: "",
    month: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, search: e.target.value });
    const qr = { ...query, search: e.target.value };
    store.dispatch(getResearches(qr));
  };

  const handleStatus = (e, val) => {
    if (val !== null) {
      setQuery({ ...query, status: val });
      const qr = { ...query, status: val };
      store.dispatch(getResearches(qr));
    }
  };

  const handleFilter = () => {
    setQuery({ ...query, search: "", year: "", month: "" });
    const qr = { ...query, search: "", year: "", month: "" };
    store.dispatch(getResearches(qr));
  };

  useEffect(() => {
    handleQuery(query);
  }, [query]);

  useEffect(() => {
    store.dispatch(getResearches(query));
  }, []);

  return (
    <>
      <Paper sx={{ px: 1, py: 1, width: "auto" }} elevation={3}>
        {/* <ToggleButtonGroup
          exclusive
          onChange={handleStatus}
          value={query.status}
          color={"primary"}
          sx={{
            mb: 2,
            display: {
              xs: "none",
              md: "block",
            },
          }}
          size="small"
        >
          <ToggleButton
            value="processing"
            sx={{
              px: 2,
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                bgcolor: "primary.main",
              },
            }}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              processing
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="request_delete"
            sx={{
              px: 2,
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                bgcolor: "primary.main",
              },
            }}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              Request Deletion
            </Typography>
          </ToggleButton>
          <ToggleButton
            size="small"
            value="published"
            sx={{
              px: 2,
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                bgcolor: "primary.main",
              },
            }}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              published
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="unpublished"
            sx={{
              px: 2,
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                bgcolor: "primary.main",
              },
            }}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              unpublished
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="denied"
            sx={{
              px: 2,
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                bgcolor: "primary.main",
              },
            }}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              Declined
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup> */}

        <Grid container spacing={1}>
          <Grid item xs={12} lg={5}>
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
              placeholder="Search unique ID or Title"
              size="small"
              value={query.search}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={4} md={6} lg={2}>
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
                      store.dispatch(getResearches(qr));
                    },
                  },
                }}
                views={["month"]}
                onChange={(e) => {
                  setQuery({ ...query, month: e.month() + 1 });
                  const qr = { ...query, month: e.month() + 1 };
                  store.dispatch(getResearches(qr));
                }}
              ></DatePicker>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} md={6} lg={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
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
                      store.dispatch(getResearches(qr));
                    },
                  },
                }}
                views={["year"]}
                onChange={(e) => {
                  setQuery({ ...query, year: e.year() });
                  const qr = { ...query, year: e.year() };
                  store.dispatch(getResearches(qr));
                }}
              ></DatePicker>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} md={12} lg={2}>
            <FormControl fullWidth>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={query.status}
                fullWidth
                onChange={(e) => {
                  setQuery({ ...query, status: e.target.value });
                  const qr = { ...query, status: e.target.value };
                  store.dispatch(getResearches(qr));
                }}
              >
                <MenuItem value={"processing"}>Processing</MenuItem>
                <MenuItem value={"request_delete"}>Request Deletion</MenuItem>
                <MenuItem value={"published"}>Published</MenuItem>
                <MenuItem value={"unpublished"}>Unpublished</MenuItem>
                <MenuItem value={"denied"}>Decline</MenuItem>
                <MenuItem value={"delete"} sx={{color:"error.main"}}>Deleted Paper</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={1}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              color="primary"
              onClick={handleFilter}
            >
              <RestartAltIcon></RestartAltIcon>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default SearchApproval;
