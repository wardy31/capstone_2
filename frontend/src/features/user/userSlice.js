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
      loading: true,
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
      loading: true,
    },
    userLocation: {
      data: [],
      loading: true,
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
    notification: {
      notify: false,
      data: [],
      loading: true,
    },
    updateProfile: {
      loading: false,
      error: [],
    },
    updatePassword: {
      loading: false,
      error: [],
    },
    remove: {
      loading: false,
      error: [],
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
    SET_NOTIFY: (state, { payload: { type, payload } }) => {
      state[type].notify = payload;
    },
  },
});

export const { SET_NOTIFY, SET_DATA, SET_ERROR, SET_LOADING, SET_SUCCESS } =
  userSlice.actions;
export default userSlice.reducer;
