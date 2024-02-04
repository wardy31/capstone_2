import { createSlice } from "@reduxjs/toolkit";

const stationSlice = createSlice({
  name: "station",
  initialState: {
    getStation: {
      data: [],
      loading: true,
      error: false,
      success: false,
    },
    create: {
      loading: false,
      error: false,
      success: false,
    },
    update: {
      loading: false,
      error: false,
      success: false,
    },
    delete: {
      loading: false,
      error: false,
      success: false,
    },
    getLogs: {
      data: [],
      loading: false,
    },
    userLogs: {
      data: [],
      loading: true,
    },
  },
  reducers: {
    SET_DATA: (state, { payload: { type, payload } }) => {
      state[type].data = payload;
    },
    SET_LOADING: (state, { payload: { type, payload } }) => {
      state[type].loading = payload;
    },
    SET_ERROR: (state, { payload: { type, payload } }) => {
      state[type].error = payload;
    },
    SET_SUCCESS: (state, { payload: { type, payload } }) => {
      state[type].success = payload;
    },
  },
});

export const { SET_DATA, SET_ERROR, SET_LOADING, SET_SUCCESS } =
  stationSlice.actions;
export default stationSlice.reducer;
