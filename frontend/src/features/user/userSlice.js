import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    createUser: {
      loading: false,
      error: false,
      success: false,
    },
    getUser: {
      data: [],
      loading: false,
      error: false,
      success: false,
    },
    allUsers: {
      data: [],
      loading: true,
      error: false,
      success: false,
    },
    userHealthRecord: {
      data: [],
      loading: false,
    },
    userLocation: {
      data: [],
      loading: false,
    },
    userById: {
      data: null,
      loading: true,
    },
    userLogs: {
      data: null,
      loading: true,
    },
    createInfected: {
      data: null,
      loading: false,
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
  userSlice.actions;
export default userSlice.reducer;
