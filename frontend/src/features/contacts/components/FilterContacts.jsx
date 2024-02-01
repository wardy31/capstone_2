import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import { getStation } from "../../station/stationThunk";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import { LoadingButton } from "@mui/lab";

function FilterContacts({ data, loading, form, handleChange, handlleFilter }) {
  const { data: stationData } = useSelector(
    (state) => state.station.getStation
  );
  useFetch(() => store.dispatch(getStation()));
  return (
    <Paper sx={{ px: 1, py: 1 }}>
      <Box>
        <Grid container spacing={2} alignItems="stretch">
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 2,
            }}
            xs={8}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl fullWidth>
                <DatePicker
                  sx={{ bgcolor: "primary.light" }}
                  label="Date Started"
                  defaultValue={moment(data?.dateInfected)}
                  onChange={(date, context) =>
                    handleChange(
                      moment(date._d).format("YYYY-MM-DD").toString(),
                      "positiveDate"
                    )
                  }
                  disableFuture
                />
              </FormControl>

              <Typography fontWeight={"bold"}>-</Typography>

              <FormControl fullWidth>
                <DatePicker
                  sx={{ bgcolor: "primary.light" }}
                  label="Date Window"
                  onChange={(date, context) =>
                    handleChange(
                      moment(date._d).format("YYYY-MM-DD").toString(),
                      "windowDate"
                    )
                  }
                  disableFuture
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} display={"flex"} justifyContent={"space-between"} columnGap={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Station</InputLabel>
              <Select
                sx={{ bgcolor: "primary.light" }}
                value={form.stationId}
                label="Station"
                onChange={(e) => handleChange(e.target.value, "stationId")}
              >
                <MenuItem value={""}>All</MenuItem>
                {stationData.map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              size="large"
              color="primary"
              variant="contained"
              sx={{ height: "auto", borderRadius: 1 }}
              loading={loading}
              onClick={handlleFilter}
            >
              <PersonSearchTwoToneIcon size="large"></PersonSearchTwoToneIcon>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default FilterContacts;
