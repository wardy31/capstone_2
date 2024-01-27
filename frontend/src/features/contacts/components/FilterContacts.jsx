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

function FilterContacts() {
  const [value, setValue] = useState({
    start: "",
    window: "",
    duration: "",
    stationId: "",
  });
  const { data: stationData } = useSelector(
    (state) => state.station.getStation
  );

  useFetch(() => store.dispatch(getStation()));
  console.log(value);
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
                  onChange={(date, context) =>
                    setValue({
                      ...value,
                      start: moment(date._d).format("YYYY-MM-DD").toString(),
                    })
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
                    setValue({
                      ...value,
                      window: moment(date._d).format("YYYY-MM-DD").toString(),
                    })
                  }
                  disableFuture
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Station</InputLabel>
              <Select
                sx={{ bgcolor: "primary.light" }}
                value={value.stationId}
                label="Station"
                onChange={(e) =>
                  setValue({ ...value, stationId: e.target.value })
                }
              >
                <MenuItem value={""}>All</MenuItem>
                {stationData.map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} alignSelf={"center"}>
            <LoadingButton
              size="large"
              color="primary"
              variant="contained"
              sx={{ height: "auto", px: 2, py: 2, borderRadius: 1 }}
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
